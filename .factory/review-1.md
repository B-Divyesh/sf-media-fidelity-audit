# Adversarial first-read review 1 — Media Fidelity Audit

**Reviewed:** 2026-08-28  
**Candidate:** `e34b0c5ed2b9f68d42872fe02f3ba959db3d92f9` (`main`)  
**Live URL:** <https://media-fidelity-audit.sociobot.in>  
**Verdict: FAIL**

The first screen is understandable and the declared test suite passes, but the
product does not meet the zero-finding standard. The demo uses plain-text files
with media extensions, the documented Rust 1.78 minimum fails, several public
claims are absent from the claim registry, and listed tests do not prove every
part of their registered wording.

## 1. Cold first read

I opened the live home page in separate fresh browser contexts at 390×844 and
1440×900 before scrolling.

| Question | First-read answer | Result |
| --- | --- | --- |
| What does this do? | It compares an exported photo/video folder with a local archive and reports originals that are missing or changed. | Pass |
| For whom? | Families and photographers who keep a local media archive. | Pass |
| What should I click first? | **Try it with sample data**. | Pass |

The evidence is visible in both first screens: “Prove your archive kept every
original,” “For families and photographers checking whether a local media
archive still matches an export,” and “Try it with sample data.” On the phone,
all three facts and the adjacent “See a finished audit in one click” line are
visible before the illustration begins. There was no horizontal page overflow
and no console error.

## 2. Copy audit

Word counts treat a hyphenated token, number, flag, or path as one word. No
sentence exceeds 22 words and none contains a banned marketing word. Claim and
plain-language problems are referenced in the findings column.

### Live landing page

| Sentence | Words | Finding |
| --- | ---: | --- |
| Prove your archive kept every original. | 6 | F-1-3 |
| For families and photographers checking whether a local media archive still matches an export. | 14 | — |
| See a finished audit in one click. | 7 | F-1-4 |
| Reads source and archive folders only. | 6 | F-1-6 |
| No account or network connection needed. | 6 | F-1-11 |
| Free under the MIT License. | 5 | Registered and tested |
| One source, one archive, one clear record. | 7 | F-1-5, F-1-16 |
| Find the files that need attention. | 6 | F-1-3 |
| The JSON manifest records the hash, byte count, status, and available media facts for each path. | 16 | F-1-5, F-1-17 |
| The sample also includes one uppercase Live Photo pair. | 9 | Registered and tested |
| Compare the folders you already trust. | 6 | F-1-3 |
| Pass the export as source and the library as archive. | 10 | F-1-18 |
| The CLI hashes matching paths and reads available media facts. | 10 | F-1-5 |
| Review changed or missing paths in the new JSON file. | 10 | F-1-5 |
| Run your first audit. | 4 | — |
| The crate is not published yet. | 6 | F-1-9 |
| These commands use the public source checkout. | 7 | F-1-9 |
| It verifies bytes, not image quality. | 6 | F-1-7 |
| Matching hashes prove matching bytes. | 5 | F-1-7 |
| They do not judge focus, colour, or composition. | 8 | F-1-7 |
| The audit matches relative paths. | 5 | F-1-8 |
| It cannot identify renamed or rearranged files. | 7 | F-1-8, F-1-24 |
| Compare local media archives by byte identity. | 7 | F-1-3, F-1-15 |

### README

| Sentence | Words | Finding |
| --- | ---: | --- |
| Compare exported photos and videos with a local archive. | 9 | F-1-3 |
| Media Fidelity Audit is a command-line tool for families and photographers checking their originals. | 14 | — |
| It matches files by relative path and records SHA-256 identity in JSON. | 12 | F-1-5, F-1-8 |
| It also records available JPEG EXIF, MOV/MP4/HEIC container facts, sidecars, and same-stem Live Photo pairs. | 15 | F-1-12, F-1-17 |
| The CLI needs no account or network connection. | 8 | F-1-11 |
| The demo creates a new temporary workspace from the files in `examples/`. | 12 | Registered and tested |
| It does not read or write your real media. | 9 | F-1-1, F-1-13 |
| The five-file sample reports three identical files, one changed file, one missing sidecar, and one uppercase HEIC/MOV Live Photo pair. | 20 | F-1-1; counts are registered and tested |
| The command prints the temporary path to its JSON manifest. | 10 | Registered and tested |
| Delete that workspace when finished. | 5 | — |
| The website demo is at `media-fidelity-audit.sociobot.in/demo`. | 6 | Link passed |
| Requires Rust 1.78 or newer. | 5 | F-1-2 |
| The crate is not published yet, so install from a checkout. | 11 | F-1-9 |
| Choose a new manifest path outside both input trees. | 9 | F-1-18 |
| The CLI rejects existing output files and any output inside the source or archive. | 14 | F-1-13 |
| Exit `0` means every mapped file is byte-identical. | 8 | Registered and tested |
| Exit `1` means the audit found a changed, missing, or unreadable file. | 12 | Registered and tested |
| Exit `2` means input or output failed. | 7 | Registered and tested |
| Add `--json` for a summary on standard output. | 8 | Registered and tested |
| Add `--include-all` to include files outside the default media and sidecar extensions. | 12 | F-1-10 |
| Hashes prove byte equality. | 4 | F-1-7 |
| They do not assess visual quality or match renamed files. | 10 | F-1-7, F-1-8, F-1-24 |
| `npm run build` writes the static site to `dist/site/`. | 9 | Verified by build; not a product claim |
| The factory deploys that directory; this repository does not change infrastructure or DNS. | 13 | Repository policy, not a product claim |
| The public claims and their isolated tests are listed in `.factory/claims.json`. | 11 | F-1-3 through F-1-13 show this is incomplete |
| Demo details are in `.factory/demo.md`. | 5 | File exists |
| The static site sends no third-party requests and stores no browser data during the demo. | 15 | Registered and tested |
| The CLI and site contain no analytics or telemetry. | 9 | F-1-11 |
| Media Fidelity Audit is free under the MIT License. | 9 | Registered and tested |
| See `LICENSE`. | 2 | Link passed |

### Headings, labels, buttons, and terminology

The h1/h2/h3 outlines make sense out of context. **Try it with sample data**,
**Reset demo**, **Copy demo command**, **Copy install command**, and **Return
home** name their result. Findings F-1-14 through F-1-19 cover the remaining
jargon, vague label, terminology, and audit-record defects. In particular,
**Start for real** does not name the result.

## 3. Demo and sandbox

The home action opens `/demo` in one click. The new screen has one h1, the
persistent “Demo — sample data, nothing is saved” banner, Reset demo, Start for
real, a terminal recording, and the five-file summary. Reset restores the
sample and announces “Demo reset to the bundled sample.” Back returns to the
demo with focus on its h1.

In a fresh browser context, the complete home → demo → reset flow requested
only `https://media-fidelity-audit.sociobot.in`, left localStorage and
sessionStorage empty, created no IndexedDB databases, and registered no service
worker. Running `target/debug/mfa demo` from a new empty working directory left
that directory empty and created a unique `/tmp/mfa-demo-…` workspace.

The isolation mechanics pass. The sample fidelity does not; see F-1-1.

## 4. Claims

I made a clean local clone, ran `npm ci`, and executed every `test` string from
`.factory/claims.json` exactly as written.

| Claim ID | Result | Evidence |
| --- | --- | --- |
| `sample-demo` | Pass | Exit 0; manifest summary is 5 source, 3 identical, 1 changed, 1 missing, 1 sidecar, 1 pair. |
| `read-only-safety` | Pass | Existing archive output and new source-tree output were rejected. |
| `media-observations` | Pass | Tagged wrapper ran the JPEG EXIF, MOV codec/frame-rate, and uppercase pair tests. |
| `json-automation` | Pass | JSON result and exit 0/1/2 checks passed. |
| `offline-local` | Pass | `mfa demo` passed with socket/connect calls denied. |
| `static-privacy` | Pass | Browser requests remained same-origin and storage stayed empty. |
| `mit-license` | Pass | `LICENSE` and Cargo metadata identify MIT. |

Passing these commands does not close the unlisted and under-tested claim
findings below. The separate Rust 1.78 check failed.

## 5. History and regression check

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files.
I read the existing handoff and both verification reports. Its earlier repair
areas were rechecked as follows.

| Earlier area | Current result |
| --- | --- |
| Output could overwrite media | Fixed in code and tests; existing output and in-tree output are rejected. Claim test breadth remains incomplete (F-1-13). |
| Missing claims/demo | Partly fixed; registry and routes exist, but sample media is not real and coverage is incomplete (F-1-1, F-1-3–F-1-13). |
| Upper-case Live Photo pair | Fixed; exact fixture test passes. |
| EXIF/codec/frame-rate observations | Fixed for dedicated valid fixtures; not demonstrated by the bundled demo (F-1-1). |
| Unimplemented paid offer | Fixed; no paid offer remains. |
| Unavailable registry install | Fixed by showing source install; the claimed MSRV is false (F-1-2). |
| Lint failure | Fixed; formatting, Clippy with warnings denied, and TypeScript pass. |
| Focus/dark contrast | Fixed; live Axe sweeps and keyboard checks pass. |
| Site/deploy policy | Partly fixed; routes and headers work, but route social metadata and the deployed 404 shell remain inconsistent (F-1-20, F-1-21). |
| Performance | Fixed for the stated budget; production JS is 9.53 kB (3.61 kB gzip). |

## 6. Structure, links, accessibility, and identity

| Check | Result |
| --- | --- |
| Title, `lang`, one h1, main, route focus announcement | Pass on `/`, `/demo`, `/privacy`, `/terms`, and both 404 paths |
| Meta description and client-side canonical | Pass after JavaScript; initial/crawler metadata has F-1-20 |
| Favicon, touch icon, 1200×630 OG image, robots, sitemap | Pass |
| Deep links, history, back button, anchor targets | Pass |
| Internal/external link crawl | All intended targets return 200; external labelling has F-1-22 |
| Designed 404 | Present and returns HTTP 404; common shell has F-1-21 |
| Header/footer Privacy and Terms | Pass on SPA routes; fail on deployed `404.html` (F-1-21) |
| Keyboard, visible focus, reduced motion, 390 px overflow | Pass |
| Axe serious/critical violations | Zero in live desktop light, phone light, and phone dark sweeps |
| Console errors | Zero on normal routes; only the expected failed-resource message on an intentional 404 |
| Visual identity | Pass: the paper-cut archive diorama, paper palette, serif/sans pairing, and thread motif are product-specific rather than a generic SaaS card template |

## 7. Findings

### Blocking

#### F-1-1 — The demo media is not media, and the phone result is obscured

**Quote/location:** `/demo`: “Five bundled files in an isolated temporary
folder,” “This result comes from the same five files shipped with the CLI,” and
README: “The five-file sample…” The files under `examples/` have `.jpg`,
`.HEIC`, and `.MOV` names but are 50–60 byte plain-text sentences. Every
`media` field in the generated sample manifest is `null`. At 390 px, the
no-wrap terminal hides the changed/missing counts off the right edge; the
visible result card values begin below the first screen. The static web page
also has no temporary folder; it is a hard-coded recording.

**Why this fails:** A visitor is shown plausible filenames and a family-archive
result, but the sample cannot exercise the advertised EXIF, codec, frame-rate,
or media parsing. This is not the required realistic, opinionated sample and
weakens the first product screen.

**Concrete fix:** Ship small valid, original JPEG/HEIC/MOV/XMP fixtures with
real metadata, a changed derivative, and a missing sidecar. Generate the web
recording/result from the CLI manifest during the build, wrap its summary on
390 px, and put the complete status counts above the fold. Change the banner
to “This page stores nothing; `mfa demo` uses a temporary folder.” Add a claim
test that validates media signatures, non-null observations, DOM values, and
CLI/web parity.

#### F-1-2 — The stated Rust 1.78 minimum is false and unregistered

**Quote/location:** README line 28: “Requires Rust 1.78 or newer.”

**Why this fails:** In the clean clone, `cargo +1.78.0 check --locked` fails on
locked `clap 4.6.6`: “feature `edition2024` is required” and that feature is not
stabilized in Cargo 1.78. A user following the documented prerequisite cannot
build the CLI.

**Concrete fix:** Either pin dependencies compatible with 1.78 or state the
actual minimum. Register `rust-msrv` in `claims.json` and run the locked build
with that exact toolchain in CI.

#### F-1-3 — The core archive-retention claim is unlisted

**Quote/location:** home h1: “Prove your archive kept every original.” README:
“Compare exported photos and videos with a local archive.” Footer: “Compare
local media archives by byte identity.”

**Why this fails:** No claim entry directly states and tests the product's core
job on an independently created source/archive fixture. `sample-demo` only
checks fixed sample totals.

**Concrete fix:** Add `archive-comparison` with a tagged test that independently
creates identical, changed, missing, unreadable, and archive-only cases and
asserts each observable classification; narrow “every original” if archive-only
or renamed files remain outside scope.

#### F-1-4 — The “one click” claim is unlisted

**Quote/location:** home, beside the primary action: “See a finished audit in
one click.”

**Why this fails:** This is a quantitative interaction claim. A browser test
performs a click, but no `claims.json` entry owns this wording.

**Concrete fix:** Register `one-click-demo` and tag the existing navigation test
after extending it to assert the banner and populated result on the first
render.

#### F-1-5 — Manifest contents and hashing claims are unlisted

**Quote/location:** home: “The JSON manifest records the hash, byte count,
status, and available media facts for each path” and “The CLI hashes matching
paths…” README: “It matches files by relative path and records SHA-256 identity
in JSON.”

**Why this fails:** `json-automation` asserts only the summary and exit codes;
it never checks an asset's path, byte count, SHA-256, or status.

**Concrete fix:** Add `manifest-content` with valid fixtures and assert every
named field and its independently calculated SHA-256.

#### F-1-6 — The read-boundary claim is unlisted

**Quote/location:** home: “Reads source and archive folders only.” Privacy:
“Media Fidelity Audit reads files only from the source and archive folders you
choose.”

**Why this fails:** `read-only-safety` concerns writes, not which files are
read. The public privacy statement therefore has no registered evidence.

**Concrete fix:** Register `read-scope`, run an audit under filesystem-access
tracing, and assert that content reads stay within the two input trees (apart
from runtime/config files that the claim explicitly discloses).

#### F-1-7 — Byte-proof and image-quality limit claims are unlisted

**Quote/location:** home: “It verifies bytes, not image quality,” “Matching
hashes prove matching bytes,” and “They do not judge focus, colour, or
composition.” README: “Hashes prove byte equality. They do not assess visual
quality…” Terms repeats the same distinction.

**Why this fails:** These are central scope claims a visitor relies on, but no
claim entry checks the output fields or confirms that no perceptual-quality
result is emitted.

**Concrete fix:** Add a `byte-not-perceptual` claim test using visually similar
but byte-different files and assert a changed result with no quality judgement.

#### F-1-8 — Relative-path and rename-limit claims are unlisted

**Quote/location:** home: “The audit matches relative paths. It cannot identify
renamed or rearranged files.” README repeats that it “matches files by relative
path” and does not “match renamed files.”

**Why this fails:** No claim test establishes the stated matching rule or its
rename behavior.

**Concrete fix:** Register `relative-path-matching` and test same-name,
same-bytes-at-a-different-path, case, and nested-path cases. Retain the limit in
copy only while the test proves it.

#### F-1-9 — Source-install and registry-status claims are unlisted

**Quote/location:** home: “The crate is not published yet. These commands use
the public source checkout.” README: “The crate is not published yet, so
install from a checkout.”

**Why this fails:** The source install worked in this review and `cargo search`
returned no package, but neither visitor-facing claim has a registered test;
registry status can also change independently of this repository.

**Concrete fix:** Keep one stable sentence, “Install from the public source
checkout,” register a clean-clone `cargo install --path .` test, and remove the
transient registry-status sentence unless release automation owns it.

#### F-1-10 — `--include-all` is an unlisted feature claim

**Quote/location:** README: “Add `--include-all` to include files outside the
default media and sidecar extensions.”

**Why this fails:** No claim entry or tagged test checks this promised behavior.

**Concrete fix:** Add `include-all` and assert that an otherwise excluded file
is absent by default and present with the flag.

#### F-1-11 — Offline and telemetry evidence covers only the demo command

**Quote/location:** home/README: “No account or network connection needed.”
Privacy: “The CLI has no account system, network dependency, analytics, or
telemetry.” README: “The CLI and site contain no analytics or telemetry.”

**Why this fails:** `offline-local` denies network syscalls only for `mfa demo`.
It does not execute the real `mfa audit` job, and the broader telemetry wording
is not a registered claim. The site privacy test is limited to the demo flow.

**Concrete fix:** Register the exact CLI privacy wording and run both demo and
a normal audit with network denied. Keep the web claim scoped to the tested
routes/flow or crawl every route while recording requests and storage.

#### F-1-12 — The media-observations claim does not test sidecars

**Quote/location:** `claims.json`: “The manifest records JPEG EXIF fields, MOV
codec and frame rate, sidecars, and upper-case Live Photo pairs when present.”

**Why this fails:** The tagged wrapper runs three tests for JPEG, MOV, and the
pair. It does not assert sidecar classification or manifest content. Another
claim's sample test happens to count one sidecar, but the required single test
for `media-observations` does not prove all its wording.

**Concrete fix:** Add a valid XMP sidecar to the tagged media-observations test
and assert its kind, relative path, hash, and relationship/output behavior.

#### F-1-13 — The read-only claim test does not cover its full wording

**Quote/location:** `claims.json`: “An audit never writes into or replaces a
source or archive file.”

**Why this fails:** Its exact tagged test checks an existing archive file and a
new path under source. It does not check an existing source file or a new path
under archive, and it hashes only the archive file. The broader Rust unit test
is not selected by the claim command.

**Concrete fix:** In the tagged claim test, attempt existing and new output
paths in both trees and compare a recursive before/after file-and-hash snapshot
of both inputs.

### Minor

#### F-1-14 — “Read-only archive proof” is abstract first-screen jargon

**Quote/location:** home eyebrow: “Read-only archive proof.”

**Why this matters:** “Proof” does not tell a cold visitor what is checked, and
“read-only” does not say which data remains unchanged.

**Concrete rewrite:** “Check an archive without changing your media.”

#### F-1-15 — The proof strip uses unexplained abbreviations

**Quote/location:** home strip: “SHA-256 / Byte identity,” “EXIF / Camera
facts,” “codec + fps / Motion facts,” and “Live Photos / Pairs and sidecars.”

**Why this matters:** The intended family audience must decode four technical
labels before understanding the result.

**Concrete rewrite:** “Exact file match,” “Camera details,” “Video format and
frame rate,” and “Live Photo videos and edit files.” Put SHA-256, EXIF, codec,
and sidecar in secondary detail.

#### F-1-16 — “One clear record” does not name the output

**Quote/location:** hero caption: “One source, one archive, one clear record.”

**Why this matters:** “Record” is vague and the following section switches to
“manifest.”

**Concrete rewrite:** “One source, one archive, one JSON audit report.”

#### F-1-17 — The manifest explanation is dense and jargon-heavy

**Quote/location:** home: “The JSON manifest records the hash, byte count,
status, and available media facts for each path.” README also leads with “JPEG
EXIF, MOV/MP4/HEIC container facts, sidecars, and same-stem Live Photo pairs.”

**Why this matters:** Both sentences are under the word cap but require several
specialist terms at once.

**Concrete rewrite:** “The audit report lists each file’s result, size,
exact-match code, and available camera or video details.” Add an optional
technical-details list for the formats.

#### F-1-18 — The same folders receive inconsistent names

**Quote/location:** home: “Pass the export as source and the library as
archive.” README later calls them “input trees” and “mapped” files.

**Why this matters:** The declared terminology table says the stable words are
“source” and “archive,” but the instructions introduce four alternatives.

**Concrete rewrite:** “Choose the exported folder as the source and the stored
folder as the archive.” Use “source folder,” “archive folder,” and “source
file” throughout.

#### F-1-19 — “Start for real” does not name the result

**Quote/location:** demo banner link: “Start for real.”

**Why this matters:** It actually opens installation instructions; the label
does not tell the user what will happen.

**Concrete rewrite:** “View install steps.”

#### F-1-20 — Direct subroutes publish home-page social metadata

**Quote/location:** direct `/demo`, `/privacy`, `/terms`, and `/404` loads retain
`og:title` “Media Fidelity Audit — compare archive originals” and the home OG
description. Their raw HTML also initially declares `/` as canonical; only the
browser script corrects the canonical, title, and ordinary description.

**Why this matters:** Link-preview crawlers do not generally run the SPA, so a
shared demo or policy link is described and canonicalized as the home page.

**Concrete fix:** Pre-render route HTML (or serve route-specific shells) with
the route title, description, canonical, OG, and Twitter fields; add raw-HTML
tests for every route.

#### F-1-21 — The deployed 404 does not use the common header/footer

**Quote/location:** an unknown path returns `site/public/404.html`, whose header
contains only Demo and whose footer omits Privacy, Terms, Source, and the
product one-liner structure used elsewhere.

**Why this matters:** The site-structure contract requires the common shell on
every route. `/404` and an actual unknown URL currently render different
navigation/footer structures.

**Concrete fix:** Make the deployed 404 use the same wordmark, four-link header,
Privacy/Terms footer, metadata set, and visual tokens as the SPA 404. Test the
actual unknown-path response, not only the `/404` SPA route.

#### F-1-22 — External GitHub links are not identified as external

**Quote/location:** footer “Source” and Privacy “public source repository.”

**Why this matters:** Both leave the product origin without saying so, contrary
to the structure rule.

**Concrete rewrite:** “Source on GitHub (external)” and “Open the GitHub source
repository (external).” An accessible icon with equivalent text is also valid.

#### F-1-23 — The existing copy-audit artifact is incomplete and miscounts words

**Quote/location:** `.factory/copy-audit.md` says the first-screen audience
sentence has 13 words (it has 14), “Find the files…” has 7 (it has 6), and
“Compare the folders…” has 7 (it has 6). It omits the landing footer sentence
and every README sentence.

**Why this matters:** The repository's stated proof of copy simplicity is not a
reproducible audit.

**Concrete fix:** Generate the audit from rendered route text plus README,
record the counting rule, include labels/buttons separately, and make the check
fail on drift.

### Missed leverage

`.factory/brief.json` is absent, so this check uses the shipped product scope,
README, and explicit landing-page limitation as its evidence.

#### F-1-24 — The audit cannot distinguish a moved original from a missing one

**Quote/location:** home: “It cannot identify renamed or rearranged files.”

**Why this matters:** A local photo library commonly reorganizes imported media.
When the same bytes exist under a different path, reporting only “missing” sends
the user toward unnecessary recovery work.

**Concrete feature:** Add an explicit `--find-moved` mode that indexes archive
files by size and SHA-256, reports `moved` with the found archive path, and keeps
the current faster relative-path mode as the default. Cover duplicate hashes,
large trees, and privacy/offline behavior with a registered claim. AI is not
appropriate here; deterministic hashing is more accurate and preserves the
local-only model.

## 8. Verification summary

From the clean clone:

* All seven exact `claims.json` commands passed.
* `npm run check`, `npm test`, `npm run build`, and `cargo package` passed.
* The suite passed 9 Rust tests, 6 CLI claim tests, 3 site tests, and 5 browser
  tests.
* `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`
  passed all five live browser/Axe tests.
* A clean `cargo install --path .` completed and installed `mfa`.
* `cargo +1.78.0 check --locked` failed, confirming F-1-2.
* The live crawl found no dead intended link; discovery and image assets return
  200, and an unknown path returns the designed 404 with status 404.

## What would make this perfect

Replace the disguised text fixtures with valid media and make the web demo a
build-verified rendering of the real CLI result. Correct and test the minimum
Rust version. Register every public capability, limit, privacy statement, and
quantitative interaction, then make each tagged test cover its entire wording.
Rewrite the jargon and terminology flagged above, name the install action,
pre-render route metadata, unify the real 404 shell, label external links, and
add optional moved-file detection. Re-run this complete review from fresh
browser contexts and a clean clone; acceptance requires zero remaining
findings.
