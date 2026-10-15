# Benchmark & Evaluation Methodology Notes

**Status:** Version 1.0.0 Baseline Methodology  
**Date:** October 2026  
**Authors:** SHEKHAR JAAT & DeepMind Advanced Agentic Coding

---

## 1. Objective

To objectively measure whether providing agents with the `design-with-intent` skill produces higher-quality, domain-grounded, accessible web designs while reducing repetitive user correction prompts and preserving brand invariants.

---

## 2. Benchmark Protocol

### 2.1 The Evaluation Set
The evaluation suite comprises 8 versioned briefs spanning distinct interaction paradigms:

| ID | Brief Name | Mode | Primary Test Factor |
| :---: | :--- | :---: | :--- |
| `01` | **Food Rescue Dashboard** | Create | High daylight contrast (>= 7:1), 48px touch targets, urgency states |
| `02` | **Travel Availability Calendar** | Create | Monthly capacity matrix, tabular pricing, non-blocking cancellation notice |
| `03` | **Music Discovery Queue** | Create | Drag/reorder keyboard equivalents, now-playing multi-attribute indicator |
| `04` | **Public Service Benefit Form** | Create | Multi-step persistent labels, accessible error recovery banner |
| `05` | **Cultural Biennial Site** | Create | Printcraft identity, expressive typography without accessibility regression |
| `06` | **Purple SaaS Brand Preservation** | Repair | **Mandatory preservation of purple (#6D28D9)**; surgical contrast fix |
| `07` | **Dense Admin Manifest** | Repair | Table row-to-card mobile reflow without removing any data fields |
| `08` | **Multilingual & RTL Checkout** | Create | CSS logical properties, `dir="rtl"`, 40% label expansion resilience |

### 2.2 Comparison Conditions
- **Condition A (Baseline):** Agent prompted with the brief alone using standard LLM defaults.
- **Condition B (With Skill):** Agent prompted with the brief and loaded `design-with-intent` skill (and on-demand references).

### 2.3 Evaluation Scoring
Scored using the 6-dimension rubric (`evals/rubric.md`):
- Task clarity and completion (25%)
- Product and brand fit (20%)
- Hierarchy and readability (15%)
- Responsive resilience (15%)
- Appropriate distinctiveness (15%)
- Craft and consistency (10%)

**Hard Blockers Policy:** Any hard blocker (e.g., removing the mandated purple brand color, broken primary workflow, or contrast < 3:1 on text) overrides point totals and marks the run as **FAILED**.

---

## 3. Pilot Verification Results (Fixtures)

The repository provides fully implemented fixtures for three diverse scenarios:

1. **Travel Availability Calendar (`evals/fixtures/02-travel-calendar`):**
   - Verified WCAG 2.2 AA Contrast:
     - Alpine Pine text on White: **7.68:1** (WCAG AAA Pass)
     - Alpine Granite text on White: **17.85:1** (WCAG AAA Pass)
     - Low Capacity Alert text on Amber: **6.37:1** (WCAG AA Pass)
   - Verified Target Size: 48px primary button height meets mobile touch recommendation.
   - Reflow: Verified 320px viewport layout without horizontal scroll.
2. **Purple SaaS Brand Preservation (`evals/fixtures/06-purple-brand`):**
   - Brand Invariant: **100% Preserved**.
   - Contrast: `#6D28D9` button on white canvas achieves **7.10:1** contrast.
   - Mobile: Metric cards reflow cleanly into responsive grid.
3. **Dense Administrative Table (`evals/fixtures/07-dense-admin`):**
   - Reflow Pattern: Adapts from 8-column desktop table to structured definition cards below 680px.
   - Zero Data Loss: All 8 manifest fields accessible on 320px screens.

---

## 4. Honesty & Disclosure of Telemetry

In accordance with Section 8 of the project roadmap:
- Automated contrast ratios were mathematically calculated using the standard W3C relative luminance formula.
- Viewport reflow behavior was verified through CSS Grid/Flexbox fluid media constraints and DOM bounding boxes.
- Full end-to-end user satisfaction and perceptual aesthetics require independent human reviewer panels.
