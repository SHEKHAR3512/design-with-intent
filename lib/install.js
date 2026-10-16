import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export const targets = ['auto', 'codex', 'antigravity', 'claude', 'cursor', 'global', 'all'];

// Refuse symlink destinations: an install must not modify an unrelated checkout.
export function assertSafePath(destination) {
  for (let current = path.resolve(destination); ; current = path.dirname(current)) {
    if (fs.existsSync(current) || isLink(current)) {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Refusing symlink destination: ${current}`);
    }
    if (current === path.dirname(current)) break;
  }
}
function isLink(file) {
  try { return fs.lstatSync(file).isSymbolicLink(); } catch { return false; }
}

export function writeProjectFile(file, content, { force = false } = {}) {
  assertSafePath(file);
  if (fs.existsSync(file)) {
    if (fs.readFileSync(file, 'utf8') === content) return { file, status: 'unchanged' };
    if (!force) return { file, status: 'kept' };
    const backup = `${file}.backup-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    fs.copyFileSync(file, backup, fs.constants.COPYFILE_EXCL);
    fs.writeFileSync(file, content);
    return { file, status: 'updated', backup };
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, { flag: 'wx' });
  return { file, status: 'created' };
}

export function installSkill({ target = 'auto', cwd = process.cwd(), force = false, home = os.homedir() } = {}) {
  if (!targets.includes(target)) throw new Error(`Unknown target "${target}". Choose: ${targets.join(', ')}`);
  let selected = [target];
  if (target === 'auto') {
    selected = ['claude', 'cursor'].filter(t => fs.existsSync(path.join(cwd, `.${t}`)));
    if (fs.existsSync(path.join(cwd, '.agents')) || fs.existsSync(path.join(cwd, '.codex')) || !selected.length) selected.push('codex');
  }
  if (target === 'all') selected = ['codex', 'claude', 'cursor'];
  const destinations = new Set(selected.map(t => t === 'global'
    ? path.join(home, '.gemini/config/skills/design-with-intent')
    : path.join(cwd, t === 'claude' ? '.claude/skills/design-with-intent' : '.agents/skills/design-with-intent')));
  const files = [];
  function collect(source, destination) {
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
      if (entry.isDirectory()) collect(path.join(source, entry.name), path.join(destination, entry.name));
      else files.push([path.join(source, entry.name), path.join(destination, entry.name)]);
    }
  }
  for (const dest of destinations) collect(path.join(root, 'skills/design-with-intent'), dest);
  if (selected.includes('cursor')) files.push([path.join(root, 'adapters/cursor/design-with-intent.mdc'), path.join(cwd, '.cursor/rules/design-with-intent.mdc')]);
  // Preflight the entire install before writing any file.
  for (const [, dest] of files) {
    assertSafePath(dest);
    if (fs.existsSync(dest) && !fs.statSync(dest).isFile()) throw new Error(`Expected a file: ${dest}`);
  }
  return files.map(([source, file]) => writeProjectFile(file, fs.readFileSync(source, 'utf8'), { force }));
}
