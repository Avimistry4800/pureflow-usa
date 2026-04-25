## What's making it feel AI-built

The bones are strong, but every section uses the **same recipe**:

1. Eyebrow: `Act 0X — One Word`
2. Headline: two lines, second line italic + cyan gradient
3. Body paragraph in `text-muted-foreground`
4. `surface-glass` cards in a grid
5. Background: `grid-noise` + cyan radial glow + thin gradient hairline at top

That formula across 6 sections is the AI tell. Real art direction varies pace, typography, density, color, and copy voice from one section to the next.

This plan fixes the homepage only — no scope creep into routes or backend.

## Fixes (each section gets a distinct identity)

### 1. Kill the "Act 0X" eyebrow on every section
It reads like chapter labels in an AI-generated deck. Keep the narrative idea, but vary the device:
- **Threat**: a moving timestamp / counter ("12,400 ppt detected — last 24h")
- **Solution**: a serial number ("WPL-LIQ-001 / Cross-section")
- **Comparison**: no eyebrow — open with a number ("4 ways to make water drinkable. One that lasts.")
- **Process**: a small map line ("Inquiry → First sip")
- **Proof**: a date range ("1992 — Present")
- **FinalCTA**: nothing above the headline. Let it land cold.

### 2. Stop the italic-liquid-gradient headline tic
Used in Hero, Solution, Comparison, Process, Proof, and FinalCTA — six times. Cap it at two uses on the page (Hero + one other). For the rest:
- **Comparison**: all-chrome headline, single weight, no gradient. Ground it with a tabular figure underneath ("$11,000 vs $4,200 / 10 yr").
- **Process**: numerals do the talking — set "01 02 03 04" massive across the top, headline smaller beside it.
- **Proof**: serif-feel display weight, no italic, no gradient. Add a real-looking handwritten signature line under the testimonial.
- **FinalCTA**: keep it, but only one italic word (not a phrase).

### 3. Vary section backgrounds (not all `grid-noise + cyan glow`)
- **Threat**: keep dark + contaminant field (already distinct ✓)
- **Solution**: keep product stage (already distinct ✓)
- **Comparison**: **swap to a paler "lab paper" surface** — slightly lifted background (`--surface-elevated`), no grid-noise, no glow. Reads like a printed datasheet.
- **Process**: **vertical timeline rail** with a single thin animated cyan line connecting four station dots — no glass cards, just numerals + text floated against the dark. Feels like a blueprint, not a card grid.
- **Proof**: keep the heritage arc, but **drop the 4-up sector card grid** (it's the most generic block on the page). Replace with an inline run-on sentence: "We serve residences in Aspen, dental clinics in Boston, hotels in Miami, and offices in Manhattan." Each location is a hover link. One block, one voice.
- **FinalCTA**: keep, but remove the grid-noise — pure void + one horizontal liquid line + the CTA.

### 4. Rewrite the most "GPT-flavored" copy
Specific lines to revise (kept tight, more particular, less marketing-cadence):

- Hero subhead → drop "Engineered in the United Kingdom. Calibrated for the American home." (too symmetrical, too AI). Replace with something with a real detail: *"Built in Sheffield since 1992. Now plumbed into 11,000 American homes."*
- Comparison intro → drop "The American kitchen has options. Most of them solve one problem while creating two more." Replace with: *"A pitcher buys you a week. A bottled service buys you guilt. This is what permanent looks like."*
- Process intro → drop "No salespeople in your home. No pressure pitch." Replace with the actual sequence as a single sentence: *"Mail a sample. Read a spec. One day with a plumber. Thirty years of not thinking about it."*
- FinalCTA microcopy → "Independent lab · 7-day turnaround · No obligation" reads like a generated chip row. Replace with: *"Lab results in your inbox by next Friday."*

### 5. Tighten visual repetition
- Remove the `bg-gradient-to-r from-transparent via-primary/X to-transparent` hairline at the top of Comparison, Process, Proof, and FinalCTA — used 4 times in a row. Keep it on Proof only as a section break.
- Cap `surface-glass` usage on the homepage at 2 surfaces (Solution info card + Threat readout). Comparison uses a flat bordered table; Process uses no card; Proof uses no sector cards.
- Reduce cyan radial glows: keep on Hero and FinalCTA only. Comparison/Process/Proof go matte.

### 6. One human detail
Add a single small honest moment that a template wouldn't include — e.g., a footnote under the Proof testimonial: *"Photographed at the Sheffield workshop, March 2024."* It signals a real hand on the page.

## Files touched

- `src/components/hero/Hero.tsx` — subhead copy only
- `src/components/threat/Threat.tsx` — eyebrow → moving counter
- `src/components/solution/Solution.tsx` — eyebrow → serial; remove italic-liquid in headline
- `src/components/comparison/Comparison.tsx` — drop eyebrow, drop glass+glow background, plain headline, copy rewrite, remove top hairline
- `src/components/process/Process.tsx` — drop eyebrow, replace card grid with vertical/horizontal timeline rail (no `surface-glass`), oversized numerals, copy rewrite
- `src/components/proof/Proof.tsx` — eyebrow → date range, plain headline, replace 4-up sector cards with inline run-on sentence + hover links, add photo footnote
- `src/components/cta/FinalCTA.tsx` — drop eyebrow + grid-noise, single-italic headline, microcopy rewrite

## Out of scope

- No changes to `/technology`, `/about`, `/contact`, sectors, insights, footer, or nav
- No new dependencies, no new assets, no design tokens changes (all current CSS variables remain)
- No backend/Supabase changes
