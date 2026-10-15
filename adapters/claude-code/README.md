# Claude Code Host Adapter

This adapter configures `design-with-intent` for use with Anthropic's **Claude Code** CLI tool.

## Installation
Claude Code natively supports agent skills adhering to the Agent Skills specification.

Install into your project repository or global Claude config:

```bash
# In your project root
mkdir -p .claude/skills
cp -r /path/to/design-with-intent/skills/design-with-intent .claude/skills/
```

## Invocation
When interacting with Claude Code:
```bash
claude "Review the mobile layout of src/components/OrderTable.tsx using the design-with-intent repair mode"
```

Claude Code will progressively load `SKILL.md` and load reference files (`references/repair.md`, `references/web.md`) on demand.
