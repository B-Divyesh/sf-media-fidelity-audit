import './style.css';
import heroUrl from './assets/archive-diorama.webp';

type Page = { title: string; description: string; html: string };

const home: Page = {
  title: 'Media Fidelity Audit — compare archive originals',
  description: 'Compare exported photos and videos with a local archive, then keep a JSON record of missing or changed files.',
  html: `<section class="hero" aria-labelledby="page-title">
    <div class="hero-copy"><p class="eyebrow">Read-only archive proof</p><h1 id="page-title" tabindex="-1">Prove your archive kept every original.</h1><p class="lede">For families and photographers checking whether a local media archive still matches an export.</p><div class="actions"><a class="button" href="/demo">Try it with sample data</a><span>See a finished audit in one click.</span></div><ul class="plain-facts"><li>Reads source and archive folders only.</li><li>No account or network connection needed.</li><li>Free under the MIT License.</li></ul></div>
    <figure class="diorama"><img src="${heroUrl}" width="1024" height="1024" fetchpriority="high" alt="A paper source folder and archive box joined by a thread, with a film reel between them." /><figcaption>One source, one archive, one clear record.</figcaption></figure>
  </section>
  <section class="proof-strip" aria-label="Audit checks"><div><strong>SHA-256</strong><span>Byte identity</span></div><div><strong>EXIF</strong><span>Camera facts</span></div><div><strong>codec + fps</strong><span>Motion facts</span></div><div><strong>Live Photos</strong><span>Pairs and sidecars</span></div></section>
  <section id="preview" class="sample" aria-labelledby="preview-title"><div><p class="eyebrow">A manifest shows what happened</p><h2 id="preview-title">Find the files that need attention.</h2><p>The JSON manifest records the hash, byte count, status, and available media facts for each path.</p></div><div class="audit-card"><p class="audit-title">Bundled family archive</p><dl><div><dt>Identical</dt><dd class="good">3</dd></div><div><dt>Changed</dt><dd class="warn">1</dd></div><div><dt>Missing</dt><dd class="bad">1</dd></div></dl><p class="audit-foot">The sample also includes one uppercase Live Photo pair.</p></div></section>
  <section id="how" class="steps" aria-labelledby="how-title"><p class="eyebrow">Three local steps</p><h2 id="how-title">Compare the folders you already trust.</h2><ol><li><span>01</span><div><h3>Choose both folders</h3><p>Pass the export as source and the library as archive.</p></div></li><li><span>02</span><div><h3>Run the audit</h3><p>The CLI hashes matching paths and reads available media facts.</p></div></li><li><span>03</span><div><h3>Keep the manifest</h3><p>Review changed or missing paths in the new JSON file.</p></div></li></ol></section>
  <section id="install" class="install" aria-labelledby="install-title"><div><p class="eyebrow">Install from this checkout</p><h2 id="install-title">Run your first audit.</h2><p>The crate is not published yet. These commands use the public source checkout.</p></div><div class="terminal" role="region" tabindex="0" aria-label="Terminal command example"><code><span>$</span> git clone https://github.com/B-Divyesh/sf-media-fidelity-audit.git<br><span>$</span> cd sf-media-fidelity-audit<br><span>$</span> cargo install --path .<br><span>$</span> mfa audit --source /CameraExport \<br>&nbsp;&nbsp;--archive /PhotoArchive --output manifest.json</code><button class="copy" type="button" data-copy="cargo install --path .">Copy install command</button><p class="copy-status" aria-live="polite"></p></div></section>
  <section id="limits" class="limits" aria-labelledby="limits-title"><p class="eyebrow">Clear limits</p><h2 id="limits-title">It verifies bytes, not image quality.</h2><p>Matching hashes prove matching bytes. They do not judge focus, colour, or composition.</p><p>The audit matches relative paths. It cannot identify renamed or rearranged files.</p></section>`,
};

const demo: Page = {
  title: 'Demo — Media Fidelity Audit',
  description: 'Review the bundled Media Fidelity Audit sample and run the same sample with mfa demo.',
  html: `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span>Five bundled files in an isolated temporary folder.</span><button type="button" data-reset-demo>Reset demo</button><a href="/#install">Start for real</a></aside>
  <section class="demo-page" aria-labelledby="page-title"><p class="eyebrow">Bundled command-line demo</p><h1 id="page-title" tabindex="-1">Review a sample archive audit.</h1><p class="lede">This result comes from the same five files shipped with the CLI.</p><div class="terminal demo-terminal" role="region" tabindex="0" aria-label="Recorded output from mfa demo"><code><span>$</span> mfa demo<br>Demo — bundled sample data; your media is never read or changed.<br><br>Media Fidelity Audit<br>&nbsp;&nbsp;5 source files · 3 identical · 1 changed · 1 missing · 0 unreadable<br>&nbsp;&nbsp;manifest: /tmp/mfa-demo…/sample-manifest.json</code></div><div class="demo-grid"><div class="audit-card"><p class="audit-title">Sample result</p><dl><div><dt>Identical</dt><dd class="good">3</dd></div><div><dt>Changed</dt><dd class="warn">1</dd></div><div><dt>Missing</dt><dd class="bad">1</dd></div><div><dt>Live Photo pairs</dt><dd>1</dd></div></dl></div><div><h2>Files in the sample</h2><ul class="file-list"><li><code>birthday.jpg</code> — identical</li><li><code>beach-live.HEIC</code> — identical</li><li><code>beach-live.MOV</code> — identical</li><li><code>family.jpg</code> — changed</li><li><code>family.xmp</code> — missing</li></ul><h2>Run it yourself</h2><div class="command-row"><code>cargo run -- demo</code><button class="copy" type="button" data-copy="cargo run -- demo">Copy demo command</button></div><p class="copy-status" aria-live="polite"></p></div></div></section>`,
};

const privacy: Page = {
  title: 'Privacy — Media Fidelity Audit',
  description: 'How Media Fidelity Audit handles files and data.',
  html: `<article class="legal" aria-labelledby="page-title"><p class="eyebrow">Policy</p><h1 id="page-title" tabindex="-1">Privacy</h1><p>Media Fidelity Audit reads files only from the source and archive folders you choose.</p><p>The CLI has no account system, network dependency, analytics, or telemetry.</p><p>The static website does not collect data or store anything in your browser.</p><h2>Questions</h2><p>Open an issue in the <a href="https://github.com/B-Divyesh/sf-media-fidelity-audit">public source repository</a>.</p></article>`,
};

const terms: Page = {
  title: 'Terms — Media Fidelity Audit',
  description: 'Terms for using Media Fidelity Audit.',
  html: `<article class="legal" aria-labelledby="page-title"><p class="eyebrow">Terms</p><h1 id="page-title" tabindex="-1">Terms</h1><p>Media Fidelity Audit is provided under the MIT License.</p><p>It is a verification aid, not a replacement for backups or manual review.</p><p>Hashes establish byte equality. They do not establish image quality or fitness for a purpose.</p><p>You are responsible for choosing the correct source and archive folders.</p></article>`,
};

const notFound: Page = {
  title: 'Page not found — Media Fidelity Audit',
  description: 'The requested Media Fidelity Audit page was not found.',
  html: `<section class="not-found" aria-labelledby="page-title"><div class="lost-thread" aria-hidden="true"></div><p class="eyebrow">404 · Thread lost</p><h1 id="page-title" tabindex="-1">This archive path is missing.</h1><p>The page may have moved, but your media has not been touched.</p><a class="button" href="/">Return home</a></section>`,
};

const routes: Record<string, Page> = { '/': home, '/demo': demo, '/privacy': privacy, '/terms': terms, '/404': notFound };
const main = document.querySelector<HTMLElement>('#main')!;
const announcement = document.querySelector<HTMLElement>('.route-status')!;

function render(focus = false) {
  const path = location.pathname.replace(/\/$/, '') || '/';
  const page = routes[path] || notFound;
  main.innerHTML = page.html;
  document.title = page.title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = page.description;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')!.href = `https://media-fidelity-audit.sociobot.in${path === '/' ? '/' : path}`;
  announcement.textContent = page.title;
  bindActions();
  if (focus) document.querySelector<HTMLElement>('h1')?.focus();
}

function bindActions() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const status = button.closest('div')?.querySelector<HTMLElement>('.copy-status') || document.querySelector<HTMLElement>('.copy-status');
    try { await navigator.clipboard.writeText(button.dataset.copy!); if (status) status.textContent = 'Command copied.'; }
    catch { if (status) status.textContent = 'Select the command and copy it manually.'; }
  }));
  document.querySelector<HTMLButtonElement>('[data-reset-demo]')?.addEventListener('click', () => {
    render(false);
    const banner = document.querySelector<HTMLElement>('.demo-banner');
    if (banner) { banner.tabIndex = -1; banner.focus(); }
    announcement.textContent = 'Demo reset to the bundled sample.';
  });
}

document.addEventListener('click', event => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
  if (!link || link.origin !== location.origin || link.target || link.hasAttribute('download')) return;
  const target = new URL(link.href);
  if (target.pathname === location.pathname && target.hash) return;
  event.preventDefault();
  history.pushState({}, '', target.pathname + target.hash);
  render(true);
  if (target.hash) document.querySelector(target.hash)?.scrollIntoView(); else scrollTo(0, 0);
});
window.addEventListener('popstate', () => render(true));
render(false);
