## Add Three New Sections to the Homepage

Extend the cinematic single-scroll story on `/` with three new acts that fit between the existing Hero → Threat → Solution → Proof composition. The new sections deepen the narrative (how it gets installed, why it beats alternatives) and close with a strong conversion moment — without touching Hero, Threat, Solution, or Proof internals.

### New section order on the homepage

```text
Hero                              (existing)
  ↓
Threat        — Act 02            (existing)
  ↓
Solution      — Act 03            (existing)
  ↓
Comparison    — Act 03.5  NEW     ← why WPL vs. pitcher / supermarket RO / bottled
  ↓
Process       — Act 04    NEW     ← 4-step path from inquiry to installed system
  ↓
Proof         — Act 05            (existing, eyebrow renumbered from 04 → 05)
  ↓
FinalCTA      — Act 06    NEW     ← closing conversion moment with consultation hook
```

### Section 1 — Comparison (`src/components/comparison/Comparison.tsx`)

A horizontal 4-column compare matrix that contrasts WPL against the three alternatives an American buyer typically considers.

- **Eyebrow**: `Act 03.5 — The Difference`
- **Headline**: "Not all clean *is* clean."
- **Columns**: Pitcher Filter · Supermarket RO · Bottled Service · **WPL** (highlighted)
- **Rows**: PFAS removal · Microplastic removal · Lead reduction · Annual plastic waste · Cost over 10 yrs · Service life
- **Visual treatment**: Glass surface, mono labels, subtle row dividers, the WPL column has a primary border + subtle glow, checkmarks/dashes use `text-primary` / `text-muted-foreground`
- Mobile: stacks to a vertical accordion-style list with WPL pinned first
- ~200 lines, no new dependencies

### Section 2 — Process (`src/components/process/Process.tsx`)

A 4-step path showing how a customer moves from first contact to a commissioned system. Mirrors the visual rhythm of Solution's stage rail.

- **Eyebrow**: `Act 04 — The Path`
- **Headline**: "From inquiry to *first sip,* in four moves."
- **Steps**:
  1. **Free water test** — mailed kit, lab analysis returned in 7 days
  2. **Specification** — engineer-led configuration sized to your home / building
  3. **Installation** — certified plumber, single-day fit, zero kitchen disruption
  4. **Stewardship** — connected monitoring, pre-emptive filter service, 30-yr build
- **Layout**: 4 vertical cards with large step numerals (`01–04`), a connecting horizontal line through the numerals on desktop, glass surfaces on hover
- Subtle scroll-reveal: each card fades + lifts as it enters viewport (IntersectionObserver, no GSAP)
- ~150 lines

### Section 3 — Final CTA (`src/components/cta/FinalCTA.tsx`)

A full-bleed closing moment that re-asserts the brand promise and converts.

- **Visual**: Dark bg with the same `grid-noise` + radial primary glow used in Hero/Proof, animated single horizontal liquid line that pulses
- **Headline**: "Water you'll *forget* to think about."
- **Sub**: "Start with a free water test. We'll handle the rest."
- **Primary CTA**: "Request your water test" → links to `/contact` (same magnetic chrome pill style as Hero CTA, reuses `useMagnetic`)
- **Secondary link**: "Explore the technology →" → `/technology`
- **Footer meta strip**: mono coordinates and `EST · 1992 / LDN → NYC` to bookend the Hero
- ~100 lines

### Wiring

**`src/pages/Home.tsx`** — add three imports and insert into the JSX in order:

```tsx
import Comparison from "@/components/comparison/Comparison";
import Process from "@/components/process/Process";
import FinalCTA from "@/components/cta/FinalCTA";

// ...
<Hero />
<Threat />
<Solution />
<Comparison />
<Process />
<Proof />
<FinalCTA />
```

**`src/components/proof/Proof.tsx`** — single-line edit only: change the eyebrow text from `Act 04 — Heritage` to `Act 05 — Heritage` so act numbering stays sequential. No other Proof changes.

### Out of scope

- No changes to Hero, Threat, Solution, Nav, Footer, routes, or any other page.
- No new assets, no new fonts, no new dependencies.
- No CSS variable changes — all sections reuse existing tokens (`chrome`, `liquid`, `primary`, `surface-glass`, `grid-noise`, `font-display`, `font-mono`, `shadow-glow`).
- No backend / Supabase changes — Final CTA links to existing `/contact` route which already hosts `ConsultationForm`.

### Files touched

- **Create** `src/components/comparison/Comparison.tsx`
- **Create** `src/components/process/Process.tsx`
- **Create** `src/components/cta/FinalCTA.tsx`
- **Edit** `src/pages/Home.tsx` (3 imports, 3 JSX lines)
- **Edit** `src/components/proof/Proof.tsx` (1 string: `Act 04` → `Act 05`)
