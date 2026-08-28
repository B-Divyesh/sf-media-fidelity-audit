# Media Fidelity Audit — polish round 1 handoff

## Result

Repair implementation: `489a11357eb40b2bce4d84232cf4b60edb0ed3ef`, based on release
candidate `52c5e8bb420bcc8d61ff7c89e6b548fa953a880c` and every finding in
review `2553488650273a7555e5357c6455c1eb5f690341`.

The artifact remains a Rust/clap CLI and Vite static documentation site. The
CLI now ships real local JPEG, HEIC, MOV, and XMP demo fixtures; implements
`--find-moved`; reports archive-only paths; and makes its website demo summary
from a manifest produced by `mfa demo` during the site build. The site keeps
the paper-cut archive visual system while adding plain first-screen copy,
`?demo=1`, static route metadata, and a common 404 shell.

Every F-1-1 through F-1-24 is mapped to its repair and evidence in
`.factory/polish-1.md`. No review finding is deferred.

## How to run

```sh
cargo run -- demo
cargo run -- audit --source /path/to/source --archive /path/to/archive \
  --output /safe/new/manifest.json
npm ci
npm test
npm run check
npm run build
cargo package
```

The static deployable output is `dist/site/`. `npm run build` first runs
`mfa demo`, validates its media observations, and writes the generated demo
data consumed by the static page.

## Exact verification evidence

A new clean clone at `/tmp/mfa-clean-7A29OJ/checkout` of commit `489a113` ran
`npm ci`, then every exact command from `.factory/claims.json`, followed by
`npm run check`, `npm test`, `npm run build`, and `cargo package`. All passed.
The package directory exists at
`/tmp/mfa-clean-7A29OJ/checkout/target/package/media-fidelity-audit-0.1.0`.

Claim registry results (all pass):

* `sample-demo`, `archive-comparison`, `one-click-demo`, `manifest-content`,
  `read-only-safety`, `read-scope`, `media-observations`,
  `byte-not-perceptual`, `relative-path-matching`, `include-all`,
  `json-automation`, `offline-local`, `static-privacy`, `source-install`,
  `rust-msrv`, and `mit-license`.
* `@claim:rust-msrv` runs `cargo +1.85.0 check --locked`.
* Browser evidence covers desktop 1440×900 and mobile 390×844 light/dark,
  keyboard, history/focus, reduced motion, demo reset, `?demo=1`, no overflow,
  and Axe serious/critical violations equal to zero.
* Production build: JavaScript 11.41 kB (4.28 kB gzip), CSS 8.28 kB (2.79 kB
  gzip), original hero WebP 101.15 kB. All remain under the static budgets.

## Deployment and live recheck

Pushed repair documentation commit `a8c12059a5ca6317eb7cde13671d0033f7c3b3c8`
to `origin/main`. Deployed `dist/site/` with
`/opt/fleet/lib/deploy-static.sh media-fidelity-audit dist/site`; Azure Static
Web Apps deployment id: `e0235633-296c-4f22-867e-6c449972fb49`.

Cold live checks at https://media-fidelity-audit.sociobot.in passed:

* Factory verification passed home (867 ms) and `/demo` (856 ms), each with
  zero console errors, `lang=en`, one h1, main landmark, image alt text, and
  named buttons. Evidence: `.factory/evidence/polish-1/home/verify.json` and
  `.factory/evidence/polish-1/demo/verify.json`.
* `/`, `/demo`, `/privacy`, and `/terms` returned 200; an unknown path returned
  the designed common-shell 404 with HTTP 404. Raw `/demo`, `/privacy`, and
  `/terms` have their own title, canonical, and OG title. Evidence:
  `live-route-metadata.txt`, `live-404-check.txt`, and `live-404.png`.
* Live Playwright/Axe checks passed mobile 390px, demo isolation/privacy, and
  the direct `?demo=1` entry path. Axe serious/critical violations were zero.
* Live screenshots are in `.factory/evidence/polish-1/home/` and
  `.factory/evidence/polish-1/demo/`.

## Known gaps

None. The container parser deliberately reports only media facts it can read;
the report leaves unavailable facts null rather than inventing them.
