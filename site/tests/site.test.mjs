import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

test('deployment policy defines raw route shells, CSP, immutable assets, and a real 404', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8'));
  for (const [route, shell] of [['/demo', '/demo.html'], ['/privacy', '/privacy.html'], ['/terms', '/terms.html']]) assert.equal(config.routes.find(item => item.route === route).rewrite, shell);
  assert.match(config.globalHeaders['Content-Security-Policy'], /default-src 'self'/);
  assert.match(config.routes.find(item => item.route === '/assets/*').headers['Cache-Control'], /immutable/);
  assert.equal(config.responseOverrides['404'].statusCode, 404);
  const notFound = readFileSync('site/public/404.html', 'utf8');
  for (const marker of ['<h1>', 'Privacy', 'Terms', 'Source on GitHub', 'external', 'property="og:title"']) assert.match(notFound, new RegExp(marker));
  assert.match(notFound, />404 error</);
  assert.match(notFound, /<h1>This page was not found\.<\/h1>/);
  assert.match(notFound, /Check the address or return to the home page\./);
  assert.doesNotMatch(notFound, /Thread lost|archive path is missing|media has not been touched/);
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

test('every registered claim has exactly one tagged test and a unique id', () => {
  const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8'));
  assert.equal(new Set(claims.map(claim => claim.id)).size, claims.length);
  const tests = readFileSync('site/tests/claims.test.mjs', 'utf8') + readFileSync('site/tests/accessibility.test.mjs', 'utf8') + readFileSync('site/tests/site.test.mjs', 'utf8');
  for (const claim of claims) {
    assert.ok(claim.claim && claim.where && claim.test && claim.sandbox, `claim ${claim.id} is incomplete`);
    assert.equal(tests.split(`@claim:${claim.id}`).length - 1, 1, `claim ${claim.id} must tag exactly one test`);
    assert.match(claim.test, new RegExp(`@claim:${claim.id}`));
  }
});

test('first-screen demo uses the isolated query entry and report wording names SHA-256', () => {
  const source = readFileSync('site/src/main.ts', 'utf8');
  assert.match(source, /href="\/\?demo=1">Try it with sample data/);
  assert.match(source, /result, size, SHA-256 value/);
  assert.doesNotMatch(source, /exact-match code/);
});

test('landing names the report and limits sections and contains the terminal recording', () => {
  const source = readFileSync('site/src/main.ts', 'utf8');
  assert.match(source, /What the JSON audit report shows/);
  assert.match(source, /What this audit does not check/);
  assert.match(source, /src="\/mfa-demo-recording\.svg"/);
  assert.doesNotMatch(source, /A report shows what happened|Clear limits/);
});

test('demo headings and 404 recovery copy use literal task language', () => {
  const source = readFileSync('site/src/main.ts', 'utf8');
  assert.match(source, /<h2>Run the sample audit locally<\/h2>/);
  assert.match(source, /This page was not found\./);
  assert.match(source, /Check the address or return to the home page\./);
  assert.doesNotMatch(source, /Run it yourself|archive path is missing|media has not been touched/);
});

test('@claim:build-output production build writes the complete static site to dist/site', () => {
  for (const path of ['dist/site/index.html', 'dist/site/demo.html', 'dist/site/privacy.html', 'dist/site/terms.html', 'dist/site/404.html', 'dist/site/staticwebapp.config.json']) {
    assert.equal(existsSync(path), true, `${path} must exist after npm run build`);
  }
  const assets = readdirSync('dist/site/assets');
  assert.ok(assets.some(file => /^main-.*\.js$/.test(file)), 'production JavaScript asset is missing');
  assert.ok(assets.some(file => /^main-.*\.css$/.test(file)), 'production CSS asset is missing');
  for (const shell of ['index.html', 'demo.html', 'privacy.html', 'terms.html']) {
    const html = readFileSync(`dist/site/${shell}`, 'utf8');
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<script type="module" crossorigin src="\/assets\/main-/);
  }
});

test('shared styles enforce 44px persistent navigation targets', () => {
  const appStyles = readFileSync('site/src/style.css', 'utf8');
  const notFoundStyles = readFileSync('site/public/404.css', 'utf8');
  for (const styles of [appStyles, notFoundStyles]) {
    assert.match(styles, /\.wordmark\s*\{[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
    assert.match(styles, /\.site-header nav a\s*\{[^}]*min-width:\s*44px[^}]*justify-content:\s*center/s);
    assert.match(styles, /footer a\s*\{[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
  }
});
