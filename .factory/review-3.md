# Adversarial first-read review 3 — Media Fidelity Audit

**Reviewed:** 2026-08-28  
**Candidate:** `33e6e0d853ba2096f98d81a3443531bfe9c10af3`  
**Live URL:** <https://media-fidelity-audit.sociobot.in>  
**Verdict: FAIL**

The core CLI and one-click web sample are clear and function correctly. This is not a zero-finding release: the CLI landing page lacks the required self-hosted terminal recording of the real sample command, and several short labels still use non-informative or metaphorical copy. All declared claim tests pass; the recording gap is not represented by a claim.

## 1. Cold first read

I opened the home page in separate fresh Chromium contexts at 390×844 and 1440×900, before scrolling. There were no console errors or horizontal overflow.

| Question | Answer from the first screen | Result |
| --- | --- | --- |
| What does this do? | It checks a local media archive against a source/export folder and leaves the folders unchanged. | Confirmed |
| For whom? | Families and photographers checking a saved copy before deleting an export. | Confirmed |
| What should I click first? | **Try it with sample data**. The adjacent text says a finished audit appears after one click. | Confirmed |

The exact visible evidence was “Check your archive against a source folder.”, “For families and photographers checking a saved copy before clearing an export.”, and “Try it with sample data”. The three privacy/price facts were also visible at 390px without scrolling.

## 2. Copy audit

Counts split on whitespace. Commands are excluded because they are executable input rather than visitor sentences. No landing or README entry exceeds 22 words or contains a banned marketing word. “Registered” means the statement maps to a declared and passing claim. Headings and labels are included so the plain-words review remains reproducible.

### Landing page

| Text | Words | Result |
| --- | ---: | --- |
| Check an archive without changing your media | 7 | Clear eyebrow |
| Check your archive against a source folder. | 8 | Registered (`archive-comparison`) |
| For families and photographers checking a saved copy before clearing an export. | 12 | Clear audience/situation |
| Try it with sample data | 5 | Result-naming action |
| See the finished audit after one click. | 7 | Registered (`one-click-demo`) |
| Runs locally with no account. | 5 | Registered (`offline-local`) |
| Does not change either folder. | 5 | Registered (`read-only-safety`) |
| Free under the MIT License. | 5 | Registered (`mit-license`) |
| One source folder, one archive folder, one JSON audit report. | 10 | Clear caption |
| Exact file match | 3 | Clear label |
| SHA-256 in the report | 4 | Clear supporting label |
| Camera details | 2 | Clear label |
| When the file contains them | 5 | Clear qualifier |
| Video format and rate | 4 | Clear label |
| When the file contains them | 5 | Clear qualifier |
| Live Photo media | 3 | Clear label |
| Videos and edit files | 4 | Clear supporting label |
| A report shows what happened | 6 | F-3-3 |
| Find files that need attention. | 6 | Clear section headline |
| The JSON audit report lists each file’s result, size, SHA-256 value, and available camera or video details. | 17 | Registered (`manifest-content`) |
| Bundled family archive | 3 | Clear sample label |
| The sample includes valid JPEG, MOV, HEIC, and XMP files. | 10 | Registered (`sample-demo`) |
| Three local steps | 3 | Clear label |
| Compare folders you already trust. | 5 | Clear section headline |
| Choose both folders | 3 | Clear step |
| Choose the exported folder as the source and the stored folder as the archive. | 14 | Clear instruction |
| Run the audit | 3 | Clear step |
| The CLI matches relative paths and hashes each source file. | 10 | Registered (`relative-path-matching`, `manifest-content`) |
| Keep the JSON report | 4 | Clear step |
| Review changed, missing, moved, or archive-only paths. | 7 | Registered (`archive-comparison`, `relative-path-matching`) |
| Install from the public source checkout | 6 | Clear label |
| Run your first audit. | 4 | Clear section headline |
| Requires Rust 1.85 or newer. | 5 | Registered (`rust-msrv`) |
| Clear limits | 2 | F-3-2 |
| It checks bytes, not picture quality. | 6 | Registered (`byte-not-perceptual`) |
| Matching hashes prove matching bytes. | 5 | Registered (`byte-not-perceptual`) |
| They do not judge focus, colour, or composition. | 8 | Registered (`byte-not-perceptual`) |
| By default it matches relative paths. | 6 | Registered (`relative-path-matching`) |
| Add --find-moved to report byte-identical archive files stored elsewhere. | 9 | Registered (`relative-path-matching`) |
| Compare source folders with local media archives. | 7 | Clear footer line |

### README

| Text | Words | Result |
| --- | ---: | --- |
| Media Fidelity Audit | 3 | Clear title |
| Check a source folder against a local media archive. | 9 | Registered (`archive-comparison`) |
| Media Fidelity Audit is a command-line tool for families and photographers checking a saved copy before clearing an export. | 19 | Clear audience/situation |
| It matches files by relative path and writes a JSON audit report. | 12 | Registered (`relative-path-matching`, `manifest-content`) |
| The report includes SHA-256, byte counts, results, and available camera or video details. | 13 | Registered (`manifest-content`) |
| It can also report byte-identical files stored at a different archive path. | 12 | Registered (`relative-path-matching`) |
| Try the bundled demo | 4 | Clear heading |
| The demo creates a new temporary workspace from the valid media files in examples/. | 14 | F-3-4 |
| It does not read or write your real media. | 9 | F-3-4 |
| The five-file sample reports three identical files, one changed file, one missing sidecar, and one upper-case HEIC/MOV Live Photo pair. | 20 | Registered (`sample-demo`) |
| Its JPEG records camera metadata. | 5 | Registered (`media-observations`) |
| Its MOV records codec and frame rate. | 7 | Registered (`media-observations`) |
| The command prints the temporary path to its JSON manifest. | 10 | F-3-4 |
| Delete that workspace when finished. | 5 | Useful instruction |
| Open the one-click website demo at media-fidelity-audit.sociobot.in/?demo=1. | 7 | Registered (`one-click-demo`) |
| This page stores nothing; the CLI demo uses a temporary folder. | 11 | F-3-4 |
| Install from the public source checkout | 6 | Clear heading |
| Requires Rust 1.85 or newer. | 5 | Registered (`rust-msrv`) |
| Audit an archive | 3 | Clear heading |
| Choose a new manifest path outside both folders. | 8 | Useful instruction |
| The CLI rejects output inside the source folder or archive folder, and it never replaces an existing output. | 18 | Registered (`read-only-safety`) |
| Exit 0 means every source path is byte-identical. | 8 | Registered (`json-automation`) |
| Exit 1 means the audit found a changed, missing, moved, or unreadable source path. | 14 | Registered (`json-automation`) |
| Exit 2 means input or output failed. | 7 | Registered (`json-automation`) |
| Add --json for a summary on standard output. | 8 | Registered (`json-automation`) |
| Add --include-all to include files outside the default media and sidecar extensions. | 12 | Registered (`include-all`) |
| Add --find-moved to locate byte-identical archive files at another relative path. | 11 | Registered (`relative-path-matching`) |
| Hashes prove byte equality. | 4 | Registered (`byte-not-perceptual`) |
| They do not assess visual quality. | 6 | Registered (`byte-not-perceptual`) |
| Default matching uses relative paths; use --find-moved when an archive may be reorganized. | 13 | Registered (`relative-path-matching`) |
| Develop and verify | 3 | Clear heading |
| npm run build writes the static site to dist/site/. | 9 | Repository instruction |
| The factory deploys that directory; this repository does not change infrastructure or DNS. | 13 | Repository instruction |
| The public claims and isolated tests are listed in .factory/claims.json. | 10 | Documentation pointer |
| Demo details are in .factory/demo.md. | 5 | Documentation pointer |
| Privacy and license | 3 | Clear heading |
| The CLI has no account system or network dependency. | 9 | Registered (`offline-local`) |
| The static demo sends no third-party requests and stores no browser data. | 12 | Registered (`static-privacy`) |
| Media Fidelity Audit is free under the MIT License. | 9 | Registered (`mit-license`) |
| See LICENSE. | 2 | Useful pointer |

All actions name their result: **Try it with sample data**, **Reset demo**, **View install steps**, **Copy demo command**, **Copy install command**, and **Return home**. Terminology is consistent: source folder, archive folder, JSON audit report, demo, and Live Photo pair.

## 3. Demo and sandbox

The hero link opened `/?demo=1` in one activation. Its first rendered screen already showed the product result: five valid sample files, 3 identical, 1 changed, 1 missing, and 1 Live Photo pair. It displayed the persistent “Demo — sample data, nothing is saved” banner, **Reset demo**, and **View install steps**. Reset restored the generated sample and announced “Demo reset to the bundled sample.”

In a fresh browser context, the home → demo → reset flow made only same-origin requests. `localStorage`, `sessionStorage`, IndexedDB, and service-worker registrations remained empty. In a new temporary working directory, `mfa demo` created a distinct `/tmp/mfa-demo-…` workspace and left the caller directory empty. Its manifest had the documented 5/3/1/1 summary.

The isolation behavior therefore passes. F-3-1 remains because the CLI-specific landing-page recording requirement is a different, missing artefact.

## 4. Claims and verification

I made a fresh local clone at `/tmp/media-fidelity-audit-review3-zRTV0g`, ran `npm ci`, then executed each of the 16 exact commands in `.factory/claims.json`. Every declared claim passed: `sample-demo`, `archive-comparison`, `one-click-demo`, `manifest-content`, `read-only-safety`, `read-scope`, `media-observations`, `byte-not-perceptual`, `relative-path-matching`, `include-all`, `json-automation`, `offline-local`, `static-privacy`, `source-install`, `rust-msrv`, and `mit-license`.

The clean clone also passed `npm test`, `npm run check`, and `npm run build`; the build produced `dist/site/`. The local browser suite includes Axe and passed its serious/critical checks. An independent live browser sweep was started with `SITE_URL=https://media-fidelity-audit.sociobot.in npm run test:browser`; its completed desktop portion passed, but its later route sweep did not finish after five minutes and was terminated. The direct fresh-context live checks in this report found no console errors or structural issue; the local passing Axe run is the recorded accessibility evidence.

F-3-4 is an unlisted-claim finding. The closest entry, `sample-demo`, claims valid formats and the result counts. It does not claim or tag-test the temporary workspace, no-real-media boundary, or printed manifest path stated in the README and demo banner.

## 5. History check

I read `.factory/review-1.md`, `.factory/review-2.md`, both polish records, the current handoff, verification records, and the current source/live site. Every earlier finding is actually fixed; none recurs under its earlier ID.

| Earlier ID | Live/code confirmation |
| --- | --- |
| F-1-1 | Valid JPEG/MOV/HEIC/XMP files, populated results, and wrapped 390px demo counts are present. |
| F-1-2 | Copy and `Cargo.toml` state Rust 1.85; the locked 1.85 claim test passed. |
| F-1-3 | `archive-comparison` independently checks identical/changed/missing/unreadable/archive-only cases. |
| F-1-4 | One activation reaches `?demo=1` with the populated result, banner, and reset. |
| F-1-5 | `manifest-content` independently verifies path, bytes, SHA-256, status, and media data. |
| F-1-6 | `read-scope` traces chosen media paths and excludes a sibling sentinel. |
| F-1-7 | `byte-not-perceptual` checks byte difference without a quality judgement. |
| F-1-8 | Relative matching and optional moved-file reporting are present and tested. |
| F-1-9 | Source-checkout installation is documented and clean-installed by test. |
| F-1-10 | `include-all` is registered and tested. |
| F-1-11 | CLI networking is denied for demo and normal audit; demo web requests/storage are tested. |
| F-1-12 | The observation test covers JPEG, MOV codec/rate, XMP, and upper-case pairing. |
| F-1-13 | Inputs are snapshot and all new/existing output locations in both trees are rejected. |
| F-1-14 | The hero says “Check an archive without changing your media”. |
| F-1-15 | The proof strip uses plain labels with technical detail secondarily. |
| F-1-16 | The output is consistently called a JSON audit report. |
| F-1-17 | The field now names “SHA-256 value”. |
| F-1-18 | UI and README use source folder and archive folder consistently. |
| F-1-19 | The banner action is “View install steps”. |
| F-1-20 | Direct routes deliver their own title, description, canonical, OG, and Twitter metadata. |
| F-1-21 | An unknown live URL returns HTTP 404 with the common header and footer. |
| F-1-22 | GitHub links visibly say “(external)”. |
| F-1-23 | The generated copy audit includes routes, footer, README, word counts, and drift checks. |
| F-1-24 | `--find-moved` is implemented, documented, and tested. |
| F-2-1 | The formerly omitted footer and README lines are now in the generated audit and asserted. |
| F-2-2 | “Exact-match code” is absent; the UI names the SHA-256 value. |

## 6. Structure, routes, accessibility, and identity

Live checks covered `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, `/404`, and `/not-a-real-route` at 390px. Each had `lang="en"`, one `<h1>`, one `<main>`, an appropriate route title, description, canonical, local OG image, favicon/Apple touch icon, consistent header/footer, Privacy/Terms links, and no horizontal overflow. The unknown URL returned HTTP 404. Every discovered same-origin link and the labeled GitHub link returned 200. Back from the demo returned home and focused the home h1.

The cut-paper source folder, archive box, thread, paper palette, and serif/UI sans pairing match `.factory/design.md`; this is visually specific to archive comparison rather than a generic SaaS template. No AI feature is missing: the brief is absent, and deterministic local hashing is the appropriate core job.

## 7. Findings

### Blocking

#### F-3-1 — The CLI landing page has no self-hosted terminal recording

**Location:** landing `/` and source tree. The page offers an installation command block, but it contains no `mfa demo` output or recording. The only purported recording is the static `<code>` block after entering `/?demo=1`, with `aria-label="Recorded output from mfa demo"`. `rg` finds no asciinema cast or terminal-recording SVG asset.

**Why this fails:** The CLI demo contract requires a self-hosted terminal recording (asciinema or SVG) on the landing page showing the real binary doing the main job on shipped sample input. A static text block on a separate route does not let a cold visitor verify the CLI result before clicking, and it is not a recording artefact that can be checked against the binary.

**Concrete fix:** Run `mfa demo` during the build, capture its real output as a self-hosted SVG/asciinema asset, place it on the landing page beneath the hero, and add a test that compares the displayed counts and command with a fresh `mfa demo` result. Keep the one-click interactive demo as well.

### Minor

#### F-3-2 — “Clear limits” does not name the section’s subject

**Location:** landing limits eyebrow: “Clear limits”.

**Why this matters:** This phrase could label any product. A screen-reader heading/label list gives no indication that the section explains byte matching and its quality limitation.

**Concrete rewrite:** “What this audit does not check”.

#### F-3-3 — “A report shows what happened” does not identify the content

**Location:** landing preview eyebrow: “A report shows what happened”.

**Why this matters:** The phrase is vague; it does not say that the nearby section explains the JSON audit report or its fields.

**Concrete rewrite:** “What the JSON audit report shows”.

#### F-3-4 — Temporary-workspace and no-real-media assurances are unlisted

**Location:** README demo section: “The demo creates a new temporary workspace from the valid media files in examples/.”, “It does not read or write your real media.”, and “The command prints the temporary path to its JSON manifest.” README and the demo banner also say the CLI demo “uses a temporary folder”.

**Why this matters:** These are concrete privacy/isolation promises a visitor can rely on. `sample-demo` does not state them, and no distinct `@claim:<id>` test owns all three observations.

**Concrete fix:** Add a `cli-demo-isolation` claim stating that `mfa demo` creates and prints a fresh temporary workspace and never reads/writes the caller’s media. Run it from a fresh temporary working directory, assert that the caller remains empty, the printed path exists outside it, and the manifest comes from the shipped sample. Reference that claim for the banner and README sentences.

## What would make this perfect

Add a build-generated, self-hosted recording of the real `mfa demo` command to the landing page; make its output-parity test part of the demo claim. Replace the two vague eyebrows with section names and register/test the CLI temporary-workspace assurance. Then rerun every claim command, the complete live browser sweep, and this cold-read review.
