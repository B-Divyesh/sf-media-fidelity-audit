# Polish round 2 — cumulative finding closure

Candidate `d2de907b97e6ce22f4aad1fb11226c79c963d0df` was repaired from review commit
`945c9d096d30c41757b6531acd0a9814df0778c8`. Every finding in review rounds 1
and 2 was rechecked. No finding is deferred.

Live URL: <https://media-fidelity-audit.sociobot.in>

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the valid original JPEG, MOV, HEIC, and XMP fixtures and build-generated CLI/web result. The first-screen action now opens the isolated `?demo=1` result directly. The banner remains sticky on phones and Reset restores the sample. | `@claim:sample-demo`; `@claim:one-click-demo`; `.factory/evidence/polish-2/demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-2 | Kept the tested Rust 1.85 minimum and locked dependency check. | `@claim:rust-msrv`; clean-clone exact claim command |
| F-1-3 | Retained independent identical, changed, missing, unreadable, and archive-only classification coverage. | `@claim:archive-comparison` |
| F-1-4 | Registered the exact one-click claim and now asserts that one activation reaches `/?demo=1`, its populated result, banner, and reset. | `@claim:one-click-demo`; live `/?demo=1` |
| F-1-5 | Retained independent path, byte-count, SHA-256, result, and media-detail assertions. | `@claim:manifest-content` |
| F-1-6 | Retained file-access tracing for both selected folders and an unread sibling sentinel. | `@claim:read-scope` |
| F-1-7 | Retained byte-difference evidence with no perceptual-quality field. | `@claim:byte-not-perceptual` |
| F-1-8 | Retained relative-path, case, nested-path, and moved-file behavior. | `@claim:relative-path-matching` |
| F-1-9 | Kept only the working source-checkout installation and tested it in a fresh Cargo root. | `@claim:source-install` |
| F-1-10 | Retained default exclusion and `--include-all` inclusion evidence. | `@claim:include-all` |
| F-1-11 | Retained network-denied CLI demo and normal audit checks plus same-origin, storage-free browser checks. | `@claim:offline-local`; `@claim:static-privacy` |
| F-1-12 | Retained JPEG camera, MOV codec/rate, XMP sidecar, and upper-case Live Photo pair assertions. | `@claim:media-observations` |
| F-1-13 | Retained recursive before/after snapshots and all new/existing output attempts in both input folders. | `@claim:read-only-safety` |
| F-1-14 | Preserved the plain first-screen wording “Check an archive without changing your media.” | generated copy gate; `.factory/evidence/polish-2/home/screenshot-mobile.png` |
| F-1-15 | Preserved plain primary labels with technical terms in supporting text. | generated copy gate; `.factory/evidence/polish-2/home/screenshot-desktop.png` |
| F-1-16 | Preserved “JSON audit report” as the single output term. | generated copy gate; `@claim:manifest-content` |
| F-1-17 | Replaced the remaining undefined “exact-match code” with the real “SHA-256 value” field. | site test `first-screen demo uses the isolated query entry and report wording names SHA-256`; `@claim:manifest-content`; live `/` |
| F-1-18 | Preserved source folder, archive folder, JSON audit report, demo, and Live Photo pair throughout. | generated `.factory/copy-audit.md` terminology table and drift gate |
| F-1-19 | Preserved the result-naming “View install steps” action. | `.factory/evidence/polish-2/demo-query/screenshot-mobile.png`; live `/?demo=1` |
| F-1-20 | Revalidated route-specific raw titles, descriptions, canonicals, Open Graph, and Twitter metadata. | `metadata, discovery, and social assets are present`; live `/demo`, `/privacy`, `/terms` raw-HTML checks |
| F-1-21 | Revalidated the common-shell actual 404 with header, footer, legal links, and HTTP 404 status. | `deployment policy defines raw route shells, CSP, immutable assets, and a real 404`; live `/not-a-real-route` = 404 |
| F-1-22 | Preserved explicit “external” wording on GitHub links. | generated copy gate; live `/` and `/privacy` |
| F-1-23 | Replaced the hand-maintained audit with a generator that loads the production build, extracts every route’s visible copy and README prose, checks wording, and fails on drift. | `npm run test:copy`; `site/scripts/audit-copy.mjs`; generated `.factory/copy-audit.md` includes footer and all previously omitted README sentences |
| F-1-24 | Retained deterministic `--find-moved` matching and its default-off behavior. | `@claim:relative-path-matching`; `@claim:offline-local` |
| F-2-1 | Fully closed the recurrence: the generated audit explicitly contains the landing footer, one-click demo sentence, claims sentence, and demo-details sentence; assertions require all four. | `npm run test:copy`; coverage assertions in `site/scripts/audit-copy.mjs` |
| F-2-2 | Rewrote the sentence to name the actual field: “SHA-256 value.” Removed “exact-match code” from visitor copy and added a regression assertion. | site test `first-screen demo uses the isolated query entry and report wording names SHA-256`; generated copy gate; `.factory/evidence/polish-2/home/screenshot-desktop.png` |

## Verification summary

All 16 exact commands in `.factory/claims.json` passed from clean clone
`/tmp/mfa-polish2-clean-eATda8` at implementation commit `d51865b`. The same
clone passed `npm test`, `npm run check`, `npm run build`, and `cargo package`.
The live browser suite passed six tests, including all route, keyboard, focus,
history, reset, reduced-motion, privacy, mobile, dark-mode, and Axe checks.

Factory verification produced these live artifacts:

* Home: `.factory/evidence/polish-2/home/`
* Query demo: `.factory/evidence/polish-2/demo-query/`
* Route demo: `.factory/evidence/polish-2/demo-route/`
* Lighthouse: `.factory/evidence/polish-2/lighthouse-live.json`

Lighthouse mobile scores were Performance 100, Accessibility 100, Best
Practices 100, and SEO 100. LCP was 1.4 s, total blocking time 10 ms, and CLS
was 0. The deployed and local JavaScript asset name matched:
`assets/main-ChI7DGqK.js`.
