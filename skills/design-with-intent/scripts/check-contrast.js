#!/usr/bin/env node
/**
 * check-contrast.js
 * Deterministic WCAG 2.2 contrast ratio calculator.
 * 
 * Formula defined by W3C WCAG 2.2 specification:
 * https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
 * 
 * Usage:
 *   node check-contrast.js "#ffffff" "#111827"
 *   node check-contrast.js --palette path/to/palette.json
 */

function parseColor(input) {
  if (!input) throw new Error("No color provided");
  const str = input.trim().toLowerCase();

  // Hex: #fff or #ffffff
  if (str.startsWith("#")) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
  }

  // rgb(r, g, b)
  const rgbMatch = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10)
    };
  }

  throw new Error(`Unsupported color format: ${input}. Use #hex or rgb(r, g, b).`);
}

function sRGBtoLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(rgb) {
  const r = sRGBtoLinear(rgb.r);
  const g = sRGBtoLinear(rgb.g);
  const b = sRGBtoLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrast(color1, color2) {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);

  const L1 = getRelativeLuminance(rgb1);
  const L2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const rounded = Math.round(ratio * 100) / 100;

  return {
    ratio: rounded,
    normalTextAA: rounded >= 4.5,
    normalTextAAA: rounded >= 7.0,
    largeTextAA: rounded >= 3.0,
    largeTextAAA: rounded >= 4.5,
    uiComponentAA: rounded >= 3.0
  };
}

// CLI Execution
if (process.argv[1] && process.argv[1].endsWith("check-contrast.js")) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("Usage: node check-contrast.js <foreground> <background>");
    console.log("Example: node check-contrast.js \"#6D28D9\" \"#FFFFFF\"");
    process.exit(1);
  }

  try {
    const fg = args[0];
    const bg = args[1];
    const res = calculateContrast(fg, bg);

    console.log("-----------------------------------------");
    console.log(`WCAG 2.2 Contrast Check: ${fg} on ${bg}`);
    console.log(`Contrast Ratio: ${res.ratio}:1`);
    console.log("-----------------------------------------");
    console.log(`Normal Text (AA >= 4.5:1):     ${res.normalTextAA ? "✓ PASS" : "✗ FAIL"}`);
    console.log(`Normal Text (AAA >= 7.0:1):    ${res.normalTextAAA ? "✓ PASS" : "✗ FAIL"}`);
    console.log(`Large Text (AA >= 3.0:1):      ${res.largeTextAA ? "✓ PASS" : "✗ FAIL"}`);
    console.log(`Large Text (AAA >= 4.5:1):     ${res.largeTextAAA ? "✓ PASS" : "✗ FAIL"}`);
    console.log(`UI Components (AA >= 3.0:1):   ${res.uiComponentAA ? "✓ PASS" : "✗ FAIL"}`);
    console.log("-----------------------------------------");

    if (!res.normalTextAA) {
      process.exitCode = 2; // Warning: fails normal text AA
    }
  } catch (err) {
    console.error("Error calculating contrast:", err.message);
    process.exit(1);
  }
}
