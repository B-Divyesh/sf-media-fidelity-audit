# Copy audit

Audited 2026-08-28 from rendered route templates in `site/src/main.ts`, the
static 404 shell, and `README.md`. Counts split on whitespace: hyphenated words,
flags, paths, and numbers count as one word. Every sentence is at most 22 words.
Checked banned words: leverage, seamless, effortless, robust, powerful,
intuitive, reimagine, supercharge, unlock, delightful, journey, ecosystem, and
AI-powered. None occur in visitor copy.

## Landing and routes

| Text | Words |
| --- | ---: |
| Check an archive without changing your media | 7 |
| Check your archive against a source folder. | 8 |
| For families and photographers checking a saved copy before clearing an export. | 12 |
| See the finished audit after one click. | 7 |
| Runs locally with no account. | 5 |
| Does not change either folder. | 5 |
| Free under the MIT License. | 5 |
| One source folder, one archive folder, one JSON audit report. | 10 |
| Exact file match | 3 |
| SHA-256 in the report | 4 |
| Camera details | 2 |
| When the file contains them | 5 |
| Video format and rate | 4 |
| Live Photo media | 3 |
| Videos and edit files | 4 |
| A report shows what happened | 6 |
| Find files that need attention. | 6 |
| The JSON audit report lists each file’s result, size, exact-match code, and available camera or video details. | 17 |
| The sample includes valid JPEG, MOV, HEIC, and XMP files. | 10 |
| Compare folders you already trust. | 5 |
| Choose the exported folder as the source and the stored folder as the archive. | 14 |
| The CLI matches relative paths and hashes each source file. | 10 |
| Review changed, missing, moved, or archive-only paths. | 7 |
| Install from the public source checkout | 6 |
| Requires Rust 1.85 or newer. | 5 |
| It checks bytes, not picture quality. | 7 |
| Matching hashes prove matching bytes. | 5 |
| They do not judge focus, colour, or composition. | 8 |
| By default it matches relative paths. | 7 |
| Add --find-moved to report byte-identical archive files stored elsewhere. | 9 |
| Demo — sample data, nothing is saved | 7 |
| This page stores nothing; mfa demo uses a temporary folder. | 10 |
| Review a sample archive audit. | 5 |
| Five valid media files show an identical, changed, and missing result. | 11 |
| The CLI reads content from the source and archive folders you choose. | 12 |
| The CLI has no account system or network dependency. | 10 |
| The static website sends no third-party requests and stores no browser data during its demo. | 15 |
| Media Fidelity Audit is provided under the MIT License. | 9 |
| It is a verification aid, not a replacement for backups or manual review. | 13 |
| This archive path is missing. | 5 |
| The page may have moved, but your media has not been touched. | 12 |

## Actions and labels

| Label | Words |
| --- | ---: |
| Try it with sample data | 5 |
| Reset demo | 2 |
| View install steps | 3 |
| Copy install command | 3 |
| Copy demo command | 3 |
| Return home | 2 |
| Source on GitHub (external) | 4 |

## README sentences

| Text | Words |
| --- | ---: |
| Check a source folder against a local media archive. | 9 |
| Media Fidelity Audit is a command-line tool for families and photographers checking a saved copy before clearing an export. | 18 |
| It matches files by relative path and writes a JSON audit report. | 12 |
| The report includes SHA-256, byte counts, results, and available camera or video details. | 13 |
| It can also report byte-identical files stored at a different archive path. | 12 |
| The demo creates a new temporary workspace from the valid media files in examples/. | 14 |
| It does not read or write your real media. | 10 |
| The five-file sample reports three identical files, one changed file, one missing sidecar, and one upper-case HEIC/MOV Live Photo pair. | 20 |
| Its JPEG records camera metadata. | 5 |
| Its MOV records codec and frame rate. | 7 |
| The command prints the temporary path to its JSON manifest. | 10 |
| Delete that workspace when finished. | 5 |
| This page stores nothing; the CLI demo uses a temporary folder. | 11 |
| Requires Rust 1.85 or newer. | 5 |
| Choose a new manifest path outside both folders. | 8 |
| The CLI rejects output inside the source folder or archive folder, and it never replaces an existing output. | 17 |
| Exit 0 means every source path is byte-identical. | 8 |
| Exit 1 means the audit found a changed, missing, moved, or unreadable source path. | 14 |
| Exit 2 means input or output failed. | 8 |
| Add --json for a summary on standard output. | 8 |
| Add --include-all to include files outside the default media and sidecar extensions. | 11 |
| Add --find-moved to locate byte-identical archive files at another relative path. | 11 |
| Hashes prove byte equality. | 4 |
| They do not assess visual quality. | 6 |
| Default matching uses relative paths; use --find-moved when an archive may be reorganized. | 12 |
| The CLI has no account system or network dependency. | 10 |
| The static demo sends no third-party requests and stores no browser data. | 11 |
| Media Fidelity Audit is free under the MIT License. | 9 |

## Terminology

| Concept | Single term |
| --- | --- |
| Folder from the export | source folder |
| Stored local folder | archive folder |
| JSON output | JSON audit report |
| Isolated bundled example | demo |
| Paired still and motion media | Live Photo pair |
