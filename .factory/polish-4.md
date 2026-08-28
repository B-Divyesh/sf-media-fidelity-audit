# Polish round 4 — cumulative finding closure

Candidate `d75e0ad906e6f79c384d16d216aa901787436d87` was repaired from
review commit `5f8e242094a47507e12cc4d54f82e1a719a01a47`. Every review and
polish record from rounds 1–4 was read and rechecked. No finding is deferred.

Implementation commit: `e006e804a3f406510901750cd302e617cae56a6b`  
Live URL: <https://media-fidelity-audit.sociobot.in>

All test references below passed from clean clone
`/tmp/mfa-polish4-clean-PQJt2k`. Live image paths are relative to
`.factory/evidence/polish-4/`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained original valid JPEG, HEIC, MOV, and XMP fixtures; the generated CLI/web sample shows every result above the mobile fold. | `@claim:sample-demo`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-2 | Retained Rust 1.85 as the documented and package MSRV. | `@claim:rust-msrv`; `live-home/screenshot-desktop.png`; live `/#install` |
| F-1-3 | Retained independent identical, changed, missing, unreadable, and archive-only classification. | `@claim:archive-comparison`; `live-home/screenshot-mobile.png`; live `/` |
| F-1-4 | Retained the one-activation `?demo=1` path with a populated result, persistent banner, and reset. | `@claim:one-click-demo`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-5 | Retained independent path, byte count, SHA-256, result, and media-detail assertions. | `@claim:manifest-content`; `live-home/screenshot-desktop.png`; live `/#preview` |
| F-1-6 | Retained traced reads of both chosen folders and exclusion of a sibling sentinel. | `@claim:read-scope`; `live-privacy/screenshot-mobile.png`; live `/privacy` |
| F-1-7 | Retained byte-difference classification without a perceptual-quality field. | `@claim:byte-not-perceptual`; `live-home/screenshot-mobile.png`; live `/#limits` |
| F-1-8 | Retained relative-path matching and optional byte-identical moved-file reporting. | `@claim:relative-path-matching`; `live-home/screenshot-mobile.png`; live `/#limits` |
| F-1-9 | Retained the working public-checkout installation path and removed transient registry wording. | `@claim:source-install`; `live-home/screenshot-desktop.png`; live `/#install` |
| F-1-10 | Retained default exclusion and `--include-all` inclusion coverage. | `@claim:include-all`; clean-clone `npm test`; live install guidance at `/#install` |
| F-1-11 | Retained network-denied demo and normal audits plus a same-origin, storage-free web flow. | `@claim:offline-local`, `@claim:static-privacy`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-12 | Retained JPEG camera, MOV codec/rate, XMP sidecar, and upper-case Live Photo pair assertions. | `@claim:media-observations`; `live-demo-query/screenshot-desktop.png`; live `/?demo=1` |
| F-1-13 | Retained recursive input snapshots and rejection of every new/existing output path inside either input. | `@claim:read-only-safety`; `live-home/screenshot-mobile.png`; live `/` |
| F-1-14 | Retained the literal first-screen wording “Check an archive without changing your media.” | `npm run test:copy`; `live-home/screenshot-mobile.png`; live `/` |
| F-1-15 | Retained plain primary labels with technical detail in supporting text. | `npm run test:copy`; `live-home/screenshot-desktop.png`; live `/` |
| F-1-16 | Retained “JSON audit report” as the single output term. | `@claim:manifest-content`, `npm run test:copy`; `live-home/screenshot-mobile.png`; live `/` |
| F-1-17 | Retained the real “SHA-256 value” field wording. | site test `first-screen demo uses the isolated query entry and report wording names SHA-256`; `live-home/screenshot-desktop.png`; live `/#preview` |
| F-1-18 | Retained source folder, archive folder, JSON audit report, demo, and Live Photo pair terminology. | `npm run test:copy`; `live-home/screenshot-mobile.png`; live `/` |
| F-1-19 | Retained the result-naming “View install steps” demo exit. | browser test `keyboard, history, focus, demo reset, and reduced motion work`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-20 | Retained route-specific raw titles, descriptions, canonicals, Open Graph, and Twitter metadata. | site test `metadata, discovery, and social assets are present`; every `live-*/verify.json`; live `/demo`, `/privacy`, `/terms` |
| F-1-21 | Retained the common-shell deployed 404 with legal links and an HTTP 404 response. | site test `deployment policy defines raw route shells, CSP, immutable assets, and a real 404`; `live-unknown-404/screenshot-mobile.png`; live `/not-a-real-route` = 404 |
| F-1-22 | Retained explicit external wording on GitHub links. | `npm run test:copy`; `live-home/screenshot-mobile.png`, `live-privacy/screenshot-mobile.png`; live `/` and `/privacy` |
| F-1-23 | Regenerated the complete rendered-route and README copy audit and kept its drift gate. | `npm run test:copy`; `.factory/copy-audit.md`; live route screenshots |
| F-1-24 | Retained deterministic, default-off `--find-moved` behavior. | `@claim:relative-path-matching`, `@claim:offline-local`; `live-home/screenshot-mobile.png`; live `/#limits` |
| F-2-1 | Retained generated copy coverage for the landing footer and all required README sentences. | `npm run test:copy`; `.factory/copy-audit.md`; `live-home/screenshot-mobile.png`; live `/` |
| F-2-2 | Retained “SHA-256 value” and the guard against “exact-match code.” | site test `first-screen demo uses the isolated query entry and report wording names SHA-256`; `live-home/screenshot-desktop.png`; live `/#preview` |
| F-3-1 | Retained the self-hosted terminal SVG generated from current `mfa demo` output. | `@claim:cli-demo-recording`; `live-home/screenshot-desktop.png`; live `/` |
| F-3-2 | Retained the literal limits heading “What this audit does not check.” | site test `landing names the report and limits sections and contains the terminal recording`; `live-home/screenshot-mobile.png`; live `/#limits` |
| F-3-3 | Retained the literal report heading “What the JSON audit report shows.” | same site test; `live-home/screenshot-mobile.png`; live `/#preview` |
| F-3-4 | Retained fresh external CLI demo workspaces that exclude caller media. | `@claim:cli-demo-isolation`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-4-1 | Made the shared wordmark and every footer link an inline-flex target with 44 px minimum width and height, including the static 404 shell. | browser test `all routes pass browser and accessibility checks at 390px`; site test `shared styles enforce 44px persistent navigation targets`; `live-home/screenshot-mobile.png`, `live-unknown-404/screenshot-mobile.png`; live measurements: home MFA 44×44, Terms 44×44, every other persistent target ≥44 px |
| F-4-2 | Replaced “404 · Thread lost” with the literal “404 error” in both client and static 404 templates; added browser, source, and copy-drift assertions. | browser test `404 routes use a literal error label`; `npm run test:copy`; `live-unknown-404/screenshot-mobile.png`; live `/not-a-real-route` shows “404 error” |

## Final verification

- All 18 exact `.factory/claims.json` commands passed from the clean clone.
- `npm test`, `npm run check`, `npm run build`, and `cargo package` passed there.
- The live Playwright/Axe suite passed eight tests over every route at desktop,
  390 px light, and 390 px dark, including the real unknown-path response.
- Factory `verify-url.sh` passed `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`,
  and `/404` with no console errors.
- Live Lighthouse scored 100 Performance, 100 Accessibility,
  100 Best Practices, and 100 SEO. LCP was 1.4 s, TBT 20 ms, and CLS 0.
- Deployment `8771f74a-d0c4-4d75-8de3-c33d4f443345` completed through the
  static work-order path and was rechecked at the custom domain.
