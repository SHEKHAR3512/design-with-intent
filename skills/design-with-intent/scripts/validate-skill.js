#!/usr/bin/env node
/**
 * validate-skill.js
 * Validates the Design with Intent skill structure, frontmatter,
 * editorial word budget, link integrity, and schemas.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const skillDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(skillDir, '../..');

let errors = [];
let warnings = [];

console.log("=========================================");
console.log("Validating 'design-with-intent' Skill");
console.log("=========================================\n");

// 1. Check SKILL.md
const skillPath = path.join(skillDir, 'SKILL.md');
if (!fs.existsSync(skillPath)) {
  errors.push(`Missing core skill file: ${skillPath}`);
} else {
  const content = fs.readFileSync(skillPath, 'utf8');
  
  // Frontmatter check
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    errors.push("SKILL.md is missing YAML frontmatter");
  } else {
    const fm = fmMatch[1];
    if (!fm.includes("name: design-with-intent")) {
      errors.push("SKILL.md frontmatter missing 'name: design-with-intent'");
    }
    if (!fm.includes("description:")) {
      errors.push("SKILL.md frontmatter missing 'description:'");
    }
    console.log("✓ Frontmatter valid (name, description)");
  }

  // Word count check
  const bodyText = content.replace(/^---[\s\S]*?---/, '').replace(/[#*`_>\[\]]/g, ' ');
  const words = bodyText.trim().split(/\s+/).filter(Boolean).length;
  console.log(`ℹ Core SKILL.md word count: ${words} words`);
  if (words < 600) {
    warnings.push(`SKILL.md is very brief (${words} words). Ensure all core steps are adequately covered.`);
  } else if (words > 2500) {
    warnings.push(`SKILL.md exceeds ideal initial budget (${words} words > 2000). Consider moving details into references.`);
  } else {
    console.log("✓ Word count within optimal editorial range (600–2500 words)");
  }

  // Check referenced links
  const linkMatches = [...content.matchAll(/\[.*?\]\(((\.\/references\/|\.\/)[^)]+)\)/g)];
  console.log(`ℹ Found ${linkMatches.length} internal reference links in SKILL.md`);
  for (const match of linkMatches) {
    const targetRel = match[1];
    const targetAbs = path.resolve(path.dirname(skillPath), targetRel);
    if (!fs.existsSync(targetAbs)) {
      errors.push(`Broken link in SKILL.md: ${targetRel} -> ${targetAbs} does not exist`);
    }
  }
}

// 2. Check references
const expectedReferences = [
  'visual-system.md',
  'repair.md',
  'web.md',
  'research.md',
  'design-record.md', 'art-direction.md', 'themes.md', 'critique.md',
  'browser-testing.md', 'accessibility.md', 'diagrams.md', 'sources.md'
];

for (const ref of expectedReferences) {
  const refPath = path.join(skillDir, 'references', ref);
  if (!fs.existsSync(refPath)) {
    errors.push(`Missing required reference: ${refPath}`);
  } else {
    console.log(`✓ Reference found: references/${ref}`);
  }
}

// Follow relative links in references too; install must carry its entire payload.
for (const ref of fs.readdirSync(path.join(skillDir, 'references')).filter(f => f.endsWith('.md'))) {
  const file = path.join(skillDir, 'references', ref);
  const body = fs.readFileSync(file, 'utf8');
  for (const match of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`Broken link in ${ref}: ${target}`);
  }
}
for (const asset of ['assets/themes.json', 'licenses/Apache-2.0.txt', 'licenses/Owl-Listener-MIT.txt', 'scripts/capture.mjs']) {
  if (!fs.existsSync(path.join(skillDir, asset))) errors.push(`Missing bundled resource: ${asset}`);
}

// 3. Check JSON Schemas
const expectedSchemas = [
  'design-record.schema.json',
  'evaluation.schema.json',
  'findings.schema.json'
];

for (const sch of expectedSchemas) {
  const schPath = path.join(rootDir, 'schemas', sch);
  if (!fs.existsSync(schPath)) {
    if (fs.existsSync(path.join(rootDir, 'package.json')) && fs.existsSync(path.join(rootDir, 'skills/design-with-intent'))) errors.push(`Missing schema: ${schPath}`);
  } else {
    try {
      const data = fs.readFileSync(schPath, 'utf8');
      JSON.parse(data);
      console.log(`✓ Valid JSON Schema: schemas/${sch}`);
    } catch (e) {
      errors.push(`Invalid JSON syntax in schemas/${sch}: ${e.message}`);
    }
  }
}

// 4. Check Rubric and Evals
const rubricPath = path.join(rootDir, 'evals/rubric.md');
if (!fs.existsSync(rubricPath)) {
  // The portable skill intentionally excludes development evaluation fixtures.
} else {
  console.log("✓ Rubric found: evals/rubric.md");
}

console.log("\n-----------------------------------------");
if (errors.length > 0) {
  console.error(`✗ Validation failed with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log("✓ All skill files, links, and schemas validated successfully!");
  if (warnings.length > 0) {
    console.log(`⚠ ${warnings.length} warning(s):`);
    warnings.forEach(w => console.log(`  - ${w}`));
  }
}
