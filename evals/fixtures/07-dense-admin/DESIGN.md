---
schema_version: 1
product: "PortOps Freight & Customs Terminal Manifest"
audience: "Dock logistics managers and customs audit inspectors"
primary_task: "Inspect container holds, review origin/vessel documentation, and release cleared freight"
mode: "repair"

facts:
  - "[FACT] Manifest table has 8 dense data columns"
  - "[FACT] Inspectors cannot afford missing or truncated metadata fields"
  - "[FACT] Desktop table is already optimized for 1440px wide screens"

assumptions:
  - "[ASSUMPTION] Dock inspectors frequently switch between desktop office terminals and handheld mobile phones"

preserve:
  - "All 8 data columns and container status badges"
  - "Sorting and status filtration logic"

direction:
  summary: "Responsive card-transform pattern on screens < 640px while maintaining dense tabular matrix on desktop"
  rationale: "Prevents two-dimensional horizontal scrolling on mobile by restructuring table rows into paired key-value inspection cards on narrow viewports"

token_source: "style.css"

responsive_rules:
  - "320px–639px: Table rows transform into structured inspection cards with full metadata"
  - "640px+: High-density 8-column data grid"

required_states:
  - "Cleared status (Green check)"
  - "Customs Hold status (Amber badge with hold code)"
  - "Inspection Required status (Red flag)"

references:
  - url_or_name: "Maritime Container Logistics Standards"
    type: "subject_domain"
    principle: "ISO container serial IDs in prominent monospaced type"
    what_not_to_copy: "Unreadable 8-point matrix printouts"

rejected_options:
  - option: "Hiding columns on mobile"
    reason: "Dock inspectors need all customs hold reasons and origin ports to authorize gate passes"

verification:
  performed:
    - "Verified reflow at 320px: complete key-value cards with 44px touch buttons"
    - "Verified desktop 1280px: high information density preserved"
  not_performed:
    - "Barcode scanner hardware trigger integration"
  outstanding:
    - "Batch export to PDF"
---

# PortOps Repair Log
- Preserved desktop 8-column density for office monitors.
- Implemented responsive CSS data-attribute card transformation below 640px.
- Achieved 100% data field availability on mobile without horizontal clipping.
