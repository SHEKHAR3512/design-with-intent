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

## What's new in v1.2.0

- **A guided terminal design studio:** five stages, useful defaults, a review screen, and actionable next steps.
- **A richer brief:** design personality, available content, visual habits to avoid, and motion preference accompany your product goals.
- **Premium craft and purposeful motion:** focused adaptations of [Emil Kowalski's skills](https://github.com/emilkowalski/skills), with attribution and the upstream MIT notice included.
- **Seven visual directions:** the new **Precision** recipe emphasizes product detail, careful typography, and restraint without copying Apple branding.
- **Three motion profiles:** restrained, expressive, and minimal. Export optional CSS tokens with `dwi motion restrained`.
- **Install welcome:** a non-blocking hint points users to the setup wizard. No API key or runtime dependencies are required.

---

## ⚡ Quickstart in 30 Seconds

From **your website or web application project folder**, run:

```sh
npx design-with-intent
```

*(Or use the installed alias `dwi`)*

The interactive wizard guides you through five quick steps:

1. **Connect**: Choose Claude Code, Cursor, Codex, or Antigravity (or install for all).
2. **Product**: Choose redesign, create, repair, or audit. Describe the audience, main task, scope, and protected features.
3. **Direction**: Choose one of seven starting recipes or Custom, then describe personality, available assets, and what to avoid.
4. **Motion**: Choose Restrained, Expressive, or Minimal; review the interaction and reduced-motion requirements.
5. **Review and build**: Confirm the brief, then paste **`DWI-PROMPT.md`** into your coding agent. Review its implementation at desktop and mobile sizes.

The wizard writes `DWI-BRIEF.md` and `DWI-PROMPT.md`. Existing `DESIGN.md` and existing skill files are preserved.

### Install once, then open the studio

Run these commands in **your website project**, not inside this package's source:

```sh
npm install -D design-with-intent --foreground-scripts
npx design-with-intent setup
```

npm may hide lifecycle output or disable install scripts. Installation never waits for answers or writes a brief inside node_modules. The second command reliably opens the questionnaire; running `npx design-with-intent` in an interactive terminal opens it too. Enter a menu number, press Enter to accept a default, or enter `q` to cancel. `NO_COLOR=1` disables terminal color. CI stays non-interactive.

After setup:

1. Read `DWI-BRIEF.md`; edit anything that does not describe your product.
2. Open `DWI-PROMPT.md` and paste it into your coding agent in the same project.
3. Ask the agent to implement the main flow using the installed skill and brief.
4. Review matching desktop/mobile views, actual content, keyboard focus, touch, and reduced motion. Ask for specific corrections.
5. Keep the chosen design decisions and verification evidence in `DESIGN.md`.

For an existing installation, `npx design-with-intent@latest install codex --force` updates the skill with backups (replace `codex` with your target). Existing briefs are preserved; edit them or use `brief --force` for backed-up replacement.

### Choose deliberate motion

```sh
npx design-with-intent brief --product "Studio camera" --theme precision --personality "Calm, precise, confident" --motion restrained --assets "Product photography" --avoid "Decorative counters"
npx design-with-intent motion restrained
```

The second command prints CSS custom properties. Save them to a new CSS file and import it explicitly if useful. Profiles are starting points, not an animation runtime: your agent implements component behavior, interruption, focus, and reduced-motion alternatives. Minimal removes movement timing; Expressive permits more visible occasional storytelling. No profile delays important user actions.

```text
DESIGN WITH INTENT
Design studio / purposeful interfaces

[1/5] Connect your coding agent
[2/5] Understand the product
[3/5] Choose a visual direction
[4/5] Give motion a purpose
[5/5] Review your design brief
```

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
npx design-with-intent brief --mode create --product "Warehouse Logistics" --theme signal-desk
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

## 🎨 7 Built-in Theme Recipes

Explore production-grade starting directions with typography pairings and WCAG AA verified color palettes:

```sh
# View all theme recipes:
npx design-with-intent themes

# Inspect a specific recipe:
npx design-with-intent themes field-notes
```

| Theme ID | Best for | Base text / surface |
| --- | --- | --- |
| `field-notes` | Field research, outdoor services, environmental observations | `#203328` / `#F4F7EF` |
| `signal-desk` | Operational consoles, telemetry, developer tools | `#EDF3FC` / `#101A29` |
| `culture-poster` | Festivals, exhibitions, music, cultural programs | `#382126` / `#FFF4E8` |
| `workshop` | Manufacturing, logistics, professional equipment | `#222B31` / `#F0F2F3` |
| `gallery` | Architecture, photography, portfolios, visual catalogs | `#25272B` / `#FAFAF8` |
| `public-service` | Applications, appointments, education, essential services | `#152D47` / `#F4F8FC` |
| `precision` | Premium products, focused software, and considered product storytelling | `#1D1D1F` / `#FAFAFC` |

Themes are starting points—not rigid templates. Adapt them to real content and explicit brand constraints.

---

## 💻 CLI Command Reference

All commands run via `npx design-with-intent <command>` or `dwi <command>`:

| Command | Arguments / Options | Description |
| :--- | :--- | :--- |
| `wizard` / `setup` | *None* | Launch the interactive guided setup wizard |
| `install` | `[target]` (`claude`, `cursor`, `codex`, `antigravity`, `all`, `auto`) | Install skill into agent directories (default: `auto`) |
| `brief` | `--mode`, `--product`, `--audience`, `--task`, `--scope`, `--problems`, `--preserve`, `--references`, `--theme`, `--personality`, `--assets`, `--avoid`, `--motion`, `--force` | Generate `DWI-BRIEF.md` and `DWI-PROMPT.md` without prompts |
| `prompt` | `[mode]` (`redesign`, `create`, `repair`, `audit`) | Print a reusable prompt template to stdout |
| `themes` | `[theme-id]` | Browse all 7 starting recipes or display one in detail |
| `motion` | `[restrained\|expressive\|minimal]` | Print optional CSS motion tokens to stdout |
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
console.log(`Meets mobile standards: ${touchCheck.mobileRecommended}`);
```

---

## 🧪 Development & Testing

```sh
# Run comprehensive test suite (27 unit/integration + 26 evaluation checks)
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
- Selected guidance adapted from [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [Composio](https://github.com/composio-community/awesome-codex-skills), [Emil Kowalski](https://github.com/emilkowalski/skills), and [Owl-Listener](https://github.com/Owl-Listener/designer-skills). Applicable attribution notices are preserved in [`skills/design-with-intent/licenses/`](skills/design-with-intent/licenses/) and documented in [`sources.md`](skills/design-with-intent/references/sources.md).
