import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
test('packed npm artifact installs offline and runs outside the source checkout', { timeout: 60000 }, t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dwi-pack-'));
  t.after(() => fs.rmSync(temp, { recursive: true, force: true }));
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const env = { ...process.env, npm_config_cache: path.join(temp, 'cache') };
  function command(file, args, cwd = root) {
    const result = spawnSync(file, args, { cwd, env, encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, `${file} ${args.join(' ')}\n${result.stdout}\n${result.stderr}`);
    return result.stdout;
  }
  const [manifest] = JSON.parse(command(npm, ['pack', '--json', '--ignore-scripts', '--pack-destination', temp]));
  for (const file of ['lib/install.js', 'lib/workflow.js', 'skills/design-with-intent/assets/themes.json', 'skills/design-with-intent/licenses/Apache-2.0.txt', 'skills/design-with-intent/scripts/capture.mjs']) {
    assert.ok(manifest.files.some(f => f.path === file), `Missing from npm artifact: ${file}`);
  }
  assert.ok(!manifest.files.some(f => f.path.startsWith('tests/') || f.path.includes('.backup-')));
  const consumer = path.join(temp, 'consumer');
  fs.mkdirSync(consumer);
  command(npm, ['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', path.join(temp, manifest.filename)], consumer);
  const cli = path.join(consumer, 'node_modules/design-with-intent/bin/cli.js');
  command(process.execPath, [cli, 'install', 'cursor'], consumer);
  command(process.execPath, [cli, 'brief', '--mode', 'redesign', '--product', 'Packed consumer'], consumer);
  command(process.execPath, [cli, 'validate'], consumer);
  command(process.execPath, [cli, 'capture', '--help'], consumer);
  command(process.execPath, ['--input-type=module', '-e', "import { getReference } from 'design-with-intent'; if (!getReference('art-direction')) process.exit(1)"], consumer);
  assert.ok(fs.existsSync(path.join(consumer, '.agents/skills/design-with-intent/references/art-direction.md')));
  assert.ok(fs.existsSync(path.join(consumer, 'DWI-PROMPT.md')));
});
