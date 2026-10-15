# Reference: Research, Evidence & Reference Selection

This guide describes how to gather targeted visual and structural references, evaluate their applicability, and label evidence with absolute intellectual honesty.

---

## 1. The Three-Reference Triangle

When designing a new interface or unfamiliar subject, collecting fifty random screenshots causes visual noise and analysis paralysis. Instead, gather a focused triad:

```
                  [1. Comparable Product]
               (Mental models & task patterns)
                          ▲
                         / \
                        /   \
                       /     \
    [2. Adjacent Field] ◄─────► [3. Subject Domain]
 (Composition & spatial hierarchy)  (Physical tools, cultural artifacts)
```

1. **Comparable Product (Mental Models):**
   - *Purpose:* Understand standard user expectations, terminology, and interaction flows for this type of task.
   - *Example for a Music Queue:* Spotify, Apple Music, or Bandcamp queue management.
   - *Transferable Principle:* Drag-to-reorder affordance, visual indication of "Now Playing" vs "Next in Queue".
   - *What NOT to Copy:* The proprietary branding, specific icon set, or marketing widgets.

2. **Adjacent Field (Composition & Density):**
   - *Purpose:* Borrow spatial organization, filtering logic, or density balance from an unrelated industry that solves a similar information challenge.
   - *Example for a Food Rescue Dashboard:* Air traffic dispatch boards or emergency triage dispatch monitors.
   - *Transferable Principle:* High-urgency countdown timers with distinct status iconography and clear time-to-spoilage badges.
   - *What NOT to Copy:* Military terminology or excessive visual alarm colors.

3. **Subject Domain (Authentic Artifacts):**
   - *Purpose:* Draw aesthetic inspiration from the real physical world of the subject (physical tools, printed logbooks, architectural signage, materials).
   - *Example for an Artisanal Coffee Subscription:* Coffee bag packaging, cupping scorecards, kraft paper textures.
   - *Transferable Principle:* Warm earthen tones, tactile typography with clean serif or neo-grotesque type, roasting level badges.
   - *What NOT to Copy:* Overly complex skeuomorphic graphics that impede mobile performance.

---

## 2. Evidence Labeling Standard

To prevent agents from confusing assumptions with user requirements, always prefix statements with standard evidence tags:

| Tag | Definition | Example |
| :--- | :--- | :--- |
| `[FACT]` | Directly supplied by user prompt, codebase tokens, or repository assets. | `[FACT] Primary brand color is #6D28D9 per tailwind.config.js.` |
| `[OBSERVATION]` | Observed from direct code inspection or rendered tool execution. | `[OBSERVATION] The checkout button currently has 2.4:1 contrast on mobile.` |
| `[ASSUMPTION]` | Reasonable premise adopted by the agent when information is non-essential. | `[ASSUMPTION] Users primarily access this booking view on tablet during shifts.` |
| `[PROPOSAL]` | Proposed architectural or visual change requiring verification. | `[PROPOSAL] Split the monolithic calendar into a month overview and time slots.` |

---

## 3. Tool Limitations and Honesty Rules

AI agents operate under varying tool capabilities across hosts:

1. **When Browser Inspection is Available:**
   - Take actual viewport screenshots at 320px, 768px, and 1280px.
   - Inspect computed styles and bounding boxes.
   - Record exact findings in verification logs.
2. **When Browser Inspection is Unavailable:**
   - **Never hallucinate visual inspections.** Do not state: *"I visually verified the layout and confirmed the colors look balanced."*
   - Explicitly disclose the verification limit:
     > *"Code-level implementation complete. Browser inspection tool was not available in this session; contrast was calculated mathematically (6.2:1) and viewport reflow was structured using responsive CSS Grid. Manual visual verification is recommended."*
3. **When Reference URLs Cannot Be Fetched:**
   - Rely on established design principles, known platform conventions (HIG, Material 3), and supplied project assets.
   - Disclose that references were synthesized from known design patterns rather than live page retrieval.
