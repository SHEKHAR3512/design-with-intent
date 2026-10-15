# Cursor Host Adapter

This adapter provides rules for **Cursor** editor (`.cursorrules` or `.cursor/rules/`).

## Installation

### In Modern Cursor (0.40+)
Copy `design-with-intent.mdc` into your project's `.cursor/rules/` directory:

```bash
mkdir -p .cursor/rules
cp adapters/cursor/design-with-intent.mdc .cursor/rules/
```

### In Legacy Cursor (.cursorrules)
Append the contents of `design-with-intent.mdc` to your root `.cursorrules` file.
