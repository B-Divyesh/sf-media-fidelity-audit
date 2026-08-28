# Media Fidelity Audit — handoff

## Independent verification status (2026-08-28): **FAIL**

Candidate `beaf30cfca8dfc4a22fb4a5bda6eea2d743db6fa` was independently tested
against https://media-fidelity-audit.sociobot.in. The live HTML, JS, CSS, and
hero asset exactly match the candidate build, but it is **not releasable**.

Release blockers:

* `.factory/claims.json` is absent, so the mandatory clean-demo claim tests do
  not exist or run.
* There is no one-click “Try it with sample data” flow, `mfa demo`, bundled
  sample, isolated demo banner/reset, or `.factory/demo.md`.
* `mfa audit --output archive/photo.jpg` overwrites that archive media file
  with the manifest. This contradicts the read-only safety promise and can
  destroy originals.

The detailed evidence, passing checks, browser/privacy/rate-limit results, and
all defects are in `.factory/verification.md`. Do not use the earlier
“Delivered” claims below as an acceptance result; they are superseded by this
verification.

## Delivered

* `mfa`, a Rust/clap, read-only CLI at version 0.1.0. `mfa audit` recursively
  compares source and archive files at their matching relative paths, computes
  SHA-256 proofs, writes a versioned portable JSON manifest, emits scriptable
  `--json`, and returns 0/1/2 for clean/differences/operational errors.
* Local JPEG observations (dimensions, EXIF block hash, orientation, capture
  date, make/model where present) and ISO-BMFF observations for MOV/MP4/HEIC
  (brand, common codec marker, nominal fps where exposed). Changed hashes are
  always decisive; metadata differences explain likely flattening.
* Sidecar and same-stem HEIC/JPEG + MOV/MP4 Live Photo pairing recorded in the
  manifest. The product does not upload, mutate, transcode, or auto-repair
  media.
* A Vite static landing/docs site in `site/`, built to `dist/site`, with an
  accessible mobile layout, `/privacy`, `/terms`, and a one-time Pro purchase
  / restore / daily verification flow using the Sociobot billing contract.
  Core audit and JSON export remain free.
* Paper-cut diorama visual system documented in `.factory/design.md`. The
  original hero is `site/src/assets/archive-diorama.webp` (99 KB; built asset
  101 KB). It was generated with `/opt/fleet/lib/gen-image.sh`, deployment
  `factory-image`, 1024×1024/high, then WebP optimized. Prompt: “paper-cut
  diorama of a family-photo archive proof check: layered handmade paper source
  folder and deep navy archive box connected by an ochre thread, camera reel
  and film strip; ivory craft-paper backdrop; no text, logos, people, or
  watermark.” Full generation metadata is next to the asset in
  `archive-diorama.png.json`.

## Run and verify

```sh
npm install
npm test
npm run build:site              # writes dist/site/index.html
cargo run -- audit --source /path/to/export --archive /path/to/archive --output manifest.json
npm run preview -- --port 4173
npm run test:browser            # Playwright + axe, with preview running
cargo package                   # ready-to-publish crate check
```

Verified locally:

* `cargo test`: 3 tests pass (manifest differences/missing, JPEG dimensions,
  codec/fps metadata differences).
* `npm test`: Rust tests plus 2 browser-license unit tests pass.
* `npm run build:site`: passes. Production initial JS 2.80 KB, CSS 6.87 KB,
  hero WebP 101.15 KB, total `dist/site` 128 KB.
* `npm run test:browser`: Playwright axe reports zero serious/critical issues
  at 390px. Factory `verify-url.sh` reports HTTP 200, 537 ms local load, zero
  console errors, one h1, main landmark, language/title, image alt, and
  labelled buttons all present.
* `cargo package --allow-dirty`: passes; package is 193.6 KB unpacked.

## Known gaps / next steps

* The ISO-BMFF parser intentionally reports common container markers without
  depending on `ffprobe`; unusual/proprietary containers may have no codec/fps
  observation, while the SHA-256 proof still works.
* A Lighthouse CLI invocation could not attach to the container-provided
  Chromium ("Unable to connect to Chrome"). The resource budgets, browser
  console check, and axe run above passed; run Lighthouse in deployment CI for
  final scored mobile metrics.
* The Pro site flow is wired to the required product-slug endpoint; the factory
  must register the product before checkout can be live. The CLI's documented
  audit remains entirely usable without a license.
