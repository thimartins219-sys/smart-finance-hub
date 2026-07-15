import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { empresa } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/configuracoes")({
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  return (
    <PageShell
      title="Configurações"
      description="Personalize preferências, integrações e políticas financeiras."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="glass border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white font-semibold">Perfil da Empresa</CardTitle>
            <CardDescription>Dados exibidos nos relatórios e no dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Razão Social</Label>
              <Input defaultValue={empresa.nome} className="bg-surface/60 border-border/60" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">CNPJ</Label>
                <Input defaultValue="00.***.***/0001-00" className="bg-surface/60 border-border/60" />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Moeda</Label>
                <Input defaultValue="BRL" className="bg-surface/60 border-border/60" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Período Fiscal Padrão</Label>
              <Input defaultValue={empresa.periodo} className="bg-surface/60 border-border/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white font-semibold">Preferências</CardTitle>
            <CardDescription>Alertas, notificações e comportamento da plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { t: "Alertas de estouro orçamentário", d: "Notificar quando um centro de custo atingir 85%." },
              { t: "Relatório semanal automático", d: "Envio consolidado toda segunda às 08h." },
              { t: "Detecção inteligente de anomalias", d: "IA identifica transações fora do padrão." },
              { t: "Modo alta densidade", d: "Interface compacta para telas de análise." },
            ].map((p, i) => (
              <div key={p.t} className="flex items-start justify-between gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-semibold text-white">{p.t}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{p.d}</div>
                </div>
                <Switch defaultChecked={i < 3} />
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button
                className="text-primary-foreground shadow-[var(--shadow-glow)]"
                style={{ background: "var(--gradient-primary)" }}
                onClick={() => toast.success("Preferências salvas")}
              >
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white font-semibold">Integrações</CardTitle>
            <CardDescription>Conexões com sistemas corporativos</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { n: "SAP S/4HANA", s: "Conectado", ok: true },
              { n: "TOTVS Protheus", s: "Conectado", ok: true },
              { n: "Oracle NetSuite", s: "Disponível", ok: false },
              { n: "Omie", s: "Conectado", ok: true },
              { n: "Bling ERP", s: "Disponível", ok: false },
              { n: "Power BI", s: "Conectado", ok: true },
            ].map((i) => (
              <div key={i.n} className="flex items-center justify-between rounded-xl border border-border/40 bg-surface/50 p-4 transition-all duration-300 hover:border-primary/20">
                <div>
                  <div className="text-sm font-semibold text-white">{i.n}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{i.s}</div>
                </div>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    i.ok ? "bg-[color:var(--positive)] animate-pulse-glow" : "bg-muted-foreground/40"
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
