# Adversarial first-read review 5 — Media Fidelity Audit

**Reviewed:** 2026-08-28  
**Candidate:** `038a49296861c4257a0dd5a05281018dc2e53c56` (`main`)  
**Live URL:** <https://media-fidelity-audit.sociobot.in>  
**Verdict: FAIL**

The core job and demo are clear and all 18 registered claims pass, but this is
not a zero-finding release. The earlier mobile-target finding is only partly
fixed, route history loses focus, one README claim is outside the claim
registry, and two secondary-route headings fail the plain-words rule.

## 1. Cold first read

I opened `/` without stored state in separate Chromium contexts at 390×844 and
1440×900. I recorded the viewport before scrolling or interacting.

| Question | First-read answer | Evidence | Result |
| --- | --- | --- | --- |
| What does this do? | It checks whether a saved media archive matches a source folder. | “Check your archive against a source folder.” | Pass |
| For whom? | Families and photographers about to clear an export. | “For families and photographers checking a saved copy before clearing an export.” | Pass |
| What should I click first? | “Try it with sample data.” | The primary action and “See the finished audit after one click.” are above the fold. | Pass |

Both widths showed the three short facts before the fold. The phone page had no
horizontal overflow, and neither context logged a console error.

## 2. Copy audit

Counts split on whitespace. Hyphenated terms, flags, paths, and numbers count as
one word. The tables include headings, labels, controls, and fragments as well
as grammatical sentences so that no visible landing/README text escapes the
audit. No item exceeds 22 words, no banned marketing adjective appears, and
the source folder/archive folder/JSON audit report/demo/Live Photo pair terms
are consistent. Landing buttons name their result. `F-5-2` is a claims-registry
failure rather than a length failure.

### Live landing page (`/`)

| Text | Words | Flag |
| --- | ---: | --- |
| Skip to main content | 4 | — |
| MFA Media Fidelity Audit | 4 | — |
| Demo | 1 | Navigation link; not a button |
| How it works | 3 | Navigation link; not a button |
| Limits | 1 | Navigation link; not a button |
| Privacy | 1 | Navigation link; not a button |
| Check an archive without changing your media | 7 | — |
| Check your archive against a source folder. | 7 | — |
| For families and photographers checking a saved copy before clearing an export. | 12 | — |
| Try it with sample data | 5 | — |
| See the finished audit after one click. | 7 | — |
| Runs locally with no account. | 5 | — |
| Does not change either folder. | 5 | — |
| Free under the MIT License. | 5 | — |
| One source folder, one archive folder, one JSON audit report. | 10 | — |
| Command-line demo | 2 | — |
| See the audit command and its result. | 7 | — |
| This recording uses the same bundled sample as mfa demo. | 10 | — |
| Recorded from mfa demo during the site build. | 8 | — |
| Swipe to read every line. | 5 | — |
| Exact file match | 3 | — |
| SHA-256 in the report | 4 | Technical field is secondary to the plain label |
| Camera details | 2 | — |
| When the file contains them | 5 | — |
| Video format and rate | 4 | — |
| When the file contains them | 5 | — |
| Live Photo media | 3 | — |
| Videos and edit files | 4 | — |
| What the JSON audit report shows | 6 | — |
| Find files that need attention. | 5 | — |
| The JSON audit report lists each file’s result, size, SHA-256 value, and available camera or video details. | 17 | — |
| Bundled family archive | 3 | — |
| Identical | 1 | — |
| 3 | 1 | — |
| Changed | 1 | — |
| 1 | 1 | — |
| Missing | 1 | — |
| 1 | 1 | — |
| Live Photo pair | 3 | — |
| 1 | 1 | — |
| The sample includes valid JPEG, MOV, HEIC, and XMP files. | 10 | — |
| Three local steps | 3 | — |
| Compare folders you already trust. | 5 | — |
| Choose both folders | 3 | — |
| Choose the exported folder as the source and the stored folder as the archive. | 14 | — |
| Run the audit | 3 | — |
| The CLI matches relative paths and hashes each source file. | 10 | — |
| Keep the JSON report | 4 | — |
| Review changed, missing, moved, or archive-only paths. | 7 | — |
| Install from the public source checkout | 6 | — |
| Run your first audit. | 4 | — |
| Requires Rust 1.85 or newer. | 5 | — |
| Copy install command | 3 | — |
| What this audit does not check | 6 | — |
| It checks bytes, not picture quality. | 6 | — |
| Matching hashes prove matching bytes. | 5 | — |
| They do not judge focus, colour, or composition. | 8 | — |
| By default it matches relative paths. | 6 | — |
| Add --find-moved to report byte-identical archive files stored elsewhere. | 9 | — |
| Compare source folders with local media archives. | 7 | — |
| Privacy | 1 | Footer link |
| Terms | 1 | Footer link |
| Source on GitHub (external) | 4 | Footer link |
| Built by Param Factory · v0.1.0 | 6 | — |

### README headings and prose

| Text | Words | Flag |
| --- | ---: | --- |
| Media Fidelity Audit | 3 | Document title |
| Check a source folder against a local media archive. | 9 | — |
| Media Fidelity Audit is a command-line tool for families and photographers checking a saved copy before clearing an export. | 19 | — |
| It matches files by relative path and writes a JSON audit report. | 12 | — |
| The report includes SHA-256, byte counts, results, and available camera or video details. | 13 | — |
| It can also report byte-identical files stored at a different archive path. | 12 | — |
| Try the bundled demo | 4 | — |
| The demo creates a new temporary workspace from the valid media files in examples/. | 14 | — |
| It does not read or write your real media. | 9 | — |
| The five-file sample reports three identical files, one changed file, one missing sidecar, and one upper-case HEIC/MOV Live Photo pair. | 20 | — |
| Its JPEG records camera metadata. | 5 | — |
| Its MOV records codec and frame rate. | 7 | — |
| The command prints the temporary path to its JSON manifest. | 10 | — |
| Delete that workspace when finished. | 5 | — |
| The landing page includes a self-hosted recording of the same mfa demo output. | 13 | — |
| Open the one-click website demo at media-fidelity-audit.sociobot.in/?demo=1. | 7 | — |
| This page stores nothing; the CLI demo uses a temporary folder. | 11 | — |
| Install from the public source checkout | 6 | — |
| Requires Rust 1.85 or newer. | 5 | — |
| Audit an archive | 3 | — |
| Choose a new manifest path outside both folders. | 8 | — |
| The CLI rejects output inside the source folder or archive folder, and it never replaces an existing output. | 18 | — |
| Exit 0 means every source path is byte-identical. | 8 | — |
| Exit 1 means the audit found a changed, missing, moved, or unreadable source path. | 14 | — |
| Exit 2 means input or output failed. | 7 | — |
| Add --json for a summary on standard output. | 8 | — |
| Add --include-all to include files outside the default media and sidecar extensions. | 12 | — |
| Add --find-moved to locate byte-identical archive files at another relative path. | 11 | — |
| Hashes prove byte equality. | 4 | — |
| They do not assess visual quality. | 6 | — |
| Default matching uses relative paths; use --find-moved when an archive may be reorganized. | 13 | — |
| Develop and verify | 3 | — |
| npm run build writes the static site to dist/site/. | 9 | F-5-2 |
| The factory deploys that directory; this repository does not change infrastructure or DNS. | 13 | Workflow scope, not a product claim |
| The public claims and isolated tests are listed in .factory/claims.json. | 10 | Documentation pointer |
| Demo details are in .factory/demo.md. | 5 | Documentation pointer |
| Privacy and license | 3 | — |
| The CLI has no account system or network dependency. | 9 | — |
| The static demo sends no third-party requests and stores no browser data. | 12 | — |
| Media Fidelity Audit is free under the MIT License. | 9 | — |
| See LICENSE. | 2 | — |

The demo-route heading “Run it yourself” and 404 copy are outside the requested
landing/README tables but fail the global heading/copy rules; see `F-5-3` and
`F-5-4`.

## 3. Demo and sandbox

The first-screen action reached `/?demo=1` with one activation. Before any
scroll, the next screen showed the persistent “Demo — sample data, nothing is
saved” banner, Reset demo, the install exit, counts of 3 identical/1 changed/1
missing/1 Live Photo pair, and realistic filenames. Reset restored the same
sample and announced “Demo reset to the bundled sample.”

In a fresh browser context, the full flow made only same-origin requests and
created no cookie, localStorage, sessionStorage, IndexedDB, or service-worker
state. A pre-existing `real:sentinel` localStorage value remained unchanged.
The `/demo` deep link renders the same sample.

I also ran `cargo run --quiet --manifest-path /work/repo/Cargo.toml -- demo`
from a fresh temporary caller directory containing a hashed sentinel. The
command returned 0, left the sentinel hash unchanged, created its workspace at
`/tmp/mfa-demo-3293-1787954472`, printed the manifest path, and populated only
the bundled source/archive fixtures there. This satisfies the CLI sandbox
contract.

## 4. Claims

I cloned candidate `038a492` into `/tmp/mfa-review5-clean-QZ5zyS`, ran
`npm ci`, and then ran every exact `test` command from `.factory/claims.json`
sequentially. All 18 passed.

| Claim | Exact registered command | Result |
| --- | --- | --- |
| sample-demo | `cargo build && npm run build:site && node --test --test-name-pattern='@claim:sample-demo' site/tests/accessibility.test.mjs` | PASS |
| cli-demo-recording | `cargo build && npm run build:site && node --test --test-name-pattern='@claim:cli-demo-recording' site/tests/accessibility.test.mjs` | PASS |
| cli-demo-isolation | `cargo build && node --test --test-name-pattern='@claim:cli-demo-isolation' site/tests/claims.test.mjs` | PASS |
| archive-comparison | `cargo build && node --test --test-name-pattern='@claim:archive-comparison' site/tests/claims.test.mjs` | PASS |
| one-click-demo | `npm run build:site && node --test --test-name-pattern='@claim:one-click-demo' site/tests/accessibility.test.mjs` | PASS |
| manifest-content | `cargo build && node --test --test-name-pattern='@claim:manifest-content' site/tests/claims.test.mjs` | PASS |
| read-only-safety | `cargo build && node --test --test-name-pattern='@claim:read-only-safety' site/tests/claims.test.mjs` | PASS |
| read-scope | `cargo build && node --test --test-name-pattern='@claim:read-scope' site/tests/claims.test.mjs` | PASS |
| media-observations | `cargo build && node --test --test-name-pattern='@claim:media-observations' site/tests/claims.test.mjs` | PASS |
| byte-not-perceptual | `cargo build && node --test --test-name-pattern='@claim:byte-not-perceptual' site/tests/claims.test.mjs` | PASS |
| relative-path-matching | `cargo build && node --test --test-name-pattern='@claim:relative-path-matching' site/tests/claims.test.mjs` | PASS |
| include-all | `cargo build && node --test --test-name-pattern='@claim:include-all' site/tests/claims.test.mjs` | PASS |
| json-automation | `cargo build && node --test --test-name-pattern='@claim:json-automation' site/tests/claims.test.mjs` | PASS |
| offline-local | `cargo build && node --test --test-name-pattern='@claim:offline-local' site/tests/claims.test.mjs` | PASS |
| static-privacy | `npm run build:site && node --test --test-name-pattern='@claim:static-privacy' site/tests/accessibility.test.mjs` | PASS |
| source-install | `cargo build && node --test --test-name-pattern='@claim:source-install' site/tests/claims.test.mjs` | PASS |
| rust-msrv | `node --test --test-name-pattern='@claim:rust-msrv' site/tests/claims.test.mjs` | PASS |
| mit-license | `node --test --test-name-pattern='@claim:mit-license' site/tests/claims.test.mjs` | PASS |

The live and README cross-check found one claim-like sentence without a
registry entry (`F-5-2`) and one unlisted reassurance on the 404 (`F-5-4`).
There is no failing registered claim.

## 5. Earlier findings: live and code regression check

I read Reviews 1–4, Polish rounds 1–4, and the prior handoff. I rechecked every
earlier finding against the live deployment and current source; the evidence is
the exact claim run above, the live route/link/Axe checks below, the generated
copy audit, and direct source inspection.

| Earlier finding | Current result |
| --- | --- |
| F-1-1 | Fixed: valid JPEG/MOV/HEIC/XMP fixtures and populated sample counts remain. |
| F-1-2 | Fixed: Rust 1.85 is documented and the locked-toolchain claim passes. |
| F-1-3 | Fixed: all five archive classifications remain tested. |
| F-1-4 | Fixed: one activation opens the populated query demo. |
| F-1-5 | Fixed: report path, bytes, SHA-256, result, and media details are independently checked. |
| F-1-6 | Fixed: tracing covers selected folders and excludes the sibling sentinel. |
| F-1-7 | Fixed: byte difference is separated from picture quality. |
| F-1-8 | Fixed: relative matching and optional moved-file detection pass. |
| F-1-9 | Fixed: source-checkout installation passes in a fresh Cargo root. |
| F-1-10 | Fixed: default exclusion and `--include-all` pass. |
| F-1-11 | Fixed: network denial covers demo and normal audit; browser demo traffic/storage checks pass. |
| F-1-12 | Fixed: JPEG, MOV, XMP, and upper-case Live Photo observations pass. |
| F-1-13 | Fixed: both input trees and new/existing output cases remain covered. |
| F-1-14 | Fixed: the hero eyebrow remains literal. |
| F-1-15 | Fixed: plain proof labels precede technical details. |
| F-1-16 | Fixed: “JSON audit report” is used consistently. |
| F-1-17 | Fixed: visitor copy names the real SHA-256 field. |
| F-1-18 | Fixed: folder/output terminology is consistent. |
| F-1-19 | Fixed: “View install steps” names the CLI demo exit result. |
| F-1-20 | Fixed: direct subroutes ship route-specific raw metadata. |
| F-1-21 | Fixed: an unknown URL returns a designed shared-shell HTTP 404. |
| F-1-22 | Fixed: GitHub links identify themselves as external. |
| F-1-23 | Fixed: the generated copy audit covers the landing, footer, routes, and README. |
| F-1-24 | Fixed: deterministic default-off `--find-moved` remains implemented and tested. |
| F-2-1 | Fixed: previously omitted landing/footer/README text remains in the generated audit. |
| F-2-2 | Fixed: “exact-match code” remains absent and “SHA-256 value” remains present. |
| F-3-1 | Fixed: the self-hosted SVG recording remains visible and matches fresh CLI output. |
| F-3-2 | Fixed: the limits section is named “What this audit does not check”. |
| F-3-3 | Fixed: the report section is named “What the JSON audit report shows”. |
| F-3-4 | Fixed: the CLI demo isolation claim and caller-sentinel test pass. |
| F-4-1 | **BLOCKING recurrence/partial fix:** wordmark/footer targets pass, but two header navigation links remain narrower than 44 px. |
| F-4-2 | Fixed: both 404 render paths now use “404 error”; “Thread lost” is absent. |

## 6. Structure, links, accessibility, and identity

`/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, and `/404` return 200; an
unknown URL returns the designed shell with HTTP 404. Every route has the
expected title, one h1, one main, `lang="en"`, description, canonical, OG and
Twitter metadata, favicon, apple-touch icon, shared header/footer, Privacy, and
Terms. `robots.txt`, `sitemap.xml`, the 1200×630 OG image, CSP, nosniff,
referrer, permissions, frame, and HSTS headers are live.

All unique links crawled successfully except the deliberately unknown URL,
which correctly returned 404; the external GitHub repository returned 200.
Cold `#main`, `#how`, `#preview`, `#install`, and `#limits` links reached their
targets, and Back restored the `#limits` scroll position. Route history did not
restore focus correctly (`F-5-1`).

Axe reported zero violations, not merely zero serious/critical violations, on
all routes at 390 px and 1440 px. The factory URL verifier passed all six 200
routes with correct title/language/h1/main/alt/button checks and no console
errors. Manual 390 px measurement exposed the target regression that the
current automated selector misses (`F-4-1`). Reduced-motion behavior passed.

The paper-cut archive diorama, paper/terracotta/navy palette, serif/sans type,
folder shapes, and restrained thread motif match `.factory/design.md` and are
not a generic SaaS template. Production JavaScript is 12.19 kB (4.49 kB gzip).

## 7. Missed leverage

No missing AI step is justified. The job is deterministic, local byte and
metadata comparison; adding model inference would weaken its privacy and proof
model. The CLI already imports folders, exports JSON, detects moved originals,
and provides a local isolated demo. No additional import/export/sync feature is
obviously implied by the available contract. `.factory/brief.json` is absent,
so this conclusion uses the README, claims registry, demo contract, and design
thesis.

## 8. Findings

### F-4-1 — Persistent mobile navigation targets remain smaller than 44×44 px

**Severity:** BLOCKING recurrence / accessibility  
**Location:** live 390 px header on every route; `site/src/style.css:33`,
`site/public/404.css:9`, and `site/tests/accessibility.test.mjs:57`.

The live **Demo** link measures **38.6×44 px** and **Limits** measures
**39×44 px** (the static 404 versions are 41.6×44 and 42×44 px). The earlier
F-4-1 required persistent mobile route controls to meet the attached 44×44 px
baseline. The repair added `min-height` to header navigation but no
`min-width`, while its regression test measures only `.wordmark, footer a`.
The test therefore passes while two persistent header targets still fail.

**Concrete fix:** add `min-width: 44px` and horizontal centering to
`.site-header nav a` and the corresponding static-404 rule. Extend the 390 px
browser assertion to every header and footer link, then verify no overflow on
all routes.

### F-5-1 — Back navigation restores the section but drops keyboard focus

**Severity:** Minor accessibility/routing failure  
**Location:** live `/#limits` → `/demo` → browser Back;
`site/src/main.ts` popstate/render handling.

Back restored `/#limits` and its scroll position (the section top was about
121 px below the viewport top), but `document.activeElement` was `BODY`, not
the restored page h1 or a meaningful target. Forward navigation focused the
demo h1 correctly. The existing “keyboard, history, focus” test checks focus
when entering the demo but checks only h1 text after Back, so its name
overstates its coverage.

**Concrete fix:** after a popstate render and hash restoration, focus the new
h1 with `focus({preventScroll: true})` (or restore the previously focused
control) without disturbing the restored section scroll. Add assertions for
both active element and scroll position after Back and Forward.

### F-5-2 — The README build-output claim is not registered

**Severity:** Minor claims-governance failure  
**Location:** `README.md`, Develop and verify: “`npm run build` writes the
static site to `dist/site/`.”

This is a concrete outcome a contributor relies on, but `.factory/claims.json`
has no build-output entry or uniquely tagged test. The command did produce that
directory during this review, so the sentence is true; it is still an unlisted
and therefore unowned public claim.

**Concrete fix:** add a `build-output` claim and one `@claim:build-output` test
that runs the production build from a clean checkout and asserts the expected
route shells and assets under `dist/site/`, or remove the sentence.

### F-5-3 — “Run it yourself” does not identify the demo section

**Severity:** Minor copy failure  
**Location:** live `/?demo=1` and `/demo`; demo-page h2 in
`site/src/main.ts`: “Run it yourself”.

In a screen-reader heading list, “it” has no referent and the heading does not
say that the section contains the local sample command. It violates the rule
that headings make sense out of context.

**Concrete rewrite:** “Run the sample audit locally”. Add this route to the
plain-heading regression assertions.

### F-5-4 — The 404 still uses archive metaphor and an unlisted reassurance

**Severity:** Minor copy and claims-governance failure  
**Location:** live `/404` and any unknown path; `site/src/main.ts` and
`site/public/404.html`: “This archive path is missing.” and “The page may have
moved, but your media has not been touched.”

“Archive path” turns a missing web page into product lore and can be mistaken
for a missing media path. The second clause provides no useful recovery step
and makes an unregistered data-safety assurance; `static-privacy` covers the
demo flow, not the 404 route. Replacing only “Thread lost” closed the earlier
eyebrow finding but left this separate metaphor in the h1.

**Concrete rewrite:** use h1 “This page was not found.” and body “Check the
address or return to the home page.” Keep “Return home”. Add the 404 h1/body to
the metaphor/drift assertion.

## What would make this perfect

Give every header link a measured 44×44 px target and make the regression test
select all persistent controls. Preserve meaningful focus through Back and
Forward, register the README build-output claim, and replace the two vague
secondary-route headings with literal task/page language. Re-run all 18 claim
commands and the live 390 px route sweep; only a zero-finding rerun should pass.
