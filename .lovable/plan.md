

## Remove the Liquid Wipe Band Between Sections

The teal wipe band shown in your screenshot is the `LiquidTransition` SVG. It spans the full viewport width at mid-screen during scroll, blocks content behind it, and breaks the flow. I'll remove it entirely so sections transition cleanly into each other.

### Changes

**`src/pages/Index.tsx`**
- Remove the `LiquidTransition` import.
- Remove all four `<LiquidTransition />` instances between Hero → Threat → Solution → Proof → ConsultationForm.
- Sections will sit directly next to each other; the existing sticky scroll choreography inside each act already handles the visual handoff.

**`src/components/chrome/LiquidTransition.tsx`**
- Delete the file (no other component imports it).

### What replaces it
Nothing visual — and that's intentional. The teal band was the problem. Each act already has its own atmospheric backdrop and sticky scroll arc, so removing the wipe makes the scroll feel continuous instead of chopped by a colored bar.

If later you want a *subtle* divider, the right pattern is a thin gradient fade (~`h-24` with `from-transparent to-background`) inside the next section's top — not a full-bleed animated band. Let me know if you want that added; otherwise it's a clean cut.

### Files
- edit `src/pages/Index.tsx`
- delete `src/components/chrome/LiquidTransition.tsx`

