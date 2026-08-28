# Media Fidelity Audit — repair handoff

## Release status

Release-blocking findings from verifier report commit
`63570363d3aa394d1b4b91f7c24ab9ed315f9aa8` against candidate
`beaf30cfca8dfc4a22fb4a5bda6eea2d743db6fa` are repaired. The artifact remains
a Rust/clap single-binary CLI with a Vite static documentation site built to
`dist/site/`.

`.factory/brief.json` was not present in the supplied repository. The existing
`.factory/design.md` remained the visual source of truth.

## Finding-by-finding repair

* **Destructive output path:** output is resolved before any audit reads. It is
  rejected when it exists or falls under either canonical input tree. Creation
  uses `create_new`, preventing a race from replacing another file. Regression
  tests preserve source/archive bytes and cover new in-tree and existing-file
  outputs.
* **Missing claims and demo:** `.factory/claims.json` lists seven retained
  claims, each with one tagged sandbox test. `mfa demo` copies five bundled
  samples into a unique temporary workspace and writes its manifest there.
  `/demo` shows the same finished result with a persistent demo banner, reset,
  and start-for-real actions. Details are in `.factory/demo.md`.
* **Upper-case Live Photos:** pairing now compares still/motion stems and media
  extensions without ASCII case sensitivity. A `LIVE.HEIC` + `LIVE.MOV`
  regression and the bundled sample both prove it.
* **Media observations:** valid JPEG/TIFF EXIF and ISO-BMFF MOV fixtures assert
  orientation, camera, capture time, dimensions, codec, and 240 fps output.
* **Unimplemented paid offer:** the Pro purchase, restore, and license code were
  removed. No paid feature is advertised or sold.
* **Unavailable install:** the site and README now use the working public
  checkout plus `cargo install --path .`; they state that the crate is not yet
  published.
* **Lint:** `clippy::op_ref`, `too_many_arguments`, and follow-on warnings were
  repaired; `npm run check` now runs format, Clippy with `-D warnings`, and
  TypeScript checks.
* **Focus and dark contrast:** focus has a gold inner ring plus dark keyline.
  Axe sweeps cover light desktop, light 390 px, and dark 390 px across all
  routes with no serious or critical findings.
* **Site/deploy policy:** `/privacy`, `/terms`, `/demo`, and designed 404 pages
  share the standard shell. Route titles/canonical metadata update in the SPA.
  The site now includes CSP and other security headers, immutable hashed-asset
  caching, `robots.txt`, `sitemap.xml`, favicon, touch icon, and 1200×630 social
  art.
* **Performance evidence:** the app reserves its pre-render height, removing
  startup layout shift. Mobile Lighthouse now scores 100 in performance,
  accessibility, best practices, and SEO.

## Verification evidence

Clean local run on 2026-08-28:

```sh
npm ci
npm audit --omit=dev
npm run check
npm test
npm run build
cargo package --allow-dirty
```

Results:

* `npm ci`: 24 packages installed; audit reports 0 vulnerabilities.
* `npm run check`: Rust format, all-target Clippy `-D warnings`, and TypeScript
  pass.
* `npm test`: 9 Rust tests, 6 CLI claim tests, 3 site-policy tests, and browser
  tests pass. Browser coverage includes desktop 1440×900, mobile 390×844,
  light/dark contrast, keyboard Enter/Space, skip link, history/focus, reduced
  motion, demo reset, and privacy storage/request interception.
* All seven commands in `.factory/claims.json` select exactly their tagged
  test. The CLI offline test denies `socket` and `connect` syscalls; the site
  test observes only the preview origin and empty local/session/IndexedDB
  storage with zero service workers.
* `npm run build`: JS 9.53 kB (3.61 kB gzip), CSS 8.01 kB (2.73 kB gzip), hero
  WebP 101.15 kB. Lighthouse transferred 108 KiB.
* Mobile Lighthouse: performance 100, accessibility 100, best practices 100,
  SEO 100; LCP 1.7 s; CLS 0.000. INP is unavailable because this short static
  lab trace records no interaction.
* `/opt/fleet/lib/verify-url.sh` on the local production build: HTTP 200, 603
  ms load, zero console errors, title/lang, one H1, main, alt text, and labelled
  buttons pass.
* `cargo package`: 17 files, 48.9 KiB unpacked / 14.7 KiB compressed. A fresh
  temporary Cargo root installed the `.crate`; its `mfa --help` and `mfa demo`
  passed.
* A release binary audited a 10,000-pair synthetic fixture and wrote a
  4,810,239-byte manifest. Container overlay I/O took 10.9 s; no performance
  promise is made from this environment.

Evidence is in `.factory/evidence/local/`: `verify.json`, desktop/mobile
screenshots, and the full `lighthouse.json`.

## Run and deploy

```sh
cargo run -- demo
cargo run -- audit --source /path/to/export --archive /path/to/archive \
  --output /safe/new/manifest.json
npm ci
npm test
npm run check
npm run build
npm run preview -- --port 4173
cargo package
/opt/fleet/lib/deploy-static.sh media-fidelity-audit dist/site
```

## Known boundary

The built-in ISO-BMFF inspection deliberately recognizes common container
markers without `ffprobe`. An unusual or proprietary container can lack codec
or frame-rate observations, while SHA-256 remains decisive. Files renamed or
rearranged between trees still require a staging layout with matching paths.
