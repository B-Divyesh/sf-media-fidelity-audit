# Media Fidelity Audit

Check a source folder against a local media archive. Media Fidelity Audit is a
command-line tool for families and photographers checking a saved copy before
clearing an export.

It matches files by relative path and writes a JSON audit report. The report
includes SHA-256, byte counts, results, and available camera or video details.
It can also report byte-identical files stored at a different archive path.

## Try the bundled demo

The demo creates a new temporary workspace from the valid media files in
`examples/`. It does not read or write your real media.

```sh
cargo run -- demo
```

The five-file sample reports three identical files, one changed file, one
missing sidecar, and one upper-case HEIC/MOV Live Photo pair. Its JPEG records
camera metadata. Its MOV records codec and frame rate. The command prints the
temporary path to its JSON manifest. Delete that workspace when finished.

The landing page includes a self-hosted recording of the same `mfa demo`
output.

Open the one-click website demo at
[media-fidelity-audit.sociobot.in/?demo=1](https://media-fidelity-audit.sociobot.in/?demo=1).
This page stores nothing; the CLI demo uses a temporary folder.

## Install from the public source checkout

Requires Rust 1.85 or newer.

```sh
git clone https://github.com/B-Divyesh/sf-media-fidelity-audit.git
cd sf-media-fidelity-audit
cargo install --path .
mfa --help
```

## Audit an archive

Choose a new manifest path outside both folders. The CLI rejects output inside
the source folder or archive folder, and it never replaces an existing output.

```sh
mfa audit --source /Volumes/CameraExport --archive /Volumes/PhotoArchive \
  --output fidelity-manifest.json
```

Exit `0` means every source path is byte-identical. Exit `1` means the audit
found a changed, missing, moved, or unreadable source path. Exit `2` means input
or output failed. Add `--json` for a summary on standard output. Add
`--include-all` to include files outside the default media and sidecar
extensions. Add `--find-moved` to locate byte-identical archive files at another
relative path.

Hashes prove byte equality. They do not assess visual quality. Default matching
uses relative paths; use `--find-moved` when an archive may be reorganized.

## Develop and verify

```sh
npm ci
npm test
npm run check
npm run build
cargo package
```

`npm run build` writes the complete production static site to `dist/site/`.
The factory deploys that directory; this repository does not change
infrastructure or DNS.

The public claims and isolated tests are listed in
[`.factory/claims.json`](.factory/claims.json). Demo details are in
[`.factory/demo.md`](.factory/demo.md).

## Privacy and license

The CLI has no account system or network dependency.
The static demo sends no third-party requests and stores no browser data.

Media Fidelity Audit is free under the MIT License. See [LICENSE](LICENSE).
