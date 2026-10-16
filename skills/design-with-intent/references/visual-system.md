# Reference: Visual System & Semantic Tokens

This guide defines the principles and concrete specifications for establishing a coherent visual system tailored to the product's domain.

---

## 1. Typography: Hierarchy and Structure

Typography is the backbone of interface comprehension. It conveys voice, establishes reading order, and determines cognitive load.

### 1.1 Role-Based Type Scale
Map text to semantic roles. The values below are starting examples for application UI, not a universal scale or a maximum display size. Choose a scale that expresses the product direction and survives real content and mobile reflow:

| Role | Typical Size | Line Height | Weight | Intended Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 36px – 56px | 1.1 – 1.2 | 700 / Bold | Hero headers, primary product statistics |
| **Title / H1** | 28px – 32px | 1.25 | 600 / SemiBold | Primary view titles, major section dividers |
| **H2 / Section** | 20px – 24px | 1.3 | 600 / SemiBold | Card groups, major component headings |
| **H3 / Subsection**| 16px – 18px | 1.35 | 600 / Medium | Card titles, modal titles, table headers |
| **Body** | 15px – 16px | 1.5 – 1.6 | 400 / Regular | Core reading text, descriptions, explanations |
| **Body Small** | 13px – 14px | 1.45 | 400 / Regular | Helper text, secondary descriptions, metadata |
| **Caption / Badge**| 11px – 12px | 1.3 | 500 / Medium | Timestamps, tags, uppercase tracking labels |
| **Data / Numeric** | 14px – 16px | 1.2 | 500 / Tabular | Financial records, timestamps, metrics |

### 1.2 Measure and Rhythm
- **Optimal Reading Measure:** Limit long-form text containers to 45–75 characters (approx. 560px–680px or `max-width: 65ch`). Wide blocks of text induce reading fatigue and saccadic eye tracking errors.
- **Tabular Numerals:** For financial data, timers, and aligned counters, always specify `font-variant-numeric: tabular-nums` or use monospaced glyphs to prevent layout jitter during data updates.
- **System Fallbacks:** Ensure robust system font fallbacks to prevent flash of invisible text (FOIT) and layout shift (CLS):
  ```css
  /* Clean Humanist Stack */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  
  /* Precision Monospace Stack */
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  ```

---

## 2. Color Architecture: Semantic Roles & Contrast

Color must communicate function, hierarchy, and system status—not merely decorate surfaces.

### 2.1 The Semantic Color Model
Define your design tokens using semantic roles rather than literal color names:

- **Surfaces (`--surface-*`):**
  - `--surface-base`: The background canvas.
  - `--surface-raised`: Elevated cards, sheets, or panels.
  - `--surface-overlay`: Modals, dropdown menus, popovers.
  - `--surface-sunken`: Form inputs, table header tracks, code blocks.
- **Text & Content (`--text-*`):**
  - `--text-primary`: Primary headings, body copy, active inputs (Contrast >= 7:1 against base).
  - `--text-secondary`: Supporting labels, metadata, icons (Contrast >= 4.5:1).
  - `--text-muted`: Supporting text and placeholders (normally >= 4.5:1). Inactive controls have contrast exceptions; do not apply those exceptions to useful helper text.
  - `--text-inverse`: Text on primary colored buttons or dark tooltips.
- **Interactive Actions (`--action-*`):**
  - `--action-primary`: The primary call-to-action button or link.
  - `--action-primary-hover`: Interactive hover state.
  - `--action-subtle`: Ghost or secondary buttons with subtle hover backgrounds.
  - `--action-focus-ring`: Dedicated high-visibility focus indicator outline.
- **Status & Feedback (`--status-*`):**
  - `--status-success`: Confirmation, completed states, positive trends.
  - `--status-warning`: Pending attention, capacity alerts, non-blocking cautions.
  - `--status-critical`: Errors, destructive operations, system failures.
  - `--status-info`: Neutral system advisories, hints.

### 2.2 Contrast & Multi-Attribute Feedback
- **WCAG 2.2 AA Baseline:**
  - Standard text (< 18pt / 24px regular, < 14pt / 18.67px bold): **Minimum 4.5:1** contrast ratio against its background.
  - Large text (>= 24px regular or >= 18.67px bold): **Minimum 3:1** contrast ratio.
  - Visual information necessary to identify UI components and meaningful graphical objects: **Minimum 3:1** against adjacent colors. Not every decorative border is required to meet that threshold.
- **Non-Color Indicators (WCAG 1.4.1):**
  Never communicate critical status through color alone. Always pair status colors with:
  1. A recognizable SVG icon (e.g., checkmark, warning triangle, exclamation circle).
  2. A textual status label (e.g., "Active", "Cancelled", "Requires Action").
  3. Shape or border distinction.

---

## 3. Layout, Density & Spatial Hierarchy

### 3.1 Information Density Tiers
Select the density tier that fits the user's operational context:

- **Compact Density:** Data grids, developer tools, financial dashboards. Padding: 6px–10px; row heights: 32px–40px; smaller typography (13px–14px). Emphasizes data throughput.
- **Balanced Density:** Standard web applications, account management, form flows. Padding: 12px–20px; row heights: 48px–56px; typography: 15px–16px. Balances readability and speed.
- **Spacious Density:** Onboarding flows, marketing landing pages, consumer reading experiences. Padding: 24px–48px; large typography (18px–24px). Prioritizes calm comprehension.

### 3.2 Spacing Scale & Gestalt Proximity
Use an 8-point base spacing scale (with a 4px half-step for micro-elements):
- `4px` (xxs): Badge padding, icon-text gap.
- `8px` (xs): Button internal padding, input helper text gap.
- `12px` (sm): Form label to input field gap.
- `16px` (md): Standard card internal padding, item gap in lists.
- `24px` (lg): Distance between distinct form field groups or cards.
- `32px` (xl): Section header to content spacing.
- `48px`–`64px` (xxl): Major page section breaks.

*Law of Proximity:* The spacing between related elements (e.g., label and input) must always be significantly smaller than the spacing between unrelated element groups (e.g., between two different form sections).

---

## 4. Components & Interactive States

Every interactive element must provide continuous sensory feedback:

### 4.1 State Matrix
1. **Default:** Stable, clear affordance indicating clickability or input readiness.
2. **Hover:** Subtle brightness, shadow elevation, or background shift indicating readiness.
3. **Focus-Visible:** Unobscured, high-contrast focus indicator (e.g., `outline: 2px solid var(--action-focus-ring); outline-offset: 2px;`) for keyboard navigation. Never suppress `:focus` outlines without replacing them with `:focus-visible` styling!
4. **Active / Pressed:** Physical depression feedback (e.g., `transform: scale(0.98)` or deeper background tint).
5. **Disabled:** Use native `disabled` where appropriate. `aria-disabled="true"` communicates state but does not prevent activation; custom controls must also suppress activation. Keep explanatory text readable and available without hover. Do not prescribe opacity that makes necessary information illegible.

### 4.2 Target Sizes (WCAG 2.2 AA 2.5.8)
- All interactive targets must have a minimum bounding size of **24×24 CSS pixels**, or sufficient spacing so that a 24px diameter circle centered on the target does not intersect adjacent targets.
- Primary touch targets on mobile viewports should target **44×44 CSS pixels** to prevent touch errors.

---

## 5. Motion and Animation

Motion must serve a clear cognitive purpose: orienting the user, showing continuity, or confirming an action.

- **Duration:** 150ms to 250ms for micro-interactions (dropdowns, button states, tooltips); 300ms for large page transitions.
- **Easing:** Use purposeful cubic beziers (e.g., `cubic-bezier(0.16, 1, 0.3, 1)` for snappy, natural entrances).
- **Reduced Motion:** Always include media query safeguards:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 6. Content Design & Copy Craft

- **Action-Oriented Verbs:** Buttons should explicitly name the result of clicking (e.g., "Export CSV", "Confirm Booking", "Save Changes") rather than vague labels ("Submit", "OK", "Next").
- **Error Messages with Clear Recovery:** Never state just "Invalid input". Specify what is wrong and how to fix it (e.g., "Departure date cannot be after return date. Please select an earlier date.").
- **Authenticity Rule:** Do not insert fictitious client logos ("Trusted by Google, Apple, NASA"), fake 5-star review ratings, or fabricated user counts to make an empty screen look populated. Use clear empty-state illustrations and instructional prompts instead.
