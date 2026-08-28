# Review 5 handoff — Media Fidelity Audit

## Result

Adversarial first-read Review 5 is complete at candidate `038a492` and records
a **FAIL** in `.factory/review-5.md`. Product code was not modified.

The cold mobile and desktop first screens are clear, the demo is immediately
useful and isolated, all 18 registered claims pass, and the live site passes
its route, metadata, link, Axe, privacy, build, and CLI checks. Five findings
remain: one blocking recurrence and four minor issues.

## Findings left for the repair round

- `F-4-1` (BLOCKING recurrence): live 390 px header links **Demo** and
  **Limits** are narrower than 44 px; the regression selector omits header nav
  links.
- `F-5-1`: browser Back restores `/#limits` scroll but leaves focus on BODY.
- `F-5-2`: the README `dist/site/` build-output claim has no claims entry.
- `F-5-3`: demo h2 “Run it yourself” is context-free.
- `F-5-4`: 404 copy retains the “archive path” metaphor and an unlisted
  “media has not been touched” reassurance.

## Verification performed

- Fresh clone: `/tmp/mfa-review5-clean-QZ5zyS` at `038a492`.
- Every exact command in `.factory/claims.json`: **18 passed, 0 failed**.
- `npm test`: passed (9 Rust tests, 16 CLI/support tests, 7 site-policy tests,
  generated copy audit, and 8 Playwright/Axe tests).
- `npm run check`: passed.
- `npm run build`: passed and produced `dist/site/`.
- `cargo package`: passed (17 files, 112.3 KiB unpacked, 60.5 KiB compressed).
- `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`:
  passed all 8 existing tests.
- Factory `verify-url.sh`: passed `/`, `/?demo=1`, `/demo`, `/privacy`,
  `/terms`, and `/404`; evidence is in `/tmp/mfa-review5-verify-E47lsA`.
- Independent Axe sweep: zero violations on every route at 390 px and 1440 px.
- Link crawl: all intended links returned 200; the deliberate unknown route
  returned the expected HTTP 404.
- Manual CLI demo from a temporary caller directory returned 0, preserved a
  caller-media sentinel, printed an external temporary workspace, and created
  the expected manifest/sample files.
- Manual browser request/storage capture found only same-origin requests and no
  new browser storage; a pre-existing sentinel remained unchanged.

## Recommended next steps

Repair the five findings without weakening the passing claim suite. Extend the
touch-target and history tests so they reproduce the two live failures, add or
remove the unlisted claim, update the two headings, then repeat the complete
Review 5 checklist from a fresh clone and fresh browser contexts.
