# Review 2 handoff — Media Fidelity Audit

## Result

Wrote and committed the adversarial first-read review in
`.factory/review-2.md`. Product code was not changed.

Verdict: **FAIL**. The review records one blocking documentation regression
(the copy audit claims complete coverage but omits visible landing and README
sentences) and one minor plain-language issue (`exact-match code` is not a
manifest field).

## Verification performed

* Opened the live product in fresh 390×844 and 1440×900 browser contexts before
  scrolling; captured home and demo screenshots and checked console errors,
  overflow, first-read clarity, reset, storage, requests, and demo isolation.
* Ran `mfa demo` from a fresh temporary directory; it made a separate `/tmp`
  workspace and did not write into the caller's directory.
* Cloned the candidate into a new temporary checkout, ran `npm ci`, every exact
  command from `.factory/claims.json`, `npm test`, `npm run check`,
  `npm run build`, and `cargo package`. All passed.
* Ran the live browser/Axe suite, crawled all discovered links, checked raw
  route metadata, actual 404 behavior, headers, sitemap, robots, and common
  route structure.

## Next steps

1. Complete and test `.factory/copy-audit.md` coverage.
2. Change the landing phrase to the actual `SHA-256` field name.
3. Rerun the stated claim and browser commands after the repair.
