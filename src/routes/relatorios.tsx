import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { relatoriosList } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/relatorios")({
  component: RelatoriosPage,
});

function getBadgeStyles(tipo: string) {
  if (tipo === "Financeiro") {
    return "border-[oklch(0.55_0.18_210)]/15 bg-[oklch(0.55_0.18_210)]/[0.06] text-[oklch(0.55_0.18_210)]";
  }
  if (tipo === "Executivo") {
    return "border-primary/15 bg-primary/[0.06] text-primary";
  }
  return "border-[oklch(0.70_0.16_155)]/15 bg-[oklch(0.70_0.16_155)]/[0.06] text-[oklch(0.70_0.16_155)]";
}

function RelatoriosPage() {
  return (
    <PageShell
      title="Relatórios"
      description="Central executiva de relatórios estratégicos e operacionais."
    >
      {/* Spacious 2-column layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {relatoriosList.map((r, i) => (
          <Card
            key={r.titulo}
            className="glass-ethereal group transition-all duration-[420ms] hover:-translate-y-[2px] animate-count-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <CardHeader className="pb-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover/card:scale-105"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <FileBarChart className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-[18px] font-normal italic text-white/90">{r.titulo}</CardTitle>
                    <CardDescription className="text-muted-foreground/45 mt-1 font-semibold">{r.descricao}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={cn("font-bold uppercase tracking-wider text-[9px] px-2.5 py-0.5", getBadgeStyles(r.tipo))}>
                  {r.tipo}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-5">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/40 font-bold">Período Fiscal</div>
                  <div className="mt-1.5 text-[12.5px] font-semibold text-white/80">{r.periodo}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success(`Relatório "${r.titulo}" gerado`)}
                    className="h-8.5 rounded-lg active:scale-95"
                  >
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" /> Gerar
                  </Button>
                  <Button
                    size="sm"
                    className="h-8.5 rounded-lg text-primary-foreground shadow-[var(--shadow-glow)] active:scale-95"
                    style={{ background: "var(--gradient-primary)" }}
                    onClick={() => toast.success("Exportação em andamento")}
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar
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
