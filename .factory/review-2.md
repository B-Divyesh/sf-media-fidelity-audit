# Adversarial first-read review 2 — Media Fidelity Audit

**Reviewed:** 2026-08-28  
**Candidate:** `d2de907b97e6ce22f4aad1fb11226c79c963d0df`  
**Live URL:** <https://media-fidelity-audit.sociobot.in>  
**Verdict: FAIL**

The live product is clear, tryable, local-first, and visually specific. One
previous copy-audit finding is only partly fixed, and one remaining landing
sentence uses an undefined term for a field the report does not contain. The
zero-finding standard is therefore not met.

## 1. Cold first read

I opened the live home route in separate new Chromium contexts at 390×844 and
1440×900, without scrolling. Both contexts loaded with no console or page
errors and no horizontal overflow.

| First-read question | Answer from the first screen | Result |
| --- | --- | --- |
| What does it do? | It checks a saved media archive against a source folder without changing either folder. | Confirmed |
| For whom? | Families and photographers checking a saved copy before clearing an export. | Confirmed |
| What should I click first? | **Try it with sample data**; the adjacent line says it shows the finished audit after one click. | Confirmed |

The exact first-screen evidence is “Check your archive against a source
folder.”, “For families and photographers checking a saved copy before
clearing an export.”, and “Try it with sample data.” All three plain facts are
also visible on the 390 px screen.

## 2. Copy audit

Counts split on whitespace; a flag, path, number, and hyphenated token each
count as one word. Code examples are commands rather than sentences. The
landing table includes its headings and labels so heading/context checks are
auditable. No entry exceeds 22 words. The banned marketing words do not occur.

### Landing page

| Text | Words | Result |
| --- | ---: | --- |
| Check an archive without changing your media | 7 | Pass |
| Check your archive against a source folder. | 8 | Pass |
| For families and photographers checking a saved copy before clearing an export. | 12 | Pass |
| Try it with sample data | 5 | Result-naming action |
| See the finished audit after one click. | 7 | Registered claim |
| Runs locally with no account. | 5 | Registered claim |
| Does not change either folder. | 5 | Registered claim |
| Free under the MIT License. | 5 | Registered claim |
| One source folder, one archive folder, one JSON audit report. | 10 | Pass |
| Exact file match | 3 | Pass |
| SHA-256 in the report | 4 | Pass |
| Camera details | 2 | Pass |
| When the file contains them | 5 | Pass |
| Video format and rate | 4 | Pass |
| When the file contains them | 5 | Pass |
| Live Photo media | 3 | Pass |
| Videos and edit files | 4 | Pass |
| A report shows what happened | 6 | Pass |
| Find files that need attention. | 6 | Pass |
| The JSON audit report lists each file’s result, size, exact-match code, and available camera or video details. | 17 | F-2-2 |
| Bundled family archive | 3 | Pass |
| The sample includes valid JPEG, MOV, HEIC, and XMP files. | 10 | Registered claim |
| Three local steps | 3 | Pass |
| Compare folders you already trust. | 5 | Pass |
| Choose both folders | 3 | Pass |
| Choose the exported folder as the source and the stored folder as the archive. | 14 | Pass |
| Run the audit | 3 | Pass |
| The CLI matches relative paths and hashes each source file. | 10 | Registered claim |
| Keep the JSON report | 4 | Pass |
| Review changed, missing, moved, or archive-only paths. | 7 | Registered claim |
| Install from the public source checkout | 6 | Pass |
| Run your first audit. | 5 | Pass |
| Requires Rust 1.85 or newer. | 5 | Registered claim |
| Clear limits | 2 | Pass |
| It checks bytes, not picture quality. | 7 | Registered claim |
| Matching hashes prove matching bytes. | 5 | Registered claim |
| They do not judge focus, colour, or composition. | 8 | Registered claim |
| By default it matches relative paths. | 5 | Registered claim |
| Add --find-moved to report byte-identical archive files stored elsewhere. | 9 | Registered claim |
| Compare source folders with local media archives. | 7 | Pass; missing from the repository copy audit (F-2-1) |

### README

| Text | Words | Result |
| --- | ---: | --- |
| Check a source folder against a local media archive. | 9 | Pass |
| Media Fidelity Audit is a command-line tool for families and photographers checking a saved copy before clearing an export. | 18 | Pass |
| It matches files by relative path and writes a JSON audit report. | 12 | Registered claim |
| The report includes SHA-256, byte counts, results, and available camera or video details. | 13 | Registered claim |
| It can also report byte-identical files stored at a different archive path. | 12 | Registered claim |
| The demo creates a new temporary workspace from the valid media files in examples/. | 14 | Registered claim |
| It does not read or write your real media. | 10 | Registered claim |
| The five-file sample reports three identical files, one changed file, one missing sidecar, and one upper-case HEIC/MOV Live Photo pair. | 20 | Registered claim |
| Its JPEG records camera metadata. | 5 | Registered claim |
| Its MOV records codec and frame rate. | 7 | Registered claim |
| The command prints the temporary path to its JSON manifest. | 10 | Registered claim |
| Delete that workspace when finished. | 5 | Pass |
| The website demo is at media-fidelity-audit.sociobot.in/demo. | 6 | Pass; missing from the repository copy audit (F-2-1) |
| This page stores nothing; the CLI demo uses a temporary folder. | 11 | Registered claim |
| Requires Rust 1.85 or newer. | 5 | Registered claim |
| Choose a new manifest path outside both folders. | 8 | Pass |
| The CLI rejects output inside the source folder or archive folder, and it never replaces an existing output. | 17 | Registered claim |
| Exit 0 means every source path is byte-identical. | 8 | Registered claim |
| Exit 1 means the audit found a changed, missing, moved, or unreadable source path. | 14 | Registered claim |
| Exit 2 means input or output failed. | 8 | Registered claim |
| Add --json for a summary on standard output. | 8 | Registered claim |
| Add --include-all to include files outside the default media and sidecar extensions. | 11 | Registered claim |
| Add --find-moved to locate byte-identical archive files at another relative path. | 11 | Registered claim |
| Hashes prove byte equality. | 4 | Registered claim |
| They do not assess visual quality. | 6 | Registered claim |
| Default matching uses relative paths; use --find-moved when an archive may be reorganized. | 12 | Registered claim |
| npm run build writes the static site to dist/site/. | 9 | Repository instruction |
| The factory deploys that directory; this repository does not change infrastructure or DNS. | 13 | Repository instruction |
| The public claims and isolated tests are listed in .factory/claims.json. | 11 | Pass |
| Demo details are in .factory/demo.md. | 5 | Pass |
| The CLI has no account system or network dependency. | 10 | Registered claim |
| The static demo sends no third-party requests and stores no browser data. | 11 | Registered claim |
| Media Fidelity Audit is free under the MIT License. | 9 | Registered claim |

Terms are consistent: **source folder**, **archive folder**, **JSON audit
report**, **demo**, and **Live Photo pair**. Buttons name results: **Try it with
sample data**, **Reset demo**, **View install steps**, **Copy install command**,
and **Copy demo command**.

## 3. Demo, sandbox, and CLI

The first-screen action opened `/demo` in one click. Its first rendered product
screen already showed a realistic five-file result: 3 identical, 1 changed, 1
missing, and 1 Live Photo pair. The persistent banner read “Demo — sample data,
nothing is saved,” included **Reset demo** and **View install steps**, and Reset
announced “Demo reset to the bundled sample.” At 390 px it had no horizontal
overflow.

In a fresh browser context, the complete home → demo → reset flow made requests
only to `https://media-fidelity-audit.sociobot.in`; localStorage,
sessionStorage, IndexedDB, and service-worker registrations remained empty.
`mfa demo`, run from a new empty temporary working directory, created an
`/tmp/mfa-demo-…` workspace and left the caller's directory empty. Its manifest
contained valid JPEG, MOV, HEIC, and XMP observations and the documented result.

## 4. Claims and clean-clone tests

I cloned the candidate into a new `/tmp/mfa-review2-clean-*` directory, ran
`npm ci`, then executed every exact `test` string from `.factory/claims.json`.
All 16 passed: `sample-demo`, `archive-comparison`, `one-click-demo`,
`manifest-content`, `read-only-safety`, `read-scope`, `media-observations`,
`byte-not-perceptual`, `relative-path-matching`, `include-all`,
`json-automation`, `offline-local`, `static-privacy`, `source-install`,
`rust-msrv`, and `mit-license`.

The same clean clone also passed `npm test`, `npm run check`, `npm run build`,
and `cargo package`; the packaged crate and `dist/site/` were produced. The
live `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`
sweep passed its desktop/mobile route, keyboard, history, focus, reset,
reduced-motion, and Axe checks. Every visitor-reliance sentence above maps to
a listed claim except the inaccurate “exact-match code” wording in F-2-2.

## 5. History check

I read every earlier review, polish, verification, and handoff file. Live and
code checks confirm F-1-1 through F-1-22 and F-1-24 are fixed: valid fixtures,
Rust 1.85, complete registered CLI behavior, sandbox isolation, actual route
metadata, common-shell actual 404, external-link labels, and `--find-moved` are
present and tested. F-1-23 is only partly fixed: the new audit is much broader,
but it still omits visitor copy. It recurs as F-2-1.

## 6. Structure, accessibility, links, and identity

`/`, `/demo`, `/privacy`, `/terms`, `/404`, and an actual unknown route were
checked live. Each rendered route had one `<h1>`, one `<main>`, its expected
title, common header/footer, and a skip link. The unknown route returned HTTP
404 and used the designed common shell. Raw route HTML had route-specific
description, canonical, OG/Twitter metadata and the local OG image. Favicon,
Apple touch icon, `robots.txt`, `sitemap.xml`, CSP, privacy and terms routes
were present. Every discovered internal and GitHub link returned 200.

The identity is not a generic SaaS template: the cut-paper archive, terracotta
folder, navy archive box, thread motif, paper palette, and serif/system-sans
pairing match the documented archive-audit thesis. No AI feature is expected:
the core job is deterministic local byte comparison, and it has the expected
JSON export and moved-file option without provider keys.

## 7. Findings

### Blocking

#### F-2-1 — The required repository copy audit is incomplete (recurrence of F-1-23)

**Location:** `.factory/copy-audit.md` says it audited the landing and README
and that every sentence is included. It omits the live landing footer sentence
“Compare source folders with local media archives.” It also omits README
sentences “The website demo is at media-fidelity-audit.sociobot.in/demo.”,
“The public claims and isolated tests are listed in .factory/claims.json.”, and
“Demo details are in .factory/demo.md.”

**Why this fails:** The previous finding required a complete, reproducible copy
audit. A file that announces complete coverage while omitting visible copy
cannot verify the plain-words gate or detect future drift.

**Concrete fix:** Generate `.factory/copy-audit.md` from the rendered landing
and README, including footer copy and documentation sentences, with the stated
counting rule. Add a test that fails when either source has a sentence absent
from the audit.

### Minor

#### F-2-2 — “Exact-match code” is undefined and does not name a reported field

**Location:** landing preview: “The JSON audit report lists each file’s result,
size, exact-match code, and available camera or video details.” The generated
manifest contains `status`, `bytes`, and `sha256`; it has no field or term named
“exact-match code.”

**Why this matters:** A first-time visitor cannot tell whether this means the
matching status or the SHA-256 value. It reintroduces the jargon concern behind
F-1-17 and is not the terminology used in the report or claim registry.

**Concrete rewrite:** “The JSON audit report lists each file’s result, size,
SHA-256 value, and available camera or video details.”

## What would make this perfect

Make the generated copy audit complete and enforce it in a test. Replace the
undefined “exact-match code” phrase with the actual `SHA-256` field name. Then
rerun the clean-clone claim commands and the live browser sweep.
