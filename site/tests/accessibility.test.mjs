import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const port = 4173;
const base = process.env.SITE_URL || `http://127.0.0.1:${port}`;
let server;

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
    for (const path of ['/', '/demo', '/privacy', '/terms', '/404', '/not-a-real-route']) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(base + path, { waitUntil: 'networkidle' });
      if (process.env.SITE_URL && path === '/not-a-real-route') assert.equal(response?.status(), 404);
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('h1').count(), 1);
      assert.ok((await page.title()).includes('Media Fidelity Audit'));
      assert.ok(await page.locator('header').isVisible());
      assert.ok(await page.locator('footer').isVisible());
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
  await page.locator('a', { hasText: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await page.waitForURL('**/demo');
  assert.equal(await page.locator('h1').textContent(), 'Review a sample archive audit.');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'page-title');
  await page.locator('[data-reset-demo]').focus();
  await page.keyboard.press('Space');
  assert.match(await page.locator('.route-status').textContent(), /Demo reset/);
  assert.equal(await page.locator('.diorama').count(), 0);
  await page.goBack();
  assert.equal(await page.locator('h1').textContent(), 'Check your archive against a source folder.');
  assert.equal(await page.locator('.diorama').evaluate(element => getComputedStyle(element).animationName), 'none');
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

test('@claim:one-click-demo and @claim:sample-demo show the isolated finished result immediately', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await page.waitForURL('**/demo');
  await assert.equal(await page.getByText('Demo — sample data, nothing is saved').count(), 1);
  for (const item of [['Identical', '3'], ['Changed', '1'], ['Missing', '1'], ['Live Photo pairs', '1']]) {
    const row = page.locator('.demo-summary dl div').filter({ hasText: item[0] });
    assert.equal(await row.locator('dd').textContent(), item[1]);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.goto(`${base}/?demo=1`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('h1').textContent(), 'Review a sample archive audit.');
  assert.equal(await page.getByText('Demo — sample data, nothing is saved').count(), 1);
  await context.close(); await browser.close();
});
