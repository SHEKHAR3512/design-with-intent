import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { installSkill } from '../lib/install.js';
import { themes, saveBrief, inspectProject } from '../lib/workflow.js';
import { calculateContrast, getDesignRecordTemplate, getSchema } from '../index.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = path.join(root, 'bin/cli.js');
function workspace(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'dwi-test-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  return cwd;
}
function run(cwd, args, input = '') {
  return spawnSync(process.execPath, [cli, ...args], { cwd, input, encoding: 'utf8', timeout: 10000 });
}

test('non-TTY default prints help and does not create files', t => {
  const cwd = workspace(t);
  assert.equal(run(cwd, []).status, 0);
  assert.deepEqual(fs.readdirSync(cwd), []);
});

test('unknown command, target, mode, theme and options fail without mutations', t => {
  const cwd = workspace(t);
  for (const args of [['typo'], ['install', 'typo'], ['install', '--wat'], ['prompt', 'typo'], ['brief', '--mode', 'typo'], ['brief', '--theme', 'typo'], ['brief', '--wat'], ['doctor', '--wat']]) {
    const result = run(cwd, args);
    assert.equal(result.status, 1, `${args}: ${result.stderr}`);
    assert.deepEqual(fs.readdirSync(cwd), []);
  }
});

for (const target of ['claude', 'codex', 'cursor', 'antigravity', 'all', 'auto']) {
  test(`install ${target} supplies complete references, tools and notices`, t => {
    const cwd = workspace(t);
    const result = run(cwd, ['install', target]);
    assert.equal(result.status, 0, result.stderr);
    const folder = path.join(cwd, target === 'claude' ? '.claude/skills/design-with-intent' : '.agents/skills/design-with-intent');
    for (const file of ['SKILL.md', 'references/art-direction.md', 'assets/themes.json', 'scripts/capture.mjs', 'licenses/Apache-2.0.txt', 'licenses/Owl-Listener-MIT.txt', 'package.json']) assert.ok(fs.existsSync(path.join(folder, file)), file);
    if (target === 'cursor' || target === 'all') assert.ok(fs.existsSync(path.join(cwd, '.cursor/rules/design-with-intent.mdc')));
    const validation = spawnSync(process.execPath, [path.join(folder, 'scripts/validate-skill.js')], { encoding: 'utf8' });
    assert.equal(validation.status, 0, validation.stdout + validation.stderr);
    const contrast = spawnSync(process.execPath, [path.join(folder, 'scripts/check-contrast.js'), '#000000', '#FFFFFF'], { encoding: 'utf8' });
    assert.equal(contrast.status, 0, contrast.stderr);
  });
}

test('explicit Claude install does not install into an existing .agents folder', t => {
  const cwd = workspace(t);
  fs.mkdirSync(path.join(cwd, '.agents'));
  installSkill({ cwd, target: 'claude' });
  assert.deepEqual(fs.readdirSync(path.join(cwd, '.agents')), []);
});

test('auto detects Claude without adding unrelated agents', t => {
  const cwd = workspace(t);
  fs.mkdirSync(path.join(cwd, '.claude'));
  installSkill({ cwd });
  assert.ok(!fs.existsSync(path.join(cwd, '.agents')));
  assert.ok(fs.existsSync(path.join(cwd, '.claude/skills/design-with-intent/SKILL.md')));
});

test('global target writes only to the specified home', t => {
  const cwd = workspace(t);
  const home = workspace(t);
  installSkill({ cwd, home, target: 'global' });
  assert.deepEqual(fs.readdirSync(cwd), []);
  assert.ok(fs.existsSync(path.join(home, '.gemini/config/skills/design-with-intent/SKILL.md')));
});

test('install is idempotent, keeps edits, and forced updates back them up', t => {
  const cwd = workspace(t);
  installSkill({ cwd, target: 'codex' });
  assert.ok(installSkill({ cwd, target: 'codex' }).every(r => r.status === 'unchanged'));
  const file = path.join(cwd, '.agents/skills/design-with-intent/SKILL.md');
  fs.writeFileSync(file, 'user customization');
  assert.ok(installSkill({ cwd, target: 'codex' }).some(r => r.status === 'kept'));
  assert.equal(fs.readFileSync(file, 'utf8'), 'user customization');
  const result = installSkill({ cwd, target: 'codex', force: true }).find(r => r.file === file);
  assert.equal(fs.readFileSync(result.backup, 'utf8'), 'user customization');
  assert.notEqual(fs.readFileSync(file, 'utf8'), 'user customization');
});

test('symlink install destinations are rejected before any writes', t => {
  const cwd = workspace(t);
  const outside = workspace(t);
  fs.symlinkSync(outside, path.join(cwd, '.agents'), 'dir');
  assert.throws(() => installSkill({ cwd, target: 'all' }), /symlink/);
  assert.deepEqual(fs.readdirSync(outside), []);
  assert.ok(!fs.existsSync(path.join(cwd, '.claude')));
});

test('brief preserves DESIGN.md, refuses collisions, and backs up explicit replacements', t => {
  const cwd = workspace(t);
  fs.writeFileSync(path.join(cwd, 'DESIGN.md'), 'existing design decisions');
  saveBrief({ mode: 'redesign', product: 'A "quoted"\nname', theme: 'gallery' }, cwd);
  assert.equal(fs.readFileSync(path.join(cwd, 'DESIGN.md'), 'utf8'), 'existing design decisions');
  const original = fs.readFileSync(path.join(cwd, 'DWI-BRIEF.md'), 'utf8');
  assert.throws(() => saveBrief({ mode: 'create' }, cwd), /already exists/);
  assert.equal(fs.readFileSync(path.join(cwd, 'DWI-BRIEF.md'), 'utf8'), original);
  const results = saveBrief({ mode: 'create', force: true }, cwd);
  assert.equal(fs.readFileSync(results[0].backup, 'utf8'), original);
});

test('record safely serializes quotes, newlines, and backslashes', () => {
  const value = 'Studio "A"\nC:\\work\\brand';
  const record = getDesignRecordTemplate({ product: value, audience: value, mode: 'redesign', preserve: [value] });
  // JSON strings are a YAML subset, so recover scalar values exactly.
  assert.equal(JSON.parse(record.match(/^product: (.*)$/m)[1]), value);
  assert.equal(JSON.parse(record.match(/^audience: (.*)$/m)[1]), value);
  assert.equal(JSON.parse(record.match(/^  - (.*)$/m)[1]), value);
  assert.ok(getSchema('design-record').properties.mode.enum.includes('redesign'));
});

test('wizard consumes piped answers and completes guided setup without replacing DESIGN.md', t => {
  const cwd = workspace(t);
  fs.writeFileSync(path.join(cwd, 'DESIGN.md'), 'protected');
  const answers = ['1', '3', '1', 'Trail booking', 'Hikers', 'Book a trip', '/booking', 'Generic cards', 'Logo and booking', '', '2', 'y', ''];
  const result = run(cwd, ['wizard'], answers.join('\n'));
  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, 'DWI-PROMPT.md')), result.stdout);
  assert.ok(fs.existsSync(path.join(cwd, '.cursor/rules/design-with-intent.mdc')));
  assert.equal(fs.readFileSync(path.join(cwd, 'DESIGN.md'), 'utf8'), 'protected');
  assert.match(fs.readFileSync(path.join(cwd, 'DWI-BRIEF.md'), 'utf8'), /field-notes/);
});

test('wizard validates menu choices and install-only creates no brief', t => {
  const cwd = workspace(t);
  const result = run(cwd, ['wizard'], '99\n2\n99\n2\n');
  assert.equal(result.status, 0, result.stderr);
  assert.ok(fs.existsSync(path.join(cwd, '.claude/skills/design-with-intent/SKILL.md')));
  assert.ok(!fs.existsSync(path.join(cwd, 'DWI-BRIEF.md')));
});

test('wizard cancellation and early EOF never submit incomplete setup', t => {
  for (const input of ['', '1\n', '1\n1\n1\nName\nq\n', 'q\n']) {
    const cwd = workspace(t);
    const result = run(cwd, ['wizard'], input);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(fs.readdirSync(cwd), [], result.stdout);
  }
});

test('theme base pairs meet normal text AA', () => {
  for (const theme of themes) {
    for (const [fg, bg] of [['text', 'surface'], ['muted', 'surface'], ['onAction', 'action']]) {
      assert.ok(calculateContrast(theme.colors[fg], theme.colors[bg]).normalTextAA, `${theme.id}: ${fg}/${bg}`);
    }
  }
});

test('malformed project manifest is reported without breaking onboarding', t => {
  const cwd = workspace(t);
  fs.writeFileSync(path.join(cwd, 'package.json'), '{broken');
  assert.equal(inspectProject(cwd).warnings.length, 1);
  assert.equal(run(cwd, ['doctor']).status, 0);
});

test('capture help is dependency-free and invalid options fail cleanly', t => {
  const cwd = workspace(t);
  assert.equal(run(cwd, ['capture', '--help']).status, 0);
  const invalid = run(cwd, ['capture', '--url', 'file:///tmp/page', '--out', '/tmp/dwi-unused']);
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /http/);
  const missing = run(cwd, ['capture', '--url', 'http://localhost:5173', '--out', path.join(cwd, 'capture')]);
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /Playwright/);
  assert.deepEqual(fs.readdirSync(cwd), []);
});
