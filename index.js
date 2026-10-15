/**
 * design-with-intent
 * Programmatic API for Design with Intent
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateContrast } from './skills/design-with-intent/scripts/check-contrast.js';
import { checkTargetSize } from './skills/design-with-intent/scripts/touch-target-check.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { calculateContrast, checkTargetSize };

/**
 * Returns the absolute filesystem path to the canonical SKILL.md file.
 */
export function getSkillPath() {
  return path.join(__dirname, 'skills/design-with-intent/SKILL.md');
}

/**
 * Returns the directory containing the skill and its references.
 */
export function getSkillDir() {
  return path.join(__dirname, 'skills/design-with-intent');
}

/**
 * Reads and returns the content of SKILL.md.
 */
export function getSkillContent() {
  return fs.readFileSync(getSkillPath(), 'utf8');
}

/**
 * Reads and returns a specific reference document.
 * @param {'visual-system' | 'repair' | 'web' | 'research' | 'design-record'} name
 */
export function getReference(name) {
  const filename = name.endsWith('.md') ? name : `${name}.md`;
  const filePath = path.join(__dirname, 'skills/design-with-intent/references', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Reference document not found: ${name}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Returns a loaded JSON schema by name.
 * @param {'design-record' | 'evaluation' | 'findings'} name
 */
export function getSchema(name) {
  const filename = name.endsWith('.schema.json') ? name : `${name}.schema.json`;
  const schemaPath = path.join(__dirname, 'schemas', filename);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema not found: ${name}`);
  }
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

/**
 * Returns the default DESIGN.md template string.
 */
export function getDesignRecordTemplate(overrides = {}) {
  const product = overrides.product || 'My Product';
  const audience = overrides.audience || 'Target users';
  const primaryTask = overrides.primary_task || 'Primary user outcome';
  const mode = overrides.mode || 'create';
  const preserve = Array.isArray(overrides.preserve)
    ? overrides.preserve
    : (overrides.preserve ? [overrides.preserve] : []);

  const preserveYaml = preserve.length > 0
    ? '\n' + preserve.map(item => `  - "${item}"`).join('\n')
    : ' []';

  const summary = overrides.direction_summary || (overrides.direction && overrides.direction.summary) || 'Purposeful visual approach';
  const rationale = overrides.direction_rationale || (overrides.direction && overrides.direction.rationale) || 'Why this direction fits the product and audience';
  const tokenSource = overrides.token_source || 'src/styles/tokens.css';

  return `---
schema_version: 1
product: "${product}"
audience: "${audience}"
primary_task: "${primaryTask}"
mode: "${mode}"

facts: []
assumptions: []
preserve:${preserveYaml}

direction:
  summary: "${summary}"
  rationale: "${rationale}"

token_source: "${tokenSource}"
responsive_rules:
  - "320px–480px: Single-column reflow without horizontal scroll"
  - "768px+: Multi-column layout"

required_states:
  - "Default"
  - "Loading"
  - "Empty"
  - "Error"

references: []
rejected_options: []

verification:
  performed: []
  not_performed: []
---

# Design Decisions
`;
}

export { runInteractiveWizard } from './bin/wizard.js';

