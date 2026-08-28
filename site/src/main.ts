import './style.css';
import { LICENSE_KEY, licenseFromUrl, storeLicense, verifyLicense } from './license.mjs';

const status = document.querySelector<HTMLParagraphElement>('#license-status')!;
const tokenFromUrl = licenseFromUrl(location.search);
if (tokenFromUrl) { storeLicense(tokenFromUrl, localStorage); history.replaceState({}, '', location.pathname + location.hash); status.textContent = 'License saved. Checking it in the background…'; }
const token = localStorage.getItem(LICENSE_KEY);
if (token) { status.textContent = 'Pro is available on this device while we check your license.'; verifyLicense(token, localStorage).then(v => { status.textContent = v.valid ? 'Pro is active. Thank you for supporting local-first tools.' : 'This license is no longer active. You can buy a new one below.'; }).catch(e => { status.textContent = e.message; }); }
document.querySelector<HTMLFormElement>('#license-form')!.addEventListener('submit', e => { e.preventDefault(); const input = document.querySelector<HTMLInputElement>('#license-token')!; if (!input.value.trim()) { status.textContent = 'Paste a license token to restore your purchase.'; input.focus(); return; } storeLicense(input.value, localStorage); status.textContent = 'License saved. Checking it in the background…'; verifyLicense(input.value.trim(), localStorage).then(v => status.textContent = v.valid ? 'Pro is active.' : 'This license is not active. Check the token or buy a new license.').catch(err => status.textContent = err.message); });
document.querySelector<HTMLButtonElement>('.copy')!.addEventListener('click', async e => { const b=e.currentTarget; try { await navigator.clipboard.writeText(b.dataset.copy!); document.querySelector('.copy-status')!.textContent='Command copied.'; } catch { document.querySelector('.copy-status')!.textContent='Select the command above and copy it manually.'; } });
