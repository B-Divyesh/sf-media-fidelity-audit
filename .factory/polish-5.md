# Polish round 5 — cumulative finding closure

Candidate `038a49296861c4257a0dd5a05281018dc2e53c56` was repaired from
review commit `84095829485f3a713b2eec7751af9e9a2dd1b9c6`. Every review and
polish record from rounds 1–5 was read and rechecked. No finding is deferred.

Implementation commit: `357618f03c13f6a98af12273e3511a5cc7a0955e`  
Final test commit: `73df9b1f94043dcb77df98ceef674a5b1bd9f8e4`  
Deployment: `ee8efa7a-fd87-42c8-8256-16f16364d3ce`  
Live URL: <https://media-fidelity-audit.sociobot.in>

All test references below passed from clean clone
`/tmp/mfa-polish5-final-nKX9DR` at `73df9b1`. Live screenshots are under
`.factory/evidence/polish-5/`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained valid original JPEG, HEIC, MOV, and XMP fixtures; the build-generated CLI/web sample shows all result counts before the mobile fold. | `@claim:sample-demo`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-2 | Retained Rust 1.85 as the documented and package MSRV. | `@claim:rust-msrv`; clean-clone locked Rust 1.85 check; live `/#install` |
| F-1-3 | Retained independent identical, changed, missing, unreadable, and archive-only classification. | `@claim:archive-comparison`; live `/` |
| F-1-4 | Retained the one-activation `?demo=1` path with a populated result, persistent banner, and reset. | `@claim:one-click-demo`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-5 | Retained independent path, byte count, SHA-256, result, and media-detail assertions. | `@claim:manifest-content`; live `/#preview` |
| F-1-6 | Retained traced reads of both chosen folders and exclusion of a sibling sentinel. | `@claim:read-scope`; `live-privacy/screenshot-mobile.png`; live `/privacy` |
| F-1-7 | Retained byte-difference classification without any perceptual-quality field. | `@claim:byte-not-perceptual`; live `/#limits` |
| F-1-8 | Retained default relative-path matching and optional byte-identical moved-file reporting. | `@claim:relative-path-matching`; live `/#limits` |
| F-1-9 | Retained the working public-checkout installation path and no transient registry wording. | `@claim:source-install`; live `/#install` |
| F-1-10 | Retained default exclusion and `--include-all` inclusion coverage. | `@claim:include-all`; clean-clone `npm test` |
| F-1-11 | Retained network-denied CLI demo and normal audits plus same-origin, storage-free browser demo coverage. | `@claim:offline-local`; `@claim:static-privacy`; live `/?demo=1` |
| F-1-12 | Retained JPEG camera, MOV codec/rate, XMP sidecar, and upper-case Live Photo pair assertions. | `@claim:media-observations`; `live-demo-query/screenshot-desktop.png` |
| F-1-13 | Retained recursive input snapshots and rejection of every new/existing output path inside either input. | `@claim:read-only-safety`; clean-clone claim command |
| F-1-14 | Retained the literal first-screen wording “Check an archive without changing your media.” | `npm run test:copy`; `live-home/screenshot-mobile.png`; live `/` |
| F-1-15 | Retained plain primary proof labels with technical details in supporting text. | `npm run test:copy`; `live-home/screenshot-desktop.png`; live `/` |
| F-1-16 | Retained “JSON audit report” as the single output term. | `@claim:manifest-content`; `.factory/copy-audit.md`; live `/` |
| F-1-17 | Retained the real “SHA-256 value” field wording. | site test `first-screen demo uses the isolated query entry and report wording names SHA-256`; live `/#preview` |
| F-1-18 | Retained source folder, archive folder, JSON audit report, demo, and Live Photo pair terminology. | `npm run test:copy`; `.factory/copy-audit.md` |
| F-1-19 | Retained the result-naming “View install steps” demo exit. | browser test `keyboard, history, focus, demo reset, and reduced motion work`; `live-demo-query/screenshot-mobile.png` |
| F-1-20 | Retained route-specific raw titles, descriptions, canonicals, Open Graph, and Twitter metadata. | site test `metadata, discovery, and social assets are present`; live verifier JSON for `/demo`, `/privacy`, `/terms`, and `/404` |
| F-1-21 | Retained the shared-shell deployed 404 with legal links and HTTP 404 for unknown paths. | browser test `404 routes use a literal error label`; `live-unknown-404/screenshot-mobile.png`; live `/not-a-real-route` = 404 |
| F-1-22 | Retained explicit external wording on GitHub links. | `npm run test:copy`; `live-home/screenshot-mobile.png`; live `/privacy` |
| F-1-23 | Regenerated the complete rendered-route and README copy audit and kept its drift gate. | `npm run test:copy`; `.factory/copy-audit.md` |
| F-1-24 | Retained deterministic, default-off `--find-moved` behavior. | `@claim:relative-path-matching`; `@claim:offline-local` |
| F-2-1 | Retained generated copy coverage for the landing footer and every required README sentence. | `npm run test:copy`; `.factory/copy-audit.md` |
| F-2-2 | Retained “SHA-256 value” and the guard against “exact-match code.” | site test `first-screen demo uses the isolated query entry and report wording names SHA-256`; live `/#preview` |
| F-3-1 | Retained the self-hosted terminal SVG generated from current `mfa demo` output. | `@claim:cli-demo-recording`; `live-home/screenshot-desktop.png`; live `/` |
| F-3-2 | Retained the literal limits label “What this audit does not check.” | site test `landing names the report and limits sections and contains the terminal recording`; live `/#limits` |
| F-3-3 | Retained the literal report label “What the JSON audit report shows.” | same site test; live `/#preview` |
| F-3-4 | Retained fresh external CLI demo workspaces that exclude caller media. | `@claim:cli-demo-isolation`; live demo banner at `/?demo=1` |
| F-4-1 | Added a 44 px minimum width and centering to every app and static-404 header link; expanded measurement to all persistent header/footer controls at 390 px. | browser test `all routes pass browser and accessibility checks at 390px`; site test `shared styles enforce 44px persistent navigation targets`; `live-home/screenshot-mobile.png`; `live-unknown-404/screenshot-mobile.png` |
| F-4-2 | Retained the literal “404 error” label and regression guards against “Thread lost.” | browser test `404 routes use a literal error label`; `live-unknown-404/screenshot-mobile.png` |
| F-5-1 | Popstate now renders first, waits for browser scroll restoration, then focuses the new h1 with `preventScroll`; Back and Forward assert focus and preserved `#limits` scroll. | browser test `keyboard, history, focus, demo reset, and reduced motion work`; live suite pass at `https://media-fidelity-audit.sociobot.in` |
| F-5-2 | Registered `build-output`; its exact command builds production and asserts route shells, 404/config files, and hashed JS/CSS under `dist/site/`. README wording now matches the claim. | `@claim:build-output`; clean-clone exact claim command; `dist/site/` build pass |
| F-5-3 | Replaced “Run it yourself” with “Run the sample audit locally” and added source/rendered-copy guards. | site test `demo headings and 404 recovery copy use literal task language`; `npm run test:copy`; `live-demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-5-4 | Replaced the archive metaphor and unlisted reassurance with “This page was not found” and a concrete address/home recovery step in both 404 render paths. | browser test `404 routes use a literal error label`; site/copy tests; `live-unknown-404/screenshot-mobile.png`; live unknown URL = 404 |

## Final verification

- All 19 exact `.factory/claims.json` commands passed from the final clean clone.
- `npm test`, `npm run check`, `npm run build`, and `cargo package` passed there.
- The cold live browser suite passed all 8 tests over every route at desktop,
  390 px light, and 390 px dark.
- Factory URL verification passed `/`, `/?demo=1`, `/demo`, `/privacy`,
  `/terms`, and `/404` with no console errors.
- Independent live Axe checks found zero violations in 14 route/profile runs;
  evidence is `axe-live.json`.
- Live Lighthouse scored 100 Performance, 100 Accessibility, 100 Best
  Practices, and 100 SEO. LCP was 1.5 s, total blocking time 10 ms, and CLS 0.
- The real unknown route returned HTTP 404 and the corrected common shell.
