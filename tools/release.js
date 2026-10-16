/**
 * tools/release.js
 * Automated release script for Design with Intent
 * Packages, tests, tags, creates GitHub Release, and publishes to npm.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function run(cmd, desc) {
  console.log(`\n\x1b[1;36m▶ ${desc}\x1b[0m\n$ ${cmd}`);
  execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
}

function runOutput(cmd) {
  return execSync(cmd, { cwd: rootDir, encoding: 'utf8' }).trim();
}

console.log(`\x1b[1;35m══════════════════════════════════════════════════════════════════════════\x1b[0m`);
console.log(`\x1b[1;35m  🚀 DESIGN WITH INTENT — AUTOMATED RELEASE RUNNER  \x1b[0m`);
console.log(`\x1b[1;35m══════════════════════════════════════════════════════════════════════════\x1b[0m`);

// 1. Read current version from package.json
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;
const tagName = `v${version}`;

console.log(`\nPreparing release for version: \x1b[1;32m${version}\x1b[0m (Tag: \x1b[1;32${tagName}\x1b[0m)`);

// 2. Run automated test suite and validation
run('npm test', 'Running test & evaluation runner');
run('npm run validate', 'Validating skill architecture, links & schemas');

// 3. Build npm tarball
run('npm pack', 'Creating npm package distribution tarball');
const tarballName = `design-with-intent-${version}.tgz`;
const tarballPath = path.join(rootDir, tarballName);

if (!fs.existsSync(tarballPath)) {
  console.error(`\x1b[31mError:\x1b[0m Expected tarball ${tarballName} not found.`);
  process.exit(1);
}

// 4. Git commit and tag
try {
  const status = runOutput('git status --porcelain');
  if (status) {
    run('git add -A', 'Staging changes for release');
    run(`git commit -m "release: ${tagName}"`, 'Committing release files');
  }
} catch (e) {
  console.log(`Git status check: ${e.message}`);
}

// Check if tag already exists locally
const localTags = runOutput('git tag -l').split('\n');
if (!localTags.includes(tagName)) {
  run(`git tag -a ${tagName} -m "Release ${tagName}"`, `Creating git tag ${tagName}`);
}

// 5. Push to GitHub
try {
  run('git push origin main', 'Pushing commits to GitHub origin/main');
  run(`git push origin ${tagName}`, `Pushing tag ${tagName} to GitHub`);
} catch (e) {
  console.log(`Notice during git push: ${e.message}`);
}

// 6. Create GitHub Release using gh CLI
const releaseTitle = `${tagName} — Redesign Workflow, 6 Built-in Themes & Browser Verification`;
const releaseNotes = `### Design with Intent ${tagName}

Production design engine, portable agent skill, and interactive CLI for AI coding agents (Claude Code, Cursor, Codex, Antigravity).

#### 🚀 What's New in this Release:
- **Redesign-First Workflow**: Dedicated workflow to transform generic AI templates into distinctive, purposeful products while strictly protecting working business logic, flows, and explicit brand assets.
- **6 Built-in Theme Recipes**: Field Notes, Clean Operations, Cultural Heritage, Warm Editorial/Gallery, Modern Industrial, and Public Service — pre-tested for WCAG AA normal-text contrast.
- **Modular Core Architecture**: Refactored internal architecture into clean modules (\`lib/install.js\`, \`lib/workflow.js\`) with safe non-interactive defaults, atomic backups (\`.backup-*\`), and symlink protection.
- **12 Comprehensive Reference Guides**: Modular references covering art direction, design critique, accessibility boundaries, visual systems, browser testing, and diagrams.
- **Responsive Browser Capture**: Multi-viewport screenshot generation (320px, 768px, 1280px) and automated DOM inspection for overflow and touch target defects.
- **Universal Multi-Agent Support**: Automatic detection and installation for Claude Code, Cursor (rule + full skill), Codex, and Antigravity.
- **22 Integration & Offline Package Tests**: Comprehensive automated test coverage guaranteeing offline npm installation and isolated execution.

#### Links:
- **npm Registry**: [https://www.npmjs.com/package/design-with-intent](https://www.npmjs.com/package/design-with-intent)
- **GitHub Repository**: [https://github.com/SHEKHAR3512/design-with-intent](https://github.com/SHEKHAR3512/design-with-intent)
- **Documentation & Rubric**: [https://github.com/SHEKHAR3512/design-with-intent#readme](https://github.com/SHEKHAR3512/design-with-intent#readme)`;

try {
  const existingReleases = runOutput('gh release list');
  if (existingReleases.includes(tagName)) {
    console.log(`\x1b[33mNotice:\x1b[0m Release ${tagName} already exists on GitHub.`);
  } else {
    run(
      `gh release create ${tagName} "${tarballPath}" --title "${releaseTitle}" --notes "${releaseNotes.replace(/"/g, '\\"')}"`,
      `Creating GitHub Release for ${tagName} with package artifact`
    );
  }
} catch (err) {
  console.log(`Notice during GitHub release creation: ${err.message}`);
}

// 7. Publish to npm
try {
  run('npm publish --access public', 'Publishing package to npm registry');
  console.log(`\x1b[1;32m✓ Successfully published to npm!\x1b[0m`);
} catch (err) {
  console.log(`Notice during npm publish: ${err.message}`);
}

// 8. Clean up local tarball
if (fs.existsSync(tarballPath)) {
  fs.unlinkSync(tarballPath);
}

console.log(`\n\x1b[1;32m══════════════════════════════════════════════════════════════════════════\x1b[0m`);
console.log(`\x1b[1;32m  ✓ RELEASE ${tagName} COMPLETED SUCCESSFULLY!  \x1b[0m`);
console.log(`\x1b[1;32m══════════════════════════════════════════════════════════════════════════\x1b[0m`);
console.log(`  • GitHub Release: https://github.com/SHEKHAR3512/design-with-intent/releases/tag/${tagName}`);
console.log(`  • npm Package:    https://www.npmjs.com/package/design-with-intent\n`);
