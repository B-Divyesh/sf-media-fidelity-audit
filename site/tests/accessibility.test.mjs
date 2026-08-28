import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

test('landing page has no serious accessibility violations', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = []; page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(process.env.SITE_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.locator('main').count(), 1); assert.equal(await page.locator('h1').count(), 1);
  const results = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(results.violations.filter(v => ['serious', 'critical'].includes(v.impact)), []);
  assert.deepEqual(errors, []); await context.close(); await browser.close();
});
