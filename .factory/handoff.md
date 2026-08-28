# Polish round 2 handoff — Media Fidelity Audit

## Result

All findings from `.factory/review-1.md` and `.factory/review-2.md` are closed.
The Rust CLI remains the primary artifact, and the companion documentation and
demo remain a static Vite site with the paper-cut archive identity.

The landing action now opens the isolated `?demo=1` sample in one click. The
sample shows the real build-generated CLI result, keeps a persistent demo
banner, resets without storage, and links to real installation steps. The
remaining report copy now names the actual `SHA-256` field. `/demo` remains a
shareable route with route-specific raw metadata.

`.factory/copy-audit.md` is now generated from the rendered production routes
and README. `npm run test:copy` fails on audit drift, missing required footer or
README sentences, text over 22 words, banned words, or the removed
“exact-match code” phrase. The claims gate also checks that each registered
claim ID appears on exactly one test.

## Verification

Clean clone: `/tmp/mfa-polish2-clean-eATda8` at `d51865b`.

* All 16 exact `test` commands in `.factory/claims.json`: pass.
* `npm test`: pass — 9 Rust tests, 14 CLI/supporting claim tests, 5 site-policy
  tests, the generated copy gate, and 6 Playwright browser/Axe tests.
* `npm run check`: pass — Rust format, Clippy with warnings denied, and
  TypeScript.
* `npm run build`: pass — `dist/site/` produced.
* `cargo package`: pass — 17 files, 112.2 KiB unpacked and 60.5 KiB compressed.
* Production bundle: 11.45 kB JS (4.29 kB gzip), 8.26 kB CSS (2.79 kB gzip),
  and 101.15 kB hero WebP.
* Live `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`:
  pass for desktop light, 390 px light, and 390 px dark across `/`,
  `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404`, and an unknown route.
* Playwright Axe 4.13: zero serious or critical violations on every tested
  route and profile.
* Live privacy: only same-origin requests; no localStorage, sessionStorage,
  IndexedDB, or service worker state after the complete demo/reset flow.
* Live unknown route: HTTP 404 with the designed common shell. Home, demo,
  privacy, and terms return 200 with their own raw titles and canonicals.
* Factory `verify-url.sh`: pass for `/`, `/?demo=1`, and `/demo`; title, `lang`,
  one h1, main landmark, image alternatives, button names, and console are clean.
* Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; FCP 0.9 s, LCP 1.4 s, TBT 10 ms, CLS 0.

Evidence is in `.factory/evidence/polish-2/`. The home and query-demo desktop
and 390 px screenshots were inspected after a cold live load.

## Deployment

Pushed implementation commit `d51865b36a1897e5e78f60a7f72fa0f68bf76733`
to `main`. Deployed `dist/site/` through `/opt/fleet/lib/deploy-static.sh` for
work order `media-fidelity-audit-polish-2`; Azure deployment ID
`ba276f2f-027c-43fb-80d9-022208ade5f6` succeeded. The live URL is
<https://media-fidelity-audit.sociobot.in>.

## Run locally

```sh
npm ci
npm test
npm run check
npm run build
cargo package
```

Regenerate the copy record after visitor-copy changes with
`npm run audit:copy`, then commit the updated `.factory/copy-audit.md`.

## Known gaps and next steps

None for the reviewed scope. Registry publishing remains a factory release
step and was not performed from this repair work order.
