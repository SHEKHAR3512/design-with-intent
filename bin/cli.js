#!/usr/bin/env node

/**
 * bin/cli.js
 * Command Line Interface for design-with-intent
 */

import fs from 'node:fs';
import path from 'node:path';
import { calculateContrast, checkTargetSize, getSkillDir, getDesignRecordTemplate } from '../index.js';
import { runInteractiveWizard, printInstallResults, showThemes, showDoctor, showGuide } from './wizard.js';
import { installSkill } from '../lib/install.js';
import { saveBrief, getPrompt, getTheme, inspectProject } from '../lib/workflow.js';
import { parseArgs } from 'node:util';
import { spawnSync } from 'node:child_process';
import { motionCSS } from '../lib/design-profile.js';

const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : (process.stdin.isTTY ? 'wizard' : 'help');

function showHelp() {
  console.log(`
Design with Intent — guided design workflow for coding agents

Run from your website project: npx design-with-intent

  wizard / setup             Guided installation, brief, and ready-to-paste prompt
  install [target] [--force]  auto | codex | claude | cursor | antigravity | all | global
  brief [options]            Write DWI-BRIEF.md and DWI-PROMPT.md
  prompt [mode]              Print an agent prompt (default: redesign)
  themes [id]                Explore bundled visual directions
  motion [profile]           Print CSS motion tokens (restrained | expressive | minimal)
  doctor                     Check setup (not visual quality)
  guide                      Learn the workflow
  record                     Create DESIGN.md if absent
  capture [options]          Capture responsive screenshots with optional Playwright
  contrast <fg> <bg>          Check one color pair
  target-size <w> <h>         Check target dimensions
  validate                   Validate the bundled skill files and links
  help                       Show this guide

Modes: redesign | create | repair | audit
Brief options: --mode --product --audience --task --scope --problems
               --preserve --references --theme (default: custom) --force
               --personality --assets --avoid --motion (default: restrained)
Quote values containing spaces. --force creates backups before replacing files.

Examples:
  npx design-with-intent install cursor
  npx design-with-intent brief --mode redesign --product "Trail booking" --theme field-notes
  npx design-with-intent prompt redesign

The CLI prepares guidance. Paste DWI-PROMPT.md into your agent to implement the UI.
`);
}

function cmdInstall(target) {
  printInstallResults(installSkill({ target: target || 'auto', force: args.includes('--force') }));
  console.log('Next: dwi wizard for a project brief, or dwi prompt redesign.');
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

// Reject unknown options instead of silently claiming success.
try {
  const maxArgs = { prompt: 1, themes: 1, doctor: 0, guide: 0, record: 0, validate: 0, help: 0, wizard: 0, setup: 0, ui: 0, interactive: 0, contrast: 2, 'check-contrast': 2, 'target-size': 2, target: 2 };
  maxArgs.motion = 1;
  if (command in maxArgs && args.length - 1 > maxArgs[command]) throw new Error('Too many arguments. Run dwi help.');
  const noOptions = ['prompt', 'themes', 'doctor', 'guide', 'record', 'validate', 'help', 'wizard', 'setup', 'ui', 'interactive', 'contrast', 'check-contrast', 'target-size', 'target'];
  if (noOptions.includes(command) && args.slice(1).some(a => a.startsWith('--'))) throw new Error('Unknown option. Run dwi help.');
  if (['install', 'init'].includes(command)) {
    const extra = args.slice(1).filter(a => a !== '--force');
    if (extra.length > 1 || extra.some(a => a.startsWith('-'))) throw new Error('Usage: dwi install [target] [--force]');
  }
  switch (command) {
    case 'wizard':
    case 'interactive':
    case '-i':
    case '--interactive':
    case 'setup':
    case 'ui':
      await runInteractiveWizard();
      break;
    case 'install':
      cmdInstall(args.slice(1).find(a => a !== '--force'));
      break;
    case 'init':
      if (!args[1] && process.stdin.isTTY) {
        await runInteractiveWizard();
      } else {
        cmdInstall(args.slice(1).find(a => a !== '--force'));
      }
      break;
    case 'brief': {
      const names = ['mode', 'product', 'audience', 'task', 'scope', 'problems', 'preserve', 'references', 'theme', 'personality', 'assets', 'avoid', 'motion'];
      const { values } = parseArgs({ args: args.slice(1), options: { ...Object.fromEntries(names.map(n => [n, { type: 'string' }])), force: { type: 'boolean' } }, strict: true });
      for (const result of saveBrief({ product: inspectProject().product, ...values })) console.log(`${result.status}: ${path.basename(result.file)}${result.backup ? ` (backup: ${path.basename(result.backup)})` : ''}`);
      console.log('Paste DWI-PROMPT.md into your coding agent. Install the skill first with dwi install if needed.');
      break;
    }
    case 'prompt': console.log(getPrompt(args[1])); break;
    case 'motion': console.log(motionCSS(args[1])); break;
    case 'themes':
      if (args[1]) console.log(JSON.stringify(getTheme(args[1]), null, 2));
      else showThemes();
      break;
    case 'doctor': showDoctor(); break;
    case 'guide': showGuide(); break;
    case 'capture': {
      const result = spawnSync(process.execPath, [path.join(getSkillDir(), 'scripts/capture.mjs'), ...args.slice(1)], { stdio: 'inherit' });
      if (result.error) throw result.error;
      process.exitCode = result.status ?? 1;
      break;
    }
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
      await import('../skills/design-with-intent/scripts/validate-skill.js');
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      throw new Error(`Unknown command \"${command}\". Run dwi help.`);
  }

} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
