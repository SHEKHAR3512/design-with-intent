---
name: design-with-intent
description: Create, improve, or audit web and app designs using product context, deliberate visual choices, responsive behavior, and rendered verification. Use for generic AI output, visual redesigns, hierarchy and typography problems, or inconsistent interfaces. Preserve established brands and working behavior during targeted repairs.
---

# Design with Intent

A disciplined design method for software agents. Produces purposeful, distinctive interfaces by anchoring every design decision in the product's identity, primary task, and user context.

> **The Central Rule:** Every major design choice needs an explicit reason connected to the product, audience, content, or medium.
> 
> A blanket ban on purple, gradients, sans-serifs, rounded cards, or dark backgrounds does not produce good design—it simply substitutes a new uniform stereotype (e.g. beige backgrounds with editorial serifs and orange accents). Challenge unjustified defaults; never prohibit legitimate design choices.

---

## 1. Operating Workflow

### Step A — Route the Request

Identify the intent and select the appropriate mode before touching files:

| Mode | Trigger Condition | Expected Agent Behavior |
| :--- | :--- | :--- |
| **Create** | New product, blank slate, new feature page, or explicit ground-up redesign | Establish brief, compare 2–3 directions, define visual system, implement representative flow, verify rendered result |
| **Repair** | Existing product feels generic, crowded, low-contrast, broken, or misaligned | Inspect current artifacts; make the smallest coherent changes that solve the defect; preserve established tokens and functionality |
| **Audit** | User requests critique, UX review, accessibility evaluation, or design tear-down | Produce prioritized findings with objective evidence; do not edit code unless explicitly asked |

*Precedence rule:* A narrow request (such as fixing a mobile navigation bar or updating button contrast) must never trigger an unrequested rebrand. User instructions and existing project constraints take precedence over the skill's default flow.

---

### Step B — Build a Compact Design Brief

Read existing brand assets, tokens, stylesheets, and component code first. If `DESIGN.md` exists, load it. Record:

1. **Product & Purpose:** What does this software do?
2. **Audience & Context:** Who uses it, under what emotional state or environment?
3. **Primary Task:** What single observable outcome must the user accomplish first?
4. **Medium & Viewing Conditions:** Screen sizes, input devices (touch/mouse/keyboard), lighting, and accessibility needs.
5. **Preserved Identity:** Colors, logos, tokens, and established user habits that must survive.
6. **Real Content & Assets:** Actual data structures, field lengths, and available media.
7. **Improvement Metric:** How will we know the design is better?

*Evidence labeling:* Label every entry as `[FACT]` (user/repo provided), `[OBSERVATION]` (derived from code/artifacts), or `[ASSUMPTION]` (agent premise). Ask clarifying questions only if a missing detail would fundamentally alter the architecture.

See [references/research.md](./references/research.md) and [references/design-record.md](./references/design-record.md).

---

### Step C — Gather Targeted References (When Needed)

For new identities or unfamiliar domains, inspect a focused triad of references:
- **1 Comparable Product:** For task patterns and mental models.
- **1 Adjacent Field:** For layout composition or spatial density inspiration.
- **1 Domain Reference:** From the subject's physical or cultural world (tools, instruments, signage, editorial publications).

*Rule of honesty:* Disclose tool limits. If browser inspection or image search is unavailable, rely on supplied assets and known design principles. Never invent visual inspection findings.

---

### Step D — Select a Direction Before Implementing

For new interfaces (`Create` mode), articulate 2 or 3 distinct directions before coding. Directions must differ in **information hierarchy, task structure, or density**—not merely in accent colors.

*Example (Travel Calendar):*
- *Direction A (Availability-first):* High-density monthly matrix highlighting open slots and price deltas.
- *Direction B (Itinerary-first):* Chronological stream emphasizing journey milestones and cancellation conditions.

Select the direction that maximizes task efficiency and product fit. For `Repair` mode, bypass direction selection and solve strictly within the existing system.

---

### Step E — Define the Visual System

Commit to concrete visual decisions before writing layout code:

- **Typography:** Purposeful type roles (Display, Headings, Body, Monospace/Data). Set max measure (45–75 characters per line). Test real text lengths, numerals, and fallbacks.
- **Color Roles:** Define semantic tokens: Surface, Text, Interactive/Action, Status (Success, Warning, Critical, Neutral). Every foreground-background pair must meet WCAG 2.2 AA contrast (4.5:1 for standard text, 3:1 for large text). Status must never be conveyed by color alone.
- **Spatial Rhythm:** Consistent 4px or 8px baseline scale. Relate spatial grouping to cognitive relationships (Gestalt proximity).
- **Component Geometry:** Explicit interactive states (default, hover, focus-visible, active, disabled). Touch targets must meet WCAG 2.2 AA target size (minimum 24×24 CSS px, ideally 40–48px for primary actions).
- **Motion:** Explain state changes with 150–250ms transitions. Always respect `@media (prefers-reduced-motion: reduce)`.
- **Copy:** Specific, truthful, contextual labels. Never fabricate fake testimonials, fake ratings, or misleading social proof.

See [references/visual-system.md](./references/visual-system.md).

---

### Step F — Build One Representative Slice First

Implement the most critical, revealing slice of the interface first (e.g., the primary booking calendar, the data filtering table, the order submission form).

- Use realistic data lengths, edge-case characters, and responsive breakpoints.
- Reuse existing components, classes, and build tools. Never introduce extraneous libraries or rewrite state logic solely to apply a visual theme.
- Support essential states: Default, Loading/Skeleton, Empty, Error, and Success.

---

### Step G — Verify and Repair

Verify the implementation using available rendering tools or browser viewports:

1. **Reflow & Viewports:** Verify at 320px (mobile reflow without horizontal scroll), 768px (tablet), and 1280px+ (desktop).
2. **Accessibility Checklist:**
   - Text contrast >= 4.5:1 (normal) or >= 3:1 (large text >= 24px or bold >= 18.5px).
   - Target size >= 24×24 CSS px.
   - Visible, high-contrast keyboard focus indicators (`:focus-visible`).
   - Screen-reader accessible labels on icon-only buttons.
3. **Budget:** Perform up to two critique/repair passes to address the highest-severity defects first.
4. **Honest Reporting:** If visual inspection tools are unavailable, clearly mark the output as code-level verified and specify which manual checks remain.

See [references/web.md](./references/web.md) and [references/repair.md](./references/repair.md).

---

## 2. Diagnostic Quality Checks

Ask these 7 diagnostic questions before declaring a design complete:

1. **Substitution Test:** If you swapped the logo and brand name with an unrelated competitor, would the layout look identical? If yes, infuse specific domain utility.
2. **Hierarchy Test:** Does the screen clearly guide the eye to the single most important action or metric within 3 seconds?
3. **Justification Test:** Can you articulate a product-grounded reason for every decorative element, badge, and card border?
4. **Structure Test:** Are disparate pieces of information forced into identical rounded cards, or does the layout reflect varied data semantics?
5. **Content Authenticity:** Are headers descriptive and truthful, or filled with vague AI marketing fluff ("Supercharge your workflow")?
6. **State Completeness:** How does the interface look when empty? When loading? When a network error occurs?
7. **Continuity Test:** Does this change harmonize with the existing codebase and brand identity?

---

## 3. Project Memory: `DESIGN.md`

In multi-step projects, persist design decisions in a root `DESIGN.md` file using the structured frontmatter schema. This prevents circular debates and keeps team members aligned.

When a user rejects a proposal, record the exact reason in `rejected_options` with project context. Do not convert one project's constraint into a global rule for other projects.

See [references/design-record.md](./references/design-record.md).

---

## 4. Reference Map

When deeper guidance is needed, load the specialized reference file:

- **Visual System & Tokens:** [references/visual-system.md](./references/visual-system.md)
- **Repairing & Preserving Brands:** [references/repair.md](./references/repair.md)
- **Web Layout, Accessibility & States:** [references/web.md](./references/web.md)
- **Research, Evidence & Attribution:** [references/research.md](./references/research.md)
- **Project Decision Records:** [references/design-record.md](./references/design-record.md)

---

## 5. Completion Rules

Before completing a design task, ensure:
- [ ] Mode was properly identified (`Create`, `Repair`, or `Audit`).
- [ ] In `Repair` mode, existing brand colors and functional behavior were preserved.
- [ ] Typography and color choices have stated rationale and verified contrast.
- [ ] Viewport reflow down to 320px width has been addressed without unneeded horizontal scroll.
- [ ] Keyboard focus states and touch target sizes are verified.
- [ ] No fake testimonials, fabricated statistics, or decorative distractions were added.
- [ ] Verification limits are truthfully reported if rendering or browsing was unavailable.
