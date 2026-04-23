

## Visual QA Findings & Fix Plan

I scrolled through the live preview at a 1366×768 viewport and captured screenshots at multiple positions (0%, 10%, 15%, 20%, 25%, 30%, 50%, plus all four nav anchors).

### Sections that render correctly
- **Hero** (Purity / by design) — clean, with the WebGL water shader, CTA, scroll hint
- **Threat — when reached via the THREAT nav anchor**
- **Solution — when reached via SYSTEM nav anchor**, product photo + 4-stage list look great
- **Proof** (Heritage / stats / sectors / testimonial / partners ticker) — looks polished
- **Consultation form** + **Footer** — render fine

### Confirmed visual bugs

**1. Threat & Solution sections go BLANK at intermediate scroll positions** (critical)
- At 20% / 25% / 30% scroll the screen is entirely empty except the small `✦ Act 03 — The Reveal ✦` circle from a `LiquidTransition`
- At 50% the same blank state happens inside the Solution scroll range
- These sections use `position: sticky` inside a tall (320vh / 360vh) parent. The sticky child either un-sticks early or is being pushed out of view by the surrounding `LiquidTransition` blocks
- Anchor links (#threat, #solution) work because they jump to `offsetTop`, hitting the section before the sticky breaks

**2. `LiquidTransition` is the prime suspect**
- It is rendered as a *sibling* between sections with `relative z-20 -my-[10vh] h-[20vh] overflow-visible`
- Negative margin pulls the next sticky parent up by 10vh, shifting its scroll math
- `z-20` lifts the transition above content but the SVG fills only ~20vh, so when it scrolls past, the sticky underneath is no longer where the layout expected it
- The `✦ label ✦` circle that you see during the blank state is the LT, proving the LT is rendered at the wrong vertical position relative to its supposed boundary

**3. Threat "Dive" vertical progress indicator** is half clipped on the right edge (cosmetic)

**4. Hero CTA "Discover the source"** points at `#threat`, which after the fix should land on the new threat section start cleanly

### Fix plan (to implement when you switch to default mode)

**Step 1 — Refactor `LiquidTransition` so it can no longer break sticky math**
- Drop the negative `-my-[10vh]` and the in-flow `h-[20vh]` block
- Make the transition `position: fixed; inset-x-0; pointer-events-none; z-30` and drive it by the *scroll position relative to a sentinel*: render an invisible `<div>` between sections that records its viewport position via `IntersectionObserver`/`getBoundingClientRect`, then a single fixed-position SVG layer animates based on that
- This removes any layout influence on neighboring sections — sticky parents will start/end exactly where their declared `vh` says they do

**Step 2 — Harden the sticky stages**
- Replace `h-[100svh]` on the sticky child with `h-screen` (matching the parent's `vh` units), so parent height and sticky height share the same unit on every browser
- Add `min-h-0` and remove `overflow-hidden` from the flex column where it isn't needed, so content can't be clipped out of view
- Wrap each sticky child in a `relative z-0` container so it forms its own stacking context separate from the `z-20/30` chrome

**Step 3 — Fix `Threat.tsx` "Dive" gauge clipping**
- Move it from `right-4 sm:right-8` to `right-6 sm:right-10`, and clamp its height inside the safe area

**Step 4 — Extend the regression test suite**
- Add a scroll-position test in `src/test/acts.regression.test.tsx` that programmatically scrolls to 10%, 25%, 50%, 75% of `document.body.scrollHeight` and asserts that *at least one* of each act's headings remains in the viewport (`getBoundingClientRect().top < innerHeight && bottom > 0`)
- This will catch the exact "blank in the middle of a scroll-driven act" class of bug we just hit

**Step 5 — Manual visual re-verification**
- Re-screenshot at 10/20/30/40/50/60/70/80/90% after the fix and confirm none are blank

### Files to be edited
- `src/components/chrome/LiquidTransition.tsx` (rewrite to fixed-position + sentinel)
- `src/pages/Index.tsx` (insert sentinels alongside the existing LT placement)
- `src/components/threat/Threat.tsx` (sticky height unit + Dive gauge position)
- `src/components/solution/Solution.tsx` (sticky height unit + stacking context)
- `src/test/acts.regression.test.tsx` (new scroll-position assertions)

No backend / Supabase changes are required.

