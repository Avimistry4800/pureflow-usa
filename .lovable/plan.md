

## Restore the Original Cinematic Homepage

Bring back the full single-scroll Hero → Threat → Solution → Proof composition on `/`, while leaving every other part of the multipage site (routes, Nav, Footer, sector pages, Insights CMS, edge functions, ConsultationForm) exactly as it is.

### What changes

**`src/pages/Home.tsx`** — replace the condensed teaser layout with the original act sequence:

```tsx
<Preloader onDone={...} />
<CustomCursor />
<Hero />
<Threat />
<Solution />
<Proof />
```

The `Threat`, `Solution`, and `Proof` components are still in the codebase (`src/components/threat/Threat.tsx`, `src/components/solution/Solution.tsx`, `src/components/proof/Proof.tsx`) — they just stopped being imported. Re-importing them restores the original homepage design with no other refactor needed.

`useDocumentMeta` stays for SEO.

### What stays exactly as-is

- Every route in `src/App.tsx` (`/technology`, `/process`, `/sectors/*`, `/insights/*`, `/about`, `/contact`, `/legal/*`).
- `PageShell` wrapper, `Nav` with mega-menu, 4-column `Footer` with newsletter inline form.
- All sector pages, Insights CMS, `subscribe-newsletter` and `submit-lead` edge functions.
- `articles` and `newsletter_subscribers` tables, `ConsultationForm` sector prefill.
- Breadcrumb, scroll restoration, route fade-rise transition, design tokens, tests.

### Files to edit

- `src/pages/Home.tsx` — single file rewrite (swap teaser sections for `<Threat /> <Solution /> <Proof />`).

### Note on chrome on `/`

`PageShell` currently wraps `/` too, so the homepage will have the new Nav at top and Footer at the bottom of the cinematic scroll. If you'd rather the homepage render bare (no Nav/Footer chrome) like the very first version, say so and I'll lift `/` out of `PageShell` as a top-level route in the same edit — otherwise Nav + Footer remain on `/` per "keep other things as they are".

