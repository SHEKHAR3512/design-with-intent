# Art direction for a substantial visual change

This guide adapts selected ideas from Anthropic frontend-design (Apache-2.0); see sources.md and ../licenses/Apache-2.0.txt. DWI changes: explicit redesign scope, a before/after change contract, and constraint-aware acceptance.

## Begin with content, not a component kit

Name the product's most characteristic content. For a hiking reservation service it might be terrain, lodge availability, and a daily itinerary. For a logistics console it is a shipment's location, deadline, and exception state. Let that content determine the first visual impression.

Compare directions using a compact matrix:

| Decision | Direction A | Direction B |
| --- | --- | --- |
| First impression | Dominant product artifact | Dominant task workspace |
| Composition | Image or map alongside narrative | Dense list with contextual detail pane |
| Type | Expressive display, quiet controls | Compact headings, strong numeric alignment |
| Rhythm | Alternating detail and spacious imagery | Repeated rows with meaningful grouping |
| Signature | Annotated artifact | Timeline of actionable events |
| Tradeoff | More atmosphere, fewer simultaneous records | Faster scanning, less storytelling |

These are examples of axes, not mandatory layouts. Choose based on the task. Do not add a marketing hero to a working administration console just to make it dramatic.

## A change contract

Before implementation, connect observed problems to actual visual changes:

- Repeated equal-weight cards → a dominant booking workspace and subordinate trip summary.
- Similar heading/body sizes → a clear display, section, body, and metadata scale.
- One accent scattered everywhere → separate action, information, and status roles.
- Generic icon tiles → a route elevation strip using real trip data.

Record explicit exceptions: a mandated purple stays; a required navigation structure stays. The surrounding hierarchy and composition can still change substantially. For an identity-free AI prototype, do not infer brand mandates from its existing default colors.

## Make type and imagery do real work

Define actual font stacks, fallback metrics, line heights, weights, and line lengths. A named style such as “premium” is not a specification. Use available project fonts first; when adding one, check licensing, language coverage, loading policy, and fallback layout. Two families are usually enough; variation in size and weight can do more than adding a third.

Use an image, illustration, diagram, or data display because it tells the product story. Give it intentional cropping and scale. Preserve attribution and do not scrape private or copyrighted assets into a project without rights. A layout that depends on unavailable photography needs an alternate treatment, not a blank rectangle presented as finished.

## Diagnose defaults without inventing bans

Look for unjustified repeated patterns: every section is a three-card grid, headings say nothing concrete, icon tiles decorate every feature, backgrounds carry empty glows, statistics are invented, or everything has the same radius and shadow. Change the information structure that causes sameness. Do not mechanically remove every card or use an editorial serif for every industry.

Inspect a full-page screenshot and the first viewport separately. A strong opening can hide monotonous lower sections. Evaluate mobile as its own composition: reading order, image crop, primary action, and density should still express the direction.
