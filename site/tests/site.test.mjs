import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('deployment policy defines raw route shells, CSP, immutable assets, and a real 404', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8'));
  for (const [route, shell] of [['/demo', '/demo.html'], ['/privacy', '/privacy.html'], ['/terms', '/terms.html']]) assert.equal(config.routes.find(item => item.route === route).rewrite, shell);
  assert.match(config.globalHeaders['Content-Security-Policy'], /default-src 'self'/);
  assert.match(config.routes.find(item => item.route === '/assets/*').headers['Cache-Control'], /immutable/);
  assert.equal(config.responseOverrides['404'].statusCode, 404);
  const notFound = readFileSync('site/public/404.html', 'utf8');
  for (const marker of ['<h1>', 'Privacy', 'Terms', 'Source on GitHub', 'external', 'property="og:title"']) assert.match(notFound, new RegExp(marker));
});

test('metadata, discovery, and social assets are present', () => {
  for (const [file, routeTitle, canonical] of [['site/index.html', 'Media Fidelity Audit — check a media archive', '/'], ['site/demo.html', 'Demo — Media Fidelity Audit', '/demo'], ['site/privacy.html', 'Privacy — Media Fidelity Audit', '/privacy'], ['site/terms.html', 'Terms — Media Fidelity Audit', '/terms']]) {
    const html = readFileSync(file, 'utf8');
    for (const marker of ['rel="canonical"', 'property="og:image"', 'name="twitter:card"', 'rel="icon"', 'rel="apple-touch-icon"', routeTitle, `sociobot.in${canonical}`]) assert.match(html, new RegExp(marker));
  }
  assert.match(readFileSync('site/public/robots.txt', 'utf8'), /sitemap\.xml/);
  const sitemap = readFileSync('site/public/sitemap.xml', 'utf8');
  for (const path of ['/', '/demo', '/privacy', '/terms']) assert.ok(sitemap.includes(`sociobot.in${path}`));
});

test('no paid offer or unpublished registry install remains', () => {
  const source = readFileSync('site/src/main.ts', 'utf8') + readFileSync('README.md', 'utf8');
  assert.doesNotMatch(source, /Buy Pro|one-time Pro|cargo install media-fidelity-audit/);
  assert.match(source, /cargo install --path \./);
});
