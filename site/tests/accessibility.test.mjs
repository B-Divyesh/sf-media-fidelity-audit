import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const port = 4173;
const base = process.env.SITE_URL || `http://127.0.0.1:${port}`;
let server;
const demoWorkspace = output => output.match(/demo workspace: (.+)/)?.[1].trim();
const normaliseDemoOutput = (output, workspace) => output.trim().replaceAll(workspace, '/tmp/mfa-demo…');

before(async () => {
  if (process.env.SITE_URL) return;
  server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port)], { stdio: 'ignore' });
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try { if ((await fetch(base)).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('preview server did not start');
});

after(() => server?.kill('SIGTERM'));

for (const profile of [
  { viewport: { width: 1440, height: 900 }, colorScheme: 'light' },
  { viewport: { width: 390, height: 844 }, colorScheme: 'light' },
  { viewport: { width: 390, height: 844 }, colorScheme: 'dark' },
]) {
  test(`all routes pass browser and accessibility checks at ${profile.viewport.width}px ${profile.colorScheme}`, async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext(profile);
    const routeTitles = new Map([
      ['/', 'Media Fidelity Audit — check a media archive'],
      ['/?demo=1', 'Demo — Media Fidelity Audit'],
      ['/demo', 'Demo — Media Fidelity Audit'],
      ['/privacy', 'Privacy — Media Fidelity Audit'],
      ['/terms', 'Terms — Media Fidelity Audit'],
      ['/404', 'Page not found — Media Fidelity Audit'],
      ['/not-a-real-route', 'Page not found — Media Fidelity Audit'],
    ]);
    for (const [path, title] of routeTitles) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      if (process.env.SITE_URL && path === '/not-a-real-route') assert.equal(response?.status(), 404);
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.title(), title);
      assert.ok(await page.locator('header').isVisible());
      assert.ok(await page.locator('footer').isVisible());
      assert.equal(await page.locator('footer a[href="/privacy"]').count(), 1);
      assert.equal(await page.locator('footer a[href="/terms"]').count(), 1);
      if (profile.viewport.width === 390) {
        for (const control of await page.locator('.site-header a, footer a').all()) {
          const box = await control.boundingBox();
          assert.ok(box && box.width >= 44 && box.height >= 44, `persistent control must be at least 44px square: ${await control.textContent()} (${box?.width}x${box?.height})`);
        }
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const results = await new AxeBuilder({ page }).analyze();
      assert.deepEqual(results.violations.filter(v => ['serious', 'critical'].includes(v.impact)), []);
      if (path !== '/not-a-real-route') assert.deepEqual(errors, []);
      await page.close();
    }
    await context.close(); await browser.close();
  });
}

test('keyboard, history, focus, demo reset, and reduced motion work', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to main content');
  await page.getByRole('link', { name: 'Limits' }).click();
  await page.waitForURL('**/#limits');
  await page.waitForFunction(() => document.activeElement?.id === 'page-title');
  const limitsScroll = await page.evaluate(() => scrollY);
  assert.ok(limitsScroll > 100, `limits section should be scrolled into view, received ${limitsScroll}`);
  await page.getByRole('link', { name: 'Demo', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForURL('**/demo');
  assert.equal(await page.locator('h1').textContent(), 'Review a sample archive audit.');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'page-title');
  await page.locator('[data-reset-demo]').focus();
  await page.keyboard.press('Space');
  assert.match(await page.locator('.route-status').textContent(), /Demo reset/);
  assert.equal(await page.locator('.demo-banner').evaluate(element => getComputedStyle(element).position), 'sticky');
  assert.equal(await page.locator('.diorama').count(), 0);
  await page.goBack();
  await page.waitForURL('**/#limits');
  await page.waitForFunction(() => document.activeElement?.id === 'page-title');
  assert.equal(await page.locator('h1').textContent(), 'Check your archive against a source folder.');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'page-title');
  assert.ok(Math.abs((await page.evaluate(() => scrollY)) - limitsScroll) <= 2, 'Back should preserve the restored section scroll position');
  assert.equal(await page.locator('.diorama').evaluate(element => getComputedStyle(element).animationName), 'none');
  await page.goForward();
  await page.waitForURL('**/demo');
  await page.waitForFunction(() => document.activeElement?.id === 'page-title');
  assert.equal(await page.locator('h1').textContent(), 'Review a sample archive audit.');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'page-title');
  await context.close(); await browser.close();
});

test('404 routes use a literal error label', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  for (const path of ['/404', '/not-a-real-route']) {
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.eyebrow').textContent(), '404 error');
    assert.equal(await page.locator('h1').textContent(), 'This page was not found.');
    assert.equal(await page.getByText('Check the address or return to the home page.', { exact: true }).count(), 1);
    assert.equal(await page.getByText('Thread lost').count(), 0);
    assert.equal(await page.getByText('This archive path is missing.').count(), 0);
    assert.equal(await page.getByText(/media has not been touched/).count(), 0);
    await page.close();
  }
  await context.close(); await browser.close();
});

test('@claim:static-privacy demo sends no third-party request and stores no data', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByText('Try it with sample data').click();
  await page.locator('[data-reset-demo]').click();
  assert.ok(requests.length > 0);
  assert.deepEqual([...new Set(requests.map(url => new URL(url).origin))], [base]);
  assert.deepEqual(await page.evaluate(async () => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    databases: indexedDB.databases ? (await indexedDB.databases()).map(db => db.name) : [],
    serviceWorkers: (await navigator.serviceWorker?.getRegistrations() || []).length,
  })), { local: [], session: [], databases: [], serviceWorkers: 0 });
  await context.close(); await browser.close();
});

test('@claim:cli-demo-recording displays a self-hosted mfa demo recording with current command output', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const recording = page.locator('img[src="/mfa-demo-recording.svg"]');
  assert.equal(await recording.count(), 1);
  assert.equal(await recording.isVisible(), true);
  assert.equal(await recording.evaluate(image => image.complete && image.naturalWidth > 0), true);
  const svg = await page.evaluate(async src => {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`recording request failed: ${response.status}`);
    return response.text();
  }, await recording.getAttribute('src'));
  const result = spawnSync(join(process.cwd(), 'target', 'debug', 'mfa'), ['demo'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const workspace = demoWorkspace(result.stdout);
  assert.ok(workspace);
  for (const line of ['$ mfa demo', ...normaliseDemoOutput(result.stdout, workspace).split('\n')]) assert.ok(svg.includes(line), `recording must display: ${line}`);
  rmSync(workspace, { recursive: true });
  await context.close(); await browser.close();
});

test('@claim:one-click-demo and @claim:sample-demo show the isolated finished result immediately', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await page.waitForURL('**/?demo=1');
  await assert.equal(await page.getByText('Demo — sample data, nothing is saved').count(), 1);
  for (const item of [['Identical', '3'], ['Changed', '1'], ['Missing', '1'], ['Live Photo pairs', '1']]) {
    const row = page.locator('.demo-summary dl div').filter({ hasText: item[0] });
    assert.equal(await row.locator('dd').textContent(), item[1]);
  }
  const reset = page.getByRole('button', { name: 'Reset demo' });
  assert.equal(await reset.isVisible(), true);
  await reset.click();
  assert.match(await page.locator('.route-status').textContent(), /Demo reset/);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);

  for (const path of ['examples/source/2025/birthday.jpg', 'examples/source/2025/beach-live.MOV', 'examples/source/2025/beach-live.HEIC']) assert.ok(readFileSync(path).length > 1000, `${path} is a real fixture`);
  assert.deepEqual([...readFileSync('examples/source/2025/birthday.jpg').subarray(0, 2)], [0xff, 0xd8]);
  assert.equal(readFileSync('examples/source/2025/beach-live.MOV').subarray(4, 8).toString(), 'ftyp');
  const result = spawnSync(join(process.cwd(), 'target', 'debug', 'mfa'), ['demo'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const workspace = result.stdout.match(/demo workspace: (.+)/)?.[1].trim();
  assert.ok(workspace);
  const manifest = JSON.parse(readFileSync(join(workspace, 'sample-manifest.json'), 'utf8'));
  assert.deepEqual(manifest.summary, { source_files: 5, matched: 3, changed: 1, missing: 1, unreadable: 0, moved: 0, archive_only: 0, sidecars: 1, live_photo_pairs: 1, all_byte_identical: false });
  assert.ok(manifest.assets.find(asset => asset.relative_path.endsWith('birthday.jpg')).source.media.exif_sha256);
  assert.equal(manifest.assets.find(asset => asset.relative_path.endsWith('beach-live.MOV')).source.media.codec, 'avc1');
  rmSync(workspace, { recursive: true });
  await context.close(); await browser.close();
});
