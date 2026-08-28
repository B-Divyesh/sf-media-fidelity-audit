export const LICENSE_KEY = 'sb_license:media-fidelity-audit';
const VERDICT_KEY = 'sb_license_verdict:media-fidelity-audit';
const endpoint = 'https://api.sociobot.in/api/v1/products/media-fidelity-audit/verify?license=';
export function licenseFromUrl(search) { return new URLSearchParams(search).get('license'); }
export function isFresh(timestamp, now = Date.now()) { return now - timestamp < 86_400_000; }
export function storeLicense(token, storage) { storage.setItem(LICENSE_KEY, token.trim()); }
export async function verifyLicense(token, storage, fetcher = fetch) {
  const cached = storage.getItem(VERDICT_KEY); if (cached) { try { const c = JSON.parse(cached); if (c.token === token && isFresh(c.at) && c.valid) return c; } catch {} }
  const response = await fetcher(endpoint + encodeURIComponent(token));
  if (!response.ok) throw new Error('Could not verify while offline. Your saved license remains available.');
  const result = await response.json(); const verdict = { token, valid: Boolean(result.valid), reason: result.reason || 'invalid', at: Date.now() };
  storage.setItem(VERDICT_KEY, JSON.stringify(verdict)); return verdict;
}
