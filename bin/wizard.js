import readline from 'node:readline';
import path from 'node:path';
import { calculateContrast, checkTargetSize } from '../index.js';
import { installSkill } from '../lib/install.js';
import { themes, modes, modeDescriptions, inspectProject, saveBrief, getPrompt } from '../lib/workflow.js';
import { motionProfiles, motionPlan } from '../lib/design-profile.js';

class Cancelled extends Error {}

export function printInstallResults(results, log = console.log) {
  const counts = {};
  for (const result of results) counts[result.status] = (counts[result.status] || 0) + 1;
  log(`Skill files: ${Object.entries(counts).map(([status, count]) => `${count} ${status}`).join(', ')}.`);
  if (counts.kept) log('Existing files were kept. Use install <target> --force to update them with backups.');
}

export function showThemes(log = console.log) {
  for (const theme of themes) {
    log(`\n${theme.id} — ${theme.name}\n  For: ${theme.context}\n  Layout: ${theme.layout}\n  Type: ${theme.typography}\n  Palette: ${Object.entries(theme.colors).map(([role, color]) => `${role} ${color}`).join(' | ')}\n  Detail: ${theme.signature}`);
  }
  log('\nChoose custom to develop a direction from your own product and references.');
}

export function showDoctor(cwd = process.cwd(), log = console.log) {
  const project = inspectProject(cwd);
  log(`\nSetup check: ${project.product}\nStack: ${project.frameworks.join(', ') || 'Not detected; inspect project files.'}`);
  log(`Installed entrypoints: ${project.installed.join(', ') || 'None; run dwi install <target>.'}`);
  log(`Project context: ${project.records.join(', ') || 'None; run dwi wizard.'}`);
  log(`Dev command: ${project.scripts.dev ? 'npm run dev' : 'Check the project README.'}`);
  log(`Optional Playwright module: ${project.playwright ? 'Found; browser availability still needs checking.' : 'Not found; use your agent browser or install Playwright for dwi capture.'}`);
  project.warnings.forEach(log);
  log('This checks setup only. It does not inspect rendered UI or score design/accessibility.');
}

export function showGuide(log = console.log) {
  log(`\n1. Run dwi wizard from the website project folder, not from this package's source.\n2. Choose Redesign for a generic existing site; Repair for one specific defect.\n3. Describe real users, the main task, the screen to change, and protected brand assets.\n4. Pick a direction or Custom; describe personality, available assets, and what to avoid. Choose restrained, expressive, or minimal motion.\n5. Open DWI-PROMPT.md and paste its contents into your coding agent. If the skill is not discovered, ask the agent to read the installed SKILL.md directly.\n6. Review matching before/after screenshots and test the primary flow.\n\nThe CLI installs guidance and writes context. Your coding agent implements the website. No model API key is needed by this CLI.\n\nCommands: dwi prompt redesign | create | repair | audit\n          dwi themes\n          dwi doctor\n          dwi capture --help`);
}

export async function runInteractiveWizard({ input = process.stdin, output = process.stdout, cwd = process.cwd() } = {}) {
  const rl = readline.createInterface({ input, output, terminal: Boolean(input.isTTY && output.isTTY) });
  const lines = rl[Symbol.asyncIterator]();
  let cancelled = false;
  rl.on('SIGINT', () => { cancelled = true; rl.close(); });
  const log = text => output.write(`${text}\n`);
  async function ask(label, fallback = '') {
    output.write(`${label}${fallback ? ` [${fallback}]` : ''}: `);
    const next = await lines.next();
    if (cancelled || next.done || next.value.trim().toLowerCase() === 'q') throw new Cancelled();
    return next.value.trim() || fallback;
  }
  async function choose(label, items, fallback = 1) {
    log(`\n${label}`);
    items.forEach((item, i) => log(`  ${i + 1}) ${item.label}`));
    while (true) {
      const choice = await ask(`Choose 1–${items.length}`, String(fallback));
      if (/^\d+$/.test(choice) && items[Number(choice) - 1]) return items[Number(choice) - 1].value;
      log('Please enter one of the listed numbers, or q to cancel.');
    }
  }
  async function pickTarget() {
    return choose('Which coding agent will use the skill?', [
      { label: 'Codex — project skill', value: 'codex' },
      { label: 'Claude Code — project skill', value: 'claude' },
      { label: 'Cursor — full skill + rule', value: 'cursor' },
      { label: 'Antigravity — project skill', value: 'antigravity' },
      { label: 'All project agents', value: 'all' },
      { label: 'Global Antigravity profile', value: 'global' },
    ]);
  }
  try {
    const accent = text => output.isTTY && !process.env.NO_COLOR ? `\x1b[1;36m${text}\x1b[0m` : text;
    const step = (number, title) => log(`\n${accent(`[${number}/5] ${title}`)}\n${'-'.repeat(46)}`);
    log(`\n${accent('DESIGN WITH INTENT')}\nDesign studio / purposeful interfaces\n\nProduct -> Direction -> Motion -> Review -> Build\nEnter a number to choose, Enter for defaults, or q to cancel.\nYour answers stay in this project. Your coding agent implements the design.`);
    const action = await choose('What do you want to do?', [
      { label: 'Guided setup — install, create brief, get an agent prompt', value: 'setup' },
      { label: 'Install the skill only', value: 'install' },
      { label: 'Explore visual directions', value: 'themes' },
      { label: 'Check project setup', value: 'doctor' },
      { label: 'Learn how to use the skill', value: 'guide' },
      { label: 'Check a color pair', value: 'contrast' },
      { label: 'Check target dimensions', value: 'target' },
    ]);
    if (action === 'themes') return showThemes(log);
    if (action === 'doctor') return showDoctor(cwd, log);
    if (action === 'guide') return showGuide(log);
    if (action === 'contrast') {
      const fg = await ask('Foreground color', '#203328');
      const bg = await ask('Background color', '#F4F7EF');
      const result = calculateContrast(fg, bg);
      return log(`Contrast ${result.ratio}:1; normal text AA ${result.normalTextAA ? 'passes' : 'fails'}. This checks this color pair only.`);
    }
    if (action === 'target') {
      const width = await ask('Width in CSS pixels', '44');
      const height = await ask('Height in CSS pixels', '44');
      const result = checkTargetSize(width, height);
      return log(`${result.status}. Dimension check only; spacing and WCAG exceptions need contextual review.`);
    }
    step(1, 'Connect your coding agent');
    const target = await pickTarget();
    if (action === 'install') {
      printInstallResults(installSkill({ target, cwd }), log);
      log('Next: dwi wizard for a project brief, or dwi prompt redesign for an agent prompt.');
      return;
    }
    const project = inspectProject(cwd);
    log(`\nProject: ${project.product} | Stack: ${project.frameworks.join(', ') || 'not detected'}\nAll answers are collected before files are written. Existing DESIGN.md is preserved.`);
    step(2, 'Understand the product');
    const mode = await choose('What kind of work is needed?', modes.map(value => ({ value, label: `${value} — ${modeDescriptions[value]}` })));
    const options = { mode };
    options.product = await ask('Product name and purpose', project.product);
    options.audience = await ask('Who uses it, and in what setting?', 'Infer from the project and state assumptions');
    options.task = await ask('What should users accomplish first?', 'Identify the main existing or requested flow');
    options.scope = await ask('Which page, route, or component?', 'Primary screen and directly related components');
    options.problems = await ask('What is wrong today, or what should change?', mode === 'redesign' ? 'Looks generic; needs a visibly different composition and stronger identity' : 'Follow the current task');
    options.preserve = await ask('What MUST stay? Name only real constraints', 'Working features, routes, data, and explicit brand requirements');
    options.references = await ask('Reference URLs or visual cues (optional)');
    step(3, 'Choose a visual direction');
    options.theme = await choose('Pick a starting visual direction', [
      { label: 'Custom — derive it from my product and references', value: 'custom' },
      ...themes.map(t => ({ label: `${t.name} — ${t.context}`, value: t.id })),
    ]);
    const theme = themes.find(t => t.id === options.theme);
    if (theme) log(`\nDirection preview\n${theme.layout}\n${theme.typography}\n${Object.entries(theme.colors).map(([k, v]) => `${k}: ${v}`).join(' | ')}\nSignature: ${theme.signature}`);
    options.personality = await ask('How should it feel? (for example: calm, precise, confident)', 'Calm, precise, confident');
    options.assets = await ask('What real imagery, copy, or brand assets are available?', 'Inspect assets in this project; identify gaps');
    options.avoid = await ask('What should the design avoid?', 'Generic card grids, decorative metrics, and excessive effects');
    step(4, 'Give motion a purpose');
    options.motion = await choose('How much motion fits your users?', Object.entries(motionProfiles).map(([value, p]) => ({ value, label: `${p.label} — ${p.description}` })));
    log(`\n${motionPlan(options.motion)}`);
    step(5, 'Review your design brief');
    log(`\nProduct: ${options.product}\nAudience: ${options.audience}\nMain task: ${options.task}\nScope: ${options.scope}\nDirection: ${options.theme}\nPersonality: ${options.personality}\nAssets: ${options.assets}\nAvoid: ${options.avoid}\nPreserve: ${options.preserve}\nMotion: ${options.motion}\n\nReady: ${target} installation; ${mode} brief.\nWrites DWI-BRIEF.md and DWI-PROMPT.md. Keeps DESIGN.md and existing skill files.`);
    while (true) {
      const answer = (await ask('Write these files? (Y/n)', 'y')).toLowerCase();
      if (['y', 'yes'].includes(answer)) break;
      if (['n', 'no'].includes(answer)) throw new Cancelled();
      log('Please enter y or n, or q to cancel.');
    }
    // Reject existing briefs before installing anything. Save does not overwrite without --force.
    const records = saveBrief(options, cwd);
    printInstallResults(installSkill({ target, cwd }), log);
    records.forEach(r => log(`${r.status}: ${path.relative(cwd, r.file)}`));
    log('\nYOUR NEXT STEPS\n1. Read DWI-BRIEF.md and adjust any answers.\n2. Paste DWI-PROMPT.md into your coding agent in this project.\n3. Ask it to implement the primary flow and show desktop/mobile evidence.\n4. Review keyboard, touch, rapid interactions, and reduced motion.\n5. Keep the chosen design decisions in DESIGN.md.\n\nOptional: dwi motion restrained prints CSS tokens for explicit integration.\n');
    log(getPrompt(mode));
  } catch (error) {
    if (error instanceof Cancelled) log('\nCancelled. No pending setup answers were written.');
    else throw error;
  } finally { rl.close(); }
}
