import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const binary = join(process.cwd(), 'target', 'debug', 'mfa');
const run = args => spawnSync(binary, args, { encoding: 'utf8' });
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const tree = root => Object.fromEntries(readdirSync(root, { recursive: true }).filter(path => statSync(join(root, path)).isFile()).map(path => [path, hash(join(root, path))]));
const temp = name => mkdtempSync(join(tmpdir(), `mfa-${name}-`));
const audit = (source, archive, output, extra = []) => run(['audit', '--source', source, '--archive', archive, '--output', output, ...extra]);

test('@claim:sample-demo valid bundled media produces the documented result', () => {
  for (const path of ['examples/source/2025/birthday.jpg', 'examples/source/2025/beach-live.MOV', 'examples/source/2025/beach-live.HEIC']) assert.ok(readFileSync(path).length > 1000, `${path} is a real fixture`);
  assert.deepEqual([...readFileSync('examples/source/2025/birthday.jpg').subarray(0, 2)], [0xff, 0xd8]);
  assert.equal(readFileSync('examples/source/2025/beach-live.MOV').subarray(4, 8).toString(), 'ftyp');
  const result = run(['demo']); assert.equal(result.status, 0, result.stderr);
  const workspace = result.stdout.match(/demo workspace: (.+)/)?.[1].trim(); assert.ok(workspace);
  const manifest = JSON.parse(readFileSync(join(workspace, 'sample-manifest.json'), 'utf8'));
  assert.deepEqual(manifest.summary, { source_files: 5, matched: 3, changed: 1, missing: 1, unreadable: 0, moved: 0, archive_only: 0, sidecars: 1, live_photo_pairs: 1, all_byte_identical: false });
  assert.ok(manifest.assets.find(asset => asset.relative_path.endsWith('birthday.jpg')).source.media.exif_sha256);
  assert.equal(manifest.assets.find(asset => asset.relative_path.endsWith('beach-live.MOV')).source.media.codec, 'avc1');
  rmSync(workspace, { recursive: true });
});

test('@claim:archive-comparison classifies changed, missing, unreadable, and archive-only files', () => {
  const root = temp('comparison'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(join(source, 'nested'), { recursive: true }); mkdirSync(join(archive, 'nested'), { recursive: true });
  writeFileSync(join(source, 'same.jpg'), 'same'); writeFileSync(join(archive, 'same.jpg'), 'same'); writeFileSync(join(source, 'changed.jpg'), 'source'); writeFileSync(join(archive, 'changed.jpg'), 'archive'); writeFileSync(join(source, 'missing.jpg'), 'missing'); writeFileSync(join(source, 'blocked.jpg'), 'blocked'); mkdirSync(join(archive, 'blocked.jpg')); writeFileSync(join(archive, 'archive-only.jpg'), 'only here');
  const output = join(root, 'manifest.json'); const result = audit(source, archive, output); assert.equal(result.status, 1, result.stderr); const manifest = JSON.parse(readFileSync(output));
  const statuses = Object.fromEntries(manifest.assets.map(asset => [asset.relative_path, asset.status])); assert.deepEqual(statuses, { 'same.jpg': 'identical', 'changed.jpg': 'changed', 'missing.jpg': 'missing', 'blocked.jpg': 'unreadable', 'archive-only.jpg': 'archive_only' });
  rmSync(root, { recursive: true });
});

test('@claim:manifest-content records independent hashes, bytes, status, and media details', () => {
  const root = temp('manifest'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(source); mkdirSync(archive); const sourceFile = 'examples/source/2025/birthday.jpg'; writeFileSync(join(source, 'birthday.jpg'), readFileSync(sourceFile)); writeFileSync(join(archive, 'birthday.jpg'), readFileSync(sourceFile)); const output = join(root, 'manifest.json');
  assert.equal(audit(source, archive, output).status, 0); const asset = JSON.parse(readFileSync(output)).assets[0]; assert.equal(asset.relative_path, 'birthday.jpg'); assert.equal(asset.status, 'identical'); assert.equal(asset.source.bytes, statSync(join(source, 'birthday.jpg')).size); assert.equal(asset.source.sha256, hash(join(source, 'birthday.jpg'))); assert.ok(asset.source.media.exif_sha256); rmSync(root, { recursive: true });
});

test('@claim:read-only-safety never writes into or replaces either input folder', () => {
  const root = temp('safety'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(source); mkdirSync(archive); writeFileSync(join(source, 'photo.jpg'), 'source original'); writeFileSync(join(archive, 'photo.jpg'), 'archive original'); const before = { source: tree(source), archive: tree(archive) };
  for (const output of [join(source, 'photo.jpg'), join(source, 'new.json'), join(archive, 'photo.jpg'), join(archive, 'new.json')]) assert.equal(audit(source, archive, output).status, 2);
  assert.deepEqual({ source: tree(source), archive: tree(archive) }, before); rmSync(root, { recursive: true });
});

test('@claim:read-scope traces media reads to the chosen source and archive folders', () => {
  const root = temp('scope'); const source = join(root, 'source'); const archive = join(root, 'archive'); const elsewhere = join(root, 'elsewhere'); mkdirSync(source); mkdirSync(archive); mkdirSync(elsewhere); writeFileSync(join(source, 'photo.jpg'), 'same'); writeFileSync(join(archive, 'photo.jpg'), 'same'); writeFileSync(join(elsewhere, 'private.jpg'), 'must not be scanned'); const trace = join(root, 'file-trace.txt'); const guard = join(root, 'trace-files.so'); const compile = spawnSync('gcc', ['-shared', '-fPIC', 'site/tests/trace-files.c', '-ldl', '-o', guard], { encoding: 'utf8' }); assert.equal(compile.status, 0, compile.stderr); const output = join(root, 'manifest.json'); const result = spawnSync(binary, ['audit', '--source', source, '--archive', archive, '--output', output], { encoding: 'utf8', env: { ...process.env, LD_PRELOAD: guard, MFA_FILE_TRACE: trace } }); assert.equal(result.status, 0, result.stderr); const paths = readFileSync(trace, 'utf8'); assert.match(paths, new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/photo.jpg')); assert.match(paths, new RegExp(archive.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/photo.jpg')); assert.equal(paths.includes(join(elsewhere, 'private.jpg')), false); assert.equal(JSON.parse(readFileSync(output)).assets[0].relative_path, 'photo.jpg'); rmSync(root, { recursive: true });
});

test('@claim:media-observations records JPEG details, MOV codec/rate, sidecars, and upper-case pairs', () => {
  const result = run(['demo']); const workspace = result.stdout.match(/demo workspace: (.+)/)?.[1].trim(); const manifest = JSON.parse(readFileSync(join(workspace, 'sample-manifest.json'), 'utf8'));
  const jpeg = manifest.assets.find(asset => asset.relative_path.endsWith('birthday.jpg')); const movie = manifest.assets.find(asset => asset.relative_path.endsWith('.MOV')); const sidecar = manifest.assets.find(asset => asset.relative_path.endsWith('.xmp'));
  assert.equal(jpeg.kind, 'image'); assert.ok(jpeg.source.media.camera); assert.equal(movie.source.media.codec, 'avc1'); assert.equal(movie.source.media.fps, '24'); assert.deepEqual({ kind: sidecar.kind, status: sidecar.status }, { kind: 'sidecar', status: 'missing' }); assert.equal(manifest.live_photo_pairs[0].motion, '2025/beach-live.MOV'); rmSync(workspace, { recursive: true });
});

test('@claim:byte-not-perceptual flags byte differences without a quality judgement', () => {
  const root = temp('bytes'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(source); mkdirSync(archive); const photo = readFileSync('examples/source/2025/birthday.jpg'); writeFileSync(join(source, 'same-scene.jpg'), photo); writeFileSync(join(archive, 'same-scene.jpg'), Buffer.concat([photo, Buffer.from('\nmetadata differs')])); const output = join(root, 'manifest.json'); assert.equal(audit(source, archive, output).status, 1); const asset = JSON.parse(readFileSync(output)).assets[0]; assert.equal(asset.status, 'changed'); assert.equal(JSON.stringify(asset).toLowerCase().includes('quality'), false); rmSync(root, { recursive: true });
});

test('@claim:relative-path-matching uses paths by default and can find moved originals', () => {
  const root = temp('paths'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(join(source, 'camera'), { recursive: true }); mkdirSync(join(archive, 'library'), { recursive: true }); writeFileSync(join(source, 'camera', 'Case.JPG'), 'same bytes'); writeFileSync(join(archive, 'library', 'case.jpg'), 'same bytes');
  const defaultOutput = join(root, 'default.json'); assert.equal(audit(source, archive, defaultOutput).status, 1); assert.equal(JSON.parse(readFileSync(defaultOutput)).assets.find(asset => asset.relative_path === 'camera/Case.JPG').status, 'missing'); const movedOutput = join(root, 'moved.json'); assert.equal(audit(source, archive, movedOutput, ['--find-moved']).status, 1); const moved = JSON.parse(readFileSync(movedOutput)).assets.find(asset => asset.relative_path === 'camera/Case.JPG'); assert.equal(moved.status, 'moved'); assert.match(moved.observations[0], /library\/case.jpg/); rmSync(root, { recursive: true });
});

test('@claim:include-all includes files outside the default media and sidecar extensions', () => {
  const root = temp('all'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(source); mkdirSync(archive); writeFileSync(join(source, 'note.txt'), 'same'); writeFileSync(join(archive, 'note.txt'), 'same'); const one = join(root, 'one.json'); assert.equal(audit(source, archive, one).status, 0); assert.equal(JSON.parse(readFileSync(one)).summary.source_files, 0); const two = join(root, 'two.json'); assert.equal(audit(source, archive, two, ['--include-all']).status, 0); assert.equal(JSON.parse(readFileSync(two)).summary.source_files, 1); rmSync(root, { recursive: true });
});

test('@claim:json-automation emits JSON summaries and documented exit codes', () => {
  const root = temp('json'); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(source); mkdirSync(archive); writeFileSync(join(source, 'photo.jpg'), 'same'); writeFileSync(join(archive, 'photo.jpg'), 'same'); const clean = audit(source, archive, join(root, 'clean.json'), ['--json']); assert.equal(clean.status, 0); assert.equal(JSON.parse(clean.stdout).all_byte_identical, true); writeFileSync(join(source, 'missing.jpg'), 'missing'); const differing = audit(source, archive, join(root, 'different.json'), ['--json']); assert.equal(differing.status, 1); assert.equal(JSON.parse(differing.stdout).missing, 1); assert.equal(audit(join(root, 'absent'), archive, join(root, 'bad.json')).status, 2); rmSync(root, { recursive: true });
});

test('@claim:offline-local demo and a normal audit work with networking denied', () => {
  const root = temp('network'); const guard = join(root, 'deny-network.so'); const compile = spawnSync('gcc', ['-shared', '-fPIC', 'site/tests/deny-network.c', '-o', guard], { encoding: 'utf8' }); assert.equal(compile.status, 0, compile.stderr); const env = { ...process.env, LD_PRELOAD: guard }; const demo = spawnSync(binary, ['demo'], { encoding: 'utf8', env }); assert.equal(demo.status, 0, demo.stderr); const workspace = demo.stdout.match(/demo workspace: (.+)/)?.[1].trim(); const source = join(root, 'source'); const archive = join(root, 'archive'); mkdirSync(source); mkdirSync(archive); writeFileSync(join(source, 'photo.jpg'), 'same'); writeFileSync(join(archive, 'photo.jpg'), 'same'); const normal = spawnSync(binary, ['audit', '--source', source, '--archive', archive, '--output', join(root, 'normal.json')], { encoding: 'utf8', env }); assert.equal(normal.status, 0, normal.stderr); if (workspace) rmSync(workspace, { recursive: true }); rmSync(root, { recursive: true });
});

test('@claim:source-install builds the public checkout', () => { const root = temp('install'); const result = spawnSync('cargo', ['install', '--path', '.', '--root', root, '--locked'], { encoding: 'utf8' }); assert.equal(result.status, 0, result.stderr); assert.equal(spawnSync(join(root, 'bin', 'mfa'), ['--help'], { encoding: 'utf8' }).status, 0); rmSync(root, { recursive: true }); });
test('@claim:rust-msrv supports Rust 1.85', () => { const result = spawnSync('cargo', ['+1.85.0', 'check', '--locked'], { encoding: 'utf8' }); assert.equal(result.status, 0, result.stderr); });
test('@claim:mit-license repository ships the promised license', () => { assert.match(readFileSync('LICENSE', 'utf8'), /Permission is hereby granted, free of charge/); assert.match(readFileSync('Cargo.toml', 'utf8'), /license = "MIT"/); });
