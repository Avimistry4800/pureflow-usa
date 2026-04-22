

# Liquid Futurism — Water Purification USA

A bulletproof, Awwwards-aimed v1: cinematic WebGL hero, an "Invisible Threat" scrollytelling crisis act, and a 3D filter-deconstruction solution act. Midnight + Liquid Cyan palette. Lovable Cloud powering the lead form.

## Experience flow (single long-scroll page)

```text
┌──────────────────────────────────────────────────────────┐
│ ACT 0  Pre-loader     Caustics + % counter, "Calibrating  │
│                       molecular clarity..."               │
├──────────────────────────────────────────────────────────┤
│ ACT 1  HERO           Full-bleed WebGL: dark crystalline  │
│                       pool, drop falls → GLSL ripple      │
│                       reveals "Purity by Design."         │
│                       Magnetic CTA "Discover the Source"  │
├──────────────────────────────────────────────────────────┤
│ ACT 2  THE INVISIBLE  Scroll-pinned. Camera dives THROUGH │
│        THREAT         a water surface. Particles morph:   │
│                       PFAS → microplastics → chlorine.    │
│                       Stat counters: "87% of Americans…"  │
├──────────────────────────────────────────────────────────┤
│ ACT 3  THE SOLUTION   3D purifier model rotates + explodes│
│        (Reveal)       into RO membrane, DI resin, UF, UV. │
│                       Scroll scrubs the deconstruction.   │
│                       Side panel narrates each stage.     │
├──────────────────────────────────────────────────────────┤
│ ACT 4  PROOF          UK heritage → USA expansion strip.  │
│                       Logos (Quooker, Blue Water), badges │
│                       Award-bait stat band, testimonial.  │
├──────────────────────────────────────────────────────────┤
│ ACT 5  CONSULTATION   Liquid-glass form. Sector selector, │
│                       address, message. Submits to Cloud, │
│                       sends confirmation email.           │
├──────────────────────────────────────────────────────────┤
│ FOOTER                Minimal. Live "system status" dot,  │
│                       London ↔ USA coordinates, socials.  │
└──────────────────────────────────────────────────────────┘
```

## Design system — Midnight + Liquid Cyan

- Background `#05070D` (near-black navy), surface `#0B1220`, border `#13203A`
- Primary cyan `#5BE9FF`, deep electric `#00B4D8`, chrome highlight `#E8F6FF`
- Accent gradient: `linear-gradient(135deg, #5BE9FF 0%, #6F4CFF 100%)`
- Typography: **Space Grotesk** (display, tight tracking) + **Inter** (body) + **JT Mono** for technical labels and stat readouts. Hero title 88–140px fluid, all-lowercase or tight caps.
- Motion language: ease-in-out cubic-bezier(0.65,0,0.35,1), 600–1200ms; everything reacts to cursor with subtle parallax/magnetic pull.
- Tokens added to `index.css` + `tailwind.config.ts` (HSL variables, no hardcoded colors in components).

## Signature interactions (the "wow")

1. **GLSL ripple hero** — full-screen plane shader; cursor + auto-drop ripples distort the displayed headline through a normal map. Touch fallback on mobile.
2. **Scroll-pinned dive** (Act 2) — GSAP ScrollTrigger pins canvas; camera Z translates through a water surface; particle field morphs between contaminant types via shader uniforms.
3. **Filter deconstruction** (Act 3) — single GLB of the purifier; scroll scrubs an exploded-view animation; clickable hotspots open glassmorphic info cards.
4. **Magnetic cursor + custom cursor ring** with state changes (drag / inspect / submit).
5. **Liquid page transitions** between sections via a fullscreen WebGL wipe (cyan caustic sweep).
6. **Microcopy & sonar feedback** — soft sub-bass tick on section entry (mute toggle, off by default).

## Tech architecture

- **Stack:** React 18 + Vite + TS, Tailwind, shadcn (only for form + dialog).
- **3D:** `three@0.160`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`, custom GLSL shaders for water + caustics. Lazy-loaded (`React.lazy`) so initial JS stays lean.
- **Motion:** `gsap` + `@gsap/react` with ScrollTrigger for pinning/scrubbing; Framer Motion for UI-level transitions.
- **Performance budget:** ≤180KB JS on first paint (hero shader inline), 3D bundle deferred until hero visible. DPR clamped to 1.5, adaptive pixel ratio, instanced particles, frustum culling. Mobile: lower-poly purifier, fewer particles, ripple shader at half-res — never removed.
- **Accessibility:** `prefers-reduced-motion` swaps shaders for a static cinematic still; full keyboard nav; visible focus rings in cyan; alt text + ARIA live regions for stat counters; color contrast ≥ AA on all text.
- **SEO:** semantic HTML behind canvas, prerendered meta + OG image, `<noscript>` fallback summary.

## Backend (Lovable Cloud)

- `leads` table: id, name, email, phone, sector(enum: home/medical/hospitality/office), address, message, source, created_at. RLS: insert-only for anon, select restricted to admin role via `user_roles` + `has_role()` pattern.
- Edge function `submit-lead`: zod-validated input, rate-limited by IP, inserts row, sends confirmation email + internal notification via Lovable Email.
- Optional admin `/leads` page behind auth (out of scope for v1 unless you want it now).

## File plan

```text
src/
  pages/Index.tsx                     orchestrates acts + scroll
  components/
    hero/HeroCanvas.tsx               R3F + ripple shader
    hero/rippleShader.ts              GLSL frag/vert
    threat/ThreatScene.tsx            pinned dive scene
    solution/PurifierScene.tsx        exploded-view GLB
    solution/Hotspot.tsx
    proof/ProofStrip.tsx
    form/ConsultationForm.tsx         zod + Cloud submit
    chrome/Nav.tsx, CustomCursor.tsx, LiquidTransition.tsx, Preloader.tsx
  shaders/                            water.frag, caustics.frag, particles.frag
  lib/                                useMagnetic.ts, useScrollAct.ts, audio.ts
  index.css, tailwind.config.ts       design tokens
supabase/functions/submit-lead/index.ts
```

## Build order (so each step ships something demoable)

1. **Foundation** — design tokens, fonts, Nav, Preloader, custom cursor, magnetic button primitive.
2. **Act 1 Hero** — R3F canvas + ripple shader + headline reveal + CTA.
3. **Act 2 Threat** — GSAP pin, particle morph, stat counters.
4. **Act 3 Solution** — purifier model (procedural geometry first, swappable for GLB later), scroll-scrubbed explode, hotspots.
5. **Act 4 Proof** — heritage strip, logos, testimonial, animated UK→USA arc.
6. **Act 5 Form + Cloud** — enable Cloud, leads table + RLS, edge function, form, confirmation email.
7. **Polish pass** — liquid transitions, audio toggle, reduced-motion, perf tuning, Lighthouse + Awwwards QA.

## Risks & guardrails

- **Perf** is the #1 Awwwards killer → strict bundle budget, adaptive DPR, lazy 3D, real-device test on mid-tier Android.
- **Content gaps** — placeholder copy from the brief now; you'll provide real product photos, GLB, and testimonials before launch.
- **Scope creep** — Sectors pages, interactive globe, and admin dashboard are explicitly **deferred** per your v1 selection; the architecture leaves room to add them.

## What I need from you to start (optional, can stub)

- Logo / wordmark (else I'll set type-only mark "WPL")
- Any product render/GLB (else procedural cylinder + glass shells)
- US phone + service email for the form notifications

Approve and I'll switch to build mode and execute steps 1–7 in order.

