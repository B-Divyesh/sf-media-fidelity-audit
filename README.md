# Media Fidelity Audit

Compare exported photos and videos with a local archive. Media Fidelity Audit
is a command-line tool for families and photographers checking their originals.

It matches files by relative path and records SHA-256 identity in JSON. It also
records available JPEG EXIF, MOV/MP4/HEIC container facts, sidecars, and
same-stem Live Photo pairs. The CLI needs no account or network connection.

## Try the bundled demo

The demo creates a new temporary workspace from the files in `examples/`. It
does not read or write your real media.

```sh
cargo run -- demo
```

The five-file sample reports three identical files, one changed file, one
missing sidecar, and one uppercase HEIC/MOV Live Photo pair. The command prints
the temporary path to its JSON manifest. Delete that workspace when finished.

The website demo is at
[media-fidelity-audit.sociobot.in/demo](https://media-fidelity-audit.sociobot.in/demo).

## Install from source

Requires Rust 1.78 or newer. The crate is not published yet, so install from a
checkout:

```sh
git clone https://github.com/B-Divyesh/sf-media-fidelity-audit.git
cd sf-media-fidelity-audit
cargo install --path .
mfa --help
```

## Audit an archive

Choose a new manifest path outside both input trees. The CLI rejects existing
output files and any output inside the source or archive.

```sh
mfa audit --source /Volumes/CameraExport --archive /Volumes/PhotoArchive \
  --output fidelity-manifest.json
```

Exit `0` means every mapped file is byte-identical. Exit `1` means the audit
found a changed, missing, or unreadable file. Exit `2` means input or output
failed. Add `--json` for a summary on standard output. Add `--include-all` to
include files outside the default media and sidecar extensions.

Hashes prove byte equality. They do not assess visual quality or match renamed
files.

## Develop and verify

```sh
npm ci
npm test
npm run check
npm run build
npm run test:browser
cargo package
```

`npm run build` writes the static site to `dist/site/`. The factory deploys
that directory; this repository does not change infrastructure or DNS.

The public claims and their isolated tests are listed in
[`.factory/claims.json`](.factory/claims.json). Demo details are in
[`.factory/demo.md`](.factory/demo.md).

## Privacy and license

The static site sends no third-party requests and stores no browser data during
the demo. The CLI and site contain no analytics or telemetry.

Media Fidelity Audit is free under the MIT License. See [LICENSE](LICENSE).
