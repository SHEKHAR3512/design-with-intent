#!/usr/bin/env node
// DWI-authored optional browser helper. Requires Playwright in the target project.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';

async function main() {
  const { values } = parseArgs({ options: {
    url: { type: 'string' }, out: { type: 'string' }, widths: { type: 'string', default: '320,768,1280' },
    'wait-for': { type: 'string', default: 'body' }, timeout: { type: 'string', default: '15000' },
    executable: { type: 'string' }, help: { type: 'boolean' },
  } });
  if (values.help) {
    console.log(`Capture responsive browser evidence (not a visual-quality or accessibility verdict).

Usage: node capture.mjs --url http://localhost:5173 --out /tmp/dwi-before
  --widths 320,768,1280   CSS pixel widths; each uses an 900px-high viewport
  --wait-for main         Visible selector indicating UI readiness (default: body)
  --timeout 15000         Navigation and selector timeout in milliseconds
  --executable PATH      Use an existing Chromium executable

Run from the website project. Requires playwright or @playwright/test and a browser.
Use existing agent browser tools instead if preferred. To install optional tooling:
  npm install -D playwright
  npx playwright install chromium

Start your dev server first. Use a new output directory for each capture.
Writes viewport PNGs and report.json. Review screenshots and exercise flows separately.`);
    return;
  }
  if (!values.url || !values.out) throw new Error('--url and --out are required. See --help.');
  const url = new URL(values.url);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Use an http:// or https:// page URL.');
  const widths = [...new Set(values.widths.split(',').map(Number))];
  if (!widths.length || widths.some(w => !Number.isInteger(w) || w < 240 || w > 4000)) throw new Error('Widths must be integers between 240 and 4000.');
  const timeout = Number(values.timeout);
  if (!Number.isInteger(timeout) || timeout < 1 || timeout > 120000) throw new Error('Timeout must be between 1 and 120000 milliseconds.');
  const projectRequire = createRequire(path.join(process.cwd(), 'package.json'));
  let chromium;
  for (const module of ['playwright', '@playwright/test']) {
    try { ({ chromium } = projectRequire(module)); break; } catch {}
  }
  if (!chromium) throw new Error('Playwright is not available in this project. Use your agent browser or follow --help for optional setup.');
  const out = path.resolve(values.out);
  if (fs.existsSync(out)) throw new Error(`Output directory already exists: ${out}. Choose a fresh before/after directory.`);
  const browser = await chromium.launch({ headless: true, ...(values.executable ? { executablePath: values.executable } : {}) });
  const report = { url: url.href, capturedAt: new Date().toISOString(), limits: 'Screenshots and diagnostics only; no flow, screen-reader, contrast, or visual-quality verdict.', viewports: [] };
  try {
    fs.mkdirSync(out, { recursive: true });
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', err => errors.push({ type: 'pageerror', message: err.message }));
        page.on('console', msg => { if (msg.type() === 'error') errors.push({ type: 'console', message: msg.text() }); });
        const response = await page.goto(url.href, { waitUntil: 'domcontentloaded', timeout });
        if (response && !response.ok()) throw new Error(`Navigation returned HTTP ${response.status()} at ${url.href}`);
        await page.locator(values['wait-for']).first().waitFor({ state: 'visible', timeout });
        await page.evaluate(async timeoutMs => {
          // Bound font readiness: a broken font request must not hang a capture forever.
          let timer;
          try { await Promise.race([document.fonts.ready, new Promise(resolve => { timer = setTimeout(resolve, timeoutMs); })]); }
          finally { clearTimeout(timer); }
        }, timeout);
        const diagnostics = await page.evaluate(() => {
          const root = document.documentElement;
          const targets = [...document.querySelectorAll('button, a[href], input:not([type="hidden"]), select, textarea, [role="button"]')];
          const smallTargets = targets.flatMap(el => {
            const rect = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            if (!rect.width || !rect.height || style.visibility === 'hidden' || style.display === 'none') return [];
            if (rect.width >= 24 && rect.height >= 24) return [];
            return [{ tag: el.tagName.toLowerCase(), id: el.id || null, label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 100), width: Math.round(rect.width), height: Math.round(rect.height) }];
          });
          return { pageWidth: root.clientWidth, scrollWidth: root.scrollWidth, horizontalOverflow: root.scrollWidth > root.clientWidth + 1, smallTargetCandidates: smallTargets };
        });
        const screenshot = `${width}.png`;
        await page.screenshot({ path: path.join(out, screenshot), fullPage: true, animations: 'disabled', timeout });
        report.viewports.push({ width, height: 900, screenshot, ...diagnostics, errors });
        console.log(`Captured ${width}px → ${path.join(out, screenshot)}`);
      } finally { await context.close(); }
    }
  } finally {
    if (fs.existsSync(out)) fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    await browser.close();
  }
  console.log('Review screenshots and report.json. Capture alone does not verify design quality or accessibility.');
}

main().catch(error => { console.error(`Capture failed: ${error.message}`); process.exitCode = 1; });
