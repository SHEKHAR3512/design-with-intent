# Brief 02: Travel Availability & Booking Calendar

## 1. Product Summary
- **Product Name:** AlpinePass Expeditions
- **Domain:** Mountain hut & backcountry lodge reservations
- **Mode:** Create

## 2. Audience & Context
- **Users:** Hikers, guides, and mountaineers planning multi-day hut treks.
- **Environment:** Planning at desktop before trips; checking updates on mobile devices with intermittent connectivity.
- **Mental State:** Focused on dates, capacity, weather windows, and cancellation rules.

## 3. Primary Task
Select arrival and departure dates across high-demand alpine huts, inspect live bed availability and tier pricing, and review cancellation policies before proceeding to checkout.

## 4. Key Invariant Constraints
- Date availability status must be instantly scannable across an entire month.
- Distinct states required for: Available (> 5 beds), Low Capacity (1–4 beds), Fully Booked (0 beds), Hut Closed (seasonal/weather).
- Cancellation terms (Full Refund, Partial, Non-refundable) must be clearly stated adjacent to pricing, avoiding hidden surprises.

## 5. Required Interface States
- **Monthly Overview Matrix:** High-density calendar showing status indicators and price per night.
- **Selected Range State:** Highlighting check-in and check-out with total nights and price breakdown.
- **Sold Out State:** Visual cue with option to join a waitlist or view adjacent dates.
- **Mobile View:** Fluid swipe or stacked monthly view with sticky booking summary bar.

## 6. Acceptance Criteria
- [ ] Contrast meets WCAG 2.2 AA (>= 4.5:1 text, >= 3:1 graphical availability badges).
- [ ] Keyboard navigation allows traversing dates with Arrow keys and selecting with Enter/Space.
- [ ] 320px mobile viewport reflow without layout breakage.
