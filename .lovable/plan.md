

## Remove Act Captions from Liquid Transitions

The "✦ Act 02 — The Threat ✦" / "✦ Act 03 — The Reveal ✦" captions that appear pinned to the middle of the screen during scroll are blocking the view and breaking the cinematic flow. I'll remove them while keeping the subtle liquid wipe SVG animation between sections.

### What changes

**`src/pages/Index.tsx`**
- Remove the `label` prop from all four `<LiquidTransition />` instances so no caption text is rendered.
- Keep the transitions themselves (and the `flip` prop on alternating ones) so the liquid wipe between acts still plays.

**`src/components/chrome/LiquidTransition.tsx`**
- Remove the `label` prop from the component signature and delete the `<div>` block that renders the `✦ {label} ✦` caption.
- Keep the SVG liquid blob, gradient, blur, and scroll-driven intensity math untouched.

### What stays the same

- The fluid wipe SVG between each act (purely visual, non-blocking, `pointer-events-none`).
- All sticky scroll behavior in Hero / Threat / Solution / Proof.
- The visibility gate (`t > 0.02 && t < 0.98`) so the transition only paints when active.
- No changes to layout, spacing, sticky math, or the regression test suite (the tests don't assert on caption text).

### Files to edit
- `src/components/chrome/LiquidTransition.tsx`
- `src/pages/Index.tsx`

