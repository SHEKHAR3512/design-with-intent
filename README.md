# 🎯 Design with Intent

[![npm version](https://img.shields.io/npm/v/design-with-intent.svg?color=059669&style=flat-square)](https://www.npmjs.com/package/design-with-intent)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.3.0-brightgreen.svg?style=flat-square)](https://nodejs.org)
[![Agents](https://img.shields.io/badge/agents-Claude%20%7C%20Cursor%20%7C%20Codex%20%7C%20Antigravity-7c3aed.svg?style=flat-square)](#supported-agents)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0%20runtime-success.svg?style=flat-square)](#library-api)

> **The production design engine and portable skill for AI coding agents.**  
> Stop settling for **AI Slop**—cookie-cutter purple gradients, unreadable contrast, and interchangeable cards. Design with Intent gives **Claude Code**, **Cursor**, **Codex**, and **Google Antigravity** intentional art direction, starting theme recipes, long-term design memory, and WCAG 2.2 AA accessibility guardrails.

**The CLI prepares your brief and agent instructions. Your coding agent implements the website changes.** Installing a skill alone does not redesign a site or guarantee good visual results.

---

## 🚀 What's New in v1.1.0

This release introduces major workflows, theme recipes, and automated tooling to elevate AI-generated interfaces:

- 🎨 **Redesign-First Workflow (`--mode redesign`)**: A dedicated mode empowering agents to replace generic template layouts with purposeful, domain-specific designs while strictly safeguarding working business logic, form validation, and explicit brand assets.
- 🌈 **6 Built-in Theme Recipes (`dwi themes`)**: Complete starting directions (Field Notes, Clean Operations, Cultural Heritage, Warm Editorial, Modern Industrial, Public Service) with verified WCAG 2.2 AA normal-text contrast pairs.
- 📸 **Responsive Browser Capture & Verification (`dwi capture`)**: Optional Playwright-powered multi-viewport screenshot helper (320px mobile, 768px tablet, 1280px desktop) with automated console error, horizontal overflow, and touch-target diagnostics.
- 📚 **12 Deep Reference Guides**: Expanded modular references covering art direction, design critique, accessibility boundaries, visual systems, responsive behavior, diagrams, and research.
- 🤖 **Universal Multi-Agent Auto-Detection**: Instant zero-config installation into `.claude`, `.cursor` (rule + full skill), `.agents`, or `~/.gemini/config/`.
- 🛡️ **Modular Architecture & Safety**: Refactored core modules (`lib/install.js`, `lib/workflow.js`) with safe non-interactive defaults, piped input support, symlink traversal protection, and automatic file backups (`.backup-*`).
- 🧪 **22 New Integration & Offline Package Tests**: Guarantees deterministic behavior, offline npm artifact installation, and isolated execution outside the repository tree.

---

## ⚡ Quickstart in 30 Seconds

From **your website or web application project folder**, run:

```sh
npx design-with-intent
```

*(Or use the installed alias `dwi`)*

The interactive wizard guides you through five quick steps:

1. **Agent Selection**: Auto-detects Claude Code, Cursor, Codex, or Antigravity (or install for all).
2. **Operating Mode**: Choose **redesign** (existing site), **create** (from scratch), **repair** (fix bug), or **audit** (review).
3. **Product Context**: Clarify your audience, primary user flow, target screen, and what must stay preserved.
4. **Visual Direction**: Select one of 6 starting theme recipes or define a custom direction with reference URLs.
5. **Launch**: Review what will be written, then paste **`DWI-PROMPT.md`** into your AI coding agent.

The wizard writes `DWI-BRIEF.md` and `DWI-PROMPT.md`. Existing `DESIGN.md` and existing skill files are preserved.

---

## 🎯 The 4 Operating Modes

Design with Intent structures agent work into four distinct operational modes:

### 1. 🎨 Redesign Mode (`--mode redesign`)
Use when an existing website works, but looks generic, cluttered, or amateurish. The agent inspects the page, challenges incidental template styling, and produces a substantial visual transformation while keeping core functionality intact.

```sh
npx design-with-intent brief --mode redesign --product "Trail Booking" --theme field-notes
```

> **Example Agent Prompt:**  
> *"Use design-with-intent in redesign mode on our booking page. It's currently a generic hero and card grid. Put trip availability and a route overview at the center of the composition. Preserve the logo, booking flow, prices, and form validation. Reconsider the other colors, typography, and spacing. Show matching before/after screenshots and verify mobile booking."*

### 2. 🚀 Create Mode (`--mode create`)
Use when building a new product or feature from scratch. The agent formulates 2–3 structurally distinct visual directions rooted in a **Reference Triad** (1 direct peer, 1 adjacent domain, 1 real-world physical artifact) before writing code.

```sh
npx design-with-intent brief --mode create --product "Warehouse Logistics" --theme clean-operations
```

### 3. 🛡️ Repair Mode (`--mode repair`)
Use to fix a specific layout, contrast, or responsiveness defect without altering established brand identity or un-targeted styles.

```sh
npx design-with-intent brief --mode repair --product "Customer Portal" --problems "Mobile checkout button clips off-screen"
```

> **Example Agent Prompt:**  
> *"Use design-with-intent in repair mode to fix the checkout's mobile overflow. Preserve our purple brand (#6D28D9), existing typography, and validation. Verify keyboard submission and the error state."*

### 4. 🔍 Audit Mode (`--mode audit`)
Use for a thorough heuristic critique and accessibility review. The agent provides evidence-based findings with remediation steps without editing application code.

```sh
npx design-with-intent prompt audit
```

---

## 🎨 6 Built-in Theme Recipes

Explore production-grade starting directions with typography pairings and WCAG AA verified color palettes:

```sh
# View all theme recipes:
npx design-with-intent themes

# Inspect a specific recipe:
npx design-with-intent themes field-notes
```

| Theme ID | Aesthetic Character | Typography | Key Palette | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **`field-notes`** | Tactical, earthy, research-grade | Editorial Serif + Mono | `#1E3A2B` on `#FAF8F5` | Field research, conservation, documentation |
| **`clean-operations`** | High-density telemetry & utility | Technical Sans + Mono | `#0F172A` on `#F8FAFC` | Dashboards, logistics, developer tools |
| **`cultural-heritage`** | Warm editorial, archival, artisanal | Classical Serif + Humanist Sans | `#2C1810` on `#FDFCFA` | Arts, cultural events, culinary, archives |
| **`warm-editorial`** | Gallery exhibition, luxury publishing | Refined Serif + Minimal Sans | `#1A1A1A` on `#F5F2EB` | Portfolios, magazines, high-end commerce |
| **`modern-industrial`** | High-contrast, structured precision | Grotesque Sans + Tech Mono | `#18181B` on `#FAFAFA` | Manufacturing, transport, hard-tech |
| **`public-service`** | Hyper-accessible, calm, utilitarian | High-legibility Sans | `#0B2545` on `#FFFFFF` | Civic forms, healthcare, public institutions |

Themes are starting points—not rigid templates. Adapt them to real content and explicit brand constraints.

---

## 💻 CLI Command Reference

All commands run via `npx design-with-intent <command>` or `dwi <command>`:

| Command | Arguments / Options | Description |
| :--- | :--- | :--- |
| `wizard` / `setup` | *None* | Launch the interactive guided setup wizard |
| `install` | `[target]` (`claude`, `cursor`, `codex`, `antigravity`, `all`, `auto`) | Install skill into agent directories (default: `auto`) |
| `brief` | `--mode`, `--product`, `--audience`, `--task`, `--scope`, `--problems`, `--preserve`, `--theme`, `--force` | Generate `DWI-BRIEF.md` and `DWI-PROMPT.md` without prompts |
| `prompt` | `[mode]` (`redesign`, `create`, `repair`, `audit`) | Print a reusable prompt template to stdout |
| `themes` | `[theme-id]` | Browse all 6 starting recipes or display one in detail |
| `doctor` | *None* | Inspect workspace health, installed skills, and Playwright status |
| `guide` | *None* | Print guidance on how to activate and prompt the installed skill |
| `record` | *None* | Initialize a canonical `DESIGN.md` decision record |
| `capture` | `--url <url>`, `--out <dir>`, `--wait-for <selector>` | Multi-viewport responsive screenshot & diagnostic capture |
| `contrast` | `<foreground-hex> <background-hex>` | Check WCAG 2.2 AA contrast ratio (exit code 2 on fail) |
| `target-size` | `<width> <height>` | Check dimensions against 24px minimum & 44px mobile standards |
| `validate` | *None* | Validate skill structure, reference links, and JSON schemas |

No API keys, accounts, or telemetry required.

---

## 🤖 Supported Agents

Design with Intent is portable and works across all major AI coding agents:

| Agent Target | Installation Destination | Notes |
| :--- | :--- | :--- |
| **Cursor** | `.agents/skills/design-with-intent/` + `.cursor/rules/design-with-intent.mdc` | Includes rule routing and full modular references |
| **Claude Code** | `.claude/skills/design-with-intent/` | Auto-discovered by Claude Code skill loader |
| **OpenAI Codex** | `.agents/skills/design-with-intent/` | Follows OpenAI Skills SDK standard |
| **Antigravity** | `.agents/skills/design-with-intent/` (project) or `~/.gemini/config/skills/` (global) | Project-local or global multi-agent workspace |
| **Auto** | Auto-detects existing `.claude`, `.cursor`, `.agents`, or `.codex` folders | Falls back safely to `.agents/skills/` |

---

## 📸 Browser Evidence & Visual Verification

Use your agent's browser tools or DWI's built-in Playwright capture helper:

```sh
# 1. Install Playwright if not already in your project:
npm install -D playwright
npx playwright install chromium

# 2. Start your local dev server, then capture the baseline:
npx design-with-intent capture --url http://localhost:5173 --out ./screenshots/before --wait-for main

# 3. After the redesign, capture the updated screens:
npx design-with-intent capture --url http://localhost:5173 --out ./screenshots/after --wait-for main
```

**What capture produces:**
- PNG screenshots at **320px** (mobile), **768px** (tablet), and **1280px** (desktop).
- `report.json` with console errors, page horizontal overflow detection, and small touch-target candidates.

---

## 🧠 Project Memory: `DESIGN.md`

AI chat sessions lose context. Design with Intent uses a structured **`DESIGN.md`** decision record validated by JSON Schema (`schemas/design-record.schema.json`) to persist invariants:

```yaml
---
# DESIGN.md - Design Decision Record
product: "AlpinePass Trail Booking"
mode: "redesign"
date: "2026-10-16"
facts:
  - "Core booking flow requires date picker, guest count, and stripe checkout"
  - "Mobile viewports represent 68% of trail reservation traffic"
preserve:
  - "Mandated Brand Green (#1E3A2B) and logo mark"
  - "Existing checkout API payloads and form validation rules"
rejected_options:
  - option: "Sticky bottom CTA with 5 buttons"
    why: "Failed 44px mobile touch target spacing; caused viewport clipping"
token_source: "src/styles/tokens.css"
---
```

---

## 📦 Library API

For programmatic tools, integrations, and build scripts (Node.js 18.3+, zero dependencies):

```js
import {
  getSkillPath,
  getSkillContent,
  getReference,
  getSchema,
  getDesignRecordTemplate,
  calculateContrast,
  checkTargetSize,
} from 'design-with-intent';

// Access skill content & references
const skillPath = getSkillPath();
const artDirectionGuide = getReference('art-direction');
const designSchema = getSchema('design-record');

// Generate decision record template
const template = getDesignRecordTemplate({ product: 'Trail Booking', mode: 'redesign' });

// Mathematical accessibility checks
const contrast = calculateContrast('#1E3A2B', '#FAF8F5');
console.log(`Contrast ratio: ${contrast.ratio}:1 (Passes AA: ${contrast.passesAA})`);

const touchCheck = checkTargetSize(48, 48);
console.log(`Meets mobile standards: ${touchCheck.meetsMobile}`);
```

---

## 🧪 Development & Testing

```sh
# Run comprehensive test suite (22 unit/integration + 26 evaluation checks)
npm test

# Validate SKILL.md frontmatter, links, word count, and JSON schemas
npm run validate

# Package the portable standalone archive
npm run package

# Verify packed npm tarball contents
npm pack --dry-run
```

---

## 📄 License & Attribution

- **Design with Intent** is licensed under the [MIT License](./LICENSE). Copyright (c) 2026 SHEKHAR JAAT (SHEKHAR3512).
- Selected guidance adapted from [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [Composio](https://github.com/composio-community/awesome-codex-skills), and [Owl-Listener](https://github.com/Owl-Listener/designer-skills). Applicable attribution notices are preserved in [`skills/design-with-intent/licenses/`](skills/design-with-intent/licenses/) and documented in [`sources.md`](skills/design-with-intent/references/sources.md).
