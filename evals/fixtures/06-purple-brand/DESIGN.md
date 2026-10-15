---
schema_version: 1
product: "OmniMetrics Cloud Telemetry Dashboard"
audience: "DevOps and Site Reliability Engineers monitoring distributed Kubernetes clusters"
primary_task: "Monitor real-time error spikes, inspect active cluster latency, and scale replica nodes"
mode: "repair"

facts:
  - "[FACT] Client brand color is firmly Purple (#6D28D9 / #7C3AED)"
  - "[FACT] Replacing purple with green or blue is an explicit failure"
  - "[FACT] White text on previous lavender badge had only 2.4:1 contrast"

assumptions:
  - "[ASSUMPTION] Monitoring screens run both in dark IDEs and high-contrast web dashboards"

preserve:
  - "Primary brand purple (#6D28D9)"
  - "Cluster health status calculation logic"
  - "Node replica stepper component"

direction:
  summary: "Preserved purple brand identity while elevating text contrast to 7.1:1 and fixing mobile grid reflow"
  rationale: "Deepened button and active tab purple shades to #6D28D9 to exceed WCAG 2.2 AA (7.1:1), tightened typographic hierarchy, and made metric cards responsive down to 320px"

token_source: "style.css"

responsive_rules:
  - "320px–640px: Metrics collapse from 4-column desktop to 2-column mobile cards"
  - "641px+: Multi-column telemetry overview with sticky filter navigation"

required_states:
  - "Healthy cluster status (Normal latency < 45ms)"
  - "Warning threshold (Latency > 120ms)"
  - "Critical alert banner (Node failover in progress)"

references:
  - url_or_name: "Prometheus & Grafana Alert Systems"
    type: "comparable_product"
    principle: "High information density with clear status badges and micro-charts"
    what_not_to_copy: "Unstyled default browser tables without focus states"

rejected_options:
  - option: "Replace purple with neutral slate"
    reason: "Explicitly rejected because purple is the client's registered trademark identity"

verification:
  performed:
    - "Calculated WCAG 2.2 AA contrast: #6D28D9 on #FFFFFF is 7.1:1 (PASS)"
    - "Tested reflow at 320px width: zero horizontal clipping"
  not_performed:
    - "WebSocket live streaming stress testing"
  outstanding:
    - "Dark mode variant tokenization"
---

# OmniMetrics Repair Log
- Preserved signature purple hue family (`hsl(262, 83%, 58%)`).
- Adjusted lightness from 70% to 50% for button surfaces to achieve 7.1:1 contrast ratio.
- Re-architected dashboard metric tiles to prevent text truncation on narrow mobile screens.
