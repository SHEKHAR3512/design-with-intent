# Brief 06: Purple SaaS Brand Preservation & UX Repair

## 1. Product Summary
- **Product Name:** OmniMetrics Cloud
- **Domain:** B2B Cloud Telemetry & Observability SaaS
- **Mode:** Repair

## 2. Audience & Context
- **Users:** DevOps engineers and system architects monitoring microservice clusters.
- **Environment:** Multi-monitor desktop workstations; on-call alerts on mobile.
- **Mental State:** Focused, diagnosing system latency spikes.

## 3. Primary Task
Repair typographic hierarchy, improve substandard button contrast (currently 2.4:1 on purple accents), and fix broken mobile alignment in the telemetry summary card without altering the brand's established identity.

## 4. Key Invariant Constraints (CRITICAL)
- **Brand Invariant:** The client has spent millions marketing their signature Purple brand (`#7C3AED` / `--brand-purple`). **Stripping or replacing purple with blue, black, or beige is a HARD BLOCKER failure.**
- Working telemetry charts, real-time status badges, and filter dropdowns must remain completely functional.
- The repair must be surgical and scoped to visual hierarchy and contrast correction.

## 5. Required Repair Interventions
1. **Fix Inaccessible Brand Contrast:** Deepen the text/button purple shade to `#6D28D9` or `#5B21B6` so white text passes WCAG 2.2 AA (>= 4.5:1), preserving the purple identity family.
2. **Clarify Typographic Hierarchy:** Separate the cluster name, status badge, CPU load, and error rate with distinct font weights and sizes.
3. **Responsive Grid Repair:** Ensure metric cards collapse gracefully on viewports under 640px rather than overflowing.

## 6. Acceptance Criteria
- [ ] Primary brand color remains firmly within the purple family.
- [ ] Text contrast meets or exceeds 4.5:1.
- [ ] No functional regressions to existing telemetry counters or filter hooks.
- [ ] `DESIGN.md` updated with repair rationale and recorded invariants.
