# Changelog

All notable changes to the `design-with-intent` package are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-10-16

### Added
- **Redesign-First Workflow (`--mode redesign`)**: Dedicated mode and evaluation rubric allowing coding agents to make bold, purposeful visual improvements to generic AI-generated sites while strictly preserving application business logic, flows, and explicit brand assets.
- **6 Built-in Theme Recipes**: Field Notes, Clean Operations, Cultural Heritage, Warm Editorial/Gallery, Modern Industrial, and Public Service with verified WCAG 2.2 AA normal-text contrast pairs.
- **`themes` CLI Command**: Inspect all starting theme recipes (`npx design-with-intent themes`) or inspect an individual recipe (`npx design-with-intent themes field-notes`).
- **Responsive Browser Capture Helper (`dwi capture`)**: Multi-viewport Playwright-based screenshot helper capturing 320px, 768px, and 1280px views along with automated diagnostics for console errors, horizontal page overflow, and touch-target sizing.
- **12 Deep Reference Modules**: Fully modularized reference library covering art direction, design critique, accessibility boundaries, visual systems, responsive behavior, diagrams, research, themes, and design records.
- **Universal Multi-Agent Auto-Detection**: Instant zero-config installation into `.claude`, `.cursor` (rule + full skill), `.agents`, or `~/.gemini/config/`.
- **Modular CLI Architecture**: Core logic separated into `lib/install.js` and `lib/workflow.js` with non-interactive safe execution, piped input support, and symlink destination protection.
- **Atomic File Backups**: Installed file updates and brief replacements automatically create adjacent `.backup-*` copies.
- **22 Unit & Integration Tests**: Comprehensive automated test coverage (`tests/cli.test.js`, `tests/package.test.js`) testing offline installation, piped wizard execution, contrast checking, and safe cancellation.

### Changed
- Refactored `README.md` to remove internal directory architecture dump and highlight practical workflows, the 4 operating modes, theme recipes, and multi-agent setup.
- Enhanced package description and keywords on npm.
- Updated `tools/release.js` with structured release notes for v1.1.0.

---

## [1.0.2] - 2026-10-15

### Added
- Interactive CLI setup wizard (`npx design-with-intent`).
- Automated GitHub release and npm package synchronization pipeline.
- Interactive contrast and touch target dimension checking CLI commands.

---

## [1.0.1] - 2026-10-15

### Fixed
- Fixed binary paths and execution permissions in `package.json`.

---

## [1.0.0] - 2026-10-15

### Added
- Initial public release of `design-with-intent` on npm.
- Portable agent skill supporting Claude Code, Cursor, Codex, and Antigravity.
- `DESIGN.md` schema and template for long-term project memory.
- Evaluation rubric and benchmark briefs.
