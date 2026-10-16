import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { writeProjectFile, assertSafePath } from './install.js';

export const modes = ['redesign', 'create', 'repair', 'audit'];
export const themes = JSON.parse(fs.readFileSync(new URL('../skills/design-with-intent/assets/themes.json', import.meta.url), 'utf8'));
export const modeDescriptions = {
  redesign: 'Substantially change an existing generic design; preserve working features and explicit brand constraints.',
  create: 'Build a new interface around its audience, content, and primary task.',
  repair: 'Fix a specific UI defect while preserving the existing visual identity.',
  audit: 'Inspect and report findings; do not edit application code.',
};

export function inspectProject(cwd = process.cwd()) {
  let pkg = {};
  const warnings = [];
  try { pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8')); }
  catch (e) { if (e.code !== 'ENOENT') warnings.push(`Could not read package.json: ${e.message}`); }
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const frameworks = ['next', 'react', 'vue', 'svelte', '@sveltejs/kit', 'astro', 'vite'].filter(name => deps[name]);
  let playwright = false;
  try { createRequire(path.join(cwd, 'package.json')).resolve('playwright'); playwright = true; } catch {}
  return {
    product: pkg.name || path.basename(cwd), frameworks, scripts: pkg.scripts || {}, warnings, playwright,
    installed: ['.agents/skills/design-with-intent/SKILL.md', '.claude/skills/design-with-intent/SKILL.md', '.cursor/rules/design-with-intent.mdc'].filter(p => fs.existsSync(path.join(cwd, p))),
    records: ['DESIGN.md', 'DWI-BRIEF.md', 'DWI-PROMPT.md'].filter(p => fs.existsSync(path.join(cwd, p))),
  };
}

export function getTheme(id) {
  if (!id || id === 'custom') return null;
  const theme = themes.find(t => t.id === id);
  if (!theme) throw new Error(`Unknown theme "${id}". Run dwi themes to see available directions.`);
  return theme;
}

export function getPrompt(mode = 'redesign') {
  if (!modes.includes(mode)) throw new Error(`Unknown mode "${mode}". Choose: ${modes.join(', ')}`);
  const entry = 'Use the design-with-intent skill. Read its full SKILL.md from .agents/skills/design-with-intent/ or .claude/skills/design-with-intent/ (or the installed global skill), then follow the relevant bundled references. Read DWI-BRIEF.md if present and reconcile it with DESIGN.md; my current request takes precedence.';
  const instructions = {
    redesign: 'Redesign the scoped interface substantially. Inspect the running UI and source first; capture a before screenshot if possible. Distinguish explicitly protected brand assets from incidental template styling. Compare two directions with different composition and typography, choose the strongest fit, and implement it. Change the hierarchy, layout rhythm, type treatment, and color roles where allowed; adding padding or changing an accent alone is not a redesign. Preserve routes, data, forms, and working interactions. Compare before and after at matching desktop and mobile sizes, repair major defects, and report concrete visible changes and verification limits.',
    create: 'Build the scoped interface. Establish the audience and primary task, compare two structurally distinct visual directions, choose the strongest fit, define tokens, and implement a complete representative flow. Use product-specific content and a memorable visual idea. Verify responsive layout, keyboard interaction, and loading, empty, error, and success states. Report what was actually tested.',
    repair: 'Repair only the defect described in the brief or my request. Inspect source and rendered evidence, preserve the established brand and working logic, fix the cause, and verify the affected flow at desktop and mobile sizes. Report any checks you could not run.',
    audit: 'Audit the scoped interface without editing application code. Inspect its visual hierarchy, composition, typography, color, density, interaction, and accessibility. Prioritize findings by user impact, cite selectors or file locations and evidence, and distinguish observed problems from hypotheses. Give actionable fixes and state which browser or assistive-technology checks remain untested.',
  };
  return `${entry}\n\nMode: ${mode}. ${instructions[mode]}\n`;
}

export function createBrief(options = {}) {
  const mode = options.mode || 'redesign';
  if (!modes.includes(mode)) throw new Error(`Unknown mode "${mode}".`);
  const theme = getTheme(options.theme);
  // JSON-quoted fields keep user-provided line breaks and Markdown from changing the brief structure.
  const field = (label, value, fallback) => `- ${label}: ${JSON.stringify(value || fallback)}`;
  return `# Design with Intent — project brief

This is user-supplied project context, not proof of design quality. Current user instructions take precedence; reconcile any conflicts with DESIGN.md before changing a protected brand constraint.

${field('Product', options.product, 'Infer from repository; label assumptions')}
${field('Mode', mode)}
${field('Audience and context', options.audience, 'Infer cautiously and state assumptions')}
${field('Primary user task', options.task, 'Identify the main existing or requested flow')}
${field('Scope / route / component', options.scope, 'Primary screen and directly related components')}
${field('Current problems', options.problems, mode === 'redesign' ? 'Generic composition, weak visual identity, and insufficient hierarchy' : 'Use the current request and inspected evidence')}
${field('Must preserve', options.preserve, 'Working behavior, content, routes, and explicit brand requirements; existing CSS alone is not a brand mandate')}
${field('Reference URLs or visual cues', options.references, 'Use available project assets; do not claim to have inspected unavailable references')}

## Visual direction

${theme ? `Starting direction: **${theme.name}** (${theme.id}). This is a starting point; adapt it to real content and protected brand requirements.
- Suitable context: ${theme.context}
- Composition: ${theme.layout}
- Typography: ${theme.typography}
- Color roles: ${Object.entries(theme.colors).map(([k, v]) => `${k} ${v}`).join(', ')}
- Distinctive detail: ${theme.signature}
- Avoid: ${theme.avoid}` : 'Custom direction: derive composition, type, palette, and one distinctive detail from the product. Do not choose a preset merely because no preference was supplied.'}

## Acceptance

${modeDescriptions[mode]}
${mode === 'redesign' ? 'Document before → after decisions for composition, typography, color roles, and distinctive product detail. A palette swap on the same template is insufficient. Respect explicit constraints and explain any axis intentionally preserved.' : 'Keep changes within the chosen mode and scope.'}
Verify the primary flow, responsive reflow, keyboard use, focus visibility, contrast, and relevant UI states. Record actual evidence and unperformed checks; file presence is not a quality score.
`;
}

export function saveBrief(options = {}, cwd = process.cwd()) {
  // Validate all inputs before any writes. Existing briefs and prompts are kept together.
  const brief = createBrief(options);
  const prompt = getPrompt(options.mode || 'redesign');
  const files = [['DWI-BRIEF.md', brief], ['DWI-PROMPT.md', prompt]];
  if (!options.force && files.some(([name]) => fs.existsSync(path.join(cwd, name)))) {
    throw new Error('A DWI-BRIEF.md or DWI-PROMPT.md already exists. Edit it, or use --force to replace both with backups.');
  }
  for (const [name] of files) {
    const file = path.join(cwd, name);
    assertSafePath(file);
    if (fs.existsSync(file) && !fs.statSync(file).isFile()) throw new Error(`Expected a file: ${file}`);
  }
  return files.map(([name, content]) => writeProjectFile(path.join(cwd, name), content, options));
}
