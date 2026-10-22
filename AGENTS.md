<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- The app is a single scrolling page (`src/routes/index.tsx`) composed of functional section modules in `src/components/experience/modules.tsx`; each module's `id` must match an entry in `NAV_SECTIONS` in `__root.tsx` — the floating nav scrolls to those ids.
- Legacy page URLs (/gastos, /centros-custo, /relatorios, /indicadores, /configuracoes) only redirect to section hashes on `/` — keep them so old links keep working.
- Data is local demo data in `src/lib/mock-data.ts` (no backend); remove fields there when no module reads them.
