

## Act 02 — Add Animated Contaminant Elements

Enrich the "Invisible Threat" section with scroll-driven, contaminant-specific visual elements that morph as the active sample changes (PFAS → Microplastics → Chlorine → Lead). Today the section only renders generic glowing dots — we'll layer in distinct, recognizable shapes per contaminant so the science feels tangible.

### What gets added to `src/components/threat/Threat.tsx`

A new `<ContaminantField active={active} progress={progress} />` layer rendered above the existing particle field, inside the sticky stage. It cross-fades between four scroll-synced visual systems, one per contaminant:

**1. PFAS / Forever Chemicals (active === 0)**
- 14 hexagonal molecular rings (CSS clip-path hexagons) drifting upward
- Faint bond-lines connecting nearest neighbors (SVG `<line>`)
- Rings slowly rotate; opacity pulses to suggest persistence ("forever")
- Tint: `--primary` (cyan)

**2. Microplastics (active === 1)**
- 40 irregular polygon fragments (varied clip-paths: triangles, quads, shards)
- Each tumbles on its own axis (`rotate` + `translate` keyed to `progress`)
- Sizes 3–14px, scattered with parallax depth (3 z-layers, different drift speeds)
- Tint: `--accent`

**3. Chlorine & DBPs (active === 2)**
- Rising bubble column — 24 circles with `translateY` from bottom to top, looped via `progress`
- Each bubble has a subtle inner highlight (radial gradient)
- A faint horizontal "waterline" shimmer crosses mid-stage
- Tint: `--primary-glow`

**4. Lead & Heavy Metals (active === 3)**
- 18 heavy angular crystal shapes (diamond/rhombus clip-paths)
- Slow downward drift (gravity feel) instead of upward like the others
- A thin "pipe cross-section" SVG on the right edge with a slow drip animation (one droplet falling every ~2s)
- Tint: `--chrome` with a warm desaturated overlay

### Cross-fade mechanic

Each system is always mounted but wrapped in:
```tsx
<div style={{ opacity: active === N ? 1 : 0, transition: 'opacity 700ms var(--ease-fluid)' }}>
```
So switching contaminants dissolves smoothly rather than popping. Motion within each system is driven by the existing `progress` value (0 → 1) — no new scroll listeners, no new state.

### Scroll-reactive intensity

- Element count scales subtly with `progress` (e.g. bubbles only fully populate past 50% scroll)
- A new "concentration meter" appears under the contaminant readout card: a horizontal bar that fills as `progress` increases, labeled `CONCENTRATION · PPM` with a scroll-synced number ticking up
- The right-edge "Dive" rail gets a small contaminant glyph (hex / shard / bubble / diamond) that swaps with `active`

### Performance

- All animations are CSS `transform` + `opacity` only (GPU-friendly)
- Total DOM nodes added: ~100 absolutely-positioned spans (existing field already has 80, well within budget)
- No new dependencies, no canvas, no requestAnimationFrame — purely scroll-driven via the existing `onScroll` handler
- `prefers-reduced-motion` respected: motion transforms gated behind a media query (static positions when reduced)

### Files touched

- `src/components/threat/Threat.tsx` — single file edit. Add `ContaminantField` subcomponent + concentration meter + glyph swap on the Dive rail.

### Out of scope

- No changes to Hero, Solution, Proof, Nav, Footer, or any route.
- No new assets, no shaders, no Three.js — keeps bundle size flat.

