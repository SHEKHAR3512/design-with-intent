# Agent adapters

Use `npx design-with-intent` in the website project for guided setup, or `install <target>` for installation only.

- `codex` and `antigravity`: `.agents/skills/design-with-intent/`
- `claude`: `.claude/skills/design-with-intent/`
- `cursor`: the full `.agents/skills/` payload and a `.cursor/rules/` entrypoint
- `all`: all project locations
- `global`: the Antigravity user profile at `~/.gemini/config/skills/`

All targets receive the same references, themes, scripts, and source notices. Existing files are kept unless `--force` is given; changed files are backed up on forced updates. After setup, paste the generated `DWI-PROMPT.md` into your coding agent.
