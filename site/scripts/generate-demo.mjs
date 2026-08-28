import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const output = execFileSync('target/debug/mfa', ['demo'], { encoding: 'utf8' });
const workspace = output.match(/demo workspace: (.+)/)?.[1]?.trim();
if (!workspace) throw new Error('mfa demo did not print its workspace');
try {
  const manifest = JSON.parse(readFileSync(join(workspace, 'sample-manifest.json'), 'utf8'));
  const result = {
    summary: manifest.summary,
    assets: manifest.assets.map(({ relative_path, status, kind, source }) => ({ relative_path, status, kind, media: source?.media ?? null })),
    livePhotoPair: manifest.live_photo_pairs[0] ?? null,
  };
  if (result.summary.source_files !== 5 || !result.assets.every(asset => asset.kind === 'sidecar' || asset.media)) throw new Error('bundled media fixture did not produce expected observations');
  writeFileSync('site/src/generated-demo.ts', `// Generated from mfa demo by site/scripts/generate-demo.mjs.\nexport const demoResult = ${JSON.stringify(result, null, 2)} as const;\n`);
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
