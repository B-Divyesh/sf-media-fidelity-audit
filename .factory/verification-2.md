# Independent verification 2 — PASS

**Candidate:** `52c5e8bb420bcc8d61ff7c89e6b548fa953a880c`  
**Live URL:** https://media-fidelity-audit.sociobot.in  
**Verified:** 2026-08-28

## Release decision

**PASS.** I found no release-blocking defect in the candidate. The live static
site is byte-identical to the locally built deployable artifacts, and the Rust
CLI, demo, privacy promises, package, and accessibility behavior passed the
checks below.

## Cold first read

On a new 390 px and desktop browser context, the first screen says: “Prove your
archive kept every original.” It says it is for “families and photographers”
checking a local archive against an export, and the immediate first action is
**Try it with sample data**, accompanied by “See a finished audit in one click.”
That opens `/demo`, which shows the bundled five-file result and persistent
“Demo — sample data, nothing is saved” banner with **Reset demo** and **Start
for real**. This passes the plain-words and one-click demo gates.

## Mandatory claims gate

`.factory/claims.json` is present and has seven registered claims. I first ran
each exact declared command on the untouched clone; all stopped only because
the normal Node prerequisite had not yet been installed (`vite: not found`).
After the documented clean setup, `npm ci` (24 packages, 0 vulnerabilities), I
ran every exact command again. All passed against the bundled demo entry point.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| `sample-demo` | Pass | `mfa demo` creates a temporary isolated five-file audit: 3 identical, 1 changed, 1 missing, 1 Live Photo pair. |
| `read-only-safety` | Pass | New outputs inside a source tree and an existing archive file are rejected; source/archive SHA-256 is unchanged. |
| `media-observations` | Pass | Fixture test records JPEG EXIF, MOV codec/frame rate, sidecar, and uppercase HEIC/MOV pair facts. |
| `json-automation` | Pass | Observable JSON summary and documented 0/1/2 exit behavior pass. |
| `offline-local` | Pass | Demo passes with `socket` and `connect` denied by the supplied preload guard. |
| `static-privacy` | Pass | Fresh `/demo` context makes only same-origin requests and leaves local/session storage, IndexedDB, and service workers empty. |
| `mit-license` | Pass | Shipped `LICENSE` is verified as MIT. |

## Clean local quality gates

All commands ran successfully after `npm ci`:

```sh
npm run check
npm test
npm run build
cargo package
```

Results: `cargo fmt --check`, Clippy with `-D warnings`, and TypeScript pass;
9 Rust unit tests, 6 CLI claim tests, 3 site-policy tests, and 5 browser tests
pass. `cargo package` packages and verifies 17 files (48.8 KiB unpacked,
14.7 KiB compressed). The production build writes `dist/site/` with 9.53 KiB
JS (3.61 KiB gzip), 8.01 KiB CSS (2.73 KiB gzip), and a 101.15 KiB WebP hero:
within the static JS/CSS/image budgets.

I also installed the packed source into a clean temporary consumer root with
`cargo install --path target/package/media-fidelity-audit-0.1.0 --root …`.
The installed `mfa --help` and `mfa demo` both worked.

## Independent CLI exercise

* Normal bundled fixture: `mfa audit --json` reports 5 source files, 3
  identical, 1 changed, 1 missing, 1 sidecar, and 1 Live Photo pair; it exits
  1, correctly signalling a difference.
* Boundary/recovery: an existing output is rejected with exit 2; a nonexistent
  source is rejected with exit 2 and a useful message; an archive media path as
  `--output` is rejected with exit 2 and its SHA-256 remains unchanged.
* Scale: a fresh 10,000-pair JPG-named fixture produced 10,000 matches, exit
  0, and a 4,810,443-byte manifest in 22,733 ms in this container—well inside
  the researched one-hour target. This is a synthetic I/O fixture, not a claim
  about every real-camera/video workload.

## Live deployment, accessibility, privacy, and headers

* All deployable local files matched the live response byte-for-byte, including
  root HTML (`3e8b…19890`), JS (`aa65…389a`), CSS (`e0e3…af66`), and hero
  (`dc09…887bc`). `staticwebapp.config.json` is deployment configuration and,
  correctly, is not publicly served.
* The factory `verify-url.sh` passed home and demo. Evidence is in
  `.factory/evidence/verification-2/`: home loaded in 651 ms and demo in
  541 ms, both with zero console/page errors, `lang=en`, one h1, a main
  landmark, and no missing image alt or unnamed button.
* Fresh desktop (1440×900) and mobile (390×844) checks on `/`, `/demo`,
  `/privacy`, `/terms`, and the designed 404 found no horizontal overflow and
  no Axe serious or critical violations. The sole browser console entry was
  the expected HTTP 404 network message while deliberately loading the unknown
  route; normal routes had none.
* Keyboard Tab reaches a visibly focused skip link (solid focus outline), and
  the shipped browser suite independently exercises keyboard, history, focus,
  demo reset, and reduced motion. In reduced-motion context transitions and
  animation are disabled.
* The complete fresh-browser home/demo flow requested only the site origin:
  document, JS, CSS, hero image, and `/demo`. It made no third-party request,
  did not write browser storage, and registered no service worker.
* Live root responses have CSP, HSTS, `nosniff`, `DENY` framing,
  strict-origin referrer policy, and a restrictive permissions policy. Hashed
  JS uses `Cache-Control: public, max-age=31536000, immutable`; shell and
  discovery files use 30-second revalidation. `robots.txt`, `sitemap.xml`,
  and the real 404 response are present.

There is no product backend or product-unlock endpoint, sign-in flow, or PWA
service worker. Rate-limit, identity-provider, and service-worker-update checks
are therefore not applicable.

## Defects by severity

None found.
