#!/usr/bin/env node

/**
 * bin/cli.js
 * Command Line Interface for design-with-intent
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateContrast, checkTargetSize, getSkillDir, getDesignRecordTemplate } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPkgDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : 'help';

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function showHelp() {
  console.log(`
\x1b[1mDesign with Intent\x1b[0m — Portable Agent Skill & Design Tooling

\x1b[36mUSAGE:\x1b[0m
  $ npx design-with-intent <command> [options]
  $ dwi <command> [options]

\x1b[36mCOMMANDS:\x1b[0m
  \x1b[1minstall\x1b[0m [target]        Install the skill into your project or environment
                          Targets: antigravity | claude | cursor | global | all (default: auto-detect)
  \x1b[1mrecord\x1b[0m                  Create a canonical DESIGN.md decision record in current directory
  \x1b[1mcontrast\x1b[0m <fg> <bg>      Calculate WCAG 2.2 AA contrast ratio between two hex/rgb colors
  \x1b[1mtarget-size\x1b[0m <w> <h>     Verify target dimensions against WCAG 2.2 AA (>= 24px)
  \x1b[1mvalidate\x1b[0m                Validate the skill files or current directory DESIGN.md
  \x1b[1mhelp\x1b[0m                    Show this help message

\x1b[36mEXAMPLES:\x1b[0m
  $ npx design-with-intent install antigravity
  $ npx design-with-intent install claude
  $ npx design-with-intent install cursor
  $ npx design-with-intent record
  $ npx design-with-intent contrast "#6D28D9" "#FFFFFF"
  $ npx design-with-intent target-size 48 48
`);
}

function cmdInstall(targetArg) {
  const cwd = process.cwd();
  const skillSrc = getSkillDir();
  const target = targetArg ? targetArg.toLowerCase() : 'auto';

  console.log(`\x1b[1mInstalling Design with Intent skill...\x1b[0m`);

  let installed = 0;

  // 1. Antigravity (.agents/skills/design-with-intent)
  if (target === 'antigravity' || target === 'all' || target === 'auto' || fs.existsSync(path.join(cwd, '.agents'))) {
    const dest = path.join(cwd, '.agents/skills/design-with-intent');
    copyDirRecursive(skillSrc, dest);
    console.log(`\x1b[32m✓ Installed for Antigravity IDE:\x1b[0m ${path.relative(cwd, dest)}`);
    installed++;
  }

  // 2. Claude Code (.claude/skills/design-with-intent)
  if (target === 'claude' || target === 'all' || (target === 'auto' && fs.existsSync(path.join(cwd, '.claude')))) {
    const dest = path.join(cwd, '.claude/skills/design-with-intent');
    copyDirRecursive(skillSrc, dest);
    console.log(`\x1b[32m✓ Installed for Claude Code:\x1b[0m ${path.relative(cwd, dest)}`);
    installed++;
  }

  // 3. Cursor (.cursor/rules/design-with-intent.mdc)
  if (target === 'cursor' || target === 'all' || (target === 'auto' && fs.existsSync(path.join(cwd, '.cursor')))) {
    const mdcSrc = path.join(rootPkgDir, 'adapters/cursor/design-with-intent.mdc');
    const destDir = path.join(cwd, '.cursor/rules');
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(mdcSrc, path.join(destDir, 'design-with-intent.mdc'));
    console.log(`\x1b[32m✓ Installed Cursor rule:\x1b[0m .cursor/rules/design-with-intent.mdc`);
    installed++;
  }

  // 4. Global Antigravity (~/.gemini/config/skills/design-with-intent)
  if (target === 'global') {
    const homedir = process.env.HOME || process.env.USERPROFILE || '';
    if (homedir) {
      const globalDest = path.join(homedir, '.gemini/config/skills/design-with-intent');
      copyDirRecursive(skillSrc, globalDest);
      console.log(`\x1b[32m✓ Installed globally in:\x1b[0m ${globalDest}`);
      installed++;
    }
  }

  if (installed === 0 && target === 'auto') {
    // Default fallback: create .agents/skills/design-with-intent
    const dest = path.join(cwd, '.agents/skills/design-with-intent');
    copyDirRecursive(skillSrc, dest);
    console.log(`\x1b[32m✓ Installed to:\x1b[0m ${path.relative(cwd, dest)}`);
  }

  console.log(`\n\x1b[1;32mInstallation complete!\x1b[0m Your agent can now use the 'design-with-intent' skill.`);
}

function cmdRecord() {
  const cwd = process.cwd();
  const dest = path.join(cwd, 'DESIGN.md');

  if (fs.existsSync(dest)) {
    console.log(`\x1b[33mNotice:\x1b[0m DESIGN.md already exists in ${cwd}. Not overwriting.`);
    return;
  }

  const pkgPath = path.join(cwd, 'package.json');
  let productName = 'My Application';
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name) productName = pkg.name;
    } catch {}
  }

  const content = getDesignRecordTemplate({ product: productName });
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`\x1b[32m✓ Created DESIGN.md\x1b[0m in ${cwd}`);
  console.log(`Open DESIGN.md to record your design brief, tokens, and brand invariants.`);
}

function cmdContrast() {
  const fg = args[1];
  const bg = args[2];

  if (!fg || !bg) {
    console.error(`\x1b[31mError:\x1b[0m Please provide both foreground and background colors.`);
    console.log(`Usage: npx design-with-intent contrast <foreground> <background>`);
    console.log(`Example: npx design-with-intent contrast "#6D28D9" "#FFFFFF"`);
    process.exit(1);
  }

  try {
    const res = calculateContrast(fg, bg);
    console.log(`\n\x1b[1mWCAG 2.2 Contrast Check: ${fg} on ${bg}\x1b[0m`);
    console.log(`Contrast Ratio: \x1b[1;36m${res.ratio}:1\x1b[0m\n`);
    console.log(`  Normal Text (AA >= 4.5:1):     ${res.normalTextAA ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[31m✗ FAIL\x1b[0m'}`);
    console.log(`  Normal Text (AAA >= 7.0:1):    ${res.normalTextAAA ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[31m✗ FAIL\x1b[0m'}`);
    console.log(`  Large Text (AA >= 3.0:1):      ${res.largeTextAA ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[31m✗ FAIL\x1b[0m'}`);
    console.log(`  Large Text (AAA >= 4.5:1):     ${res.largeTextAAA ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[31m✗ FAIL\x1b[0m'}`);
    console.log(`  UI Components (AA >= 3.0:1):   ${res.uiComponentAA ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[31m✗ FAIL\x1b[0m'}\n`);

    if (!res.normalTextAA) process.exitCode = 2;
  } catch (err) {
    console.error(`\x1b[31mError:\x1b[0m ${err.message}`);
    process.exit(1);
  }
}

function cmdTargetSize() {
  const w = args[1];
  const h = args[2];
  if (!w || !h) {
    console.error(`\x1b[31mError:\x1b[0m Please provide both width and height in pixels.`);
    console.log(`Usage: npx design-with-intent target-size <width> <height>`);
    process.exit(1);
  }

  try {
    const res = checkTargetSize(w, h);
    console.log(`\n\x1b[1mTarget Size Evaluation: ${w}px × ${h}px\x1b[0m`);
    console.log(`  WCAG 2.2 AA Min (>= 24×24px):   ${res.wcag22AA ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[31m✗ FAIL\x1b[0m'}`);
    console.log(`  Mobile Touch Rec (>= 44×44px):  ${res.mobileRecommended ? '\x1b[32m✓ PASS\x1b[0m' : '\x1b[33m✗ BELOW RECOMMENDED\x1b[0m'}`);
    console.log(`  Status:                         \x1b[36m${res.status}\x1b[0m\n`);
  } catch (err) {
    console.error(`\x1b[31mError:\x1b[0m ${err.message}`);
    process.exit(1);
  }
}

// Router
switch (command) {
  case 'install':
  case 'init':
    cmdInstall(args[1]);
    break;
  case 'record':
    cmdRecord();
    break;
  case 'contrast':
  case 'check-contrast':
    cmdContrast();
    break;
  case 'target-size':
  case 'target':
    cmdTargetSize();
    break;
  case 'validate':
    import('../skills/design-with-intent/scripts/validate-skill.js');
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    showHelp();
    break;
}
