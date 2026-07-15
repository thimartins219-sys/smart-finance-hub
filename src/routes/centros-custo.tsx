import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Download,
  Plus,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Trophy,
  Layers,
  Activity,
  Lightbulb,
  AlertTriangle,
  PiggyBank,
  Target,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { brl, brlFull, centrosCusto } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/centros-custo")({
  component: CentrosCustoPage,
});

// tons de laranja e saffire luxuosos baseados no design system
const LUXE_TONES = [
  "oklch(0.65 0.145 35)", // Laranja Premium
  "oklch(0.78 0.11 85)",   // Dourado Imperial
  "oklch(0.55 0.14 240)",  // Azul Safira
  "oklch(0.65 0.11 190)",  // Turquesa Escuro
  "oklch(0.50 0.15 300)",  // Roxo Imperial
  "oklch(0.62 0.14 140)",  // Verde Esmeralda
];

function statusStyles(s: string) {
  if (s === "Otimizado") return "bg-[color:var(--positive)]/12 text-[color:var(--positive)] border-[color:var(--positive)]/25";
  if (s === "Atenção") return "bg-amber-500/12 text-amber-400 border-amber-500/25";
  return "bg-primary/10 text-primary border-primary/25";
}

function CentrosCustoPage() {
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  const dados = useMemo(() => {
    const total = centrosCusto.reduce((s, c) => s + c.utilizado, 0);
    const enriched = centrosCusto.map((c, i) => {
      const participacao = (c.utilizado / total) * 100;
      const varPct = ((c.utilizado - c.anterior) / c.anterior) * 100;
      const consumoPct = (c.utilizado / c.orcamento) * 100;
      return { ...c, participacao, varPct, consumoPct, tone: LUXE_TONES[i % LUXE_TONES.length] };
    });
    const ordenados = [...enriched].sort((a, b) => b.utilizado - a.utilizado);
    const maior = ordenados[0];
    const maisEconomico = [...enriched].sort((a, b) => b.savings / b.utilizado - a.savings / a.utilizado)[0];
    const ativos = enriched.filter((c) => c.consumoPct > 0).length;
    return { enriched, ordenados, total, maior, maisEconomico, ativos };
  }, []);

  const selectedCenterData = useMemo(() => {
    if (!selectedCenter) return null;
    return dados.enriched.find(c => c.nome === selectedCenter) || null;
  }, [selectedCenter, dados]);

  const maiorValor = dados.ordenados[0].utilizado;

  // Dynamic KPIs that update based on active center selection (Cross-filtering)
  const kpis = [
    {
      label: selectedCenter ? "Centro Selecionado" : "Maior Centro de Custo",
      value: selectedCenterData ? selectedCenterData.nome : dados.maior.nome,
      metric: selectedCenterData ? brl(selectedCenterData.utilizado) : brl(dados.maior.utilizado),
      badge: selectedCenterData
        ? `${selectedCenterData.participacao.toFixed(1)}% do consolidado`
        : `${dados.maior.participacao.toFixed(1)}% do total`,
      icon: Trophy,
    },
    {
      label: selectedCenter ? "Economia do Centro" : "Mais Econômico",
      value: selectedCenterData ? `Savings: ${brl(selectedCenterData.savings)}` : dados.maisEconomico.nome,
      metric: selectedCenterData ? `Gestor: ${selectedCenterData.gestor}` : brl(dados.maisEconomico.savings),
      badge: selectedCenterData
        ? `Consumo: ${selectedCenterData.consumoPct.toFixed(0)}% do orçado`
        : `${((dados.maisEconomico.savings / dados.maisEconomico.utilizado) * 100).toFixed(1)}% de economia`,
      icon: PiggyBank,
      positive: true,
    },
    {
      label: "Total de Centros",
      value: `${dados.enriched.length}`,
      metric: selectedCenter ? "Visualização Filtrada" : "Unidades ativas",
      badge: selectedCenter ? "1 selecionado" : "Grupo consolidado",
      icon: Layers,
    },
    {
      label: selectedCenter ? "Status Operacional" : "Centros Ativos",
      value: selectedCenterData ? selectedCenterData.status : `${dados.ativos}`,
      metric: selectedCenterData ? selectedCenterData.atualizado : "Em execução",
      badge: "Tempo real",
      icon: Activity,
      positive: selectedCenterData ? selectedCenterData.status !== "Atenção" : true,
    },
  ];

  const insights = [
    {
      icon: Target,
      badge: "Concentração",
      text: `${dados.maior.nome} representa ${dados.maior.participacao.toFixed(0)}% do orçamento consolidado.`,
      tone: "primary" as const,
    },
    {
      icon: TrendingDown,
      badge: "Economia",
      text: `Compras reduziu gastos em ${Math.abs(((112400 - 118900) / 118900) * 100).toFixed(0)}% no comparativo mensal.`,
      tone: "positive" as const,
    },
    {
      icon: TrendingUp,
      badge: "Alerta",
      text: "Tecnologia aumentou despesas em 8% — revise contratos SaaS ativos.",
      tone: "warning" as const,
    },
    {
      icon: Lightbulb,
      badge: "Oportunidade",
      text: "Comercial possui o maior potencial de otimização identificado pela IA.",
      tone: "info" as const,
    },
  ];

  // Custom tooltips (Premium Glass design)
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-strong border border-border-strong rounded-xl p-4 shadow-large backdrop-blur-2xl animate-scale">
          <div className="font-display font-medium text-sm text-white mb-2">{data.nome}</div>
          <div className="space-y-1">
            <div className="flex items-center gap-6 justify-between text-xs">
              <span className="text-muted-foreground">Orçamento:</span>
              <span className="font-mono text-white">{brlFull(data.orcamento)}</span>
            </div>
            <div className="flex items-center gap-6 justify-between text-xs">
              <span className="text-muted-foreground">Utilizado:</span>
              <span className="font-mono text-white font-semibold">{brlFull(data.utilizado)}</span>
            </div>
            <div className="flex items-center gap-6 justify-between text-xs">
              <span className="text-muted-foreground">Savings:</span>
              <span className="font-mono text-[color:var(--positive)]">{brlFull(data.savings)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <PageShell
      title="Centros de Custo"
      description="Controle financeiro por departamento — visão consolidada, comparativa e inteligente."
      actions={
        <>
          {selectedCenter && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCenter(null)}
              className="border-primary/30 bg-primary-soft/10 text-primary hover:bg-primary/10 hover:border-primary/50 animate-scale mr-2"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Limpar Filtro
            </Button>
          )}
          <Select defaultValue="set-2026">
            <SelectTrigger className="w-40 bg-surface/50 border-border/50 backdrop-blur">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="set-2026">Setembro 2026</SelectItem>
              <SelectItem value="ago-2026">Agosto 2026</SelectItem>
              <SelectItem value="q3-2026">Q3 2026</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todas">
            <SelectTrigger className="w-40 bg-surface/50 border-border/50 backdrop-blur">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas unidades</SelectItem>
              <SelectItem value="matriz">Matriz</SelectItem>
              <SelectItem value="filial-sp">Filial SP</SelectItem>
              <SelectItem value="filial-rj">Filial RJ</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-border/50 bg-surface/40 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
            onClick={() => toast.success("Exportação iniciada")}
          >
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button
            className="text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:brightness-110"
            style={{ background: "var(--gradient-primary)" }}
            onClick={() => toast.success("Novo centro de custo")}
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Centro
          </Button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card
              key={k.label}
              className="glass group relative overflow-hidden border-border/40 p-1 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] animate-count-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:bg-primary/20" />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    {k.label}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-[26px] text-white">
                  {k.value}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-sm text-foreground/80">{k.metric}</span>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                      k.positive
                        ? "border-[color:var(--positive)]/25 bg-[color:var(--positive)]/10 text-[color:var(--positive)]"
                        : "border-primary/25 bg-primary/10 text-primary"
                    }`}
                  >
                    <Sparkles className="h-3 w-3" /> {k.badge}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ranking + Donut */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Card className="glass border-border/40 lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-display text-lg text-white">Ranking dos Centros de Custo</CardTitle>
                <CardDescription>
                  {selectedCenter
                    ? `Filtrado por: ${selectedCenter} (Clique para redefinir)`
                    : "Ordenados por consumo — clique para inspecionar"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-primary/25 bg-primary/10 text-primary">
                {dados.enriched.length} centros
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {dados.ordenados.map((c, i) => {
              const barPct = (c.utilizado / maiorValor) * 100;
              const up = c.varPct > 0;
              const isSelected = !selectedCenter || selectedCenter === c.nome;

              return (
                <div
                  key={c.nome}
                  onClick={() => setSelectedCenter(selectedCenter === c.nome ? null : c.nome)}
                  className={cn(
                    "group/row relative rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface/50 cursor-pointer animate-count-up",
                    selectedCenter === c.nome
                      ? "border-primary bg-surface/80 shadow-[0_0_20px_-4px_oklch(0.65_0.145_35/0.25)]"
                      : selectedCenter
                      ? "border-transparent bg-surface/10 opacity-40 hover:opacity-80"
                      : "border-transparent bg-surface/30 hover:border-primary/25"
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover/row:scale-110">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-white">{c.nome}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {c.participacao.toFixed(1)}% do total · savings {brl(c.savings)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          up
                            ? "bg-[color:var(--negative)]/12 text-[color:var(--negative)]"
                            : "bg-[color:var(--positive)]/12 text-[color:var(--positive)]"
                        }`}
                      >
                        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(c.varPct).toFixed(1)}%
                      </span>
                      <span className="font-mono text-sm font-semibold tabular-nums text-white">
                        {brl(c.utilizado)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-surface/70">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${barPct}%`,
                        background: `linear-gradient(90deg, ${c.tone}, oklch(0.65 0.145 35))`,
                        boxShadow: isSelected ? "0 0 16px -4px oklch(0.65 0.145 35 / 0.4)" : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass border-border/40 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-lg text-white">Participação dos Centros</CardTitle>
            <CardDescription>Distribuição percentual do orçamento consumido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dados.enriched}
                    dataKey="utilizado"
                    nameKey="nome"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2.5}
                    stroke="none"
                  >
                    {dados.enriched.map((c) => {
                      const isSelected = !selectedCenter || selectedCenter === c.nome;
                      return (
                        <Cell
                          key={c.nome}
                          fill={c.tone}
                          opacity={isSelected ? 1 : 0.25}
                          cursor="pointer"
                          className="outline-none"
                          onClick={() => setSelectedCenter(selectedCenter === c.nome ? null : c.nome)}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  {selectedCenter ? "Selecionado" : "Total"}
                </div>
                <div className="font-display text-xl font-bold text-white mt-0.5">
                  {brl(selectedCenterData ? selectedCenterData.utilizado : dados.total)}
                </div>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {dados.enriched.map((c) => {
                const isSelected = !selectedCenter || selectedCenter === c.nome;
                return (
                  <li
                    key={c.nome}
                    onClick={() => setSelectedCenter(selectedCenter === c.nome ? null : c.nome)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-2 text-xs cursor-pointer transition-all duration-200",
                      selectedCenter === c.nome
                        ? "bg-white/[0.04] border border-white/10"
                        : selectedCenter
                        ? "opacity-35"
                        : "hover:bg-surface/50"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: c.tone }} />
                      <span className="text-foreground/90 font-medium">{c.nome}</span>
                    </span>
                    <span className="font-mono tabular-nums text-text-secondary font-semibold">
                      {c.participacao.toFixed(1)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card className="glass mt-6 border-border/40">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-display text-lg text-white">Detalhamento por Centro</CardTitle>
              <CardDescription>Gestores, savings e status operacional (Clique em uma linha para filtrar)</CardDescription>
            </div>
            <Badge variant="outline" className="border-border/50 bg-surface/50">
              Atualizado em tempo real
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-surface/10">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 bg-surface/40 hover:bg-surface/40">
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Centro</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Gestor</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">Valor</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">Savings</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">%</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Status</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">Atualizado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.enriched.map((c) => {
                  const isSelected = !selectedCenter || selectedCenter === c.nome;
                  return (
                    <TableRow
                      key={c.nome}
                      onClick={() => setSelectedCenter(selectedCenter === c.nome ? null : c.nome)}
                      className={cn(
                        "group/row border-border/30 cursor-pointer transition-all duration-300 hover:bg-primary/[0.04]",
                        selectedCenter === c.nome
                          ? "bg-primary/[0.06] border-l-2 border-l-primary"
                          : selectedCenter
                          ? "opacity-35 hover:opacity-80"
                          : ""
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover/row:scale-110">
                            <Building2 className="h-3.5 w-3.5 text-primary" />
                          </span>
                          <span className="font-semibold text-white">{c.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-text-secondary font-medium">{c.gestor}</TableCell>
                      <TableCell className="text-right font-mono font-semibold tabular-nums text-white">
                        {brl(c.utilizado)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold tabular-nums text-[color:var(--positive)]">
                        {brl(c.savings)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-text-muted">
                        {c.participacao.toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles(c.status)}`}>
                          {c.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-xs text-text-muted">{c.atualizado}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">Insights Inteligentes</h2>
            <p className="text-xs text-muted-foreground">Gerados por IA a partir do consumo consolidado</p>
          </div>
          <Badge variant="outline" className="border-primary/25 bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3 w-3" /> IA
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {insights.map((ins, i) => {
            const Icon = ins.icon;
            const toneClass =
              ins.tone === "positive"
                ? "text-[color:var(--positive)] bg-[color:var(--positive)]/10 border-[color:var(--positive)]/25"
                : ins.tone === "warning"
                ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                : ins.tone === "info"
                ? "text-[color:var(--info)] bg-[color:var(--info)]/10 border-[color:var(--info)]/25"
                : "text-primary bg-primary/10 border-primary/25";
            return (
              <Card
                key={ins.badge + i}
                className="glass group relative overflow-hidden border-border/40 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] animate-count-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <CardContent className="relative p-5">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${toneClass} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${toneClass}`}>
                      {ins.badge}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">{ins.text}</p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <AlertTriangle className="h-3 w-3" /> Ação recomendada disponível
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
