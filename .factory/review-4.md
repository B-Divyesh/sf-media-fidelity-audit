# Adversarial first-read review 4 — Media Fidelity Audit

**Reviewed:** 2026-08-28  
**Candidate:** d75e0ad906e6f79c384d16d216aa901787436d87  
**Live URL:** <https://media-fidelity-audit.sociobot.in>  
**Verdict: FAIL**

The real archive comparison, isolated demo, all declared claims, and local
quality gates pass. The product still fails the zero-finding standard for the
two findings below.

## 1. Cold first read

I opened the live home page before scrolling in independent fresh Chromium
contexts at 390×844 and 1440×900. There were no console/page errors or
horizontal overflow.

| Question | First-read answer | Result |
| --- | --- | --- |
| What does this do? | It checks a saved photo/video archive against an export and writes a JSON report of changed or missing files. | Pass |
| For whom? | Families and photographers before they clear an export. | Pass |
| What should I click first? | **Try it with sample data**. | Pass |

The phone's first screen contains the exact evidence: “Check your archive
against a source folder.”, “For families and photographers checking a saved
copy before clearing an export.”, “Try it with sample data”, and “See the
finished audit after one click.”

## 2. Copy audit

Counts split on whitespace; hyphenated words, flags, paths, numbers, and UI
labels count as one word. Terminal command blocks are code, not sentences.
Every landing and README sentence/label is listed below. No entry exceeds 22
words and none needs a landing/README rewrite this round: the headings name
their sections, terminology is consistent, and the visible actions name
results.

## Landing (`/`)

| Text | Words |
| --- | ---: |
| Skip to main content | 4 |
| MFA Media Fidelity Audit | 4 |
| Demo | 1 |
| How it works | 3 |
| Limits | 1 |
| Privacy | 1 |
| Check an archive without changing your media | 7 |
| Check your archive against a source folder. | 7 |
| For families and photographers checking a saved copy before clearing an export. | 12 |
| Try it with sample data | 5 |
| See the finished audit after one click. | 7 |
| Runs locally with no account. | 5 |
| Does not change either folder. | 5 |
| Free under the MIT License. | 5 |
| One source folder, one archive folder, one JSON audit report. | 10 |
| Command-line demo | 2 |
| See the audit command and its result. | 7 |
| This recording uses the same bundled sample as mfa demo. | 10 |
| Recorded from mfa demo during the site build. | 8 |
| Swipe to read every line. | 5 |
| Exact file match | 3 |
| SHA-256 in the report | 4 |
| Camera details | 2 |
| When the file contains them | 5 |
| Video format and rate | 4 |
| When the file contains them | 5 |
| Live Photo media | 3 |
| Videos and edit files | 4 |
| What the JSON audit report shows | 6 |
| Find files that need attention. | 5 |
| The JSON audit report lists each file’s result, size, SHA-256 value, and available camera or video details. | 17 |
| Bundled family archive | 3 |
| Identical | 1 |
| 3 | 1 |
| Changed | 1 |
| 1 | 1 |
| Missing | 1 |
| 1 | 1 |
| Live Photo pair | 3 |
| 1 | 1 |
| The sample includes valid JPEG, MOV, HEIC, and XMP files. | 10 |
| Three local steps | 3 |
| Compare folders you already trust. | 5 |
| Choose both folders | 3 |
| Choose the exported folder as the source and the stored folder as the archive. | 14 |
| Run the audit | 3 |
| The CLI matches relative paths and hashes each source file. | 10 |
| Keep the JSON report | 4 |
| Review changed, missing, moved, or archive-only paths. | 7 |
| Install from the public source checkout | 6 |
| Run your first audit. | 4 |
| Requires Rust 1.85 or newer. | 5 |
| Copy install command | 3 |
| What this audit does not check | 6 |
| It checks bytes, not picture quality. | 6 |
| Matching hashes prove matching bytes. | 5 |
| They do not judge focus, colour, or composition. | 8 |
| By default it matches relative paths. | 6 |
| Add --find-moved to report byte-identical archive files stored elsewhere. | 9 |
| Compare source folders with local media archives. | 7 |
| Privacy | 1 |
| Terms | 1 |
| Source on GitHub (external) | 4 |
| Built by Param Factory · v0.1.0 | 6 |

## README headings and prose

| Text | Words |
| --- | ---: |
| Media Fidelity Audit | 3 |
| Check a source folder against a local media archive. | 9 |
| Media Fidelity Audit is a command-line tool for families and photographers checking a saved copy before clearing an export. | 19 |
| It matches files by relative path and writes a JSON audit report. | 12 |
| The report includes SHA-256, byte counts, results, and available camera or video details. | 13 |
| It can also report byte-identical files stored at a different archive path. | 12 |
| Try the bundled demo | 4 |
| The demo creates a new temporary workspace from the valid media files in examples/. | 14 |
| It does not read or write your real media. | 9 |
| The five-file sample reports three identical files, one changed file, one missing sidecar, and one upper-case HEIC/MOV Live Photo pair. | 20 |
| Its JPEG records camera metadata. | 5 |
| Its MOV records codec and frame rate. | 7 |
| The command prints the temporary path to its JSON manifest. | 10 |
| Delete that workspace when finished. | 5 |
| The landing page includes a self-hosted recording of the same mfa demo output. | 13 |
| Open the one-click website demo at media-fidelity-audit.sociobot.in/?demo=1. | 7 |
| This page stores nothing; the CLI demo uses a temporary folder. | 11 |
| Install from the public source checkout | 6 |
| Requires Rust 1.85 or newer. | 5 |
| Audit an archive | 3 |
| Choose a new manifest path outside both folders. | 8 |
| The CLI rejects output inside the source folder or archive folder, and it never replaces an existing output. | 18 |
| Exit 0 means every source path is byte-identical. | 8 |
| Exit 1 means the audit found a changed, missing, moved, or unreadable source path. | 14 |
| Exit 2 means input or output failed. | 7 |
| Add --json for a summary on standard output. | 8 |
| Add --include-all to include files outside the default media and sidecar extensions. | 12 |
| Add --find-moved to locate byte-identical archive files at another relative path. | 11 |
| Hashes prove byte equality. | 4 |
| They do not assess visual quality. | 6 |
| Default matching uses relative paths; use --find-moved when an archive may be reorganized. | 13 |
| Develop and verify | 3 |
| npm run build writes the static site to dist/site/. | 9 |
| The factory deploys that directory; this repository does not change infrastructure or DNS. | 13 |
| The public claims and isolated tests are listed in .factory/claims.json. | 10 |
| Demo details are in .factory/demo.md. | 5 |
| Privacy and license | 3 |
| The CLI has no account system or network dependency. | 9 |
| The static demo sends no third-party requests and stores no browser data. | 12 |
| Media Fidelity Audit is free under the MIT License. | 9 |
| See LICENSE. | 2 |

## 3. Demo and sandbox

**Pass.** One activation of **Try it with sample data** opened ?demo=1.
The first rendered screen already showed a completed sample audit: three
identical, one changed, one missing, and one Live Photo pair, with the five
named files. “Demo — sample data, nothing is saved” remained visible. Reset
demo restored the sample and focused its banner. No local/session storage,
IndexedDB database, or service worker was created.

The CLI check also passed from a temporary caller directory: mfa demo printed a
fresh external workspace and manifest; the caller stayed unchanged; file-access
tracing did not read a caller-media sentinel. The landing's visible self-hosted
terminal SVG matched a fresh mfa demo run.

## 4. Claims and clean-clone tests

I created fresh local clones, ran npm ci, and ran every exact command in
.factory/claims.json. All 18 passed. The landing and README claim-like
sentences map to a registered claim; no unlisted claim was found.

| Claim ID | Result |
| --- | --- |
| sample-demo | Pass |
| cli-demo-recording | Pass |
| cli-demo-isolation | Pass |
| archive-comparison | Pass |
| one-click-demo | Pass |
| manifest-content | Pass |
| read-only-safety | Pass |
| read-scope | Pass |
| media-observations | Pass |
| byte-not-perceptual | Pass |
| relative-path-matching | Pass |
| include-all | Pass |
| json-automation | Pass |
| offline-local | Pass |
| static-privacy | Pass |
| source-install | Pass |
| rust-msrv | Pass |
| mit-license | Pass |

The complete fresh home → demo → reset flow made only
media-fidelity-audit.sociobot.in requests and wrote no browser storage.

## 5. Earlier findings: live and code regression check

I read every earlier review, polish document, and handoff. Each prior finding
was rechecked on the live product and in relevant code/tests; none is merely
marked fixed.

| Earlier IDs | This-round confirmation |
| --- | --- |
| F-1-1 | Valid JPEG/MOV/HEIC/XMP fixtures, populated mobile demo, and sample counts are present. |
| F-1-2 | Rust 1.85 is documented and the locked 1.85 test passed. |
| F-1-3 | The clean fixture classifies identical, changed, missing, unreadable, and archive-only paths. |
| F-1-4 | One click reaches the populated query demo with banner and reset. |
| F-1-5 | The manifest test independently verifies paths, bytes, SHA-256, results, and media data. |
| F-1-6 | Tracing opens chosen inputs and excludes a sibling sentinel. |
| F-1-7 | A byte-different fixture reports no perceptual-quality judgement. |
| F-1-8 | Relative matching and tested --find-moved reporting work. |
| F-1-9 | Source-checkout installation clean-installed and ran. |
| F-1-10 | --include-all has default-versus-flag coverage. |
| F-1-11 | CLI networking is denied; the web demo is same-origin and storage-free. |
| F-1-12 | JPEG/MOV/XMP/upper-case Live Photo observations are tested. |
| F-1-13 | Input trees and existing outputs cannot be overwritten. |
| F-1-14 | The hero safety eyebrow is plain and specific. |
| F-1-15 | Proof-strip labels are plain before their technical detail. |
| F-1-16 | “JSON audit report” is used consistently. |
| F-1-17 | The real “SHA-256 value” field is named. |
| F-1-18 | Source folder/archive folder terminology is consistent. |
| F-1-19 | “View install steps” names the demo exit result. |
| F-1-20 | Direct routes have distinct metadata. |
| F-1-21 | An unknown URL returns a shared-shell HTTP 404 with a way home. |
| F-1-22 | GitHub links visibly identify themselves as external. |
| F-1-23 | The generated copy audit covers routes, footer, and README. |
| F-1-24 | Default-off moved-file matching is implemented and tested. |
| F-2-1 | The previously omitted footer/documentation copy remains in the audit. |
| F-2-2 | “Exact-match code” is absent; “SHA-256 value” is present. |
| F-3-1 | The visible self-hosted terminal recording and its claim test pass. |
| F-3-2 | The limits section names what it covers. |
| F-3-3 | The report section names what it covers. |
| F-3-4 | Caller-isolated CLI demo behavior is registered and tested. |

## 6. Structure, links, accessibility, and identity

/, /demo, /privacy, /terms, and /404 return 200; an unknown path returns 404.
Each inspected route has one h1, a route-appropriate title, description,
canonical, OG/Twitter metadata, favicon, and shared header/footer. Discovery
files and the live CSP/HSTS/referrer/nosniff/frame headers are present. All
crawled same-origin links plus the external GitHub link resolved.

Cold #how and #limits deep links reached their targets. In-app route changes
focus the new h1, and Back returns to the prior demo route. Axe found no serious
or critical violation in desktop or phone checks.

The paper-cut archive art, restrained motion, serif/sans pairing, and archival
palette are distinct from a generic SaaS template. The manual mobile
touch-target check below remains a failure.

## 7. Findings

### F-4-1 — Mobile persistent navigation targets are smaller than 44 px

**Severity:** Minor accessibility failure  
**Location:** live home at 390 px; shared .wordmark and footer links in
site/src/style.css.

The phone header’s **MFA** home link measured **42.8×26.3 px**. Footer
**Privacy**, **Terms**, and **Source on GitHub (external)** each measured
**21.7 px high**. These are persistent route controls, not merely adjacent
text. Their small hit areas fail the required 44 px touch-target baseline and
affect every route that shares the header/footer.

**Concrete fix:** give .wordmark and footer a an inline-flex or inline-block
44 px minimum hit area (for example, min-height: 44px; align-items: center),
preserve the 390 px layout, and add a browser assertion for these controls.

### F-4-2 — The 404 eyebrow is a metaphor instead of a useful label

**Severity:** Minor copy failure  
**Location:** live /404 and unknown-route response; site/public/404.html and
site/src/main.ts render “**404 · Thread lost**”.

“Thread lost” is design lore. It does not identify the error for a
screen-reader user or distracted visitor, and violates the no-metaphor rule.
The h1 already says “This archive path is missing.”, so the eyebrow adds only
ambiguity.

**Concrete fix:** replace it in both static and client-rendered 404 templates
with **“404 error”** or remove it. Add a metaphor/drift assertion to the copy
audit.

## What would make this perfect

Make every persistent mobile route control a 44 px touch target, use a literal
404 label, and add regression tests for both. Then a fresh phone review can
reach zero findings.

