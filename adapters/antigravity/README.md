# Google Antigravity Host Adapter

This adapter configures `design-with-intent` for the **Google Antigravity IDE** and `agy` agentic system.

## Discovery & Installation

### Option 1: Workspace Installation (Recommended for Team Repos)
Copy the skill folder into your project's `.agents/skills/` directory:

```bash
mkdir -p .agents/skills
cp -r /path/to/design-with-intent/skills/design-with-intent .agents/skills/
```

Antigravity automatically discovers skills inside `.agents/skills/` upon workspace opening.

### Option 2: Global Installation (Machine-Wide)
To make the skill active across all projects on your machine:

```bash
mkdir -p ~/.gemini/config/skills
cp -r /path/to/design-with-intent/skills/design-with-intent ~/.gemini/config/skills/
```

## Agent Capabilities in Antigravity
- **Browser Subagent:** Antigravity agents can spawn browser subagents to take screenshots, evaluate viewports at 320px, 768px, and 1280px, and inspect rendered DOM nodes.
- **Persistent Project Memory:** Antigravity reads and writes `DESIGN.md` in the workspace root.
- **Built-in Node.js Runner:** Antigravity executes `node skills/design-with-intent/scripts/check-contrast.js` to mathematically verify WCAG 2.2 contrast before delivering code.
