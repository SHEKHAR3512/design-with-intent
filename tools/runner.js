#!/usr/bin/env node
/**
 * tools/runner.js
 * Test & Evaluation Harness for Design with Intent.
 * Executes skill validation, schema verification, contrast auditing across fixtures,
 * and outputs structured test results.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateContrast } from '../skills/design-with-intent/scripts/check-contrast.js';
import { checkTargetSize } from '../skills/design-with-intent/scripts/touch-target-check.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log("==================================================");
console.log("Design with Intent — Test & Evaluation Runner");
console.log("==================================================\n");

// 1. Core Skill File Checks
console.log("[1/5] Checking Skill Core & Reference Architecture...");
const skillMd = path.join(rootDir, 'skills/design-with-intent/SKILL.md');
assert(fs.existsSync(skillMd), "SKILL.md exists");

const expectedRefs = [
  'visual-system.md',
  'repair.md',
  'web.md',
  'research.md',
  'design-record.md'
];
expectedRefs.forEach(ref => {
  const p = path.join(rootDir, 'skills/design-with-intent/references', ref);
  assert(fs.existsSync(p), `Reference references/${ref} exists`);
});

// 2. Evaluation Briefs
console.log("\n[2/5] Verifying 8 Benchmark Briefs & Rubric...");
const rubricMd = path.join(rootDir, 'evals/rubric.md');
assert(fs.existsSync(rubricMd), "evals/rubric.md exists");

const expectedBriefs = [
  '01-food-rescue-dashboard.md',
  '02-travel-calendar.md',
  '03-music-queue.md',
  '04-public-service-form.md',
  '05-cultural-event.md',
  '06-purple-brand-preservation.md',
  '07-dense-admin-mobile-repair.md',
  '08-multilingual-rtl-flow.md'
];
expectedBriefs.forEach(brief => {
  const p = path.join(rootDir, 'evals/briefs', brief);
  assert(fs.existsSync(p), `Brief evals/briefs/${brief} exists`);
});

// 3. JSON Schemas Validation
console.log("\n[3/5] Validating JSON Schemas...");
const schemas = [
  'design-record.schema.json',
  'evaluation.schema.json',
  'findings.schema.json'
];
schemas.forEach(schemaFile => {
  const p = path.join(rootDir, 'schemas', schemaFile);
  let parsed = null;
  try {
    parsed = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    // handled in assert
  }
  assert(parsed && parsed.$schema, `Valid JSON schema: schemas/${schemaFile}`);
});

// 4. Contrast Ratio Verification on Fixture Palettes
console.log("\n[4/5] Mathematically Verifying Contrast on Fixture Palettes...");

// AlpinePass Fixture: Pine on White & Granite on White
const alpinePine = calculateContrast("#065f46", "#ffffff");
assert(alpinePine.normalTextAA, `AlpinePass Pine (#065f46 on #ffffff): ${alpinePine.ratio}:1 >= 4.5:1`);

const alpineGranite = calculateContrast("#0f172a", "#ffffff");
assert(alpineGranite.normalTextAA, `AlpinePass Granite (#0f172a on #ffffff): ${alpineGranite.ratio}:1 >= 4.5:1`);

const alpineAmberBadge = calculateContrast("#92400e", "#fef3c7");
assert(alpineAmberBadge.normalTextAA, `AlpinePass Low Capacity Badge (#92400e on #fef3c7): ${alpineAmberBadge.ratio}:1 >= 4.5:1`);

// Purple Brand Fixture: Brand Purple on White (Invariant Preservation)
const brandPurple = calculateContrast("#6D28D9", "#ffffff");
assert(brandPurple.normalTextAA, `OmniMetrics Purple Brand (#6D28D9 on #ffffff): ${brandPurple.ratio}:1 >= 4.5:1 (Preserved Purple!)`);

// PortOps Admin Fixture: Slate Dark on Light Gray
const portopsText = calculateContrast("#0f172a", "#f8fafc");
assert(portopsText.normalTextAA, `PortOps Admin Text (#0f172a on #f8fafc): ${portopsText.ratio}:1 >= 4.5:1`);

// 5. Touch Target Dimensions Check
console.log("\n[5/5] Checking Touch Target Standards (WCAG 2.2 AA 2.5.8)...");
const primaryButton = checkTargetSize(120, 48, true);
assert(primaryButton.wcag22AA, "Primary button height 48px meets WCAG 2.2 AA (>= 24px)");
assert(primaryButton.mobileRecommended, "Primary button height 48px meets mobile recommendation (>= 44px)");

const calendarCell = checkTargetSize(38, 74, false);
assert(calendarCell.wcag22AA, "Calendar day cell (38x74px) meets WCAG 2.2 AA (>= 24px)");

console.log("\n==================================================");
console.log(`Results: ${passedTests}/${totalTests} tests passed (${failedTests} failures)`);
console.log("==================================================");

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("✓ All automated tests and verification suites passed!");
}
