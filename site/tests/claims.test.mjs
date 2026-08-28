import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const binary = join(process.cwd(), 'target', 'debug', 'mfa');
const run = args => spawnSync(binary, args, { encoding: 'utf8' });
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');

test('@claim:sample-demo bundled demo produces the documented audit', () => {
  const result = run(['demo']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /5 source files · 3 identical · 1 changed · 1 missing · 0 unreadable/);
  const workspace = result.stdout.match(/demo workspace: (.+)/)?.[1].trim();
  assert.ok(workspace);
  const manifest = JSON.parse(readFileSync(join(workspace, 'sample-manifest.json'), 'utf8'));
  assert.deepEqual(manifest.summary, {
    source_files: 5, matched: 3, changed: 1, missing: 1, unreadable: 0,
    sidecars: 1, live_photo_pairs: 1, all_byte_identical: false,
  });
  assert.equal(manifest.live_photo_pairs[0].motion, '2025/beach-live.MOV');
  rmSync(workspace, { recursive: true });
});

test('@claim:read-only-safety input media cannot be an output', () => {
  const root = mkdtempSync(join(tmpdir(), 'mfa-safety-'));
  const source = join(root, 'source');
  const archive = join(root, 'archive');
  mkdirSync(source); mkdirSync(archive);
  writeFileSync(join(source, 'photo.jpg'), 'source original');
  writeFileSync(join(archive, 'photo.jpg'), 'archive original');
  const before = hash(join(archive, 'photo.jpg'));
  const replace = run(['audit', '--source', source, '--archive', archive, '--output', join(archive, 'photo.jpg')]);
  assert.equal(replace.status, 2);
  assert.match(replace.stderr, /output already exists/);
  assert.equal(hash(join(archive, 'photo.jpg')), before);
  const inside = run(['audit', '--source', source, '--archive', archive, '--output', join(source, 'new.json')]);
  assert.equal(inside.status, 2);
  assert.match(inside.stderr, /outside the source tree/);
  rmSync(root, { recursive: true });
});

test('@claim:media-observations real fixtures expose EXIF, codec, and frame rate', () => {
  for (const name of ['tests::real_jpeg_fixture_reports_exif_fields', 'tests::real_mov_fixture_reports_codec_and_frame_rate', 'tests::uppercase_live_photo_motion_is_paired']) {
    const result = spawnSync('cargo', ['test', name, '--', '--exact'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /1 passed/);
  }
});

test('@claim:json-automation JSON output and exit codes are scriptable', () => {
  const root = mkdtempSync(join(tmpdir(), 'mfa-json-'));
  const source = join(root, 'source');
  const archive = join(root, 'archive');
  mkdirSync(source); mkdirSync(archive);
  writeFileSync(join(source, 'photo.jpg'), 'same');
  writeFileSync(join(archive, 'photo.jpg'), 'same');
  const clean = run(['audit', '--source', source, '--archive', archive, '--output', join(root, 'clean.json'), '--json']);
  assert.equal(clean.status, 0, clean.stderr);
  assert.equal(JSON.parse(clean.stdout).all_byte_identical, true);
  writeFileSync(join(source, 'missing.jpg'), 'missing');
  const changed = run(['audit', '--source', source, '--archive', archive, '--output', join(root, 'changed.json'), '--json']);
  assert.equal(changed.status, 1, changed.stderr);
  assert.equal(JSON.parse(changed.stdout).missing, 1);
  const invalid = run(['audit', '--source', join(root, 'absent'), '--archive', archive, '--output', join(root, 'invalid.json')]);
  assert.equal(invalid.status, 2);
  rmSync(root, { recursive: true });
});

test('@claim:offline-local CLI demo succeeds with network syscalls denied', () => {
  const root = mkdtempSync(join(tmpdir(), 'mfa-network-'));
  const guard = join(root, 'deny-network.so');
  const compile = spawnSync('gcc', ['-shared', '-fPIC', 'site/tests/deny-network.c', '-o', guard], { encoding: 'utf8' });
  assert.equal(compile.status, 0, compile.stderr);
  rmSync('/tmp/mfa-network-attempted', { force: true });
  const result = spawnSync(binary, ['demo'], { encoding: 'utf8', env: { ...process.env, LD_PRELOAD: guard } });
  assert.equal(result.status, 0, result.stderr);
  assert.throws(() => readFileSync('/tmp/mfa-network-attempted'));
  const workspace = result.stdout.match(/demo workspace: (.+)/)?.[1].trim();
  if (workspace) rmSync(workspace, { recursive: true });
  rmSync(root, { recursive: true });
});

test('@claim:mit-license repository ships the promised license', () => {
  assert.match(readFileSync('LICENSE', 'utf8'), /Permission is hereby granted, free of charge/);
  assert.match(readFileSync('Cargo.toml', 'utf8'), /license = "MIT"/);
});
