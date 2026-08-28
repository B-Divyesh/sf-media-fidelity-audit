# Polish round 3 handoff — Media Fidelity Audit

## Result

Repair commit `13224bad22a1f8a6449360128746ab734d31f9d8` closes every finding in
`.factory/review-1.md`, `.factory/review-2.md`, and `.factory/review-3.md`.
The Rust/clap CLI remains the primary artifact. The companion Vite static site
keeps the paper-cut archive identity.

The landing page now includes a self-hosted SVG terminal recording generated
from a real `mfa demo` run during every site build. Its browser claim test loads
the visible SVG and compares its command and normalized output with a fresh CLI
run. The one-click `?demo=1` path remains isolated, with its persistent banner,
reset action, and separate no-write CLI-demo isolation claim. The two vague
landing labels now name the JSON audit report and the audit limits.

## Verification

Fresh clone: `/tmp/mfa-polish3-clean-oD8js0` at `13224ba`.

* `npm ci` completed with zero vulnerabilities.
* All 18 exact commands in `.factory/claims.json` passed. This includes
  `cli-demo-recording` and `cli-demo-isolation`, plus all earlier 16 claims.
* `npm test` passed: 9 Rust tests; 16 CLI/supporting tests; 6 site-policy
  tests; copy audit; and 7 Playwright browser/Axe tests.
* `npm run check` passed: Rust formatting, Clippy with warnings denied, and
  TypeScript.
* `npm run build` produced `dist/site/`; `cargo package` passed (17 files,
  112.3 KiB unpacked and 60.5 KiB compressed).
* Production assets: JavaScript 12.19 kB (4.49 kB gzip), CSS 8.99 kB
  (2.93 kB gzip), and original hero WebP 101.15 kB.
* `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`
  passed. It covers `/`, `?demo=1`, `/demo`, `/privacy`, `/terms`, `/404`,
  and an unknown 404 at desktop, 390px light, and 390px dark. Axe reported
  zero serious or critical violations.
* Factory `verify-url.sh` passed for `/`, `?demo=1`, `/demo`, `/privacy`, and
  `/terms`: the expected route titles, `lang`, one `h1`, one main landmark,
  image alternatives, button names, and no console errors.
* Live metadata/link audit confirmed route-specific raw titles and canonicals
  for `/demo`, `/privacy`, and `/terms`; every home same-origin link returned
  200; `/not-a-real-route` returned the common-shell 404 with HTTP 404.
* Lighthouse 12.6 mobile against the live URL: Performance 100,
  Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.5 s,
  TBT 60 ms, CLS 0.

Live evidence is committed in `.factory/evidence/polish-3/`, including cold
desktop/mobile screenshots, route verifier reports, a 404 capture, and the
Lighthouse JSON report.

## Deployment

Pushed `13224ba` to `main`. Deployed `dist/site/` via
`/opt/fleet/lib/deploy-static.sh` for work order
`media-fidelity-audit-polish-3`. Azure Static Web Apps deployment
`8629c7eb-dba0-4bed-b5d7-fc3d9d49f55a` succeeded. The live URL is
<https://media-fidelity-audit.sociobot.in>.

## Run locally

```sh
npm ci
npm test
npm run check
npm run build
cargo package
```

Run `cargo run -- demo` for the isolated CLI sample or open
<https://media-fidelity-audit.sociobot.in/?demo=1> for the isolated web sample.

## Known gaps and next steps

None for the reviewed product scope. Registry publication remains a factory
release step; do not publish from this repository.
