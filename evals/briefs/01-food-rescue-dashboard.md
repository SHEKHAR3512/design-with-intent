# Brief 01: Food Rescue Dispatch Dashboard

## 1. Product Summary
- **Product Name:** SecondHarvest Direct
- **Domain:** Food rescue, logistics, surplus redistribution
- **Mode:** Create

## 2. Audience & Context
- **Users:** Volunteer dispatch coordinators and drivers in food redistribution hubs.
- **Environment:** High-paced warehouse loading docks, direct outdoor sunlight, mobile phone and rugged tablet usage.
- **Mental State:** Urgent, coordinating perishables before expiration deadlines.

## 3. Primary Task
Review incoming perishable donations expiring within hours, assess vehicle temperature/capacity match, and assign an active volunteer driver in 2 clicks or taps.

## 4. Key Invariant Constraints
- Must function in bright ambient daylight (requires high contrast >= 7:1 for critical text).
- Touch targets must be comfortably accessible while wearing work gloves (>= 44px).
- Urgency must be conveyed through icon, countdown timer, and text label (never color alone).

## 5. Required Interface States
- **Active Queue:** Donations sorted by time-to-spoilage (< 1 hr, 1–2 hrs, > 2 hrs).
- **Assign Modal/Drawer:** Quick driver selection with vehicle capacity badges.
- **Empty State:** All batches dispatched for current shift.
- **Offline / Stale Data Alert:** Visual indicator if vehicle telemetry is stale.

## 6. Acceptance Criteria
- [ ] Viewport reflows cleanly down to 320px without horizontal body scrolling.
- [ ] Countdown timers utilize tabular numerals to prevent layout shift.
- [ ] Primary dispatch action is distinct and impossible to confuse with secondary actions.
