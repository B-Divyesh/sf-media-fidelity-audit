//! Local, read-only media archive fidelity audits.
use clap::{Args, Parser, Subcommand};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::{
    collections::{BTreeMap, BTreeSet},
    fs::{self, File, OpenOptions},
    io::{Read, Write},
    path::{Path, PathBuf},
    process::ExitCode,
    time::{SystemTime, UNIX_EPOCH},
};

#[derive(Parser, Debug)]
#[command(
    name = "mfa",
    version,
    about = "Prove that archive media still matches your originals.",
    long_about = "Media Fidelity Audit compares a source tree with an archive read-only. It writes a portable JSON manifest and never uploads or changes media. Exit 0: all byte-identical; 1: differences found; 2: operational error."
)]
struct Cli {
    #[command(subcommand)]
    command: Command,
}
#[derive(Subcommand, Debug)]
enum Command {
    /// Compare source media to the archive at matching relative paths.
    Audit(AuditArgs),
    /// Run a safe audit on bundled sample media in a temporary directory.
    Demo,
}
#[derive(Args, Debug)]
struct AuditArgs {
    /// Camera export or mounted source directory
    #[arg(long)]
    source: PathBuf,
    /// Archive directory to verify
    #[arg(long)]
    archive: PathBuf,
    /// Write the portable JSON manifest here
    #[arg(long, default_value = "media-fidelity-manifest.json")]
    output: PathBuf,
    /// Also emit the compact summary as JSON to stdout
    #[arg(long)]
    json: bool,
    /// Include non-media files too
    #[arg(long)]
    include_all: bool,
}

#[derive(Serialize, Debug)]
struct Manifest {
    schema: String,
    generated_at: u64,
    source: String,
    archive: String,
    scope: String,
    summary: Summary,
    assets: Vec<Asset>,
    live_photo_pairs: Vec<LivePair>,
}
#[derive(Serialize, Debug, Default)]
struct Summary {
    source_files: usize,
    matched: usize,
    changed: usize,
    missing: usize,
    unreadable: usize,
    sidecars: usize,
    live_photo_pairs: usize,
    all_byte_identical: bool,
}
#[derive(Serialize, Debug)]
struct Asset {
    relative_path: String,
    kind: String,
    status: Status,
    source: Option<FileProof>,
    archive: Option<FileProof>,
    observations: Vec<String>,
}
#[derive(Serialize, Debug, Clone, Copy, PartialEq)]
#[serde(rename_all = "snake_case")]
enum Status {
    Identical,
    Changed,
    Missing,
    Unreadable,
}
#[derive(Serialize, Debug)]
struct FileProof {
    bytes: u64,
    sha256: String,
    media: Option<MediaInfo>,
}
#[derive(Serialize, Debug, Clone, PartialEq, Eq)]
struct MediaInfo {
    format: String,
    width: Option<u32>,
    height: Option<u32>,
    codec: Option<String>,
    fps: Option<String>,
    exif_sha256: Option<String>,
    orientation: Option<u16>,
    captured_at: Option<String>,
    camera: Option<String>,
}
#[derive(Serialize, Debug)]
struct LivePair {
    still: String,
    motion: String,
    status: String,
}

fn main() -> ExitCode {
    let cli = Cli::parse();
    match cli.command {
        Command::Audit(a) => match run_audit(a) {
            Ok(different) => {
                if different {
                    ExitCode::from(1)
                } else {
                    ExitCode::SUCCESS
                }
            }
            Err(e) => {
                eprintln!("mfa: {e}");
                ExitCode::from(2)
            }
        },
        Command::Demo => match run_demo() {
            Ok(()) => ExitCode::SUCCESS,
            Err(e) => {
                eprintln!("mfa: {e}");
                ExitCode::from(2)
            }
        },
    }
}

fn run_audit(args: AuditArgs) -> Result<bool, String> {
    validate_dir(&args.source, "source")?;
    validate_dir(&args.archive, "archive")?;
    let safe_output = validate_output(&args.output, &args.source, &args.archive)?;
    let files = collect_files(&args.source, args.include_all)?;
    let mut summary = Summary {
        source_files: files.len(),
        ..Default::default()
    };
    let mut assets = Vec::with_capacity(files.len());
    let mut names = BTreeSet::new();
    for rel in files {
        names.insert(rel.clone());
        let source_path = args.source.join(&rel);
        let archive_path = args.archive.join(&rel);
        let kind = kind_for(&rel).to_owned();
        if is_sidecar(&rel) {
            summary.sidecars += 1;
        }
        let source = prove(&source_path);
        let (status, archive, mut observations) = match &source {
            Err(message) => (
                Status::Unreadable,
                None,
                vec![format!("Could not read source: {message}")],
            ),
            Ok(_) if !archive_path.is_file() => (
                Status::Missing,
                None,
                vec!["No file at the matching archive-relative path.".to_owned()],
            ),
            Ok(source_proof) => match prove(&archive_path) {
                Err(message) => (
                    Status::Unreadable,
                    Some(FileProof {
                        bytes: 0,
                        sha256: String::new(),
                        media: None,
                    }),
                    vec![format!("Could not read archive: {message}")],
                ),
                Ok(archive_proof) => {
                    if source_proof.sha256 == archive_proof.sha256 {
                        (
                            Status::Identical,
                            Some(archive_proof),
                            vec!["SHA-256 and bytes match.".to_owned()],
                        )
                    } else {
                        let mut note = metadata_notes(
                            source_proof.media.as_ref(),
                            archive_proof.media.as_ref(),
                        );
                        note.insert(
                            0,
                            "SHA-256 differs: archive is not a byte-identical original.".to_owned(),
                        );
                        (Status::Changed, Some(archive_proof), note)
                    }
                }
            },
        };
        match status {
            Status::Identical => summary.matched += 1,
            Status::Changed => summary.changed += 1,
            Status::Missing => summary.missing += 1,
            Status::Unreadable => summary.unreadable += 1,
        }
        let source_proof = source.ok();
        assets.push(Asset {
            relative_path: slash(&rel),
            kind,
            status,
            source: source_proof,
            archive,
            observations: {
                observations.shrink_to_fit();
                observations
            },
        });
    }
    let live_photo_pairs = pair_live_photos(&names, &assets);
    summary.live_photo_pairs = live_photo_pairs.len();
    summary.all_byte_identical =
        summary.changed == 0 && summary.missing == 0 && summary.unreadable == 0;
    let manifest = Manifest {
        schema: "media-fidelity-audit/v1".to_owned(),
        generated_at: now(),
        source: args
            .source
            .canonicalize()
            .unwrap_or(args.source)
            .display()
            .to_string(),
        archive: args
            .archive
            .canonicalize()
            .unwrap_or(args.archive)
            .display()
            .to_string(),
        scope: if args.include_all {
            "all files".to_owned()
        } else {
            "media and sidecars".to_owned()
        },
        summary,
        assets,
        live_photo_pairs,
    };
    let bytes = serde_json::to_vec_pretty(&manifest).map_err(|e| e.to_string())?;
    write_new_file(&safe_output, &bytes)?;
    if args.json {
        println!(
            "{}",
            serde_json::to_string_pretty(&manifest.summary).map_err(|e| e.to_string())?
        );
    } else {
        println!("Media Fidelity Audit\n  {} source files · {} identical · {} changed · {} missing · {} unreadable\n  manifest: {}", manifest.summary.source_files, manifest.summary.matched, manifest.summary.changed, manifest.summary.missing, manifest.summary.unreadable, args.output.display());
    }
    Ok(!manifest.summary.all_byte_identical)
}

fn validate_output(output: &Path, source: &Path, archive: &Path) -> Result<PathBuf, String> {
    if output.exists() {
        return Err(format!(
            "output already exists; choose a new path: {}",
            output.display()
        ));
    }
    let file_name = output
        .file_name()
        .ok_or_else(|| format!("output must name a new file: {}", output.display()))?;
    let parent = output
        .parent()
        .filter(|path| !path.as_os_str().is_empty())
        .unwrap_or_else(|| Path::new("."));
    let parent = parent
        .canonicalize()
        .map_err(|e| format!("cannot resolve output directory {}: {e}", parent.display()))?;
    let candidate = parent.join(file_name);
    for (label, tree) in [("source", source), ("archive", archive)] {
        let tree = tree
            .canonicalize()
            .map_err(|e| format!("cannot resolve {label} {}: {e}", tree.display()))?;
        if candidate.starts_with(&tree) {
            return Err(format!(
                "output must be outside the {label} tree: {}",
                output.display()
            ));
        }
    }
    Ok(candidate)
}

fn write_new_file(path: &Path, bytes: &[u8]) -> Result<(), String> {
    let mut file = OpenOptions::new()
        .write(true)
        .create_new(true)
        .open(path)
        .map_err(|e| format!("cannot create new output {}: {e}", path.display()))?;
    if let Err(error) = file.write_all(bytes) {
        drop(file);
        let _ = fs::remove_file(path);
        return Err(format!("cannot write {}: {error}", path.display()));
    }
    Ok(())
}

fn run_demo() -> Result<(), String> {
    let root = std::env::temp_dir().join(format!("mfa-demo-{}-{}", std::process::id(), now()));
    let source = root.join("sample-source");
    let archive = root.join("sample-archive");
    fs::create_dir_all(source.join("2025")).map_err(|e| e.to_string())?;
    fs::create_dir_all(archive.join("2025")).map_err(|e| e.to_string())?;
    for (relative, bytes) in [
        (
            "2025/birthday.jpg",
            include_bytes!("../examples/source/2025/birthday.jpg").as_slice(),
        ),
        (
            "2025/beach-live.HEIC",
            include_bytes!("../examples/source/2025/beach-live.HEIC").as_slice(),
        ),
        (
            "2025/beach-live.MOV",
            include_bytes!("../examples/source/2025/beach-live.MOV").as_slice(),
        ),
        (
            "2025/family.jpg",
            include_bytes!("../examples/source/2025/family.jpg").as_slice(),
        ),
        (
            "2025/family.xmp",
            include_bytes!("../examples/source/2025/family.xmp").as_slice(),
        ),
    ] {
        fs::write(source.join(relative), bytes).map_err(|e| e.to_string())?;
    }
    for (relative, bytes) in [
        (
            "2025/birthday.jpg",
            include_bytes!("../examples/archive/2025/birthday.jpg").as_slice(),
        ),
        (
            "2025/beach-live.HEIC",
            include_bytes!("../examples/archive/2025/beach-live.HEIC").as_slice(),
        ),
        (
            "2025/beach-live.MOV",
            include_bytes!("../examples/archive/2025/beach-live.MOV").as_slice(),
        ),
        (
            "2025/family.jpg",
            include_bytes!("../examples/archive/2025/family.jpg").as_slice(),
        ),
    ] {
        fs::write(archive.join(relative), bytes).map_err(|e| e.to_string())?;
    }
    let output = root.join("sample-manifest.json");
    println!("Demo — bundled sample data; your media is never read or changed.");
    let _differences = run_audit(AuditArgs {
        source,
        archive,
        output,
        json: false,
        include_all: false,
    })?;
    println!("  demo workspace: {}", root.display());
    println!("  delete this temporary folder when you are done reviewing it.");
    Ok(())
}

fn validate_dir(path: &Path, label: &str) -> Result<(), String> {
    if path.is_dir() {
        Ok(())
    } else {
        Err(format!(
            "{label} is not a readable directory: {}",
            path.display()
        ))
    }
}
fn now() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs()
}
fn slash(path: &Path) -> String {
    path.to_string_lossy().replace('\\', "/")
}
fn collect_files(root: &Path, include_all: bool) -> Result<Vec<PathBuf>, String> {
    fn walk(
        root: &Path,
        current: &Path,
        include_all: bool,
        out: &mut Vec<PathBuf>,
    ) -> Result<(), String> {
        for e in
            fs::read_dir(current).map_err(|e| format!("cannot read {}: {e}", current.display()))?
        {
            let e = e.map_err(|e| e.to_string())?;
            let p = e.path();
            let ty = e.file_type().map_err(|e| e.to_string())?;
            if ty.is_dir() {
                walk(root, &p, include_all, out)?;
            } else if ty.is_file() {
                let r = p
                    .strip_prefix(root)
                    .map_err(|e| e.to_string())?
                    .to_path_buf();
                if include_all || kind_for(&r) != "other" {
                    out.push(r);
                }
            }
        }
        Ok(())
    }
    let mut out = vec![];
    walk(root, root, include_all, &mut out)?;
    out.sort();
    Ok(out)
}
fn ext(path: &Path) -> String {
    path.extension()
        .and_then(|e| e.to_str())
        .unwrap_or("")
        .to_ascii_lowercase()
}
fn kind_for(path: &Path) -> &'static str {
    match ext(path).as_str() {
        "jpg" | "jpeg" | "heic" | "heif" | "png" | "dng" | "cr2" | "nef" | "arw" => "image",
        "mov" | "mp4" | "m4v" => "video",
        "xmp" | "aae" | "thm" | "lrv" => "sidecar",
        _ => "other",
    }
}
fn is_sidecar(path: &Path) -> bool {
    kind_for(path) == "sidecar"
}

fn prove(path: &Path) -> Result<FileProof, String> {
    let mut f = File::open(path).map_err(|e| e.to_string())?;
    let mut hasher = Sha256::new();
    let mut bytes = 0u64;
    let mut buf = [0u8; 128 * 1024];
    loop {
        let n = f.read(&mut buf).map_err(|e| e.to_string())?;
        if n == 0 {
            break;
        }
        bytes += n as u64;
        hasher.update(&buf[..n]);
    }
    let mut data = Vec::new();
    if matches!(kind_for(path), "image" | "video") {
        let sample = File::open(path).map_err(|e| e.to_string())?;
        sample
            .take(2 * 1024 * 1024)
            .read_to_end(&mut data)
            .map_err(|e| e.to_string())?;
    }
    Ok(FileProof {
        bytes,
        sha256: format!("{:x}", hasher.finalize()),
        media: inspect(&data, &ext(path)),
    })
}
fn inspect(data: &[u8], extension: &str) -> Option<MediaInfo> {
    if extension == "jpg" || extension == "jpeg" {
        jpeg_info(data)
    } else if matches!(extension, "mov" | "mp4" | "m4v" | "heic" | "heif") {
        isobmff_info(data)
    } else {
        None
    }
}
fn metadata_notes(source: Option<&MediaInfo>, archive: Option<&MediaInfo>) -> Vec<String> {
    let mut notes = vec![];
    match (source, archive) {
        (Some(a), Some(b)) => {
            for (label, x, y) in [
                ("format", Some(&a.format), Some(&b.format)),
                ("codec", a.codec.as_ref(), b.codec.as_ref()),
                ("frame rate", a.fps.as_ref(), b.fps.as_ref()),
                ("EXIF block", a.exif_sha256.as_ref(), b.exif_sha256.as_ref()),
                (
                    "capture time",
                    a.captured_at.as_ref(),
                    b.captured_at.as_ref(),
                ),
            ] {
                if x != y {
                    notes.push(format!("{label} differs: source {:?}, archive {:?}.", x, y));
                }
            }
            if a.width != b.width || a.height != b.height {
                notes.push(format!(
                    "dimensions differ: source {:?}×{:?}, archive {:?}×{:?}.",
                    a.width, a.height, b.width, b.height
                ));
            }
        }
        (Some(_), None) => notes.push("Archive media metadata could not be identified.".to_owned()),
        (None, Some(_)) => notes.push("Source media metadata could not be identified.".to_owned()),
        _ => {}
    };
    notes
}

fn jpeg_info(data: &[u8]) -> Option<MediaInfo> {
    if data.len() < 4 || data[..2] != [0xff, 0xd8] {
        return None;
    }
    let mut i = 2;
    let mut width = None;
    let mut height = None;
    let mut exif = None;
    let mut orientation = None;
    let mut captured = None;
    let mut camera = None;
    while i + 4 <= data.len() && data[i] == 0xff {
        let marker = data[i + 1];
        i += 2;
        if marker == 0xd9 || marker == 0xda {
            break;
        }
        let len = u16::from_be_bytes([data[i], data[i + 1]]) as usize;
        if len < 2 || i + len > data.len() {
            break;
        }
        let p = &data[i + 2..i + len];
        if marker == 0xe1 && p.starts_with(b"Exif\0\0") {
            exif = Some(format!("{:x}", Sha256::digest(p)));
            let x = parse_tiff(&p[6..]);
            orientation = x.0;
            captured = x.1;
            camera = x.2;
        }
        if matches!(
            marker,
            0xc0 | 0xc1
                | 0xc2
                | 0xc3
                | 0xc5
                | 0xc6
                | 0xc7
                | 0xc9
                | 0xca
                | 0xcb
                | 0xcd
                | 0xce
                | 0xcf
        ) && p.len() >= 5
        {
            height = Some(u16::from_be_bytes([p[1], p[2]]) as u32);
            width = Some(u16::from_be_bytes([p[3], p[4]]) as u32);
        }
        i += len;
    }
    Some(MediaInfo {
        format: "jpeg".to_owned(),
        width,
        height,
        codec: None,
        fps: None,
        exif_sha256: exif,
        orientation,
        captured_at: captured,
        camera,
    })
}
fn tiff_u16(d: &[u8], o: usize, le: bool) -> Option<u16> {
    d.get(o..o + 2).map(|v| {
        if le {
            u16::from_le_bytes([v[0], v[1]])
        } else {
            u16::from_be_bytes([v[0], v[1]])
        }
    })
}
fn tiff_u32(d: &[u8], o: usize, le: bool) -> Option<u32> {
    d.get(o..o + 4).map(|v| {
        if le {
            u32::from_le_bytes([v[0], v[1], v[2], v[3]])
        } else {
            u32::from_be_bytes([v[0], v[1], v[2], v[3]])
        }
    })
}
#[derive(Default)]
struct TiffFields {
    orientation: Option<u16>,
    date: Option<String>,
    make: Option<String>,
    model: Option<String>,
}

fn scan_tiff_ifd(
    d: &[u8],
    off: usize,
    le: bool,
    main: bool,
    fields: &mut TiffFields,
) -> Option<usize> {
    let n = tiff_u16(d, off, le)? as usize;
    let mut exif = None;
    for j in 0..n {
        let x = off + 2 + j * 12;
        let (tag, typ, count) = (
            tiff_u16(d, x, le)?,
            tiff_u16(d, x + 2, le)?,
            tiff_u32(d, x + 4, le)?,
        );
        let size = match typ {
            2 => 1,
            3 => 2,
            4 => 4,
            _ => 1,
        } * count as usize;
        let pos = if size <= 4 {
            x + 8
        } else {
            tiff_u32(d, x + 8, le)? as usize
        };
        if tag == 0x0112 && typ == 3 {
            fields.orientation = tiff_u16(d, pos, le)
        }
        if tag == 0x8769 && main {
            exif = tiff_u32(d, x + 8, le).map(|x| x as usize)
        }
        if matches!(tag, 0x010f | 0x0110 | 0x9003) && pos.saturating_add(size) <= d.len() {
            let s = String::from_utf8_lossy(&d[pos..pos + size])
                .trim_matches('\0')
                .trim()
                .to_owned();
            if !s.is_empty() {
                match tag {
                    0x010f => fields.make = Some(s),
                    0x0110 => fields.model = Some(s),
                    _ => fields.date = Some(s),
                }
            }
        }
    }
    exif
}
fn parse_tiff(d: &[u8]) -> (Option<u16>, Option<String>, Option<String>) {
    if d.len() < 8 {
        return (None, None, None);
    }
    let le = &d[..2] == b"II";
    let mut fields = TiffFields::default();
    if let Some(first) = tiff_u32(d, 4, le) {
        if let Some(exif) = scan_tiff_ifd(d, first as usize, le, true, &mut fields) {
            let _ = scan_tiff_ifd(d, exif, le, false, &mut fields);
        }
    }
    (
        fields.orientation,
        fields.date,
        match (fields.make, fields.model) {
            (Some(a), Some(b)) => Some(format!("{a} {b}")),
            (Some(a), None) => Some(a),
            (None, Some(b)) => Some(b),
            _ => None,
        },
    )
}

fn isobmff_info(data: &[u8]) -> Option<MediaInfo> {
    if data.len() < 12 || &data[4..8] != b"ftyp" {
        return None;
    }
    let brand = String::from_utf8_lossy(&data[8..12]).to_string();
    let codecs = [
        b"avc1".as_slice(),
        b"hvc1".as_slice(),
        b"hev1".as_slice(),
        b"vp09".as_slice(),
        b"av01".as_slice(),
    ];
    let codec = codecs.iter().find_map(|c| {
        data.windows(4)
            .position(|w| w == *c)
            .map(|_| String::from_utf8_lossy(c).to_string())
    });
    // A common MP4 timing pattern: mdhd timescale followed later by stts sample delta.
    let mdhd = find_box(data, b"mdhd");
    let stts = find_box(data, b"stts");
    let fps = match (mdhd, stts) {
        (Some(m), Some(s)) if m.len() >= 16 && s.len() >= 16 => {
            let version = m[0];
            let timescale = if version == 1 && m.len() >= 28 {
                u32::from_be_bytes([m[20], m[21], m[22], m[23]])
            } else {
                u32::from_be_bytes([m[12], m[13], m[14], m[15]])
            };
            let delta = u32::from_be_bytes([s[12], s[13], s[14], s[15]]);
            if timescale > 0 && delta > 0 {
                Some(format_fps(timescale as f64 / delta as f64))
            } else {
                None
            }
        }
        _ => None,
    };
    Some(MediaInfo {
        format: format!("isobmff/{brand}"),
        width: None,
        height: None,
        codec,
        fps,
        exif_sha256: None,
        orientation: None,
        captured_at: None,
        camera: None,
    })
}
fn find_box<'a>(data: &'a [u8], name: &[u8; 4]) -> Option<&'a [u8]> {
    data.windows(4).position(|w| w == name).and_then(|i| {
        if i < 4 {
            return None;
        };
        let n = u32::from_be_bytes(data[i - 4..i].try_into().ok()?) as usize;
        if n < 8 || i - 4 + n > data.len() {
            None
        } else {
            Some(&data[i + 4..i - 4 + n])
        }
    })
}
fn format_fps(f: f64) -> String {
    if (f - f.round()).abs() < 0.01 {
        format!("{:.0}", f)
    } else {
        format!("{:.3}", f)
    }
}

fn pair_live_photos(names: &BTreeSet<PathBuf>, assets: &[Asset]) -> Vec<LivePair> {
    let status: BTreeMap<_, _> = assets
        .iter()
        .map(|a| (a.relative_path.clone(), a.status))
        .collect();
    let mut pairs = vec![];
    for still in names {
        if !matches!(ext(still).as_str(), "heic" | "heif" | "jpg" | "jpeg") {
            continue;
        };
        if let Some(motion) = names.iter().find(|candidate| {
            candidate.parent() == still.parent()
                && candidate
                    .file_stem()
                    .zip(still.file_stem())
                    .is_some_and(|(a, b)| {
                        a.to_string_lossy()
                            .eq_ignore_ascii_case(&b.to_string_lossy())
                    })
                && matches!(ext(candidate).as_str(), "mov" | "mp4")
        }) {
            let a = status.get(&slash(still));
            let b = status.get(&slash(motion));
            let ok = matches!((a, b), (Some(Status::Identical), Some(Status::Identical)));
            pairs.push(LivePair {
                still: slash(still),
                motion: slash(motion),
                status: if ok {
                    "both byte-identical".to_owned()
                } else {
                    "pair needs attention".to_owned()
                },
            });
        }
    }
    pairs
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;
    #[test]
    fn audit_documented_example_detects_changed_and_missing() {
        let d = tempdir().unwrap();
        let s = d.path().join("source");
        let a = d.path().join("archive");
        fs::create_dir_all(&s).unwrap();
        fs::create_dir_all(&a).unwrap();
        fs::write(s.join("ok.jpg"), b"one").unwrap();
        fs::write(a.join("ok.jpg"), b"one").unwrap();
        fs::write(s.join("changed.mov"), b"source").unwrap();
        fs::write(a.join("changed.mov"), b"archive").unwrap();
        fs::write(s.join("lost.xmp"), b"meta").unwrap();
        let out = d.path().join("manifest.json");
        assert!(run_audit(AuditArgs {
            source: s,
            archive: a,
            output: out.clone(),
            json: true,
            include_all: false
        })
        .unwrap());
        let m: serde_json::Value = serde_json::from_slice(&fs::read(out).unwrap()).unwrap();
        assert_eq!(m["summary"]["matched"], 1);
        assert_eq!(m["summary"]["changed"], 1);
        assert_eq!(m["summary"]["missing"], 1);
    }
    #[test]
    fn jpeg_dimensions_are_observed() {
        let bytes = [
            0xff, 0xd8, 0xff, 0xc0, 0, 11, 8, 0, 2, 0, 3, 3, 1, 1, 0xff, 0xd9,
        ];
        let m = jpeg_info(&bytes).unwrap();
        assert_eq!((m.width, m.height), (Some(3), Some(2)));
    }
    #[test]
    fn metadata_difference_mentions_codec() {
        let a = MediaInfo {
            format: "isobmff".into(),
            width: None,
            height: None,
            codec: Some("hvc1".into()),
            fps: Some("240".into()),
            exif_sha256: None,
            orientation: None,
            captured_at: None,
            camera: None,
        };
        let mut b = a.clone();
        b.codec = Some("avc1".into());
        b.fps = Some("30".into());
        let n = metadata_notes(Some(&a), Some(&b)).join(" ");
        assert!(n.contains("codec") && n.contains("frame rate"));
    }

    #[test]
    fn output_cannot_replace_or_enter_either_media_tree() {
        let d = tempdir().unwrap();
        let source = d.path().join("source");
        let archive = d.path().join("archive");
        fs::create_dir_all(&source).unwrap();
        fs::create_dir_all(&archive).unwrap();
        fs::write(source.join("photo.jpg"), b"original source").unwrap();
        fs::write(archive.join("photo.jpg"), b"original archive").unwrap();

        for output in [source.join("new.json"), archive.join("photo.jpg")] {
            let result = run_audit(AuditArgs {
                source: source.clone(),
                archive: archive.clone(),
                output,
                json: false,
                include_all: false,
            });
            assert!(result.is_err());
        }
        assert_eq!(
            fs::read(source.join("photo.jpg")).unwrap(),
            b"original source"
        );
        assert_eq!(
            fs::read(archive.join("photo.jpg")).unwrap(),
            b"original archive"
        );
    }

    #[test]
    fn audit_refuses_to_replace_an_existing_manifest() {
        let d = tempdir().unwrap();
        let source = d.path().join("source");
        let archive = d.path().join("archive");
        fs::create_dir_all(&source).unwrap();
        fs::create_dir_all(&archive).unwrap();
        let output = d.path().join("manifest.json");
        fs::write(&output, b"keep this").unwrap();
        let result = run_audit(AuditArgs {
            source,
            archive,
            output: output.clone(),
            json: false,
            include_all: false,
        });
        assert!(result.unwrap_err().contains("already exists"));
        assert_eq!(fs::read(output).unwrap(), b"keep this");
    }

    #[test]
    fn relative_output_resolves_from_the_current_directory() {
        let d = tempdir().unwrap();
        let source = d.path().join("source");
        let archive = d.path().join("archive");
        fs::create_dir_all(&source).unwrap();
        fs::create_dir_all(&archive).unwrap();
        let output = Path::new("unused-relative-manifest.json");
        assert!(validate_output(output, &source, &archive)
            .unwrap()
            .ends_with(output));
    }

    #[test]
    fn uppercase_live_photo_motion_is_paired() {
        let d = tempdir().unwrap();
        let source = d.path().join("source");
        let archive = d.path().join("archive");
        fs::create_dir_all(&source).unwrap();
        fs::create_dir_all(&archive).unwrap();
        for name in ["LIVE.HEIC", "LIVE.MOV"] {
            fs::write(source.join(name), name.as_bytes()).unwrap();
            fs::write(archive.join(name), name.as_bytes()).unwrap();
        }
        let output = d.path().join("manifest.json");
        assert!(!run_audit(AuditArgs {
            source,
            archive,
            output: output.clone(),
            json: false,
            include_all: false,
        })
        .unwrap());
        let manifest: serde_json::Value =
            serde_json::from_slice(&fs::read(output).unwrap()).unwrap();
        assert_eq!(manifest["summary"]["live_photo_pairs"], 1);
        assert_eq!(manifest["live_photo_pairs"][0]["motion"], "LIVE.MOV");
    }

    #[test]
    fn real_jpeg_fixture_reports_exif_fields() {
        let mut tiff = vec![b'I', b'I', 42, 0, 8, 0, 0, 0, 4, 0];
        tiff.extend_from_slice(&[0x12, 0x01, 3, 0, 1, 0, 0, 0, 6, 0, 0, 0]);
        tiff.extend_from_slice(&[0x0f, 0x01, 2, 0, 6, 0, 0, 0, 62, 0, 0, 0]);
        tiff.extend_from_slice(&[0x10, 0x01, 2, 0, 5, 0, 0, 0, 68, 0, 0, 0]);
        tiff.extend_from_slice(&[0x69, 0x87, 4, 0, 1, 0, 0, 0, 73, 0, 0, 0]);
        tiff.extend_from_slice(&[0, 0, 0, 0]);
        tiff.extend_from_slice(b"Nikon\0Z fc\0");
        tiff.extend_from_slice(&[1, 0, 3, 0x90, 2, 0, 20, 0, 0, 0, 91, 0, 0, 0]);
        tiff.extend_from_slice(&[0, 0, 0, 0]);
        tiff.extend_from_slice(b"2025:08:28 10:11:12\0");
        let mut payload = b"Exif\0\0".to_vec();
        payload.extend_from_slice(&tiff);
        let segment_len = (payload.len() + 2) as u16;
        let mut jpeg = vec![0xff, 0xd8, 0xff, 0xe1];
        jpeg.extend_from_slice(&segment_len.to_be_bytes());
        jpeg.extend_from_slice(&payload);
        jpeg.extend_from_slice(&[0xff, 0xc0, 0, 11, 8, 0, 2, 0, 3, 3, 1, 1, 0]);
        jpeg.extend_from_slice(&[0xff, 0xd9]);

        let info = jpeg_info(&jpeg).unwrap();
        assert_eq!(info.orientation, Some(6));
        assert_eq!(info.camera.as_deref(), Some("Nikon Z fc"));
        assert_eq!(info.captured_at.as_deref(), Some("2025:08:28 10:11:12"));
        assert_eq!((info.width, info.height), (Some(3), Some(2)));
        assert!(info.exif_sha256.is_some());
    }

    #[test]
    fn real_mov_fixture_reports_codec_and_frame_rate() {
        fn media_box(name: &[u8; 4], body: &[u8]) -> Vec<u8> {
            let mut value = ((body.len() + 8) as u32).to_be_bytes().to_vec();
            value.extend_from_slice(name);
            value.extend_from_slice(body);
            value
        }
        let mut fixture = media_box(b"ftyp", b"qt  \0\0\0\0");
        let mut mdhd = [0_u8; 16];
        mdhd[12..16].copy_from_slice(&24_000_u32.to_be_bytes());
        fixture.extend_from_slice(&media_box(b"mdhd", &mdhd));
        let mut stts = [0_u8; 16];
        stts[12..16].copy_from_slice(&100_u32.to_be_bytes());
        fixture.extend_from_slice(&media_box(b"stts", &stts));
        fixture.extend_from_slice(&media_box(b"free", b"hvc1"));

        let info = inspect(&fixture, "mov").unwrap();
        assert_eq!(info.format, "isobmff/qt  ");
        assert_eq!(info.codec.as_deref(), Some("hvc1"));
        assert_eq!(info.fps.as_deref(), Some("240"));
    }
}
