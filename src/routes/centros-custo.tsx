import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Building2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { brl, centrosCusto } from "@/lib/mock-data";

export const Route = createFileRoute("/centros-custo")({
  component: CentrosCustoPage,
});

function CentrosCustoPage() {
  return (
    <PageShell
      title="Centros de Custo"
      description="Consumo orçamentário e desempenho comparativo por setor."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {centrosCusto.map((c, i) => {
          const pct = Math.round((c.utilizado / c.orcamento) * 100);
          const varPct = ((c.utilizado - c.anterior) / c.anterior) * 100;
          const up = varPct > 0;
          const alerta = pct >= 85;

          return (
            <Card
              key={c.nome}
              className="glass border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] animate-count-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-base">{c.nome}</CardTitle>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Centro de custo</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      up
                        ? "bg-[color:var(--negative)]/15 text-[color:var(--negative)]"
                        : "bg-[color:var(--positive)]/15 text-[color:var(--positive)]"
                    }`}
                  >
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(varPct).toFixed(1)}%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Consumo</span>
                    <span className={`font-mono text-sm font-semibold ${alerta ? "text-[color:var(--negative)]" : "text-foreground"}`}>
                      {pct}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-2 bg-surface" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-surface/60 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Orçamento</div>
                    <div className="mt-1 font-mono font-semibold">{brl(c.orcamento)}</div>
                  </div>
                  <div className="rounded-lg bg-surface/60 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Utilizado</div>
                    <div className="mt-1 font-mono font-semibold">{brl(c.utilizado)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="text-muted-foreground">Período anterior</span>
                  <span className="font-mono">{brl(c.anterior)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
