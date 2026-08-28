# Demo sandbox

## Entry points

* CLI: `mfa demo` or `cargo run -- demo`
* Website: `https://media-fidelity-audit.sociobot.in/?demo=1`

The CLI creates `mfa-demo-<process>-<time>` under the operating system's
temporary directory. It copies only the bundled files from `examples/` into
`sample-source/` and `sample-archive/`, then writes `sample-manifest.json`
beside those folders. It never reads a user-selected directory in demo mode.

The sample represents a small 2025 family archive. Its JPEG has original local
camera metadata; its MOV and HEIC files are valid ISO-BMFF media generated for
this repository; its XMP is a small original edit sidecar:

* `birthday.jpg` is identical.
* `beach-live.HEIC` and `beach-live.MOV` are identical and form one Live Photo.
* `family.jpg` changed in the archive.
* `family.xmp` is missing from the archive.

Each CLI run gets a separate temporary path. The terminal prints that path so
the user can inspect or delete it. The website stores no state; **Reset demo**
re-renders the bundled result, and **View install steps** opens the local
installation directions. The first-screen action opens `?demo=1` directly.
The shareable `/demo` route renders the same isolated sample without reading or
writing browser storage.
