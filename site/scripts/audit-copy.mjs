import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const port = 4174;
const base = `http://127.0.0.1:${port}`;
const outputPath = '.factory/copy-audit.md';
const write = process.argv.includes('--write');
const banned = ['leverage', 'seamless', 'effortless', 'robust', 'powerful', 'intuitive', 'reimagine', 'supercharge', 'unlock', 'delightful', 'journey', 'ecosystem', 'AI-powered'];
const routes = [
  ['Landing (`/`)', '/'],
  ['Demo query (`/?demo=1`)', '/?demo=1'],
  ['Demo route (`/demo`)', '/demo'],
  ['Privacy (`/privacy`)', '/privacy'],
  ['Terms (`/terms`)', '/terms'],
  ['Not found (`/404`)', '/404'],
];

const normalise = value => value.replace(/\s+/g, ' ').trim();
const count = value => normalise(value).split(/\s+/).filter(Boolean).length;
const escapeTable = value => value.replaceAll('|', '\\|').replaceAll('\n', ' ');
const splitSentences = value => normalise(value).split(/(?<=[.!?])\s+(?=[A-Z0-9`])/).map(normalise).filter(Boolean);

function readMarkdownProse() {
  const blocks = [];
  let paragraph = [];
  let fenced = false;
  const flush = () => {
    if (!paragraph.length) return;
    const value = paragraph.join(' ')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^#+\s*/, '')
      .replace(/^[-*+]\s+/, '');
    blocks.push(...splitSentences(value));
    paragraph = [];
  };
  for (const raw of readFileSync('README.md', 'utf8').split('\n')) {
    if (raw.trim().startsWith('```')) { flush(); fenced = !fenced; continue; }
    if (fenced) continue;
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^#{1,6}\s/.test(line) || /^[-*+]\s+/.test(line)) flush();
    paragraph.push(line);
    if (/^#{1,6}\s/.test(line) || /^[-*+]\s+/.test(line)) flush();
  }
  flush();
  return blocks;
}

function table(values) {
  return ['| Text | Words |', '| --- | ---: |', ...values.map(value => `| ${escapeTable(value)} | ${count(value)} |`)].join('\n');
}

function validate(groups) {
  for (const [name, values] of groups) {
    for (const value of values) {
      assert.ok(count(value) <= 22, `${name} has more than 22 words: ${value}`);
      for (const word of banned) assert.doesNotMatch(value, new RegExp(`\\b${word}\\b`, 'i'), `${name} contains banned word ${word}`);
    }
  }
}

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
let browser;
try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(base)).ok) break; } catch {}
    if (attempt === 79) throw new Error('copy-audit preview server did not start');
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const rendered = [];
  for (const [name, path] of routes) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const values = await page.evaluate(() => {
      const selector = 'h1,h2,h3,p,li,figcaption,button,dt,dd,a,strong,.proof-strip span,.actions > span,.demo-banner > span,footer span';
      return [...document.querySelectorAll(selector)]
        .filter(element => !element.closest('[aria-hidden="true"],.route-status'))
        .filter(element => !(element.matches('p,li') && element.querySelector('h1,h2,h3,p,a,button')))
        .map(element => (element.textContent || '').replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .flatMap(value => value.split(/(?<=[.!?])\s+(?=[A-Z0-9`])/).map(item => item.trim()).filter(Boolean));
    });
    rendered.push([name, values]);
  }
  const readme = readMarkdownProse();
  const groups = [...rendered, ['README', readme]];
  validate(groups);

  assert.ok(rendered[0][1].includes('Compare source folders with local media archives.'), 'landing footer sentence is absent');
  assert.ok(readme.includes('Open the one-click website demo at media-fidelity-audit.sociobot.in/?demo=1.'), 'README demo sentence is absent');
  assert.ok(readme.includes('The public claims and isolated tests are listed in .factory/claims.json.'), 'README claims sentence is absent');
  assert.ok(readme.includes('Demo details are in .factory/demo.md.'), 'README demo-details sentence is absent');
  assert.equal(groups.flatMap(([, values]) => values).some(value => value.includes('exact-match code')), false, 'undefined exact-match code remains');
  assert.equal(groups.flatMap(([, values]) => values).some(value => value.includes('Thread lost')), false, 'metaphorical 404 label remains');
  assert.equal(groups.flatMap(([, values]) => values).some(value => value.includes('Run it yourself')), false, 'context-free demo heading remains');
  assert.equal(groups.flatMap(([, values]) => values).some(value => value.includes('archive path is missing') || value.includes('media has not been touched')), false, 'metaphorical or unlisted 404 reassurance remains');
  for (const route of ['Demo query (`/?demo=1`)', 'Demo route (`/demo`)']) assert.ok(rendered.find(([name]) => name === route)[1].includes('Run the sample audit locally'), `${route} lacks the literal local-demo heading`);
  assert.ok(rendered.find(([name]) => name === 'Not found (`/404`)')[1].includes('404 error'), 'literal 404 label is absent');
  assert.ok(rendered.find(([name]) => name === 'Not found (`/404`)')[1].includes('This page was not found.'), 'literal 404 heading is absent');
  assert.ok(rendered.find(([name]) => name === 'Not found (`/404`)')[1].includes('Check the address or return to the home page.'), '404 recovery step is absent');

  const sections = rendered.map(([name, values]) => `## ${name}\n\n${table(values)}`).join('\n\n');
  const generated = `# Copy audit\n\nGenerated from the rendered production build and \`README.md\` by \`npm run audit:copy\`.\n\nCounts split on whitespace. Hyphenated words, flags, paths, and numbers count as one word. The automated gate fails for text over 22 words, banned words, omitted required sentences, or any drift from this file.\n\n${sections}\n\n## README headings and prose\n\n${table(readme)}\n\n## Terminology\n\n| Concept | Single term |\n| --- | --- |\n| Folder from the export | source folder |\n| Stored local folder | archive folder |\n| JSON output | JSON audit report |\n| Isolated bundled example | demo |\n| Paired still and motion media | Live Photo pair |\n`;

  if (write) {
    writeFileSync(outputPath, generated);
    console.log(`wrote ${outputPath}`);
  } else {
    assert.equal(readFileSync(outputPath, 'utf8'), generated, `copy audit drifted; run npm run audit:copy`);
    console.log('copy audit matches the rendered site and README');
  }
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
