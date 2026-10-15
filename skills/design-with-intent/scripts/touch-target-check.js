#!/usr/bin/env node
/**
 * touch-target-check.js
 * Checks element bounding dimensions against WCAG 2.2 AA Target Size (Minimum) (Criterion 2.5.8)
 * and mobile usability guidelines.
 * 
 * Rules:
 * - WCAG 2.2 AA (2.5.8): Minimum 24 CSS pixels x 24 CSS pixels (or adequate spacing)
 * - Mobile Touch Recommended: 44–48 CSS pixels for primary touch actions
 */

export function checkTargetSize(width, height, isMobileTouchPrimary = false) {
  const w = parseFloat(width);
  const h = parseFloat(height);

  if (isNaN(w) || isNaN(h)) {
    throw new Error(`Invalid dimensions provided: width=${width}, height=${height}`);
  }

  const meetsWcag22AA = w >= 24 && h >= 24;
  const meetsMobileRecommended = w >= 44 && h >= 44;

  return {
    width: w,
    height: h,
    wcag22AA: meetsWcag22AA,
    mobileRecommended: meetsMobileRecommended,
    status: meetsMobileRecommended
      ? "EXCELLENT"
      : meetsWcag22AA
      ? (isMobileTouchPrimary ? "ADEQUATE_WCAG_AA_BUT_NARROW_FOR_TOUCH" : "PASS_WCAG_AA")
      : "FAIL_BELOW_24PX"
  };
}

if (process.argv[1] && process.argv[1].endsWith("touch-target-check.js")) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("Usage: node touch-target-check.js <width_px> <height_px> [--mobile-primary]");
    console.log("Example: node touch-target-check.js 48 48 --mobile-primary");
    process.exit(1);
  }

  const w = args[0];
  const h = args[1];
  const isPrimary = args.includes("--mobile-primary");

  const result = checkTargetSize(w, h, isPrimary);
  console.log("-----------------------------------------");
  console.log(`Target Size Evaluation: ${w}px × ${h}px`);
  console.log("-----------------------------------------");
  console.log(`WCAG 2.2 AA Min (>= 24×24px): ${result.wcag22AA ? "✓ PASS" : "✗ FAIL"}`);
  console.log(`Mobile Touch Rec (>= 44×44px): ${result.mobileRecommended ? "✓ PASS" : "✗ BELOW RECOMMENDED"}`);
  console.log(`Status Assessment:             ${result.status}`);
  console.log("-----------------------------------------");

  if (!result.wcag22AA) {
    process.exit(1);
  }
}
