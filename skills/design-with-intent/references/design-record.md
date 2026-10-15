# Reference: Project Decision Record (`DESIGN.md`)

This guide specifies how to create, maintain, and update `DESIGN.md` as the persistent memory for all design decisions within a project.

---

## 1. Why Persist Design Memory?

In multi-turn agent interactions or team collaboration:
- Agents frequently forget constraints discussed 5 turns ago.
- When asked to "fix padding", an agent might re-generate the entire page with completely different colors and typography.
- Users waste time repeatedly correcting the same aesthetic choices.

`DESIGN.md` acts as a single, unambiguous source of design truth committed directly into the repository.

---

## 2. Canonical `DESIGN.md` Template

When authorized to write project documentation, create or update `DESIGN.md` in the project root:

```yaml
---
schema_version: 1
product: "OpenRescue Dispatch"
audience: "Volunteer food rescue coordinators working in noisy, time-sensitive warehouse environments on tablets and phones"
primary_task: "Identify donations expiring within 2 hours and assign active drivers with a single tap"
mode: "create" # create | repair | audit

facts:
  - "[FACT] Must operate offline-first with local storage"
  - "[FACT] Primary action button must be accessible while wearing work gloves"

assumptions:
  - "[ASSUMPTION] Users primarily hold the device in portrait orientation on mobile"

preserve:
  - "Existing driver status icons and geolocation API endpoints"

direction:
  summary: "High-contrast triage dispatch board with countdown priority badges"
  rationale: "High ambient light in loading bays requires 7:1+ contrast; time-to-spoilage is the primary sorting dimension"

token_source: "src/styles/tokens.css"

responsive_rules:
  - "320px–480px: Single-column priority queue with 48px touch targets"
  - "768px+: Split view with live map on right, active dispatch queue on left"

required_states:
  - "Default active dispatch queue"
  - "Loading skeleton during route recalculation"
  - "Empty state: 'All donations dispatched for this shift' with report export"
  - "Error state: Network disconnected banner with offline queuing active"

references:
  - url_or_name: "Transit dispatch monitors"
    type: "adjacent_field"
    principle: "High-visibility countdown timers with urgent color borders"
    what_not_to_copy: "Excessive dense terminal text without spacing"

rejected_options:
  - option: "Soft pastel badges for expiration times"
    reason: "Low contrast in bright warehouse sunlight failed visual legibility tests"

verification:
  performed:
    - "Calculated color contrast: 8.2:1 text-on-surface, 5.4:1 badge-on-surface"
    - "Verified mobile reflow at 320px width without horizontal scrollbar"
  not_performed:
    - "Physical device touch testing with industrial gloves (requires manual hardware test)"
  outstanding:
    - "Confirm driver GPS ping refresh rate with backend team"
---

# Design Decisions & Architecture Notes

## Typographic Hierarchy
- **Primary Headers:** Inter Display 28px/1.2 SemiBold for instant scanning.
- **Urgency Counters:** Monospace Tabular Numerals 20px Bold for zero layout shift during countdown ticks.

## Status Palette & Affordance
- Critical (< 1 hour): Deep Amber `#B45309` on `#FEF3C7` with clock SVG icon.
- Urgent (1–2 hours): Ochre `#D97706` with warning icon.
- Stable (> 2 hours): Slate `#475569` with calendar icon.
*Note: Status is conveyed through icon, label, and border, never color alone.*
```

---

## 3. Maintenance Rules

1. **Update, Don't Duplicate:** If `DESIGN.md` already exists, update its fields. Never create `DESIGN-v2.md` or competing documents.
2. **Record Rejected Options Honestly:** When the user says *"Don't use cards here"* or *"I dislike this font"*, add it to `rejected_options` with the context. This prevents the agent (or future subagents) from proposing the exact same rejected choice in subsequent turns.
3. **Keep It Compact:** Do not dump thousand-line CSS files into `DESIGN.md`. Reference the token file (e.g., `token_source: "src/styles/theme.css"`) and summarize decisions.
