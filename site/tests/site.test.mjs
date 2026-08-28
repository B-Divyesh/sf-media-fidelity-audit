import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('deployment policy defines routes, CSP, immutable assets, and a real 404', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8'));
  for (const route of ['/demo', '/privacy', '/terms']) assert.ok(config.routes.some(item => item.route === route));
  assert.match(config.globalHeaders['Content-Security-Policy'], /default-src 'self'/);
  assert.match(config.routes.find(item => item.route === '/assets/*').headers['Cache-Control'], /immutable/);
  assert.equal(config.responseOverrides['404'].statusCode, 404);
  assert.match(readFileSync('site/public/404.html', 'utf8'), /<h1>/);
});

test('metadata, discovery, and social assets are present', () => {
  const html = readFileSync('site/index.html', 'utf8');
  for (const marker of ['rel="canonical"', 'property="og:image"', 'name="twitter:card"', 'rel="icon"', 'rel="apple-touch-icon"']) assert.match(html, new RegExp(marker));
  assert.match(readFileSync('site/public/robots.txt', 'utf8'), /sitemap\.xml/);
  const sitemap = readFileSync('site/public/sitemap.xml', 'utf8');
  for (const path of ['/', '/demo', '/privacy', '/terms']) assert.ok(sitemap.includes(`sociobot.in${path}`));
});

test('no paid offer or unpublished registry install remains', () => {
  const source = readFileSync('site/src/main.ts', 'utf8') + readFileSync('README.md', 'utf8');
  assert.doesNotMatch(source, /Buy Pro|one-time Pro|cargo install media-fidelity-audit/);
  assert.match(source, /cargo install --path \./);
});
