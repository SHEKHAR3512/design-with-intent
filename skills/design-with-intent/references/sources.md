# Sources, adaptations, and bundle boundaries

Reviewed 2026-10-16. DWI integrates focused design workflows rather than installing every upstream package. Its CLI, theme recipes, and browser capture helper are original implementations. This bundle does not imply upstream endorsement.

## Adapted guidance distributed with the bundle

| Source | Revision reviewed | What DWI integrates |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design) | dbd4588f9e1033efb41dad4bef2f7947c8993d44 | Product-grounded art direction, concrete typography/composition, meaningful signature detail, self-critique; adapted in art-direction.md and the core workflow |
| [Composio webapp-testing](https://github.com/composio-community/awesome-codex-skills/tree/0930e1373789d2eda449039f7ac154b33031de89/webapp-testing) | 0930e1373789d2eda449039f7ac154b33031de89 | Inspect rendered state before interaction, browser evidence and test workflow; adapted in browser-testing.md. Its Python server helper is not copied |
| [Composio theme-factory](https://github.com/composio-community/awesome-codex-skills/tree/0930e1373789d2eda449039f7ac154b33031de89/theme-factory) | same revision | Theme selection and consistent application; adapted in themes.md. DWI supplies six original recipes rather than copying its preset assets |
| [Owl-Listener designer-skills](https://github.com/Owl-Listener/designer-skills/blob/9a6930cf84a822eb458624bd11c61aac5bbdf224/visual-critique/commands/critique-screen.md) | 9a6930cf84a822eb458624bd11c61aac5bbdf224 | Seven-area visual critique and prioritization; adapted in critique.md |

Anthropic and the two Composio skill directories provide Apache-2.0 licenses; the applicable text is included at [Apache-2.0.txt](../licenses/Apache-2.0.txt). Owl-Listener's MIT notice (copyright 2026 MC Dean) is included at [Owl-Listener-MIT.txt](../licenses/Owl-Listener-MIT.txt). These notices accompany project installs and the standalone skill archive. The adapted documents identify their changes. DWI's own code remains under the package MIT license; third-party terms continue to apply to adaptations.

## Reviewed resources; no source text or tooling redistributed

- [AccessLint skills](https://github.com/AccessLint/skills/tree/2e9d7336678302d0bc08848e92542560295b34d3): useful separation of automated scanning, hands-on inspection, remediation, and regression. No repository license was located during review; DWI ships its own general accessibility checklist, not AccessLint's engine, skills, or branding. Existing accessibility tooling can be used when available.
- [Excalidraw diagram skill](https://github.com/coleam00/excalidraw-diagram-skill/tree/8646fcc9f74f38539c6cdb4c969723336a96ddcd): relevant to explanatory diagrams. No repository license was located during review; the renderer, schema resources, and skill text are not redistributed. DWI's original diagrams.md routes a diagram request to available tooling and requires honest rendering limits.
- [Impeccable](https://github.com/pbakaus/impeccable/tree/6af45ac9a5eb8792f033d3242f52e99812fd91fa): an additional resource worth studying for focused design commands and browser iteration. DWI does not bundle its detector engine, CLI, or source text, nor claim those capabilities.
- [Seven design skills article](https://medium.com/@julian.oczkowski/7-claude-code-design-skills-that-follow-a-real-design-process-b871b8673d05): discovery context; not copied into instructions.
- [Composio](https://composio.dev/): integration platform, not a necessary dependency for local visual design. No account or service integration is installed.
- [shekhar3512 on npm](https://www.npmjs.com/~shekhar3512): the registry maintainer search returned this package (`design-with-intent`) during review, not another design toolkit to bundle.

## Runtime requirements and limits

Everything needed to read and apply the bundled design method is included in one install. Rendering still requires a browser provided by the agent environment or optional Playwright plus Chromium. A full accessibility engine, image generation service, font distribution service, and Excalidraw renderer are not bundled. Never report one as installed or executed because this guide mentions it.

Codex's project skill location is supported by [official repository guidance](https://developers.openai.com/blog/skills-agents-sdk): `.agents/skills/`. Cursor receives a local rule pointing to the complete skill at that same location. Global installation retains the existing Antigravity meaning: `~/.gemini/config/skills/`.
