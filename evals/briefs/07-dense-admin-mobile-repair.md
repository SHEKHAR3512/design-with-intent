# Brief 07: Dense Administrative Table Mobile Layout Repair

## 1. Product Summary
- **Product Name:** PortOps Freight & Customs Terminal
- **Domain:** Global logistics, container manifest auditing, customs clearance
- **Mode:** Repair

## 2. Audience & Context
- **Users:** Port logistics officers and dock supervisors reviewing container manifests.
- **Environment:** High-density desktop monitors in port offices; mobile smartphones on docks.
- **Mental State:** Data-intensive, reviewing hundreds of container IDs, inspection statuses, and hold flags.

## 3. Primary Task
Repair the mobile experience of the dense container manifest table. On desktop, the 8-column table is efficient, but on mobile devices (< 768px) it forces unmanageable horizontal scrolling and clips action menus.

## 4. Key Invariant Constraints
- **Preserve Desktop Density:** Do not simplify or dilute the desktop view. Dock managers require high information density.
- Do not remove essential data fields (Container ID, Vessel, Origin, Customs Status, Hold Reason, Inspection Date).
- Do not introduce external bloated JavaScript table libraries.

## 5. Required Repair Interventions
1. Implement a responsive adaptive pattern:
   - On screens < 640px, cleanly transform table rows into structured data cards or definition lists with key metadata anchored at the top, OR provide an accessible horizontal swipe container with sticky identity columns and clear visual affordance.
2. Ensure action menus (Release, Flag, Inspect) remain reachable and meet target size minimums (>= 24px, preferably 44px on mobile).
3. Preserve all sorting and filtering functionality.

## 6. Acceptance Criteria
- [ ] Zero horizontal body overflow on 320px screens.
- [ ] Desktop layout remains dense, compact, and scannable.
- [ ] All 8 data fields remain accessible on mobile viewports.
- [ ] No regression to existing filter callbacks or sort handlers.
