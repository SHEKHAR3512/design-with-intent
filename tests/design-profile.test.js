import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createBrief, saveBrief } from '../lib/workflow.js';
import { motionCSS, motionProfiles } from '../lib/design-profile.js';

const cli = fileURLToPath(new URL('../bin/cli.js', import.meta.url));
function workspace(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'dwi-motion-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  return cwd;
}

test('brief retains personal direction and selected motion across CLI boundary', t => {
  const cwd = workspace(t);
  const result = spawnSync(process.execPath, [cli, 'brief', '--theme', 'precision', '--motion', 'minimal', '--personality', 'Quiet "studio"', '--assets', 'Real product photos', '--avoid', 'Floating blobs'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  const brief = fs.readFileSync(path.join(cwd, 'DWI-BRIEF.md'), 'utf8');
  assert.match(brief, /precision/);
  assert.ok(brief.includes(JSON.stringify('Quiet "studio"')));
  assert.match(brief, /Real product photos/);
  assert.match(brief, /Floating blobs/);
  assert.match(brief, /feedback 0ms/);
});

test('bad motion profiles fail before writes, including prototype property names', t => {
  const cwd = workspace(t);
  for (const motion of ['typo', '__proto__', 'constructor']) {
    assert.throws(() => saveBrief({ motion }, cwd), /Unknown motion/);
    assert.deepEqual(fs.readdirSync(cwd), []);
  }
});

test('each motion profile emits standalone tokens and reduced-motion overrides without mutations', t => {
  const cwd = workspace(t);
  for (const [id, profile] of Object.entries(motionProfiles)) {
    const result = spawnSync(process.execPath, [cli, 'motion', id], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, new RegExp(`--dwi-motion-enter: ${profile.enter}ms`));
    const reduced = result.stdout.split('@media (prefers-reduced-motion: reduce)')[1];
    assert.match(reduced, /--dwi-motion-enter: 0ms/);
    assert.match(reduced, /--dwi-motion-distance: 0px/);
  }
  assert.deepEqual(fs.readdirSync(cwd), []);
  assert.throws(() => motionCSS('unknown'), /Unknown motion/);
  assert.match(createBrief(), /Motion profile: \*\*Restrained\*\*/);
});

test('wizard EOF and rejection at the new review stage leave no files', t => {
  const answers = ['1', '1', '1', 'Studio', 'Teams', 'Publish', '/', 'Clutter', 'Logo', '', '1', 'Calm', 'Photos', 'Blobs', '2'];
  for (const ending of ['', '\nn\n']) {
    const cwd = workspace(t);
    const result = spawnSync(process.execPath, [cli, 'setup'], { cwd, input: answers.join('\n') + ending, encoding: 'utf8', timeout: 10000 });
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(fs.readdirSync(cwd), []);
  }
});

test('postinstall terminates with no input and never changes the consumer directory', t => {
  const cwd = workspace(t);
  const script = fileURLToPath(new URL('../bin/postinstall.js', import.meta.url));
  for (const ci of ['', 'true']) {
    const result = spawnSync(process.execPath, [script], { cwd, input: '', encoding: 'utf8', env: { ...process.env, CI: ci, DWI_HIDE_WELCOME: '' }, timeout: 5000 });
    assert.equal(result.status, 0, result.stderr);
    if (ci) assert.equal(result.stdout, '');
    else assert.match(result.stdout, /npx design-with-intent setup/);
    assert.deepEqual(fs.readdirSync(cwd), []);
  }
});
