# Polish round 1 — cumulative finding closure

Candidate repaired from `52c5e8bb420bcc8d61ff7c89e6b548fa953a880c` using review
`2553488650273a7555e5357c6455c1eb5f690341`. Earlier review/polish files were
read; no earlier `polish-*.md` exists. Evidence commands are listed in the
handoff. Live screenshots and URL checks are recorded after deployment in
`.factory/evidence/polish-1/`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Replaced renamed text with original valid JPEG, HEIC, MOV, and XMP fixtures; demo now shows wrapped counts before the terminal. | `@claim:sample-demo`; `@claim:media-observations`; `@claim:one-click-demo`; `demo/screenshot-mobile.png` |
| F-1-2 | Set `rust-version = 1.85`, corrected copy, and test locked Rust 1.85.0. | `@claim:rust-msrv` |
| F-1-3 | Added independent changed/missing/unreadable/archive-only classification test. | `@claim:archive-comparison` |
| F-1-4 | Registered and browser-tested the first-screen one-click demo. | `@claim:one-click-demo` |
| F-1-5 | Added independently calculated hash, byte count, status, path, and media-detail manifest test. | `@claim:manifest-content` |
| F-1-6 | Added LD_PRELOAD file-access tracing for both chosen files and an unaccessed sibling sentinel. | `@claim:read-scope` |
| F-1-7 | Added visually unchanged byte-different JPEG evidence and kept the explicit limit. | `@claim:byte-not-perceptual` |
| F-1-8 | Added nested/case path evidence and documented default matching. | `@claim:relative-path-matching` |
| F-1-9 | Removed transient registry language and clean-installs the public checkout. | `@claim:source-install` |
| F-1-10 | Added the default-versus-flag fixture assertion. | `@claim:include-all` |
| F-1-11 | Network denial now covers both `demo` and a normal audit; website privacy remains scoped to its demo. | `@claim:offline-local`; `@claim:static-privacy` |
| F-1-12 | The tagged observation test now asserts JPEG details, MOV codec/rate, XMP, and uppercase pair. | `@claim:media-observations` |
| F-1-13 | Tagged safety test snapshots all files and attempts new/existing outputs in both trees. | `@claim:read-only-safety` |
| F-1-14 | Rewrote the eyebrow in plain words. | `home/screenshot-desktop.png` |
| F-1-15 | Replaced abbreviations with plain labels and retained technical detail secondarily. | `home/screenshot-desktop.png` |
| F-1-16 | Names the output consistently as a JSON audit report. | `@claim:manifest-content`; `home/screenshot-desktop.png` |
| F-1-17 | Rewrote the dense manifest sentence and moved technical evidence into the report. | `@claim:manifest-content` |
| F-1-18 | Standardized source folder and archive folder throughout UI and README. | `.factory/copy-audit.md` |
| F-1-19 | Renamed the demo exit action to “View install steps.” | `@claim:one-click-demo` |
| F-1-20 | Added route-specific static shells with route titles, canonical, OG, and Twitter metadata. | `site/tests/site.test.mjs`; `live-route-metadata.txt` |
| F-1-21 | Rebuilt deployed 404 with the common wordmark, four-link header, footer, and metadata. | `site/tests/site.test.mjs`; `live-404.png` |
| F-1-22 | Labels GitHub links as external in the footer and Privacy page. | `site/tests/site.test.mjs`; `home/screenshot-desktop.png` |
| F-1-23 | Replaced the incomplete audit with rendered-route/README sentences, counts, labels, and terminology. | `.factory/copy-audit.md` |
| F-1-24 | Implemented deterministic `--find-moved`, including default behavior and moved-path reporting. | `@claim:relative-path-matching` |

No finding is deferred. The CLI remains local, Rust/clap, and the site remains
a static Vite deployment with the paper-cut archive identity.
