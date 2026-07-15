import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { relatoriosList } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/relatorios")({
  component: RelatoriosPage,
});

function RelatoriosPage() {
  return (
    <PageShell
      title="Relatórios"
      description="Central executiva de relatórios estratégicos e operacionais."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {relatoriosList.map((r, i) => (
          <Card
            key={r.titulo}
            className="glass group border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] animate-count-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:scale-105"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <FileBarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-lg text-white font-semibold">{r.titulo}</CardTitle>
                    <CardDescription className="text-text-secondary mt-1">{r.descricao}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="border-border/60 bg-surface/60 font-semibold uppercase tracking-wider text-[10px]">
                  {r.tipo}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between border-t border-border/40 pt-6">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Período</div>
                  <div className="mt-1.5 text-sm font-semibold text-white">{r.periodo}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/60 hover:border-primary/40 hover:bg-primary-soft/10"
                    onClick={() => toast.success(`Relatório "${r.titulo}" gerado`)}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" /> Gerar
                  </Button>
                  <Button
                    size="sm"
                    className="text-primary-foreground shadow-[var(--shadow-glow)]"
                    style={{ background: "var(--gradient-primary)" }}
                    onClick={() => toast.success("Exportação em andamento")}
                  >
                    <Download className="mr-2 h-4 w-4" /> Exportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
