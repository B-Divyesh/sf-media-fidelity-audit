# Polish round 4 handoff — Media Fidelity Audit

## Result

Perfection-loop round 4 is complete. Implementation commit
`e006e804a3f406510901750cd302e617cae56a6b` closes both Review 4 findings and
revalidates every finding from Reviews 1–3. No finding or known product gap is
deferred.

The Rust/clap CLI remains the primary artifact. The Vite companion site remains
a static deployment with its paper-cut archive visual system.

## Changes

- Shared wordmark and footer links now have 44×44 px minimum hit areas in the
  app shell and deployed static 404 shell.
- Both 404 render paths now use the literal label “404 error.” The copy audit
  fails if “Thread lost” returns.
- Browser tests measure every persistent mobile target on every route,
  including the real deployed unknown-path shell.
- The catalog description is now the verb-first 67-character sentence:
  “Compare source and archive folders, then save a byte-level JSON audit.”
- `.factory/copy-audit.md` was regenerated from the production build.
- `.factory/polish-4.md` maps all 32 cumulative findings to current tests,
  screenshots, and live checks.

## Clean-clone verification

Clean clone: `/tmp/mfa-polish4-clean-PQJt2k` at implementation commit
`e006e80`, created from the local Git repository before testing.

- `npm ci`: passed with 0 vulnerabilities.
- Every one of the 18 exact commands in `.factory/claims.json`: passed.
- `npm test`: passed 9 Rust unit tests, 16 CLI/support tests, 7 site-policy
  tests, the generated copy audit, and 8 Playwright/Axe tests.
- `npm run check`: Rust formatting, Clippy with warnings denied, and TypeScript
  all passed.
- `npm run build`: produced `dist/site/`.
- `cargo package`: passed; 17 files, 112.3 KiB unpacked and 60.5 KiB compressed.
- Production assets: JavaScript 12.19 kB (4.49 kB gzip), CSS 9.16 kB
  (2.94 kB gzip), and original hero WebP 101.15 kB.

The claim suite includes real sample media, CLI/web parity, demo isolation,
archive classifications, independent manifest hashing, read/write boundaries,
media observations, moved-file detection, JSON exit codes, network denial,
same-origin and storage-free browser privacy, source installation, Rust 1.85,
and MIT licensing.

## Live verification

Live URL: <https://media-fidelity-audit.sociobot.in>

- `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`
  passed all 8 tests. It checks all public routes and the actual HTTP 404 at
  1440 px light, 390 px light, and 390 px dark with zero serious/critical Axe
  findings.
- Home mobile controls measured: wordmark 44×44 px, Privacy 50.7×44 px,
  Terms 44×44 px, and Source 195.92×44 px. The static unknown-404 controls also
  measured at least 44 px high and wide.
- A cold unknown URL returned HTTP 404, title
  “Page not found — Media Fidelity Audit,” one h1, “404 error,” legal links,
  no overflow, and the common visual shell.
- Factory `verify-url.sh` passed `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`,
  and `/404`: correct title and language, one h1, one main landmark, image alt
  text, named buttons, and no console errors.
- Live Lighthouse 12.6 mobile: Performance 100, Accessibility 100,
  Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.4 s, TBT 20 ms, CLS 0.

Evidence is under `.factory/evidence/polish-4/`, including cold desktop/mobile
screenshots, raw route HTML, verifier JSON, the actual-404 screenshot, and the
Lighthouse JSON report.

## Deployment

Pushed implementation commit `e006e80` to `main`. Deployed `dist/site/` with
`/opt/fleet/lib/deploy-static.sh` for work order
`media-fidelity-audit-polish-4`. Azure Static Web Apps deployment
`8771f74a-d0c4-4d75-8de3-c33d4f443345` succeeded in `centralus`; the custom
domain returned HTTPS 200 immediately after deployment.

## Run locally

```sh
npm ci
npm test
npm run check
npm run build
cargo package
```

Run `cargo run -- demo` for the isolated CLI sample. Open
<https://media-fidelity-audit.sociobot.in/?demo=1> for the one-click web sample.

## Known gaps and next steps

None within the reviewed product contract. Registry publication remains a
factory release action, not a product defect; the documented source-checkout
installation is tested end to end.
