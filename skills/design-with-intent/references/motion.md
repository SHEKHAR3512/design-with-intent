# Motion that serves the interface

Adapted from [Emil Kowalski's design engineering guidance](https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202/skills/emil-design-eng), reviewed 2026-10-18; see [sources](sources.md) and the [MIT notice](../licenses/Emil-Kowalski-MIT.txt). DWI adds selectable profiles, implementation boundaries, and the validation workflow below.

## Choose deliberately

For each animation, name the information it communicates and how often it repeats. Remove motion that adds waiting to routine tasks. Use quick feedback for controls and more noticeable movement only when it helps explain a change. Choose easing by purpose: a responsive deceleration for entering UI, smooth acceleration/deceleration for spatial movement, and linear motion only for continuous progress. Prefer explicit transform and opacity transitions; avoid `transition: all`. Position a popover's origin near its trigger. Keep interruption continuous rather than resetting to the beginning. Reduced motion retains understandable state changes without travel or bounce.

## DWI motion profiles

These are starting values for small web UI elements, not universal animation laws. Preserve an established motion system unless the task calls for replacing it.

| Profile | Feedback | Enter/exit | Spatial change | Small-surface travel |
| --- | --- | --- | --- | --- |
| restrained | 100ms | 180ms | 240ms | up to 6px |
| expressive | 120ms | 240ms | 320ms | up to 12px |
| minimal | immediate | immediate | immediate | none |

Use the brief's profile. An expressive profile does not authorize animating every section. Never hide essential content behind an entrance animation, replay a reveal on every scroll, delay submission until motion completes, or use artificial loading time.

## Integration contract

Record a compact motion table in DESIGN.md: interaction, purpose, trigger, properties, timing/curve, interruption, reduced-motion alternative. In audit mode report proposed changes without editing the application. In repair mode change only the affected interaction.

`dwi motion restrained` prints optional CSS custom properties. It does not edit a website, install a runtime library, or make existing animations accessible. Import the emitted CSS explicitly and apply tokens only to selected components. Use an existing animation library for gestures or coordinated layout transitions when appropriate; ordinary hover and press feedback usually need only CSS.

```css
.save-button {
  transition: background-color var(--dwi-motion-feedback) ease;
}
.save-button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
/* Adapt colors to measured brand contrast; keep disabled/focus states distinct. */
```

Changing duration tokens to zero is not a complete reduced-motion implementation. Remove movement in component CSS and the JS animation path. Keep useful loading status visible. Avoid application logic that depends on `animationend` or `transitionend`, which may never fire at zero duration.

## Component decisions

- Buttons: immediate pressed feedback; activation follows native click/keyboard semantics. Pointer-down styling must not commit a destructive action.
- Popovers and dialogs: reuse accessible primitives; define focus entry, escape, dismissal, and focus return independently of animation. Rapid toggles start from the visible position. Hidden overlays must not intercept input.
- Lists: animate movement only when it clarifies identity. Stable keys and meaningful order matter more than staggered entrances. Avoid delaying access to later items.
- Gestures: support a normal button alternative. Maintain pointer capture and current-position continuity; do not introduce drag-only actions.
- Status: show genuine progress, failures, and completion. Avoid perpetual decorative motion beside frequently used controls.

## Verify the actual behavior

Test repeated clicks during a transition, reversing a drawer, keyboard open/close, focus after dismissal, touch without hover, and the OS reduced-motion setting. Inspect a browser performance trace for the largest transition: look for layout/paint work, dropped frames, and excessive layers. Transform/opacity are candidates for efficient rendering, not proof of smoothness. Avoid permanent blanket `will-change`, large blur effects, and unbounded staggering. Report the device, viewport, and checks performed; static screenshots cannot prove animation quality.
