# Independent verification — FAIL

**Candidate:** `beaf30cfca8dfc4a22fb4a5bda6eea2d743db6fa` (`main`)

**Live URL:** https://media-fidelity-audit.sociobot.in

**Verification date:** 2026-08-28

## Release decision

**FAIL — do not release this candidate.** The mandatory claim-test registry is
absent, the required one-click isolated CLI demo does not exist, and the CLI
can overwrite an original archive media file supplied as `--output`. Any one
of these is a release blocker.

## Mandatory first-read and claims gates

Cold-opening the live home page, I understood it as a local CLI that compares
a camera export with a self-hosted archive to find missing or changed media;
the likely audience is people with a self-hosted library. The first actions
are **“Install the CLI”** and **“See an audit result.”** There is no **“Try it
with sample data”** action anywhere on the first screen (or page), no visible
explanation of a sandbox, and no way to run the product in one click. This
fails the plain-words/demo-sandbox acceptance gate.

`.factory/claims.json` is missing from the clean candidate checkout. Therefore
there were zero declared claim tests to execute; this is a release-blocking
failure before any other result. The landing page and README nevertheless make
reliance claims such as “No upload. No account. No telemetry,” “The tool only
reads them,” EXIF/codec/frame-rate inspection, Live Photo pairing, and Pro
features. None has a registered observable claim test.

The CLI demo gate also fails directly:

* `mfa demo` exits 2 with `unrecognized subcommand 'demo'`.
* No `examples/` sample input and no `.factory/demo.md` exist.
* `GET /demo` is HTTP 200 only because it falls back to the landing page; it
  has no demo data, demo banner, reset action, or isolated namespace.

## Test evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Clean install | Pass | `npm ci` completed; npm reported 2 dependency audit vulnerabilities (1 moderate, 1 high). |
| Required claim tests | **Fail** | `.factory/claims.json` absent; no tests can be run. |
| `npm test` | Pass | 3 Rust tests and 2 license tests passed. |
| `npm run test:browser` | Pass | Playwright/Axe landing test passed. |
| `npm run test:site` | Pass | 3 tests passed. |
| Production build | Pass | `npm run build` completed; JS 2.80 kB (1.29 kB gzip), CSS 6.87 kB (2.43 kB gzip), hero WebP 101.15 kB. |
| Formatting | Pass | `cargo fmt --check` passed. |
| Rust lint | **Fail** | `cargo clippy --all-targets -- -D warnings` fails on `clippy::op_ref` at `src/main.rs:396` and `clippy::too_many_arguments` at `src/main.rs:475`. No repository lint/type-check script is provided. |
| Package | Pass with standard dirty-install caveat | `cargo package --allow-dirty` packaged and verified 38 files / 193.6 KiB. `npm ci` creates ignored files, so plain `cargo package` refuses the dirty worktree. |
| Clean consumer | Pass | Installed the unpacked `.crate` into a fresh temporary Cargo root; its `mfa` binary ran successfully. |
| Normal audit | Pass | Five default-scope source assets produced 3 identical, 1 changed, 1 missing, 1 sidecar and exit 1. `--include-all` included the non-media file (6 source assets). |
| Invalid input / recovery | Pass | Missing source and directory-valued `--output` each produce useful error text and documented exit 2. |
| 10,000-asset fixture | Pass for this synthetic fixture | 10,000 paired tiny JPG-named files: 10,000 matched, exit 0, manifest 4.7 MiB, 334 ms wall-clock. This does not substitute for real camera-video performance testing. |

## Functional and product defects

### Critical

1. **Read-only promise is violated: `--output` can destroy archive media.**
   In a fresh fixture, I ran:

   ```sh
   mfa audit --source source --archive archive --output archive/photo.jpg
   ```

   The command completed the audit then replaced `archive/photo.jpg` with the
   JSON manifest. The archive file SHA-256 changed from
   `918f724a0b1ddee54daad4a19ff3b52e2c2054337259ffe22c716f2a963cf446`
   to `42c16017ee8c16ffa15f9a41f76385900066a2d53395a20212693112d3d5b72d`,
   and its first bytes became `{\n  "schema": "m`. The program must reject an
   output path equal to, or contained in, source/archive trees (and avoid
   replacing an existing file without explicit safe handling).

2. **No claims registry/test evidence and no required isolated sample demo.**
   See the mandatory-gate evidence above. This independently fails the release
   contract even if all ordinary tests pass.

### High

1. **Upper-case Apple-style Live Photo motion files are not paired.** A source
   and archive containing byte-identical `LIVE.HEIC` plus `LIVE.MOV` reported
   `live_photo_pairs: []`. The pairing implementation replaces the still
   extension with lower-case `mov` and compares paths case-sensitively, so it
   misses the common upper-case `.MOV` name while the product promises Live
   Photo pairs.

2. **The paid offer promises features that are not in the CLI.** The site says
   Pro adds a “shareable HTML review report and saved policy profiles,” but a
   full repository search finds only the landing/license-flow wording; the
   public binary has only `audit` and has no license input, report command, or
   policy profile implementation. Do not sell or describe this unlock until an
   end-to-end entitlement and the named features exist.

3. **The documented public install command is not available.** The landing
   says `cargo install media-fidelity-audit`, while `cargo search
   media-fidelity-audit --limit 5` returned no package. The checkout command
   (`cargo install --path .`) works. Publish first or present only an install
   method users can execute.

### Medium

1. **Focus-ring contrast fails in the navy Pro section.** The required gold
   focus outline `#91600d` has 2.21:1 contrast against the light navy `#173b49`
   (and 2.61:1 against dark navy `#102f3a`), below the 3:1 focus-indicator
   minimum. Keyboard focus is otherwise visible and reachable.

2. **Deployment policy/site-structure gaps.** Production has no CSP header,
   no `robots.txt` or `sitemap.xml` (both 404), no designed `/demo` or 404
   route, and immutable hashed JS is only cached for 30 seconds
   (`cache-control: public, must-revalidate, max-age=30`). Privacy and Terms
   pages also omit the required common header/footer/skip link and route
   metadata.

3. **No scored Lighthouse result.** Two Lighthouse attempts could not attach
   to the container Chromium (the second reported “Unable to connect to
   Chrome”), so the required scored mobile result is not evidenced. The
   measured built resource sizes are within the static resource budgets.

## Live deployment, browser, privacy, and rate-limit evidence

* The live index, JS, CSS, and WebP are byte-for-byte identical to this
  candidate build. SHA-256s: JS
  `aa6c94bbc58e2ee913a437be8b6cb290082677ee0fae1c897271dd9943143bdf`;
  CSS `470a15007236f6a65f93d6e182d01b04e8d15a2d410a97056af656342094bca0`;
  image `dc09b8266f9f2b60e40b1c80028d0792004031b1254e6447d6ff68db70d887bc`.
* `/opt/fleet/lib/verify-url.sh` passed against the live URL: HTTP 200, 611 ms
  local load, no console errors, title/lang, one h1, main landmark, image alt,
  and labelled buttons present.
* Fresh desktop (1440×900) and mobile (390×844) live contexts had no console
  or page errors, no horizontal overflow, and no Axe serious/critical
  violations. In reduced-motion mode the hero animation computed to `none`.
  Keyboard Tab reached the skip link, navigation, both hero actions, copy
  button, purchase link, license input, and restore button; blank license
  submission announces recovery text and returns focus to the input.
* A fresh load requested only same-origin document/JS/CSS/image resources. A
  license-query test additionally made the expected request solely to
  `https://api.sociobot.in/api/v1/products/media-fidelity-audit/verify` and
  stored only the two documented `sb_license:*` local-storage keys.
* The Sociobot verify endpoint was rate-limited: an 80-request, concurrency-20
  burst produced 30 HTTP 200 and 50 HTTP 429 responses. A sampled 429 included
  `Retry-After: 4` and `x-ratelimit-after: 4`; limiting began after roughly 30
  accepted responses in that burst. The endpoint therefore meets the required
  429/Retry-After behavior.
* The product has no PWA/service worker, product backend, or sign-in flow, so
  those specialized checks are not applicable.

## Required remediation before a new candidate

1. Make output safety non-negotiable and regression-test archive/source
   overwrite attempts.
2. Add `.factory/claims.json`; add exactly one clean-demo observable test per
   claim; remove or implement/test all unprovable marketing and paid claims.
3. Ship realistic bundled fixtures, `mfa demo`, `.factory/demo.md`, and the
   visible one-click sample flow required for a CLI product.
4. Repair case-insensitive Live Photo pairing and add real fixture tests for
   MOV/HEIC codec/frame-rate and EXIF behavior.
5. Deliver the promised Pro features end to end or remove the offer; correct
   the install instructions.
6. Fix focus contrast and deployment routing/security/cache metadata, then
   produce an actual Lighthouse mobile report.
