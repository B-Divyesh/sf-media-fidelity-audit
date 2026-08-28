# Media Fidelity Audit

Media Fidelity Audit (`mfa`) is a local, read-only command-line verifier for
families and photographers who need evidence that the media in an archive is
the original media they exported. It compares a source tree with an archive by
relative path, records SHA-256 identity, checks common image/video properties,
flags missing files, notices sidecars, and identifies Apple-style Live Photo
pairs. Nothing is uploaded or changed.

## Install

Requires Rust 1.78 or newer. The published binary will be named `mfa`; from a
checkout:

```sh
cargo install --path .
mfa --help
```

## Audit an archive

```sh
mfa audit --source /Volumes/CameraExport --archive /Volumes/PhotoArchive \
  --output fidelity-manifest.json
```

The command prints a compact summary and writes a portable JSON manifest. Exit
code `0` means every source file has a byte-identical archive counterpart;
`1` means differences were found; `2` means usage, access, or output errors.
For automation, use `--json` to print the summary as JSON.

```sh
mfa audit --source fixtures/source --archive fixtures/archive --json \
  --output manifest.json
```

Use `--include-all` when you also want non-media files in the manifest. By
default media, XMP/AAE sidecars, and common camera companion files are checked.

## What it checks

* SHA-256 and byte length for every mapped file (the primary proof).
* JPEG dimensions plus EXIF block identity, orientation, capture timestamp,
  and camera make/model when present.
* MP4/MOV/HEIC container brand, detected video codec and nominal frame rate
  when the container exposes them.
* `.xmp`, `.aae`, and related sidecars; same-stem HEIC/JPEG + MOV Live Photo
  pairs.

Hashes prove that bytes are the same. They **do not** assess visual quality,
lens focus, colour appearance, or whether a camera made a good photograph. A
different filename also cannot be automatically matched: preserve relative
paths or create a staging export with the source layout.

## Site development

The static product site documents the tool and the optional one-time Pro
license flow.

```sh
npm install
npm test
npm run build:site
# static output: dist/site/index.html
```

`npm pack` prepares the site package; `cargo package` checks the CLI crate.
No telemetry, accounts, media uploads, or runtime third-party scripts are used.

## License

MIT. See [LICENSE](LICENSE).
