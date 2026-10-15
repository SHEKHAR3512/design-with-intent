# Reference: Web Layout, Responsiveness & Accessibility

This guide details implementation standards for responsive web interfaces, complete UI state coverage, and WCAG 2.2 AA accessibility verification.

---

## 1. Responsive Viewports & Reflow

Modern interfaces must adapt smoothly across a continuous spectrum of devices rather than targeting only a single desktop monitor.

### 1.1 Critical Verification Viewports
Always verify interfaces across these key breakpoint thresholds:

1. **320px (Mobile Reflow Benchmark - WCAG 1.4.10):**
   - The interface must reflow without requiring two-dimensional scrolling (no horizontal scrollbar on body text or standard forms).
   - Multi-column layouts must collapse to a single column or provide clear swiping containers.
   - Text measure must adjust fluidly.
2. **768px (Tablet / Narrow Laptop):**
   - Sidebars can collapse to compact icon rails or off-canvas drawers.
   - Data cards can transition to 2-column grids.
3. **1024px – 1440px (Standard Desktop):**
   - Full side navigation, multi-column dashboards, and persistent action headers.
   - Max-width containment (e.g., `max-width: 1280px; margin: 0 auto;`) prevents excessive line lengths on ultrawide monitors.

### 1.2 Fluid Layout Principles
- Use fluid typography with `clamp()`:
  ```css
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
  ```
- Use auto-fitting CSS Grid tracks instead of rigid breakpoint cascades:
  ```css
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
  ```
- Prevent layout overflow by default on images and media:
  ```css
  img, svg, video {
    max-width: 100%;
    height: auto;
    display: block;
  }
  ```

---

## 2. Complete Interface State Matrix

An interface is not complete when only its "happy path screenshot" is designed. Every data-driven component must account for 6 distinct states:

| State | Purpose | Required Visual Elements |
| :--- | :--- | :--- |
| **1. Ideal / Populated** | The standard view when data is abundant | Balanced hierarchy, clean spacing, tabular numerals, interactive hover/focus states |
| **2. Loading / Pending** | During asynchronous fetch or calculation | Skeleton loaders preserving layout dimensions (avoiding cumulative layout shift), subtle pulse, aria-busy="true" |
| **3. Empty / Zero Data** | When no items exist yet | Helpful illustration/icon, clear explanation why it's empty, primary action button to create the first item |
| **4. Partial / Few Items** | When only 1 or 2 items exist | Layout does not break or look stranded; appropriate minimum heights |
| **5. Error / Failure** | Network timeout, 500 error, or validation failure | High-contrast error banner, clear explanation in plain language, prominent "Retry" button, error details toggle |
| **6. Success / Confirm** | Immediate confirmation after action | Non-color checkmark icon, concise confirmation message, clear next steps |

---

## 3. Web Accessibility (WCAG 2.2 AA Checklist)

Accessibility is an engineering and design requirement, not an optional post-launch audit.

### 3.1 Color & Contrast
- [ ] Normal body text (< 24px regular, < 18.5px bold): **Minimum 4.5:1** contrast ratio.
- [ ] Large text (>= 24px regular or >= 18.5px bold): **Minimum 3:1** contrast ratio.
- [ ] Form borders, checkboxes, and interactive controls: **Minimum 3:1** contrast against adjacent background colors.
- [ ] Focus indicators: High contrast outline (at least 3:1 contrast against both the component and surrounding background).
- [ ] Color is never the sole indicator of status (WCAG 1.4.1).

### 3.2 Keyboard Navigation & Focus Management
- [ ] All interactive elements (`<button>`, `<a>`, `<input>`, `<select>`) must be reachable via the `Tab` key.
- [ ] Logical tab order matches the visual reading order.
- [ ] No keyboard traps (modals must allow `Escape` to close and trap focus internally while open).
- [ ] Visible focus styles:
  ```css
  :focus-visible {
    outline: 2px solid var(--action-focus, #2563eb);
    outline-offset: 2px;
  }
  ```

### 3.3 Target Size (WCAG 2.2 AA 2.5.8)
- [ ] All pointer targets have at least **24×24 CSS pixels** bounding box, or sufficient margin so that adjacent targets do not touch.
- [ ] Mobile touch buttons should be at least **44×44 CSS pixels** for comfortable interaction.

### 3.4 Semantic Structure & ARIA
- [ ] Proper semantic landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- [ ] Exactly one `<h1>` per page reflecting the main view title.
- [ ] Heading hierarchy (`<h1>` -> `<h2>` -> `<h3>`) is strictly maintained without skipping levels.
- [ ] Icon-only buttons must have an `aria-label` or visually hidden text:
  ```html
  <button aria-label="Close dialog" class="icon-button">
    <svg aria-hidden="true" ...></svg>
  </button>
  ```
- [ ] Dynamic alerts and status notifications use `role="status"` or `aria-live="polite"`.
