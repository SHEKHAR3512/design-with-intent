export const motionProfiles = {
  restrained: { label: 'Restrained', description: 'Quiet feedback for premium products and everyday tasks.', feedback: 100, enter: 180, move: 240, distance: 6 },
  expressive: { label: 'Expressive', description: 'More visible storytelling for occasional, meaningful moments.', feedback: 120, enter: 240, move: 320, distance: 12 },
  minimal: { label: 'Minimal', description: 'Immediate task feedback; no decorative movement.', feedback: 0, enter: 0, move: 0, distance: 0 },
};

export function getMotionProfile(id = 'restrained') {
  if (!Object.hasOwn(motionProfiles, id)) throw new Error(`Unknown motion profile "${id}". Choose restrained, expressive, or minimal.`);
  return motionProfiles[id];
}

export function motionPlan(id = 'restrained') {
  const p = getMotionProfile(id);
  return `Motion profile: **${p.label}**. ${p.description}
- Starting timings: feedback ${p.feedback}ms; enter/exit ${p.enter}ms; spatial transition ${p.move}ms. Maximum suggested travel ${p.distance}px for small UI surfaces.
- Treat timings as starting points, not delays before actions. Frequent tasks and keyboard navigation must respond immediately.
- Record each interaction's purpose, trigger, animated properties, interruption behavior, and reduced-motion equivalent in DESIGN.md.
- Prefer transform/opacity, explicit transition properties, trigger-aligned origins, and interruption from the current visual state.
- Reduced motion: remove travel, scale, bounce, parallax, and decorative loops; retain immediate state feedback and readable status.
- Verify rapid open/close, keyboard focus, touch input, and reduced motion in the browser. Audit mode reports findings without changing code.`;
}

export function motionCSS(id = 'restrained') {
  const p = getMotionProfile(id);
  return `/* Design with Intent: ${id}. Import explicitly; no global transitions. */
:root {
  --dwi-motion-feedback: ${p.feedback}ms;
  --dwi-motion-enter: ${p.enter}ms;
  --dwi-motion-move: ${p.move}ms;
  --dwi-motion-distance: ${p.distance}px;
  --dwi-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dwi-ease-move: cubic-bezier(0.65, 0, 0.35, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root {
    --dwi-motion-feedback: 0ms;
    --dwi-motion-enter: 0ms;
    --dwi-motion-move: 0ms;
    --dwi-motion-distance: 0px;
  }
}
/* These tokens do not disable other animations. Implement each component's
   reduced-motion state, including JS springs. Never rely on animationend
   to complete application state or manage focus. */
`;
}
