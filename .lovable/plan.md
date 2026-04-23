

## Multipage Expansion — Water Purification USA

Convert the current single-scroll cinematic into a real business site with proper routing, while preserving the Liquid Futurism aesthetic. New pages mirror the four sectors from the source brand (Home, Office, Hospitality, Medical) and add depth: Technology, Process, News/Insights, About, Contact.

### Site map

```text
/                       Home (current cinematic, condensed — Hero + Threat teaser
                        + Solution teaser + Sectors grid + Proof + News teaser + CTA)
/technology             Deep dive: RO, DI, UF, UV, remineralization, monitoring
/process                How we work: Survey → Test → Design → Install → Maintain
/sectors/home           Whole-home, under-sink, boiling/chilled/sparkling taps
/sectors/office         Workforce hydration, plastic-bottle elimination, ROI calc
/sectors/hospitality    Restaurants, bars, premium taste, sustainability
/sectors/medical        Autoclave, dental chair, decon room, pyrogen-free
/insights               Index of articles (PFAS, lead, microplastics, regulation)
/insights/:slug         Article detail
/about                  Heritage UK→USA, team, certifications, warranty
/contact                Consultation form (existing) + offices + map + phone
/legal/privacy          Privacy
/legal/terms            Terms
*                       NotFound (existing)
```

### Page contents (new)

**Technology** — Stage-by-stage breakdown with scroll-pinned visual per stage (sediment pre-filter, carbon block, RO membrane, DI resin, UV-C, remineralization, smart monitoring). Each stage: micron rating, what it removes, % efficacy, schematic.

**Process** — 5-step horizontal scroller: 1) Free water test (TDS, hardness, chlorine, PFAS panel), 2) Site survey, 3) Custom system design, 4) White-glove installation, 5) Annual service + 5-yr warranty.

**Sector pages** — Each follows same template: hero with sector imagery, problem statement, recommended system, 3 use-case cards, ROI/impact stat band, sector-specific FAQ (4–6 Q&A), CTA to /contact prefilled with sector.

**Insights** — Card grid pulled from a `articles` table (Lovable Cloud). Seed with 6 starter posts based on the source brand's news (Anglian/Thames Water fines, PFAS in everyday items, lead in US schools, microplastics in bottled water, NYC vs LA tap report, the case against bottled water). MDX-like rich content stored as markdown in DB. Tag filter (Regulation / Health / Industry / Guides).

**About** — Founded 1992 London → NYC expansion, manufacturing in UK, certifications (NSF/ANSI 58, 53, 401, WQA Gold Seal — labelled as "pursuing" since unverified), 5-year warranty, leadership row, press logos.

**Contact** — Existing form moved here, expanded with sector dropdown, preferred contact time, optional water-test request checkbox. Includes NYC HQ card with coordinates, phone, hours, embedded map placeholder.

### Navigation & chrome

- **Nav**: replace anchor links with `react-router` NavLinks: Technology · Sectors (mega-menu with 4 sectors + thumbnail) · Insights · About · Contact CTA. Sticky, glass on scroll (current behavior preserved).
- **Footer**: expand to 4 columns — Sectors / Company / Resources (Insights, Process, Technology, FAQ) / Legal + newsletter capture (writes to `newsletter_subscribers` table).
- **PageShell** wrapper component: shared Nav, page-level fade-in, scroll-restoration on route change, animated breadcrumb under Nav (except home).
- **Route transitions**: lightweight Framer Motion fade+rise (250ms) on `<Routes>` location key. No full-screen WebGL wipe (per earlier feedback that big overlays kill the vibe).

### Backend (Lovable Cloud)

New tables (all RLS-on, public read where noted, writes via edge functions):
- `articles` (id, slug unique, title, excerpt, body_md, cover_url, tag, published_at, reading_minutes) — public select where `published_at <= now()`.
- `newsletter_subscribers` (id, email unique, source_page, created_at) — insert via `subscribe-newsletter` edge function with email validation + simple IP rate limit.
- Extend existing `leads` (already exists) with optional `preferred_time`, `wants_water_test` boolean, `sector` enum default already covers the 4 sectors.

Edge functions: `subscribe-newsletter` (zod, dedupe, confirmation email), reuse existing `submit-lead`.

Seed migration inserts 6 starter articles so /insights is populated immediately.

### Technical details

- **Routing**: extend `src/App.tsx` Routes block. Lazy-load each page with `React.lazy` + `Suspense` fallback (skeleton matching layout) to keep initial bundle lean.
- **Shared layout**: `src/components/layout/PageShell.tsx` wraps Nav + `<Outlet/>` + Footer; converted to nested route using `<Route element={<PageShell/>}>`.
- **Scroll restore**: `src/components/layout/ScrollToTop.tsx` listening on `useLocation`.
- **Mega-menu**: shadcn `NavigationMenu` for desktop; slide-down sheet on mobile.
- **SEO per route**: tiny `useDocumentMeta(title, description)` hook updating `<title>` and `<meta name="description">`; OG image stays the hero render.
- **Data fetching**: `src/lib/cms.ts` thin wrapper around `supabase.from('articles')` with `useQuery` (TanStack Query already available). Cache by slug.
- **Forms**: react-hook-form + zod (already on project for ConsultationForm); shared `useLeadSubmit` hook handles sector prefill via query string `?sector=medical`.
- **Tests**: extend `src/test/acts.regression.test.tsx` and add `routes.smoke.test.tsx` asserting each route renders without throwing and Nav links resolve.
- **No design-token changes** — all new pages reuse existing tokens (`--primary`, `--chrome`, `surface-glass`, `bg-gradient-liquid`, fonts).

### Files to add

```text
src/
  App.tsx                                  (extend routes)
  components/layout/
    PageShell.tsx
    ScrollToTop.tsx
    Breadcrumb.tsx
    MegaMenu.tsx
  components/chrome/
    Nav.tsx                                (rewrite to RouterNavLink + mega-menu)
    Footer.tsx                             (4-col + newsletter)
  components/sector/SectorTemplate.tsx
  components/insights/{ArticleCard,TagFilter,ArticleBody}.tsx
  components/forms/NewsletterInline.tsx
  pages/
    Home.tsx                               (refactor of current Index, condensed)
    Technology.tsx
    Process.tsx
    sectors/{Home,Office,Hospitality,Medical}.tsx
    Insights.tsx
    InsightDetail.tsx
    About.tsx
    Contact.tsx
    legal/{Privacy,Terms}.tsx
  lib/{cms.ts, useDocumentMeta.ts, useLeadSubmit.ts}
  test/routes.smoke.test.tsx
supabase/
  migrations/<timestamp>_articles_newsletter.sql
  functions/subscribe-newsletter/index.ts
```

### Files to edit

- `src/App.tsx` (nested routes, Suspense)
- `src/pages/Index.tsx` → renamed to `Home.tsx`, content condensed (drop full-length Threat/Solution acts; show teasers that link to /technology and sector pages)
- `src/components/chrome/Nav.tsx`, `src/components/chrome/Footer.tsx`
- `src/components/form/ConsultationForm.tsx` (sector prefill from query string)

### Out of scope (intentionally)

- Auth / customer portal / quote-tracker (can follow once leads pipeline is validated).
- True CMS editor UI (articles seeded via migration; you can add a `/admin` later behind role check).
- E-commerce / pricing pages (consultative sales model matches the source brand).

