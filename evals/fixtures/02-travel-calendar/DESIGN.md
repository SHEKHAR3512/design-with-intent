---
schema_version: 1
product: "AlpinePass Expeditions Booking Calendar"
audience: "Backcountry hikers and mountaineering guides booking remote alpine huts on mobile and desktop"
primary_task: "Select arrival and departure dates across alpine huts, inspect capacity and pricing, and review cancellation policy"
mode: "create"

facts:
  - "[FACT] Huts have finite bed capacity (16 beds maximum per hut)"
  - "[FACT] Must clearly disclose 14-day cancellation policy before checkout"
  - "[FACT] User must be able to view pricing and availability at a glance"

assumptions:
  - "[ASSUMPTION] Users often plan trips months in advance on desktop, but check updates on mobile during travel"

preserve: []

direction:
  summary: "High-contrast alpine calendar with clear capacity badges, tabular pricing, and sticky booking summary"
  rationale: "Earthy alpine granite and pine palette grounded in the mountain environment; tabular numerals prevent layout shifts; high contrast (7:1+) ensures readability in outdoor light"

token_source: "style.css"

responsive_rules:
  - "320px–480px: Single-column monthly view with fluid touch targets (48px) and persistent bottom checkout bar"
  - "768px+: Split view featuring dual-month calendar grid and adjacent reservation summary"

required_states:
  - "Default available dates (> 5 beds)"
  - "Low capacity warning (1–4 beds remaining)"
  - "Sold out date (0 beds remaining) with disabled state"
  - "Selected stay date range with check-in/check-out markers"

references:
  - url_or_name: "Swiss Alpine Club (SAC) Hut Reservation System"
    type: "comparable_product"
    principle: "Clear bed count indicator per night with multi-day selection"
    what_not_to_copy: "Outdated table layouts with tiny click targets"
  - url_or_name: "Topographical Trail Maps & Wayfinding"
    type: "subject_domain"
    principle: "Crisp contour lines, high-contrast elevation markers, rugged stone-gray tones"
    what_not_to_copy: "Cluttered decorative textures that reduce text legibility"

rejected_options:
  - option: "Soft pastel calendar tiles"
    reason: "Low contrast failed outdoor glare readability checks"
  - option: "Dropdown date pickers"
    reason: "Hides monthly capacity patterns and prevents users from discovering open date clusters"

verification:
  performed:
    - "Calculated WCAG 2.2 AA contrast: 8.4:1 on primary body text, 4.8:1 on capacity badges"
    - "Verified 320px mobile reflow without horizontal scrolling"
    - "Keyboard navigation: Tab index traversal with visible 2px focus rings"
  not_performed:
    - "Live payment gateway sandbox integration (fixture is prototype-level)"
  outstanding:
    - "Weather alert overlay integration for winter seasons"
---

# AlpinePass Decision Log
- **Typography:** Outfit / Inter system stack with tabular numbers for pricing (`$145/night`) and bed counts.
- **Palette:** Deep Granite Slate (`#0f172a`), Alpine Pine (`#065f46`), Amber Low-Capacity Alert (`#b45309`), Crisp Snow (`#ffffff`).
