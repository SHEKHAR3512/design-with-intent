# 🎯 Design with Intent: The Antidote to "AI Slop" in UI/UX Design

> **The ultimate guide, product story, and promotional video kit for `design-with-intent`.**  
> This is promotional material, not verification evidence. The CLI prepares instructions; the coding agent implements the design. Neither the skill nor helper tests guarantee visual quality or accessibility conformance. See [README.md](./README.md) for the current workflow.
>
> *Use this document to understand the product, craft high-converting pitch decks, and generate promotional videos showing how this package solves the biggest crisis in AI-assisted software development.*

---

## 🎬 90-Second Promotional Video Script & Storyboard

*Copy and paste this section directly into your AI video generator (e.g. Descript, Runway, InVideo, Synthesia, or human voiceover).*

| Time | Visual Scene (On Screen) | Voiceover Narration |
| :--- | :--- | :--- |
| **0:00 - 0:12** | **The Hook:** Split screen of 10 different AI-generated SaaS landing pages. They all look identical: dark purple gradients, Inter font, generic white rounded cards with blurry drop shadows. A big red stamp appears: **"AI SLOP."** | *"Have you noticed that every AI coding tool designs the exact same app? The same purple gradients. The same cookie-cutter cards. The same generic Inter typography. It's called 'AI Slop'—and it's killing distinct software design."* |
| **0:12 - 0:24** | **The Overcorrection Trap:** User types into an AI chat: *"Don't make it look like AI."* The AI responds by swinging to another tired stereotype: boring beige backgrounds, oversized editorial serifs, and orange buttons. | *"When you tell an AI 'Don't make it look like AI', it overcorrects into another cliché: beige backgrounds, pretentious serifs, and unreadable contrast. Banning purple doesn't make a design good. Purpose makes a design good."* |
| **0:24 - 0:40** | **The Solution:** A sleek terminal opens. The command `npx design-with-intent` is typed. A guided terminal wizard collects the audience, redesign scope, protected assets, and visual direction, then provides a prompt to paste into the coding agent. | *"Meet **Design with Intent**. A portable agent skill and design framework for Google Antigravity, Claude Code, Cursor, and Codex that forces AI coding agents to design with deliberate purpose."* |
| **0:40 - 0:58** | **The 4 Operating Modes:** Split animation showcasing:<br>• **Redesign:** A substantial before/after change to an existing generic site.<br>• **Create:** Agent comparing 2 distinct visual directions.<br>• **Repair:** Fixing an 8-column table into mobile cards while preserving client brand tokens.<br>• **Audit:** Checking WCAG 2.2 AA contrast with green checkmarks. | *"Instead of guessing, your agent operates in 4 distinct modes: **Redesign** transforms generic existing screens. **Create** builds intentional visual systems from scratch. **Repair** fixes messy layouts while strictly protecting your established brand identity. And **Audit** catches accessibility defects before you ship."* |
| **0:58 - 1:12** | **Persistent Project Memory (`DESIGN.md`):** A clean `DESIGN.md` file appears. Visual arrows show the agent reading brand invariants, token files, and rejected options so it never forgets context across chats. | *"Best of all: it gives your agent long-term memory. With a standardized `DESIGN.md` decision record, your AI never forgets your brand tokens, mobile rules, or user constraints—even across weeks of new chat sessions."* |
| **1:12 - 1:30** | **The Call to Action:** Fast-paced terminal montage: `dwi contrast`, `dwi target-size`. Badges for Antigravity, Claude Code, Cursor, and npm appear. Final title card: **Design with Intent — Zero Slop. Pure Purpose.** | *"No more cookie-cutter apps. No more broken contrast. Just intentional, accessible, production-ready design.<br><br>Run `npx design-with-intent` in your terminal today. Available on npm and GitHub."* |

---

## 💥 The 5 Biggest Problems in AI Design (And How We Solve Them)

### Problem 1: The "Cookie-Cutter AI Aesthetic" (AI Slop)
* **The Symptom:** LLMs gravitate toward high-frequency training data defaults. By default, coding agents generate dark purple hero banners, generic Inter fonts, identical rounded card grids, and arbitrary decorative drop shadows that have no relationship to the product domain.
* **How `design-with-intent` solves it:**
  - Enforces the **Central Rule**: *Every major visual decision must have an explicit reason connected to the product, audience, content, or medium.*
  - Rather than rushing to write CSS, the agent enters **Create or Redesign Mode** to evaluate **2 to 3 structurally distinct visual directions** rooted in a *Reference Triad* (1 direct competitor, 1 adjacent field, 1 domain artifact from the real world).

---

### Problem 2: The "Overcorrection Trap"
* **The Symptom:** When users prompt *"Make it not look like an AI designed it"*, agents often employ crude negative constraints (e.g. banning purple or rounded cards). The result is a new, equally uniform stereotype: muted beige backgrounds, editorial serif headings, and orange accent buttons.
* **How `design-with-intent` solves it:**
  - Bans **unjustified defaults**, not legitimate colors or styles.
  - If a medical SaaS legitimately needs calm teals, or an industrial logistics terminal needs high-density monospace tables, the skill grounds the choice in user context rather than stylistic superstitions.

---

### Problem 3: "Amnesia & Brand Destruction" during Refactors
* **The Symptom:** You ask an AI to fix a button or refactor a layout on an existing client project. The AI accidentally redesigns the entire application, breaking the client's signature brand colors, custom font hierarchy, and working business logic.
* **How `design-with-intent` solves it:**
  - Enforces **Repair Mode**: Operates under strict brand preservation invariants.
  - Protects defined brand tokens (e.g. Mandated Brand Purple `#6D28D9`).
  - Limits interventions to the smallest coherent scope necessary to solve the defect (e.g., deepening a button token to pass contrast without changing the brand hue).

---

### Problem 4: The Accessibility & Real-World Reality Gap
* **The Symptom:** AI creates pretty mockups that fail in the real world:
  - Text contrast is unreadable under warehouse sunlight or mobile glare.
  - Touch targets are tiny 16px desktop links impossible to tap on smartphones.
  - Missing interactive states (no focus rings, no loading states, no empty error states).
* **How `design-with-intent` solves it:**
  - Enforces **WCAG 2.2 AA Compliance** as an immovable standard:
    - Text contrast $\ge 4.5:1$ (Normal) and $\ge 3.0:1$ (Large & UI borders).
    - Touch targets $\ge 24\times24\text{px}$ minimum and $\ge 44\times44\text{px}$ for mobile primary viewports.
    - Requires all **6 Core Interactive States**: *Default, Hover, Focus-Visible, Active/Pressed, Loading, and Empty/Error*.

---

### Problem 5: AI Chat Ephemeral Context Loss
* **The Symptom:** AI models have no memory between chat sessions. When you start a new conversation tomorrow, the agent forgets what was already decided, suggesting previously rejected ideas and destroying consistency.
* **How `design-with-intent` solves it:**
  - Generates and maintains a root **`DESIGN.md`** decision record.
  - Formatted with strict JSON Schema validation ([`schemas/design-record.schema.json`](./schemas/design-record.schema.json)).
  - Records:
    - `facts`: Verified constraints from the codebase.
    - `preserve`: Brand invariants that must survive future turns.
    - `rejected_options`: Ideas that were tested and discarded (and why!).
    - `token_source`: The single source of truth for CSS variables.

---

## ⚡ What You Get: The Complete Feature Suite

```
                       ┌────────────────────────────────────────┐
                       │          design-with-intent            │
                       └───────────────────┬────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
 ┌───────────────┐                 ┌───────────────┐                 ┌───────────────┐
 │ Portable Skill│                 │  Interactive  │                 │ Mathematical  │
 │  for AI Agents│                 │Terminal Wizard│                 │Design Tooling │
 └───────┬───────┘                 └───────┬───────┘                 └───────┬───────┘
         │                                 │                                 │
  • Antigravity IDE                 • npx wizard setup                • WCAG 2.2 contrast
  • Claude Code                     • Project setup check                • Touch target check
  • Cursor Rules                    • Brief + agent prompt              • Schema validator
  • OpenAI Codex                    • Prompt cheat sheets             • CLI + helper tests
```

1. **Zero-Dependency Architecture:** Pure Node.js (>= 18.3.0). No bulky dependencies to download. Runs with `npx`; optional browser capture requires Playwright and a browser.
2. **Interactive Terminal Wizard (`dwi` / `npx design-with-intent`):**
   - Guided agent configuration.
   - Interactive color-pair contrast check.
   - Mobile touch target size analyzer.
   - Project setup check that reports installed files and tooling, without claiming to measure design quality.
3. **Multi-Agent Adaptability:**
   - Installs seamlessly into `.agents/skills/` (Antigravity), `.claude/skills/` (Claude Code), or `.cursor/rules/` (Cursor).
4. **Automated CI/CD & GitHub Release Sync:**
   - Ready-to-go GitHub Actions that build release packages, upload `.tgz` artifacts, and publish to npm automatically.

---

## 🚀 Quick Launch Cheat Sheet

### 1. Launch the Interactive Wizard
```bash
npx design-with-intent
```

### 2. Fast Non-Interactive Commands
```bash
# Install skill for Google Antigravity IDE:
npx design-with-intent install antigravity

# Install for Claude Code or Cursor:
npx design-with-intent install claude
npx design-with-intent install cursor

# Scaffold a project decision record:
npx design-with-intent record

# Check WCAG 2.2 AA color contrast:
npx design-with-intent contrast "#6D28D9" "#FFFFFF"

# Check mobile button touch target:
npx design-with-intent target-size 48 48
```

### 3. Golden Prompts to give your AI Agent:
* **Redesign Mode (Generic existing site):**
  > *"Use design-with-intent in redesign mode. Read DWI-BRIEF.md, compare two directions, and implement a substantial change to composition, typography, and color roles where allowed. Preserve working behavior and explicit brand constraints. Compare matching before/after screenshots."*
* **Create Mode (New feature):**
  > *"Act using the design-with-intent skill in Create mode. Inspect DESIGN.md and propose 2 distinct visual directions for our product before writing code. Use semantic CSS variables and verify WCAG 2.2 AA contrast."*
* **Repair Mode (Fixing existing UI):**
  > *"Use design-with-intent in Repair mode to fix the mobile layout of our checkout form. Strictly preserve our existing brand purple tokens (#6D28D9) and existing logic. Reflow the columns for mobile viewports below 680px."*
* **Audit Mode (Accessibility & Design Review):**
  > *"Run an Audit using design-with-intent on our landing page. Check touch target dimensions (>= 24px) and color contrast on all buttons and form states. Provide objective evidence without editing code."*

---

## 🏆 Summary: Why Every AI Developer Needs This

| Without `design-with-intent` | With `design-with-intent` |
| :--- | :--- |
| Generic, disposable "AI Slop" look | Purposeful, distinctive product identity |
| Random contrast failures and inaccessible UIs | Color-pair checks plus a browser and accessibility review workflow |
| AI forgets decisions every new chat session | Persistent project memory in `DESIGN.md` |
| AI rebrands and ruins existing client themes | Strict brand preservation invariants |
| Hours wasted tweaking prompts | One-command setup (`npx design-with-intent`) |
