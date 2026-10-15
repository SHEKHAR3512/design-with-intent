# Cross-Agent Compatibility & Adapters

The Design with Intent skill is built on the **Single Canonical Source** philosophy.

```
                  ┌────────────────────────────────────────┐
                  │ skills/design-with-intent/SKILL.md     │
                  │   + references/*.md                    │
                  │   + scripts/*.js                       │
                  └──────────────────┬─────────────────────┘
                                     │
           ┌──────────────┬──────────┴───┬──────────────┐
           ▼              ▼              ▼              ▼
     [Antigravity]  [Claude Code]     [Codex]        [Cursor]
      .agents/       .claude/skills/  Instructions   .cursor/rules/
```

## Principles
1. **Never fork the core instructions:** All agents reference the canonical `SKILL.md` and `references/` directory.
2. **Platform-Specific Adapters:** Each adapter explains how that specific agent host discovers, invokes, and loads the skill files.
3. **No Phantom Tools:** Adapters strictly declare which tools are available (e.g. browser subagents, Playwright runner, bash commands, or manual verification fallbacks).

## Supported Hosts
- [Antigravity IDE](./antigravity/README.md)
- [Claude Code](./claude-code/README.md)
- [OpenAI Codex / GPTs](./codex/README.md)
- [Cursor](./cursor/README.md)
