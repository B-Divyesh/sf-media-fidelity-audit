# Adversarial first-read review 6 — Media Fidelity Audit

**Reviewed:** 2026-08-28  
**Candidate:** 05eafbc880a487885cfe39d96935e22ff3f0ae66  
**Live URL:** https://media-fidelity-audit.sociobot.in  
**Verdict: PASS**

No blocking or minor findings remain.

## Cold first read

I opened the live home page in separate fresh Chromium contexts at 390×844 and
1440×900, before scrolling.

| Check | First-read answer | Exact evidence | Result |
| --- | --- | --- | --- |
| What does this do? | It checks a source media folder against a saved archive and reports what still matches. | “Check your archive against a source folder.” | Pass |
| For whom? | Families and photographers checking a saved copy before deleting an export. | “For families and photographers checking a saved copy before clearing an export.” | Pass |
| What should I click? | Try it with sample data. | The action and “See the finished audit after one click.” are above the fold. | Pass |

The 390 px page had no horizontal overflow or console errors. Its three plain
facts were visible before the illustration. The paper-cut folder/reel/box art,
paper palette, serif/sans pairing, and thread motif match the product-specific
design thesis; this is not a generic SaaS template.

## Copy audit

The complete landing and README sentence-by-sentence audit, including every
visible control, heading, caption, sentence, and word count, is recorded in
.factory/copy-audit.md. I regenerated and checked it against the production
build during this review.

It lists 65 landing text units and 42 README text units. No text unit exceeds
22 words. No banned marketing adjective, unexplained jargon, inconsistent term,
mood-only heading, or non-result-naming button was found. The audit confirms
these terms are consistent: source folder, archive folder, JSON audit report,
demo, and Live Photo pair.

The primary action is “Try it with sample data.” The other product actions,
“Copy install command,” “Reset demo,” “View install steps,” and “Copy demo
command,” name their outcomes. Navigation controls are links, not buttons.
The longest landing sentence is 17 words: “The JSON audit report lists each
file’s result, size, SHA-256 value, and available camera or video details.”
The longest README sentence is 20 words: “The five-file sample reports three
identical files, one changed file, one missing sidecar, and one upper-case
HEIC/MOV Live Photo pair.” Neither needs a rewrite.

### Landing sentences

- Check your archive against a source folder. — 7
- For families and photographers checking a saved copy before clearing an export. — 12
- See the finished audit after one click. — 7
- Runs locally with no account. — 5
- Does not change either folder. — 5
- Free under the MIT License. — 5
- See the audit command and its result. — 7
- This recording uses the same bundled sample as mfa demo. — 10
- Recorded from mfa demo during the site build. — 8
- Swipe to read every line. — 5
- Find files that need attention. — 5
- The JSON audit report lists each file’s result, size, SHA-256 value, and available camera or video details. — 17
- The sample includes valid JPEG, MOV, HEIC, and XMP files. — 10
- Compare folders you already trust. — 5
- Choose the exported folder as the source and the stored folder as the archive. — 14
- The CLI matches relative paths and hashes each source file. — 10
- Review changed, missing, moved, or archive-only paths. — 7
- Run your first audit. — 4
- Requires Rust 1.85 or newer. — 5
- It checks bytes, not picture quality. — 6
- Matching hashes prove matching bytes. — 5
- They do not judge focus, colour, or composition. — 8
- By default it matches relative paths. — 6
- Add --find-moved to report byte-identical archive files stored elsewhere. — 9
- Compare source folders with local media archives. — 7

### README sentences

- Check a source folder against a local media archive. — 9
- Media Fidelity Audit is a command-line tool for families and photographers checking a saved copy before clearing an export. — 19
- It matches files by relative path and writes a JSON audit report. — 12
- The report includes SHA-256, byte counts, results, and available camera or video details. — 13
- It can also report byte-identical files stored at a different archive path. — 12
- The demo creates a new temporary workspace from the valid media files in examples/. — 14
- It does not read or write your real media. — 9
- The five-file sample reports three identical files, one changed file, one missing sidecar, and one upper-case HEIC/MOV Live Photo pair. — 20
- Its JPEG records camera metadata. — 5
- Its MOV records codec and frame rate. — 7
- The command prints the temporary path to its JSON manifest. — 10
- Delete that workspace when finished. — 5
- The landing page includes a self-hosted recording of the same mfa demo output. — 13
- Open the one-click website demo at media-fidelity-audit.sociobot.in/?demo=1. — 7
- This page stores nothing; the CLI demo uses a temporary folder. — 11
- Requires Rust 1.85 or newer. — 5
- Choose a new manifest path outside both folders. — 8
- The CLI rejects output inside the source folder or archive folder, and it never replaces an existing output. — 18
- Exit 0 means every source path is byte-identical. — 8
- Exit 1 means the audit found a changed, missing, moved, or unreadable source path. — 14
- Exit 2 means input or output failed. — 7
- Add --json for a summary on standard output. — 8
- Add --include-all to include files outside the default media and sidecar extensions. — 12
- Add --find-moved to locate byte-identical archive files at another relative path. — 11
- Hashes prove byte equality. — 4
- They do not assess visual quality. — 6
- Default matching uses relative paths; use --find-moved when an archive may be reorganized. — 13
- npm run build writes the complete production static site to dist/site/. — 11
- The factory deploys that directory; this repository does not change infrastructure or DNS. — 13
- The public claims and isolated tests are listed in .factory/claims.json. — 10
- Demo details are in .factory/demo.md. — 5
- The CLI has no account system or network dependency. — 9
- The static demo sends no third-party requests and stores no browser data. — 12
- Media Fidelity Audit is free under the MIT License. — 9
- See LICENSE. — 2

## Demo and sandbox

The first-screen action reached the query demo in one activation. Its first
screen already displayed realistic, named sample media and the finished result:
3 identical, 1 changed, 1 missing, and 1 Live Photo pair. The persistent
“Demo — sample data, nothing is saved” banner supplied Reset demo and View
install steps. Reset restored the sample, announced “Demo reset to the bundled
sample,” and focused the banner.

A fresh 390 px landing → demo → reset flow requested only the product origin.
It set no cookie, session storage, IndexedDB database, or service worker. A
deliberately pre-existing local-storage value, real:sentinel=keep, remained
unchanged and no demo key was written. The direct demo route rendered the same
isolated sample.

I ran the built mfa demo command from a new temporary caller directory
containing real-media-sentinel.jpg. It returned 0, left the sentinel SHA-256
unchanged, and printed an external temporary mfa-demo workspace and manifest.
The caller still contained only its sentinel.

## Claims and quality gates

I made a clean clone at /tmp/mfa-review6-clean-uSoosa, ran npm ci, then ran
every exact command in all 19 .factory/claims.json entries. All passed:

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
| build-output | Pass |
| mit-license | Pass |

The live/README cross-check maps every product-relevant assertion to a listed
claim: sample facts, report fields, read-only behavior, local/no-account
behavior, browser privacy, installation, MSRV, production build output, and
license wording all have a matching claim test. The factory-deployment sentence
is repository scope, not a visitor product promise. There are no unlisted
claims.

npm test, npm run check, and npm run build passed in the clone. The production
build wrote dist/site. Its JavaScript asset was 12.25 kB uncompressed and 4.49
kB gzip.

## Earlier findings

I read Reviews 1–5, Polish rounds 1–5, and the previous handoff. I rechecked
each earlier finding on live and in the current code. None is unfixed,
half-fixed, or regressed.

| Findings | Current confirmation |
| --- | --- |
| F-1-1 | Valid media fixtures and populated sample pass. |
| F-1-2 | Rust 1.85 remains documented and tested. |
| F-1-3 | All five classifications are independently tested. |
| F-1-4 | One click opens the populated, resettable demo. |
| F-1-5 | Paths, bytes, SHA-256, results, and media details pass independently. |
| F-1-6 | Read tracing includes selected folders and excludes a sentinel. |
| F-1-7 | Byte equality is distinct from picture quality. |
| F-1-8 | Relative matching and opt-in moved-file reporting pass. |
| F-1-9 | Fresh public-checkout installation passes. |
| F-1-10 | Default filtering and include-all behavior pass. |
| F-1-11 | Network-denied CLI and storage-free web checks pass. |
| F-1-12 | JPEG, MOV, XMP, and upper-case Live Photo observations pass. |
| F-1-13 | Inputs and existing outputs cannot be overwritten. |
| F-1-14 | The first-screen safety eyebrow remains literal. |
| F-1-15 | Plain labels lead technical proof detail. |
| F-1-16 | JSON audit report remains the single output term. |
| F-1-17 | Visitor copy identifies the SHA-256 value. |
| F-1-18 | Folder/output terminology is consistent. |
| F-1-19 | View install steps names the demo exit result. |
| F-1-20 | Direct routes have route-specific metadata. |
| F-1-21 | Unknown URLs return the designed shared-shell HTTP 404. |
| F-1-22 | GitHub links say external. |
| F-1-23 | Generated copy audit covers routes, footer, and README. |
| F-1-24 | Moved-file matching remains deterministic and default-off. |
| F-2-1 | Omitted footer/README copy remains in the generated audit. |
| F-2-2 | Exact-match code is absent; SHA-256 wording remains. |
| F-3-1 | The self-hosted SVG recording matches a fresh CLI demo. |
| F-3-2 | The limits section is explicitly named. |
| F-3-3 | The report section is explicitly named. |
| F-3-4 | CLI demo workspaces remain external to the caller. |
| F-4-1 | Every checked 390 px persistent control is at least 44×44 px. |
| F-4-2 | Both 404 paths use a literal error label. |
| F-5-1 | Back/Forward focuses the receiving page h1 and restores the route. |
| F-5-2 | Build output is registered and its exact test passes. |
| F-5-3 | The demo heading names the local sample audit. |
| F-5-4 | 404 copy gives address/home recovery and no unlisted reassurance. |

## Structure and accessibility

The home, query demo, direct demo, Privacy, Terms, and 404 routes returned
200. An unknown URL returned HTTP 404 with “This page was not found.” Every
route has lang=en, one main, one h1, a route-specific title, description,
canonical, Open Graph title, favicon, shared header/footer, Privacy, and Terms.

All discovered internal links returned 200 or targeted an existing in-page
anchor; the labelled external GitHub link returned 200. Robots, sitemap, local
social image, SVG favicon, Apple touch icon, and CSP/security configuration are
present. A direct limits deep link worked; Back and Forward after route
navigation focused page-title. The live site logged no console errors.

At 390 px, persistent header/footer controls on every route measured at least
44×44 px. Axe reported no serious or critical violations. Visible focus and
reduced-motion behavior were present.

## Missed leverage

No additional AI, import/export, or sync step is implied. This job is a
deterministic local byte/metadata comparison; model inference would not improve
the evidence and would weaken the privacy model. The CLI already accepts both
folders, exports a JSON audit report, optionally finds moved byte-identical
files, and provides an isolated demo.

## Findings

None.

## What would make this perfect

Nothing remains to change for the stated scope. Keep the exact claim commands,
clean-clone quality gates, and live mobile review in future releases.
