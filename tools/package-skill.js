#!/usr/bin/env node
/**
 * tools/package-skill.js
 * Bundles the standalone portable skill into dist/
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log("Packaging portable skill...");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = pkg.version || '1.0.0';
const archiveName = `design-with-intent-v${version}.tar.gz`;
const archivePath = path.join(distDir, archiveName);

try {
  // Create tarball from skills/ directory
  execSync(`tar -czf "${archivePath}" -C "${path.join(rootDir, 'skills')}" design-with-intent`);
  const stats = fs.statSync(archivePath);
  console.log(`✓ Successfully packaged portable skill: dist/${archiveName} (${Math.round(stats.size / 1024)} KB)`);
} catch (err) {
  console.error("Failed to package skill:", err.message);
  process.exit(1);
}
