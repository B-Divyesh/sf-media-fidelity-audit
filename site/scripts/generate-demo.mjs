import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const output = execFileSync('target/debug/mfa', ['demo'], { encoding: 'utf8' });
const workspace = output.match(/demo workspace: (.+)/)?.[1]?.trim();
if (!workspace) throw new Error('mfa demo did not print its workspace');

const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const normalisedOutput = output.trim().replaceAll(workspace, '/tmp/mfa-demo…');
const terminalLines = ['$ mfa demo', '', ...normalisedOutput.split('\n')];
const terminalSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" role="img" aria-labelledby="recording-title recording-description">
  <title id="recording-title">Recorded output from mfa demo</title>
  <desc id="recording-description">${escapeXml(terminalLines.join('\n'))}</desc>
  <rect width="1000" height="360" rx="4" fill="#172725"/>
  <rect x="1" y="1" width="998" height="47" rx="4" fill="#213634" stroke="#f6d58b" stroke-opacity=".42"/>
  <circle cx="28" cy="24" r="7" fill="#b84c35"/><circle cx="52" cy="24" r="7" fill="#b77916"/><circle cx="76" cy="24" r="7" fill="#176948"/>
  <text x="105" y="30" fill="#f6f0e5" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="16">mfa demo — bundled sample</text>
  ${terminalLines.map((line, index) => `<text x="34" y="${86 + index * 34}" fill="${index === 0 ? '#f6d58b' : '#f5eddd'}" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="16">${escapeXml(line || ' ')}</text>`).join('\n  ')}
</svg>
`;
try {
  const manifest = JSON.parse(readFileSync(join(workspace, 'sample-manifest.json'), 'utf8'));
  const result = {
    summary: manifest.summary,
    assets: manifest.assets.map(({ relative_path, status, kind, source }) => ({ relative_path, status, kind, media: source?.media ?? null })),
    livePhotoPair: manifest.live_photo_pairs[0] ?? null,
  };
  if (result.summary.source_files !== 5 || !result.assets.every(asset => asset.kind === 'sidecar' || asset.media)) throw new Error('bundled media fixture did not produce expected observations');
  writeFileSync('site/src/generated-demo.ts', `// Generated from mfa demo by site/scripts/generate-demo.mjs.\nexport const demoResult = ${JSON.stringify(result, null, 2)} as const;\n`);
  writeFileSync('site/public/mfa-demo-recording.svg', terminalSvg);
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
