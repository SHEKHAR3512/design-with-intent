# Design with Intent

> **A portable agent skill and evaluation framework that produces purposeful, distinctive design.**

[![Validation](https://img.shields.io/badge/skill-validated-emerald.svg)](./skills/design-with-intent/SKILL.md)
[![WCAG 2.2 AA](https://img.shields.io/badge/accessibility-WCAG%202.2%20AA-blue.svg)](./skills/design-with-intent/references/web.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## Overview

AI coding agents frequently generate cookie-cutter user interfaces: monochromatic palettes, generic Inter typography, rounded cards with arbitrary dropshadows, and identical hero banners. When instructed to avoid generic output, models often overcorrect by substituting another uniform stereotype—beige backgrounds with editorial serifs and orange buttons.

**Design with Intent** introduces a disciplined, portable design skill for AI agents.

### The Central Rule
> **Every major design choice needs an explicit reason connected to the product, audience, content, or medium.**
> 
> A blanket ban on purple, gradients, sans-serif fonts, or rounded cards does not solve the problem. The skill challenges unjustified defaults without prohibiting legitimate design choices.

---

## 1. Repository Architecture

The project is structured according to the open Agent Skills specification and modular evaluation design:

```
design-with-intent/
├── skills/design-with-intent/          # Portable Agent Skill Payload
│   ├── SKILL.md                        # Canonical concise skill (frontmatter + workflow)
│   ├── references/                     # On-demand progressive reference guides
│   │   ├── visual-system.md            # Typography, semantic color tokens, layout, spacing
│   │   ├── repair.md                   # Brand preservation, scoped interventions, anti-regression
│   │   ├── web.md                      # Responsive viewports, 6 UI states, WCAG 2.2 AA
│   │   ├── research.md                 # Three-reference triad, evidence labeling standard
│   │   └── design-record.md            # Canonical DESIGN.md decision record guide
│   └── scripts/                        # Deterministic tools
│       ├── check-contrast.js           # WCAG 2.2 AA relative luminance & contrast checker
│       ├── validate-skill.js           # Validates word count, links, schemas, & frontmatter
│       └── touch-target-check.js       # Evaluates target bounding dimensions (>= 24px)
├── adapters/                           # Agent host integration guides
│   ├── antigravity/                    # Google Antigravity IDE (.agents/skills)
│   ├── claude-code/                    # Claude Code (.claude/skills)
│   ├── codex/                          # OpenAI Codex / System prompt instructions
│   └── cursor/                         # Cursor Rules (.cursor/rules/)
├── schemas/                            # JSON Schemas (Draft 2020-12)
│   ├── design-record.schema.json       # Validates project DESIGN.md records
│   ├── evaluation.schema.json          # Validates benchmark evaluation runs
│   └── findings.schema.json            # Validates audit mode findings
├── evals/                              # Benchmark & Evaluation Suite
│   ├── rubric.md                       # 6-dimension weighted scoring rubric (0–4 scale)
│   ├── briefs/                         # 8 diverse, real-world benchmark tasks
│   │   ├── 01-food-rescue-dashboard.md # High daylight contrast & 48px touch targets
│   │   ├── 02-travel-calendar.md       # Mountain lodge capacity calendar & pricing
│   │   ├── 03-music-queue.md           # Accessible queue reordering & now-playing
│   │   ├── 04-public-service-form.md   # Multi-step welfare form with error recovery
│   │   ├── 05-cultural-event.md        # Printcraft typography & festival timetable
│   │   ├── 06-purple-brand-preservation.md # Mandatory purple preservation & contrast fix
│   │   ├── 07-dense-admin-mobile-repair.md # 8-column manifest table mobile card reflow
│   │   └── 08-multilingual-rtl-flow.md # Logical CSS properties & RTL bidirectional support
│   └── fixtures/                       # Interactive working demonstrations
│       ├── 02-travel-calendar/         # Functional AlpinePass reservation calendar
│       ├── 06-purple-brand/            # OmniMetrics Cloud telemetry dashboard
│       └── 07-dense-admin/             # PortOps container manifest terminal
├── tools/                              # Development & CI tooling
│   ├── runner.js                       # Comprehensive test & audit runner
│   └── package-skill.js                # Packages standalone release tarball
├── reports/                            # Benchmark notes & telemetry records
│   └── baseline-notes.md               # Methodology, verification conditions & disclosures
├── package.json                        # Development scripts
└── LICENSE                             # MIT License
```

---

## 2. The 3 Operating Modes

| Mode | Trigger Condition | Agent Behavior |
| :--- | :--- | :--- |
| **`Create`** | New product, blank slate, or ground-up redesign | Builds compact brief, compares 2–3 structurally distinct directions, defines semantic tokens, builds representative slice, verifies rendered output. |
| **`Repair`** | Existing interface feels generic, crowded, low-contrast, or unaligned | Diagnoses defect; preserves existing brand invariants (e.g. signature brand purple) and working business logic; makes the smallest coherent changes. |
| **`Audit`** | User requests critique, UX review, or accessibility check | Delivers prioritized findings with objective evidence; does not edit code unless requested. |

---

## 3. Project Memory: `DESIGN.md`

To prevent agents from losing context across conversation turns or forgetting client constraints, the skill establishes a root `DESIGN.md` decision record:

```yaml
---
schema_version: 1
product: "Product name and purpose"
audience: "Who uses it and in what environment"
primary_task: "Single observable outcome user must achieve"
mode: "create | repair | audit"
facts: []
assumptions: []
preserve: ["Mandated Brand Purple (#6D28D9)"]
direction:
  summary: "Chosen structural approach"
  rationale: "Why it suits the product domain"
token_source: "src/styles/tokens.css"
responsive_rules: []
required_states: []
references: []
rejected_options:
  - option: "Soft pastel badges"
    reason: "Failed daylight contrast legibility in bright warehouse sunlight"
verification:
  performed: []
  not_performed: []
---
```

---

## 4. Quickstart & Installation

### Google Antigravity IDE
To install into your active Antigravity workspace:
```bash
mkdir -p .agents/skills
cp -r skills/design-with-intent .agents/skills/
```

### Claude Code
```bash
mkdir -p .claude/skills
cp -r skills/design-with-intent .claude/skills/
```

### Cursor
```bash
mkdir -p .cursor/rules
cp adapters/cursor/design-with-intent.mdc .cursor/rules/
```

---

## 5. Development & Testing Commands

The repository includes deterministic testing and verification scripts:

```bash
# Run complete test and evaluation suite (26/26 tests)
npm test

# Validate SKILL.md frontmatter, links, word count, and JSON schemas
npm run validate

# Check WCAG 2.2 AA contrast ratio between two colors
npm run contrast -- "#6D28D9" "#FFFFFF"

# Package the standalone portable skill into dist/
npm run package
```

---

## 6. Interactive Fixture Showcase

The repository contains three reference implementations:

1. **Travel Availability Calendar ([evals/fixtures/02-travel-calendar/](./evals/fixtures/02-travel-calendar/))**
   - Live interactive calendar with bed capacity status, tabular night pricing, transparent cancellation advisory, and sticky mobile reservation summary.
2. **Purple SaaS Brand Preservation ([evals/fixtures/06-purple-brand/](./evals/fixtures/06-purple-brand/))**
   - Demonstrates the Repair mode workflow: deepening button tokens to `#6D28D9` to achieve **7.1:1** contrast while strictly honoring the client's purple brand identity.
3. **Dense Admin Manifest ([evals/fixtures/07-dense-admin/](./evals/fixtures/07-dense-admin/))**
   - High-density 8-column desktop logistics table that seamlessly transforms into structured definition cards on mobile viewports below 680px.

---

## 7. License

Distributed under the [MIT License](./LICENSE). Copyright (c) 2026 SHEKHAR JAAT (SHEKHAR3512).
