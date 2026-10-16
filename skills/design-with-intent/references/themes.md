# Theme recipes and semantic application

Adapted conceptually from Composio's theme-factory (Apache-2.0). The six DWI recipes, palettes, and layout descriptions are new; they are not copies of its ten preset themes. See sources.md.

Use ../assets/themes.json, or `dwi themes`, to inspect directions. Each includes suitable contexts, composition, typography roles, semantic colors, a signature detail, and a misuse to avoid. A theme is a starting hypothesis, not a finished design.

1. Match context and content before looking at color. If none fits, develop a custom direction.
2. Reconcile protected brand assets. Theme selection does not revoke the user's explicit constraints.
3. Translate roles into the existing theme system. For CSS: surface → --surface, text → --text-primary, muted → --text-secondary, action → --action-bg, onAction → --action-text. Accent is not a status palette.
4. Check actual text/background pairings with the contrast helper, including hover, selected, disabled, and focus states. The sample palette checks cover only documented base pairs; changing values or backgrounds requires rechecking. Avoid opacity on essential text.
5. Define status colors with labels or icons, borders, focus rings, and secondary surfaces. These depend on the application and are not all supplied by the starter recipe.
6. Choose fonts that exist or can be legitimately loaded. Type-role descriptions deliberately leave font selection to product context and language support.
7. Apply composition and hierarchy alongside tokens. A recolored starter template does not satisfy redesign mode.
8. Inspect real content and responsive states before recording the direction as verified.

For small repairs, keep the existing theme. For an audit, recommend a direction if useful without applying it. A custom palette should have named roles and the same verification as a preset.
