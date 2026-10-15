/**
 * bin/wizard.js
 * Interactive Terminal Wizard for Design with Intent
 */

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  calculateContrast,
  checkTargetSize,
  getSkillDir,
  getDesignRecordTemplate,
} from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPkgDir = path.resolve(__dirname, '..');

// Visual ANSI styling
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  white: '\x1b[37m',
};

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

function clearScreen() {
  if (process.stdout.isTTY) {
    process.stdout.write('\x1b[2J\x1b[0f');
  }
}

function printHeader() {
  console.log(`
${c.cyan}${c.bold}╔══════════════════════════════════════════════════════════════════════════╗
║                    ${c.magenta}🎯  DESIGN WITH INTENT  ${c.cyan}                             ║
║       Portable Agent Skill & Design Tooling for AI Coding Agents         ║
╚══════════════════════════════════════════════════════════════════════════╝${c.reset}
`);
}

async function ask(rl, prompt, defaultVal = '') {
  try {
    const display = defaultVal ? `${c.bold}${prompt}${c.reset} [${c.dim}${defaultVal}${c.reset}]: ` : `${c.bold}${prompt}${c.reset}: `;
    const answer = await rl.question(display);
    return answer.trim() || defaultVal;
  } catch {
    return defaultVal;
  }
}

/**
 * 1. Interactive Quickstart
 */
async function interactiveQuickstart(rl) {
  console.log(`\n${c.bgBlue}${c.white}${c.bold}  STEP 1: TARGET AI CODING AGENTS  ${c.reset}\n`);
  console.log(`Where would you like to install the skill?`);
  console.log(`  ${c.cyan}1)${c.reset} Google Antigravity IDE   ${c.dim}(.agents/skills/design-with-intent)${c.reset}`);
  console.log(`  ${c.cyan}2)${c.reset} Claude Code              ${c.dim}(.claude/skills/design-with-intent)${c.reset}`);
  console.log(`  ${c.cyan}3)${c.reset} Cursor IDE               ${c.dim}(.cursor/rules/design-with-intent.mdc)${c.reset}`);
  console.log(`  ${c.cyan}4)${c.reset} Global User Profile      ${c.dim}(~/.gemini/config/skills/)${c.reset}`);
  console.log(`  ${c.cyan}5)${c.reset} ${c.bold}All Agents${c.reset}               ${c.green}(Recommended)${c.reset}`);

  const targetChoice = await ask(rl, 'Select option (1-5)', '5');
  const cwd = process.cwd();
  const skillSrc = getSkillDir();
  const installedPaths = [];

  if (targetChoice === '1' || targetChoice === '5') {
    const dest = path.join(cwd, '.agents/skills/design-with-intent');
    copyDirRecursive(skillSrc, dest);
    installedPaths.push(path.relative(cwd, dest));
  }
  if (targetChoice === '2' || targetChoice === '5') {
    const dest = path.join(cwd, '.claude/skills/design-with-intent');
    copyDirRecursive(skillSrc, dest);
    installedPaths.push(path.relative(cwd, dest));
  }
  if (targetChoice === '3' || targetChoice === '5') {
    const mdcSrc = path.join(rootPkgDir, 'adapters/cursor/design-with-intent.mdc');
    const destDir = path.join(cwd, '.cursor/rules');
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(mdcSrc, path.join(destDir, 'design-with-intent.mdc'));
    installedPaths.push('.cursor/rules/design-with-intent.mdc');
  }
  if (targetChoice === '4') {
    const homedir = process.env.HOME || process.env.USERPROFILE || '';
    if (homedir) {
      const globalDest = path.join(homedir, '.gemini/config/skills/design-with-intent');
      copyDirRecursive(skillSrc, globalDest);
      installedPaths.push(globalDest);
    }
  }

  console.log(`\n${c.bgBlue}${c.white}${c.bold}  STEP 2: PROJECT DESIGN RECORD (DESIGN.md)  ${c.reset}\n`);
  let defaultName = path.basename(cwd);
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.name) defaultName = pkg.name;
    } catch {}
  }

  const productName = await ask(rl, 'Product or Project Name', defaultName);
  const audience = await ask(rl, 'Primary Audience / Persona', 'Domain users & operators');
  const primaryTask = await ask(rl, 'Primary User Task / Goal', 'Complete core workflow efficiently with clear feedback');
  
  console.log(`\nSelect Primary Design Mode:`);
  console.log(`  ${c.cyan}1)${c.reset} ${c.bold}create${c.reset}  — New product, clean slate, or ground-up redesign`);
  console.log(`  ${c.cyan}2)${c.reset} ${c.bold}repair${c.reset}  — Existing product; improve UI while preserving brand`);
  console.log(`  ${c.cyan}3)${c.reset} ${c.bold}audit${c.reset}   — UX, accessibility & design critique only`);
  const modeChoice = await ask(rl, 'Mode (1-3)', '1');
  const modeMap = { '1': 'create', '2': 'repair', '3': 'audit' };
  const mode = modeMap[modeChoice] || 'create';

  const brandColor = await ask(rl, 'Signature Brand Color or Invariant to preserve (e.g. #6D28D9, or press Enter to skip)', '');
  const preserveList = brandColor ? [`Mandated Brand Color (${brandColor})`] : [];

  const designMdPath = path.join(cwd, 'DESIGN.md');
  const templateContent = getDesignRecordTemplate({
    product: productName,
    audience,
    primary_task: primaryTask,
    mode,
    preserve: preserveList,
  });

  fs.writeFileSync(designMdPath, templateContent, 'utf8');

  // Success summary banner
  console.log(`\n${c.green}${c.bold}══════════════════════════════════════════════════════════════════════════${c.reset}`);
  console.log(`${c.green}${c.bold}  ✓ SETUP COMPLETE!${c.reset}`);
  console.log(`${c.green}${c.bold}══════════════════════════════════════════════════════════════════════════${c.reset}\n`);
  console.log(`${c.bold}Installed Skills / Rules:${c.reset}`);
  for (const p of installedPaths) {
    console.log(`  ${c.green}✓${c.reset} ${p}`);
  }
  console.log(`\n${c.bold}Created Decision Record:${c.reset}`);
  console.log(`  ${c.green}✓${c.reset} ${path.relative(cwd, designMdPath)}`);

  console.log(`\n${c.magenta}${c.bold}How to prompt your AI Agent now:${c.reset}`);
  console.log(`  ${c.cyan}"Follow DESIGN.md and create our layout using deliberate visual hierarchy, semantic tokens, and WCAG AA contrast."${c.reset}\n`);
}

/**
 * 2. Interactive Contrast Checker
 */
async function interactiveContrast(rl) {
  console.log(`\n${c.bgMagenta}${c.white}${c.bold}  WCAG 2.2 AA / AAA COLOR CONTRAST EVALUATOR  ${c.reset}\n`);
  console.log(`Enter two colors in hex (e.g. ${c.yellow}#6D28D9${c.reset}) or rgb format:\n`);

  while (true) {
    const fg = await ask(rl, 'Foreground (Text / Icon) Color', '#6D28D9');
    const bg = await ask(rl, 'Background Color', '#FFFFFF');

    try {
      const res = calculateContrast(fg, bg);
      const ratioNum = parseFloat(res.ratio);
      const barFilled = Math.min(20, Math.round((ratioNum / 21) * 20));
      const bar = '■'.repeat(barFilled) + '░'.repeat(20 - barFilled);

      console.log(`\n${c.bold}Contrast Results for ${fg} on ${bg}:${c.reset}`);
      console.log(`  Ratio:       ${c.cyan}${c.bold}${res.ratio}:1${c.reset} [${bar}]`);
      console.log(`  Normal Text (AA  >= 4.5:1):  ${res.normalTextAA ? `${c.green}✓ PASS${c.reset}` : `${c.red}✗ FAIL${c.reset}`}`);
      console.log(`  Normal Text (AAA >= 7.0:1):  ${res.normalTextAAA ? `${c.green}✓ PASS${c.reset}` : `${c.yellow}✗ FAIL${c.reset}`}`);
      console.log(`  Large Text  (AA  >= 3.0:1):  ${res.largeTextAA ? `${c.green}✓ PASS${c.reset}` : `${c.red}✗ FAIL${c.reset}`}`);
      console.log(`  Large Text  (AAA >= 4.5:1):  ${res.largeTextAAA ? `${c.green}✓ PASS${c.reset}` : `${c.yellow}✗ FAIL${c.reset}`}`);
      console.log(`  UI Borders  (AA  >= 3.0:1):  ${res.uiComponentAA ? `${c.green}✓ PASS${c.reset}` : `${c.red}✗ FAIL${c.reset}`}`);

      if (res.normalTextAA) {
        console.log(`\n  ${c.green}✓ Excellent! Meets standard WCAG 2.2 AA accessibility requirements.${c.reset}`);
      } else {
        console.log(`\n  ${c.red}⚠ Warning: Fails WCAG 2.2 AA. Darken the foreground or lighten the background.${c.reset}`);
      }
    } catch (err) {
      console.log(`\n  ${c.red}Error: ${err.message}${c.reset}`);
    }

    const again = await ask(rl, '\nCheck another color pair? (y/N)', 'n');
    if (again.toLowerCase() !== 'y' && again.toLowerCase() !== 'yes') {
      break;
    }
    console.log('');
  }
}

/**
 * 3. Interactive Touch Target Checker
 */
async function interactiveTargetSize(rl) {
  console.log(`\n${c.bgMagenta}${c.white}${c.bold}  TOUCH TARGET SIZE CHECKER (WCAG 2.2 AA)  ${c.reset}\n`);

  while (true) {
    const w = await ask(rl, 'Element Width (pixels)', '48');
    const h = await ask(rl, 'Element Height (pixels)', '48');

    try {
      const res = checkTargetSize(w, h, true);
      console.log(`\n${c.bold}Target Size Evaluation (${w}px × ${h}px):${c.reset}`);
      console.log(`  WCAG 2.2 AA (>= 24×24px):       ${res.wcag22AA ? `${c.green}✓ PASS${c.reset}` : `${c.red}✗ FAIL${c.reset}`}`);
      console.log(`  Mobile Recommended (>= 44×44px): ${res.mobileRecommended ? `${c.green}✓ PASS${c.reset}` : `${c.yellow}✗ BELOW RECOMMENDED${c.reset}`}`);
      console.log(`  Rating:                         ${c.cyan}${c.bold}${res.status}${c.reset}`);
    } catch (err) {
      console.log(`\n  ${c.red}Error: ${err.message}${c.reset}`);
    }

    const again = await ask(rl, '\nCheck another target size? (y/N)', 'n');
    if (again.toLowerCase() !== 'y' && again.toLowerCase() !== 'yes') {
      break;
    }
    console.log('');
  }
}

/**
 * 4. Workspace Design Health Audit
 */
async function workspaceHealthAudit() {
  const cwd = process.cwd();
  console.log(`\n${c.bgBlue}${c.white}${c.bold}  WORKSPACE DESIGN HEALTH SCORECARD  ${c.reset}\n`);
  console.log(`Inspecting workspace: ${c.dim}${cwd}${c.reset}\n`);

  let score = 0;
  let maxScore = 5;

  // 1. Check Antigravity / Claude / Cursor skills
  const hasAntigravity = fs.existsSync(path.join(cwd, '.agents/skills/design-with-intent/SKILL.md'));
  const hasClaude = fs.existsSync(path.join(cwd, '.claude/skills/design-with-intent/SKILL.md'));
  const hasCursor = fs.existsSync(path.join(cwd, '.cursor/rules/design-with-intent.mdc'));

  if (hasAntigravity || hasClaude || hasCursor) {
    console.log(`  ${c.green}✓${c.reset} Agent Skill Installed:`);
    if (hasAntigravity) console.log(`      • Antigravity IDE: .agents/skills/design-with-intent/`);
    if (hasClaude) console.log(`      • Claude Code: .claude/skills/design-with-intent/`);
    if (hasCursor) console.log(`      • Cursor: .cursor/rules/design-with-intent.mdc`);
    score++;
  } else {
    console.log(`  ${c.red}✗${c.reset} Agent Skill: Not found in current workspace`);
  }

  // 2. Check DESIGN.md
  const designMdPath = path.join(cwd, 'DESIGN.md');
  if (fs.existsSync(designMdPath)) {
    console.log(`  ${c.green}✓${c.reset} Project Memory: DESIGN.md exists`);
    score++;

    const content = fs.readFileSync(designMdPath, 'utf8');
    if (content.includes('schema_version:') && content.includes('product:') && content.includes('primary_task:')) {
      console.log(`  ${c.green}✓${c.reset} DESIGN.md Schema: Core frontmatter keys present`);
      score++;
    } else {
      console.log(`  ${c.yellow}⚠${c.reset} DESIGN.md Schema: Missing standard frontmatter keys`);
    }
  } else {
    console.log(`  ${c.yellow}⚠${c.reset} Project Memory: DESIGN.md not found (Run 'npx design-with-intent record')`);
  }

  // 3. Check for tokens or CSS styles
  const commonTokenPaths = [
    'src/styles/tokens.css',
    'src/tokens.css',
    'src/index.css',
    'styles/tokens.css',
    'src/styles/global.css',
  ];
  const foundToken = commonTokenPaths.find(p => fs.existsSync(path.join(cwd, p)));
  if (foundToken) {
    console.log(`  ${c.green}✓${c.reset} Design Tokens Source: Found ${foundToken}`);
    score++;
  } else {
    console.log(`  ${c.dim}ℹ${c.reset} Design Tokens: No standard tokens.css found`);
  }

  // 4. Check package.json accessibility scripts
  const pkgPath = path.join(cwd, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.scripts && (pkg.scripts.contrast || pkg.scripts.accessibility)) {
        console.log(`  ${c.green}✓${c.reset} Package Scripts: Accessibility checks configured in package.json`);
        score++;
      } else {
        console.log(`  ${c.dim}ℹ${c.reset} Package Scripts: Consider adding "contrast": "design-with-intent contrast"`);
      }
    } catch {}
  }

  console.log(`\n${c.bold}Health Score: ${score}/${maxScore}${c.reset}`);
  if (score >= 4) {
    console.log(`${c.green}${c.bold}Status: EXCELLENT${c.reset} — Your workspace is primed for intentional AI design.\n`);
  } else if (score >= 2) {
    console.log(`${c.yellow}${c.bold}Status: GOOD${c.reset} — Core setup active; add DESIGN.md or tokens to complete.\n`);
  } else {
    console.log(`${c.red}${c.bold}Status: NEEDS SETUP${c.reset} — Run option [1] Quickstart to configure your workspace.\n`);
  }
}

/**
 * 5. Prompting Guide
 */
function showPromptingGuide() {
  console.log(`\n${c.bgBlue}${c.white}${c.bold}  AI AGENT PROMPTING CHEAT SHEET  ${c.reset}\n`);
  
  console.log(`${c.bold}${c.cyan}1. CREATE MODE (New Feature / Clean Slate):${c.reset}`);
  console.log(`  "Act using the design-with-intent skill in Create mode. Inspect DESIGN.md`);
  console.log(`   and propose 2 distinct visual directions for our product before writing`);
  console.log(`   the code. Use semantic CSS variables and verify WCAG 2.2 AA contrast."\n`);

  console.log(`${c.bold}${c.cyan}2. REPAIR MODE (Refactoring Existing UI):${c.reset}`);
  console.log(`  "Use design-with-intent in Repair mode to fix the mobile layout of our table.`);
  console.log(`   Strictly preserve our existing brand purple tokens (#6D28D9) and existing logic.`);
  console.log(`   Reflow the 8 columns into responsive cards below 680px."\n`);

  console.log(`${c.bold}${c.cyan}3. AUDIT MODE (Accessibility & UX Critique):${c.reset}`);
  console.log(`  "Run an Audit using design-with-intent on our checkout page.`);
  console.log(`   Check touch target dimensions (>= 24px) and color contrast on all buttons`);
  console.log(`   and form states. Provide evidence without changing code."\n`);
}

/**
 * Main Interactive Wizard Loop
 */
export async function runInteractiveWizard() {
  clearScreen();
  printHeader();

  const rl = readline.createInterface({ input, output });
  let running = true;

  rl.on('close', () => {
    running = false;
  });

  try {
    while (running) {
      console.log(`${c.bold}What would you like to do?${c.reset}`);
      console.log(`  ${c.cyan}1)${c.reset} 🚀 ${c.bold}Quickstart:${c.reset} Install skill & setup DESIGN.md`);
      console.log(`  ${c.cyan}2)${c.reset} 📦 Install skill for coding agents ${c.dim}(Antigravity, Claude, Cursor)${c.reset}`);
      console.log(`  ${c.cyan}3)${c.reset} 📝 Create / Update DESIGN.md decision record`);
      console.log(`  ${c.cyan}4)${c.reset} 🎨 Check WCAG 2.2 color contrast ${c.dim}(Interactive)${c.reset}`);
      console.log(`  ${c.cyan}5)${c.reset} 📱 Check touch target size for mobile ${c.dim}(Interactive)${c.reset}`);
      console.log(`  ${c.cyan}6)${c.reset} 🔍 Workspace design health scorecard`);
      console.log(`  ${c.cyan}7)${c.reset} 📖 AI agent prompt cheat sheet`);
      console.log(`  ${c.cyan}0)${c.reset} 🚪 Exit\n`);

      const choice = await ask(rl, 'Enter choice (0-7)', '0');
      if (!running) break;

      switch (choice) {
        case '1':
          await interactiveQuickstart(rl);
          break;
        case '2':
          console.log('');
          await interactiveQuickstart(rl);
          break;
        case '3': {
          const cwd = process.cwd();
          const pName = await ask(rl, 'Product Name', path.basename(cwd));
          const pAudience = await ask(rl, 'Audience', 'Target users');
          const pTask = await ask(rl, 'Primary Task', 'Accomplish core goal');
          const pBrand = await ask(rl, 'Signature Brand Color to Preserve (or Enter)', '');
          const dest = path.join(cwd, 'DESIGN.md');
          const content = getDesignRecordTemplate({
            product: pName,
            audience: pAudience,
            primary_task: pTask,
            preserve: pBrand ? [`Brand Color (${pBrand})`] : [],
          });
          fs.writeFileSync(dest, content, 'utf8');
          console.log(`\n  ${c.green}✓ Created DESIGN.md${c.reset} in ${dest}\n`);
          break;
        }
        case '4':
          await interactiveContrast(rl);
          break;
        case '5':
          await interactiveTargetSize(rl);
          break;
        case '6':
          await workspaceHealthAudit();
          break;
        case '7':
          showPromptingGuide();
          break;
        case '0':
        case 'exit':
        case 'q':
          console.log(`\n${c.dim}Exiting Design with Intent. Happy designing!${c.reset}\n`);
          running = false;
          break;
        default:
          console.log(`\n${c.yellow}Invalid option. Please choose between 0 and 7.${c.reset}\n`);
          break;
      }

      if (running) {
        if (!process.stdin.isTTY) {
          // If running non-interactively (e.g. piped or test), exit after first run
          running = false;
          break;
        }
        const proceed = await ask(rl, '\nPress Enter to return to main menu or "q" to exit', '');
        if (proceed.toLowerCase() === 'q' || proceed.toLowerCase() === 'exit') {
          running = false;
          console.log(`\n${c.dim}Exiting Design with Intent. Happy designing!${c.reset}\n`);
        } else {
          clearScreen();
          printHeader();
        }
      }
    }
  } finally {
    rl.close();
  }
}
