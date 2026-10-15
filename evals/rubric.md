# Design with Intent: Evaluation Rubric

This rubric evaluates the quality, usability, and brand fidelity of agent-generated designs. It is used to benchmark agents operating with and without the `design-with-intent` skill.

---

## 1. Weighted Criteria Breakdown

| Criterion | Weight | Focus Area |
| :--- | :---: | :--- |
| **1. Task Clarity & Completion** | **25%** | Can the user execute the primary task without confusion, hesitation, or dead ends? |
| **2. Product & Brand Fit** | **20%** | Does the design reflect the specific domain, audience, and preserved brand invariants? |
| **3. Hierarchy & Readability** | **15%** | Is the visual scanning order clear? Is text legible, well-measured, and structured? |
| **4. Responsive Resilience** | **15%** | Does the interface adapt to 320px, 768px, and 1280px+ viewports without breakage? |
| **5. Appropriate Distinctiveness** | **15%** | Does the interface avoid generic templates while remaining usable and purpose-driven? |
| **6. Craft & Consistency** | **10%** | Are spacing scales, focus indicators, interactive states, and tokens consistent? |

---

## 2. Descriptive Scoring Scale (0–4)

Each criterion is evaluated on a 0 to 4 scale using the following anchors:

### Score 0: Unusable / Missing
- **Task Clarity:** Primary task cannot be completed; broken links, missing buttons, or fatal logic errors.
- **Brand Fit:** Complete disregard for the brief or user constraints.
- **Hierarchy:** Monolithic wall of text or visual chaos with no discernible visual order.
- **Responsiveness:** Massive horizontal overflow, truncated content, or unviewable on mobile.
- **Distinctiveness:** Incoherent visual noise or totally broken styling.
- **Craft:** Broken CSS, overlapping text, missing interactive feedback.

### Score 1: Major Problems
- **Task Clarity:** User can complete the task only with trial-and-error; critical controls obscured.
- **Brand Fit:** Uses inappropriate aesthetic (e.g., playful consumer look for a critical medical tool).
- **Hierarchy:** Competing visual weights; essential data de-emphasized in favor of decorative fluff.
- **Responsiveness:** Usable on desktop only; severe clipping, overlapping buttons, or horizontal scroll on 320px viewports.
- **Distinctiveness:** Stock generic layout with irrelevant placeholder elements.
- **Craft:** Inconsistent margins, erratic font sizes, inaccessible contrast on body copy (< 3.0:1).

### Score 2: Adequate with Visible Weaknesses
- **Task Clarity:** Primary task is functional, but secondary flows are clumsy or error recovery is weak.
- **Brand Fit:** Conforms broadly to requirements, but feels like an off-the-shelf theme without domain nuance.
- **Hierarchy:** Generally understandable, but subtle metadata and secondary actions are poorly differentiated.
- **Responsiveness:** Stacks linearly on mobile, but lacks thoughtful density tuning (e.g., massive empty space or awkward padding).
- **Distinctiveness:** Neutral and safe, leaning heavily on familiar generic defaults.
- **Craft:** Some missing hover/active states; contrast meets minimums in most but not all edge cases.

### Score 3: Strong (Standard Release Target)
- **Task Clarity:** Primary and secondary actions are immediately discoverable and intuitive.
- **Brand Fit:** Clearly captures the tone, audience, and functional needs of the specific domain. Preserves all required brand invariants.
- **Hierarchy:** Scannable in 3 seconds; clear distinction between titles, body, metadata, and status tokens.
- **Responsiveness:** Thoughtfully designed across 320px, 768px, and 1280px viewports. No unnecessary horizontal scroll.
- **Distinctiveness:** Distinctive character rooted in purpose; neither generic nor gratuitously eccentric.
- **Craft:** Clean 4/8px spacing, robust system font fallbacks, complete hover/focus-visible states, full WCAG 2.2 AA contrast compliance.

### Score 4: Unusually Effective (Exemplary Benchmark)
- **Task Clarity:** Flawless task ergonomics with proactive affordances, clear microcopy, and resilient error recovery.
- **Brand Fit:** Deeply resonant visual identity that feels proprietary and crafted specifically for this subject matter.
- **Hierarchy:** Exemplary information density; complex data feels effortless to parse.
- **Responsiveness:** Flawless fluid transitions across viewport widths; tabular data adapts with sophisticated mobile patterns.
- **Distinctiveness:** Truly memorable, purposeful design that sets a benchmark in its field.
- **Craft:** Flawless state coverage (ideal, loading, empty, error, success), accessible focus management, subtle micro-interactions with reduced-motion support.

---

## 3. Hard Blockers (Automatic Failure)

The presence of **any** of the following hard blockers triggers an automatic failure, regardless of points earned in other categories:

1. **Broken Primary Task:** The core workflow (e.g., booking a room, approving a dispatch, submitting a payment) cannot be completed.
2. **Critical Inaccessible Interaction:** Keyboard traps, completely missing form labels, or inaccessible buttons that block screen reader or keyboard users.
3. **Unreadable Essential Content:** Body text or primary instructions with contrast below 3.0:1.
4. **Violation of Explicit Brand Constraint:** Stripping an explicitly required brand color, logo, or token (e.g., replacing a mandated purple palette with green).
5. **Fabricated Verification:** Claiming automated tests passed, screenshots were inspected, or contrast was measured when no verification tool was actually run.

---

## 4. Aggregate Score Calculation

The final weighted score is computed as:

$$\text{Final Score} = (0.25 \times C_1) + (0.20 \times C_2) + (0.15 \times C_3) + (0.15 \times C_4) + (0.15 \times C_5) + (0.10 \times C_6)$$

Passing threshold for release candidates is a weighted score of **>= 2.8 / 4.0** with **zero hard blockers**.
