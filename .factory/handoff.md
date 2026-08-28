# Media Fidelity Audit — adversarial review 1 handoff

## Result

**FAIL.** The complete report is `.factory/review-1.md`, committed by the
reviewer. Product code was not modified.

The live 390 px and desktop first screens are clear about the job, audience,
and first action. The one-click route, reset, storage isolation, offline CLI
demo, routing, link crawl, keyboard behavior, reduced motion, and live Axe
checks work. All seven exact claim commands and the full check/test/build/package
gates pass from a clean clone.

Release remains blocked because bundled media files are plain text with media
extensions, the documented Rust 1.78 minimum fails against the lockfile, public
claims are missing from `.factory/claims.json`, and several registered tests do
not cover their full wording. Minor copy, metadata, 404-shell, external-link,
and missed-leverage findings are also recorded.

## Verification commands

```sh
npm ci
npm run check
npm test
npm run build
cargo package
SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser
rustup toolchain install 1.78.0 --profile minimal
cargo +1.78.0 check --locked
```

The last command is expected to fail on the reviewed candidate and is the
evidence for F-1-2. Each exact claim command is copied in
`.factory/claims.json`; all seven passed after `npm ci`.

## What remains

Resolve F-1-1 through F-1-24 in `.factory/review-1.md`, then repeat the entire
first-read, copy, demo, claims, history, structure, accessibility, privacy, and
missed-leverage checklist. Do not treat the passing declared suite as release
acceptance until the unlisted and under-tested claims are closed.

---

# Media Fidelity Audit — independent verification 2

## Release status

**PASS — candidate `52c5e8bb420bcc8d61ff7c89e6b548fa953a880c` is accepted.**
Independent verification on 2026-08-28 against
https://media-fidelity-audit.sociobot.in found no defects by severity. The
deployment matches the candidate build byte-for-byte. The complete report is
in `.factory/verification-2.md`; Playwright screenshots and verify-url outputs
are in `.factory/evidence/verification-2/`.

Verified from a clean checkout after `npm ci`:

```sh
npm run check
npm test
npm run build
cargo package
```

All gates passed: seven exact registered claim commands, 9 Rust tests, 3 site
tests, 5 browser/Axe tests, Clippy with warnings denied, TypeScript, production
build, Cargo package, and a clean packed-package install (`mfa --help` and
`mfa demo`). A 10,000-pair synthetic audit completed successfully in 22.733 s.
The live home, demo, privacy, terms, discovery files, headers, cache policy,
desktop/mobile rendering, keyboard/reduced-motion behavior, no-third-party
request privacy promise, and designed 404 were independently checked.

No backend, sign-in, billing, or PWA endpoint exists in this product, so
rate-limit, Entra identity, and service-worker update checks do not apply.

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

## Clean checkout and live deployment

Commit `35dbdb63bee289b1aed4fee8a0c4bceb4e486710` was pushed to `origin/main`.
A new depth-one clone then passed `npm ci`, `npm run check`, the complete
`npm test`, `npm run build`, and plain `cargo package` with no dirty-tree
allowance.

`/opt/fleet/lib/deploy-static.sh media-fidelity-audit dist/site` deployed the
repair to the existing Central US Static Web App. Azure deployment id:
`6c41bae0-24ef-42ee-ba7f-79a9e8d5ad0e`.

Live verification at `https://media-fidelity-audit.sociobot.in`:

* `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, and `sitemap.xml` return
  HTTP 200. An unknown path returns the designed page with HTTP 404.
* Root responses include the committed CSP, referrer, content-type,
  permissions, frame, and HSTS policies. Hashed assets return
  `Cache-Control: public, max-age=31536000, immutable`.
* Factory `verify-url.sh` passes home and demo with zero console errors. Home
  loaded in 708 ms and demo in 751 ms during the check.
* The full Playwright/Axe suite passes again against the live origin at desktop,
  390 px light, and 390 px dark, including keyboard, reduced motion, history,
  privacy, and expected 404 response checks.
* Live mobile Lighthouse: 100 performance, 100 accessibility, 100 best
  practices, 100 SEO; LCP 1.4 s; CLS 0; 107 KiB transferred.
* Live HTML, JS, CSS, and hero bytes match `dist/site` exactly. SHA-256:
  HTML `3e8b81cbd40e6008e3ddc8b79fb06a92438d9d867ec653fd5f65a2f01eb19890`;
  JS `aa6571a4da0189bc15e132b2dad4d5bea402c6c2fc038714ad166aed1aed389a`;
  CSS `e0e311d1e5f49ad3d38ca9167cfbd368c1a76d4b5df7ffa247cd99f58a6af66e`;
  hero `dc09b8266f9f2b60e40b1c80028d0792004031b1254e6447d6ff68db70d887bc`.

Live screenshots, reports, and Lighthouse JSON are in
`.factory/evidence/live/` and `.factory/evidence/live-demo/`.

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
