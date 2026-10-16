# Accessibility verification

This is DWI-authored guidance. AccessLint's separation of automated scanning and hands-on inspection informed the resource selection; its skill text and engine are not bundled. See sources.md for links and the scope of integration.

Use the project's existing accessibility tooling if present. A rule engine finds a subset of issues. A design audit must also inspect the actual task with keyboard, focus, zoom/reflow, and relevant UI states.

- Use semantic controls and meaningful names; inspect headings and reading order.
- Tab through the primary flow. Check visible focus, no accidental traps, modal dismissal, and focus return.
- Ensure errors identify the field and explain recovery. Keep entered values when possible. Announce asynchronous status without moving focus unnecessarily.
- Check normal text at 4.5:1 and large text at 3:1 using actual rendered colors. Large text is at least 24 CSS px, or about 18.67 CSS px when bold. Essential non-text UI indicators generally need 3:1 against adjacent colors. Do not treat an arbitrary border as automatically essential.
- Prefer controls at least 24 by 24 CSS px; aim around 44 by 44 for primary touch actions. WCAG 2.2 SC 2.5.8 has spacing and other exceptions. A smaller bounding box is a candidate for review, not automatically a failure. See the [W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Check text resize and narrow reflow. Data tables and maps may need two-dimensional presentation; make scrolling discoverable and keyboard-operable rather than hiding required content.
- Do not rely on color alone. Respect reduced motion, avoid flashing content, and provide alternatives to drag-only actions.
- Review accessible names and states in the accessibility tree. Do not claim a real screen-reader test unless that assistive technology was actually used.

Record findings with location, impact, observed evidence, and the next action. Explicitly separate observed failures, suspected issues needing review, and checks not performed. Human usability testing and assistive-technology testing cannot be replaced by an agent pretending to be a disabled user. Passing a contrast helper or an automated scanner is not a site-wide conformance claim.
