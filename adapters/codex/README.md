# OpenAI Codex & Custom GPTs Adapter

This adapter provides instructions for injecting `design-with-intent` into OpenAI Codex or Custom GPT system instructions.

## System Prompt Injection
For LLMs without filesystem skill discovery:
1. Paste the content of `skills/design-with-intent/SKILL.md` into the agent's custom instructions or system prompt.
2. If working on a specific task (e.g. Repair or Web Accessibility), append the corresponding reference file (`references/repair.md` or `references/web.md`).

## Honest Verification Rule
Because standard OpenAI API completions cannot independently run local headless browsers without external tool calling, the agent must output:
> *"Code generated conforming to WCAG 2.2 AA contrast and responsive CSS Grid rules. Browser inspection was not run locally; please verify in browser viewports."*
