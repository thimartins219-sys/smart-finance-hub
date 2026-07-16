# The Econommy — Product Experience Rebuild

Transform the app from a multi-page dashboard into a **single continuous scroll experience** (Apple/Stripe/Linear feel), preserving all data, mock structures, charts data, and React architecture.

## Scope

**Keep:** `src/lib/mock-data.ts`, chart data, TanStack Router shell, QueryClient, shadcn primitives (Button, Card, Badge, Table, etc.), business logic.

**Discard:** Sidebar, traditional Header, page-based navigation, existing PageShell composition, current dense dark aesthetic, per-route layouts.

## New Architecture

Single route (`/`) becomes a scroll-driven narrative. Other routes (`/gastos`, `/centros-custo`, etc.) redirect to `/#<section>` for backwards compatibility.

### Sections (each ~100vh, own personality)
1. **Hero** — Animated shader/gradient background, huge display type, typewriter tagline, floating glass KPI cards with mouse parallax, live counters, scroll indicator.
2. **Executive Overview** — Split editorial layout, animated headline reveal.
3. **Financial KPIs** — Asymmetric floating cards, count-up numbers, hover glow.
4. **Revenue Analytics** — Full-bleed animated area chart, gradient fill, viewport-drawn line.
5. **Expenses Analytics** — Alternating layout with animated bars.
6. **Cash Flow** — Centered composition, animated flow lines.
7. **Categories** — Animated donut + legend reveal.
8. **Cost Centers** — Interactive Logs Table style (animated sort/filter/hover rows on glass).
9. **Performance Indicators** — Bento-grid of animated gauge/spark cards.
10. **Forecast** — Projected line chart with dashed animated forecast segment.
11. **AI Insights** — Typewriter reveal for insights, tilt cards.
12. **Reports** — Editorial card grid, hover lift.
13. **Settings** — Minimal centered form preview.
14. **Footer** — Brand mark, links, ambient gradient.

### Navigation
- **Floating glass top nav** (auto-hides, blurred). Center: section title, right: dot indicator column (fixed right edge) showing active section + smooth-scroll on click.
- **Scroll progress bar** at top (thin gradient).
- Old sidebar removed entirely from `__root.tsx`.

### Motion Language
- Framer Motion (`motion` package) for all reveals: `whileInView`, spring transitions, staggered children.
- `useScroll` + `useTransform` for hero compression, parallax, section pinning.
- Count-up hook for numbers.
- Typewriter component for premium moments (hero tagline, section headlines, AI insights).
- Cursor-tracking spotlight already present on Card — retained.

### Visual Direction
- **Bright** premium palette: off-white background (`oklch(0.98 0.005 90)`), soft neutral surfaces, deep ink text, orange + electric blue + emerald + purple accents used sparingly.
- Keep the existing orange as primary accent; add electric blue + emerald + purple as secondary accents in tokens.
- Typography: **Geist** (body/UI) + **Instrument Serif** (display) — already loaded, expand usage. Much larger headings (clamp up to ~120px display).
- Animated ambient background layer: gradient mesh + subtle noise + slow-moving glow blobs (CSS-only, GPU-friendly).

## Technical Plan

### Files to add
- `src/components/experience/FloatingNav.tsx` — glass top nav + right-side dot indicator + scroll progress.
- `src/components/experience/AmbientBackground.tsx` — animated mesh/noise (fixed, behind everything).
- `src/components/experience/Section.tsx` — wrapper with `id`, snap, reveal animations.
- `src/components/experience/Typewriter.tsx` — reusable.
- `src/components/experience/CountUp.tsx` — reusable hook/component.
- `src/components/experience/TiltCard.tsx` — mouse-tilt wrapper for KPI cards.
- `src/components/experience/sections/Hero.tsx`
- `src/components/experience/sections/ExecutiveOverview.tsx`
- `src/components/experience/sections/FinancialKPIs.tsx`
- `src/components/experience/sections/RevenueAnalytics.tsx`
- `src/components/experience/sections/ExpensesAnalytics.tsx`
- `src/components/experience/sections/CashFlow.tsx`
- `src/components/experience/sections/Categories.tsx`
- `src/components/experience/sections/CostCenters.tsx` (interactive logs table)
- `src/components/experience/sections/PerformanceIndicators.tsx`
- `src/components/experience/sections/Forecast.tsx`
- `src/components/experience/sections/AIInsights.tsx`
- `src/components/experience/sections/Reports.tsx`
- `src/components/experience/sections/Settings.tsx`
- `src/components/experience/sections/Footer.tsx`

### Files to change
- `src/routes/index.tsx` — becomes the single-experience page composing all sections.
- `src/routes/__root.tsx` — remove Sidebar/AppHeader; keep intro + toaster; add `<AmbientBackground />` and `<FloatingNav />`.
- Legacy routes (`gastos`, `centros-custo`, `relatorios`, `indicadores`, `configuracoes`) — replace with a tiny redirect to `/#<section>`.
- `src/styles.css` — new bright palette tokens (kept alongside existing dark tokens under a new default), display-size utilities, snap utilities, scrollbar polish.

### Dependencies
- Add `motion` (Framer Motion successor, tree-shakeable) if not present.

### Preservation
- All arrays in `mock-data.ts` are reused as-is in the new sections.
- Recharts kept for chart primitives; wrapped with `whileInView` for entrance animation.
- Business logic / QueryClient / router setup untouched.

## Non-Goals
- No new backend, no auth, no schema changes.
- No changes to shadcn primitive APIs (only usage & new wrapper components).

## Success criteria
- Loading `/` on any viewport height shows Hero at 100vh with animated background and floating KPI cards.
- Smooth scroll reveals each section with a distinct entrance.
- Right-edge dot nav highlights active section and smooth-scrolls on click.
- No sidebar, no per-page navigation.
- 60fps on modern hardware; animations use transform/opacity only.
