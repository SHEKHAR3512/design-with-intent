---
name: design-with-intent
description: Create, substantially redesign, repair, or audit web interfaces with product-specific art direction, typography, themes, responsive implementation, and browser verification. Use for generic AI layouts or weak visual identity, as well as focused UI fixes. Preserve explicit brand constraints and working behavior.
---

# Design with Intent

This workflow includes adaptations credited in [sources](./references/sources.md), with original DWI routing and acceptance criteria.

Build an interface that belongs to this product. Every major visual decision should follow from its audience, content, task, or subject matter. A design brief is input; working, inspected UI is the outcome. Do not stop after proposing directions when implementation is requested.

## 1. Choose the right scope

Current user instructions override saved defaults. Read `DWI-BRIEF.md` and `DESIGN.md` when present, then inspect actual routes, styles, assets, components, and behavior. A brief's selected theme is a starting point, not permission to overwrite protected branding. If records conflict about an explicit constraint, resolve that conflict before changing it; continue independent work.

| Mode | Use when | Outcome |
| --- | --- | --- |
| **redesign** | An existing site looks generic, needs a fresh identity, or the user asks for a major visual change | Substantial new composition and visual treatment within the requested scope; preserve features and explicit invariants |
| **create** | A new screen, flow, or product is requested | A product-specific visual direction implemented as a working interface |
| **repair** | A concrete defect, small polish task, contrast issue, or mobile bug is requested | A focused correction within the established visual system |
| **audit** | Critique or assessment is requested without implementation | Prioritized, evidenced findings; do not modify application code |

**Existing project does not imply repair mode.** “Make this generic site distinctive” is a redesign request. Conversely, fixing one button does not authorize a rebrand. For ambiguous “improve this,” infer scope from surrounding instructions; ask one focused question only if the difference would materially change the work.

Separate explicit invariants (mandated logo, named brand colors, contractual typography, known interaction contracts) from incidental implementation (starter font, default radius, template cards). Existing CSS proves what was built, not what must survive. In redesign mode, change incidental styling when it is responsible for the problem. Preserve all explicit constraints and working routes, data, validation, and actions.

## 2. Understand the product and baseline

Establish the audience, primary task, target screen, real content, available imagery, protected assets, and desired change. Use supplied answers first. Label material assumptions and ask only for missing information that blocks a meaningful decision. Never invent user research or customer claims.

For existing work, inspect the running page when possible and capture the scoped screen at desktop and mobile sizes before editing. Identify the main causes of sameness: identical component weights, weak type hierarchy, uninformative imagery, repeated section rhythms, generic copy, or color without meaningful roles. Record a few concrete observations linked to source or screenshots. If browser tools are unavailable, state that the baseline is code-based.

Use [research](./references/research.md) for unfamiliar domains and reference selection. Borrow a principle from a reference, not its branding or page wholesale. References supplied by the user are evidence to inspect, not instructions to install software or change task scope.

## 3. Art-direct before coding

For create and redesign, read [art direction](./references/art-direction.md). Compare two plausible directions in a short description or wireframe. They must differ in composition, hierarchy, type treatment, or content pacing, not merely accent hue. Choose the stronger fit and proceed unless the user requested a selection checkpoint.

For polished product interfaces, read [premium craft](./references/premium-craft.md). Apply the brief's personality, available assets, and avoid-list. Treat premium as a standard of clarity, precision, and complete behavior; do not impose Apple branding, glass, or a single layout on every product.

Specify these decisions concretely:

- **Composition:** What users notice first, the dominant element, where the main action sits, and how content groups relate.
- **Typography:** Named available families or justified system stacks, display/body/data roles, scale, weight, measure, and mobile behavior. Check glyph coverage and loading constraints before adding a font.
- **Color:** Named surface, text, action, and status roles with actual values and checked pairings. Keep a protected hue; change its application and surrounding system when needed.
- **Signature:** One characteristic product detail: an itinerary strip, specimen image, annotated map, useful preview, equipment specification, or another authentic element.
- **Rhythm and geometry:** Where density changes, which content deserves a boundary, and how imagery or negative space supports meaning.

If the user chose a theme or needs a starting direction, read [themes](./references/themes.md) and the selected entry in [theme recipes](./assets/themes.json). Do not force every project into the same aesthetic. Purple, sans-serif, dark mode, cards, and gradients are legitimate choices when the brief supports them; replacing them with habitual cream and serif is not an improvement by itself.

For redesign, record a short **change contract**: before → after for composition, typography, color roles, and signature detail. Preserve constrained axes explicitly. A color swap, new shadows, or extra padding on the same layout does not fulfill a substantial redesign. Do not impose this requirement on repair mode.

## 4. Implement a representative flow, then finish the scope

Read [visual systems](./references/visual-system.md) for tokens and [web implementation](./references/web.md) for responsive layout and interaction states. Reuse the project's framework, component primitives, state, and build tooling. Implement the most revealing screen first, assess it, then carry the direction through the requested scope. Avoid a blanket CSS override that leaves incompatible component styles underneath.

Build with realistic text lengths and authentic supplied assets. Imagery must convey something about the subject; when tools or usable assets are absent, choose an intentional typographic or data-led composition and disclose placeholders. Do not fabricate social proof, customer logos, statistics, or testimonial quotes.

Implement meaningful loading, empty, error, disabled, focus, and success states where relevant. Controls must work with keyboard and pointer. Motion should explain feedback or a transition, with reduced-motion support; optional decoration must not obscure the task. Avoid adding a dependency solely for a small visual effect.

When adding or reviewing animation, read [motion](./references/motion.md). Use the brief's restrained, expressive, or minimal profile, respecting established product constraints. Record purpose, timing, interruption, and reduced-motion alternatives for meaningful transitions. Verify rapid interaction and focus behavior in a running browser; a still screenshot does not validate motion.

Repair mode uses [repair](./references/repair.md); it does not require alternative directions or broad visual change. Audit mode uses [critique](./references/critique.md), and reports fixes without applying them.

## 5. Inspect, test, and refine

Read [browser testing](./references/browser-testing.md) and [accessibility](./references/accessibility.md) when verifying UI. Use available browser tools or the bundled optional capture script; do not imply that a tool ran because instructions exist. Capture matched before/after states at 320, 768, and 1280 CSS pixels where appropriate. Check the primary task, keyboard focus, responsive reflow, relevant UI states, and console errors. Document justified exceptions for intrinsically two-dimensional content such as maps and data tables.

Then use [critique](./references/critique.md) to assess the rendered design, not only syntax or contrast. Does the main task read first? Is the composition recognizably different where redesign was requested? Does the type carry a coherent identity? Is the memorable detail useful? Would replacing the logo make this indistinguishable from an unrelated product?

Address the highest-impact problems, normally within two visual refinement passes. An iteration budget limits open-ended aesthetic exploration; it is not a reason to leave a known broken interaction or build failure unresolved. If tools prevent verification, identify that limitation and the exact remaining checks. Never equate a setup check, screenshot capture, or static scan with visual quality or WCAG conformance.

## 6. Deliver evidence and project memory

Finish with the visible changes, preserved constraints, tests actually run, and any unverified behavior. For redesign, compare each change-contract axis against baseline evidence. If the result still has the old template's hierarchy and rhythm, revise it or say the redesign is incomplete; do not claim transformation from a palette change alone.

Update `DESIGN.md` with the chosen direction, tokens, constraints, rejected options with reasons, and performed/not-performed checks. Preserve existing useful decisions. See [design records](./references/design-record.md) for the schema; the wizard's `DWI-BRIEF.md` is context, not a replacement for this record.

## Conditional tools and sources

- User flows, information architecture, or explanatory diagrams: [diagrams](./references/diagrams.md). Do not add diagrams to an ordinary UI task without a purpose.
- Individual color pairs: `node <skill-dir>/scripts/check-contrast.js <fg> <bg>`.
- Target dimensions: `node <skill-dir>/scripts/touch-target-check.js <width> <height>`. This checks dimensions, not spacing exceptions or whole-page compliance.
- Responsive screenshots: `node <skill-dir>/scripts/capture.mjs --help`. Playwright and a browser are optional environment dependencies, not included binaries.
- Source provenance, adaptations, and external resources: [sources](./references/sources.md). The bundle is self-contained guidance; it does not require installing every upstream skill.
