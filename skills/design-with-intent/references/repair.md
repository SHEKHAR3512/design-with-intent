# Reference: Repair Mode & Brand Preservation

This guide explains how to repair, clarify, and elevate existing interfaces without breaking brand identity, user habits, or application logic.

Use this guide for targeted repairs. An explicit request to transform a generic existing design belongs in **redesign** mode; do not apply minimal-change constraints to that request.

---

## 1. The Repair Mindset: Surgical Precision

For a focused defect or polish request, the most common failure mode is an unrequested ground-up redesign:
- Deleting the existing brand color palette and replacing it with generic dark mode or trendy editorial beige.
- Swapping working UI components with incompatible new structures.
- Breaking functional state handlers, forms, and business logic.

> **Core Principle:** In `Repair` mode, make the smallest coherent changes that completely resolve the defect while preserving working behavior and brand continuity.

---

## 2. The 4-Step Repair Triage

### Step 1: Inventory Existing Invariants
Before editing code, scan existing styles and identify:
1. **Brand Identity Assets:** Primary brand hues, secondary palette, typography choices, logos, icons.
2. **Design Tokens:** Existing CSS custom properties (`var(--primary)`, `var(--brand-purple)`), Tailwind config, or theme objects.
3. **Behavioral Logic:** Interactive form controls, validation handlers, data table sort/filter hooks, modal triggers.

*Preservation Checklist:*
- [ ] If the brand is purple (`#7C3AED`), the primary interactive hue **must remain purple**. Do not arbitrarily switch to emerald or blue.
- [ ] Existing component architecture (e.g., custom form inputs or design system components) must be reused, not replaced.

### Step 2: Diagnose the Specific Defect
Pinpoint what is actually causing the interface to look poor or perform badly:
- **Is it Hierarchy?** Are headings, subheadings, and body copy all competing for visual attention at the same size and weight?
- **Is it Contrast?** Is body text sitting at 2.8:1 against a light background?
- **Is it Spacing?** Is padding erratic (e.g., 5px on the left, 22px on the right)?
- **Is it Responsiveness?** Does a table overflow horizontally on a 375px phone screen?
- **Is it Density?** Are unrelated metrics crammed into identical cards?

### Step 3: Implement Scoped Solutions
Apply targeted fixes that directly address the diagnosed defect:

#### Scenario A: Fixing Contrast While Preserving Brand Colors
If a brand purple button (`#A78BFA`) has insufficient contrast with white text (2.6:1):
- **Incorrect Fix:** Change the button to black or green.
- **Correct Fix:** Deepen the purple shade to `#6D28D9` or `#5B21B6` (contrast ratio 6.4:1 against white), maintaining the exact brand hue family while achieving WCAG 2.2 AA compliance.

#### Scenario B: Fixing Dense Desktop Tables on Mobile
If an administrative table overflows mobile screens:
- **Incorrect Fix:** Rewrite the whole page into consumer cards that discard essential data columns.
- **Correct Fix:** Apply responsive container behavior:
  1. Add horizontal scrolling wrapper with clear visual affordance (`overflow-x: auto` with smooth scrolling and shadow fades).
  2. Or introduce a clean responsive transformation at `< 640px` that stacks row items into structured definition lists while preserving all data fields.

#### Scenario C: Restoring Typography Hierarchy
If the screen feels monotonous:
- Keep the existing font family.
- Rebalance weights and line heights: increase H1 weight to 600/700, soften secondary metadata text to 13px with `--text-secondary`, and enforce `line-height: 1.5` for readable body paragraphs.

### Step 4: Regression Review
Before marking the repair complete, verify:
1. Did all existing button `onClick` handlers and form `onSubmit` actions remain intact?
2. Did any previously visible content get truncated or hidden on mobile?
3. Did the changes introduce unwanted global style leaks?

---

## 3. Anti-Patterns to Avoid in Repairs

| Anti-Pattern | Why It Fails | What to Do Instead |
| :--- | :--- | :--- |
| **Aesthetic Amnesia** | Replacing the client's established colors with an agent's favorite palette. | Deepen or soften existing brand tokens to meet contrast requirements. |
| **Library Bloat** | Adding Framer Motion, Tailwind, or complex chart packages to fix minor spacing issues. | Use native CSS flexbox, grid, and CSS custom properties. |
| **Scope Creep** | Rewriting the header, footer, and navigation when asked to fix a checkout form. | Scope edits strictly to the requested component and its direct dependencies. |
| **Semantic Destruction** | Replacing `<button>` and `<input>` elements with unstyled `<div>` tags with click handlers. | Maintain semantic HTML elements with keyboard accessibility and ARIA attributes. |

---

## 4. Documenting Repairs in `DESIGN.md`

Whenever a repair is performed, update the project's `DESIGN.md`:
```yaml
mode: repair
preserve:
  - "Primary brand purple (#6D28D9)"
  - "Custom SVG icon system"
  - "Existing table filtering state"
direction:
  summary: "Refined typographic hierarchy and mobile responsive reflow"
  rationale: "Retained brand purple while increasing text contrast to 5.2:1 and converting multi-column grid to responsive stacked layout below 768px"
```
