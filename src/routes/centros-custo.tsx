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

const LUXE_TONES = [
  "oklch(0.63 0.21 32)",
  "oklch(0.80 0.12 80)",
  "oklch(0.50 0.18 260)",
  "oklch(0.60 0.12 190)",
  "oklch(0.48 0.16 300)",
  "oklch(0.60 0.15 145)",
];

function statusStyles(s: string) {
  if (s === "Otimizado") return "bg-[color:var(--positive)]/10 text-[color:var(--positive)] border-[color:var(--positive)]/20";
  if (s === "Atenção") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-primary/8 text-primary border-primary/20";
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

  const kpis = [
    {
      label: selectedCenter ? "Centro Selecionado" : "Maior Centro de Custo",
      value: selectedCenterData ? selectedCenterData.nome : dados.maior.nome,
      metric: selectedCenterData ? brl(selectedCenterData.utilizado) : brl(dados.maior.utilizado),
      badge: selectedCenterData
        ? `${selectedCenterData.participacao.toFixed(1)}% do consolidado`
        : `${dados.maior.participacao.toFixed(1)}% do total`,
      icon: Trophy,
      accent: "oklch(0.63 0.21 32)",
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
      accent: "oklch(0.70 0.16 155)",
    },
    {
      label: "Total de Centros",
      value: `${dados.enriched.length}`,
      metric: selectedCenter ? "Visualização Filtrada" : "Unidades ativas",
      badge: selectedCenter ? "1 selecionado" : "Grupo consolidado",
      icon: Layers,
      accent: "oklch(0.50 0.18 260)",
    },
    {
      label: selectedCenter ? "Status Operacional" : "Centros Ativos",
      value: selectedCenterData ? selectedCenterData.status : `${dados.ativos}`,
      metric: selectedCenterData ? selectedCenterData.atualizado : "Em execução",
      badge: "Tempo real",
      icon: Activity,
      positive: selectedCenterData ? selectedCenterData.status !== "Atenção" : true,
      accent: "oklch(0.80 0.12 80)",
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-strong rounded-xl p-4 shadow-large backdrop-blur-3xl animate-scale min-w-[180px]">
          <div className="font-display text-[13px] font-normal italic text-white mb-2.5">{data.nome}</div>
          <div className="space-y-1.5">
            {[
              { l: "Orçamento:", v: brlFull(data.orcamento) },
              { l: "Utilizado:", v: brlFull(data.utilizado), bold: true },
              { l: "Savings:", v: brlFull(data.savings), color: "text-[color:var(--positive)]" },
            ].map((r) => (
              <div key={r.l} className="flex items-center gap-4 justify-between text-[12px]">
                <span className="text-muted-foreground/60">{r.l}</span>
                <span className={cn("font-mono text-[11px]", r.color || "text-white", r.bold && "font-semibold")}>{r.v}</span>
              </div>
            ))}
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
              className="border-primary/25 bg-primary/[0.06] text-primary hover:bg-primary/[0.10] hover:border-primary/40 animate-scale mr-2"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Limpar Filtro
            </Button>
          )}
          <Select defaultValue="set-2026">
            <SelectTrigger className="w-40 bg-white/[0.015] border-white/[0.05]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="set-2026">Setembro 2026</SelectItem>
              <SelectItem value="ago-2026">Agosto 2026</SelectItem>
              <SelectItem value="q3-2026">Q3 2026</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todas">
            <SelectTrigger className="w-40 bg-white/[0.015] border-white/[0.05]">
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
            onClick={() => toast.success("Exportação iniciada")}
          >
            <Download className="mr-2 h-3.5 w-3.5" /> Exportar
          </Button>
          <Button
            className="text-primary-foreground shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-primary)" }}
            onClick={() => toast.success("Novo centro de custo")}
          >
            <Plus className="mr-2 h-3.5 w-3.5" /> Novo Centro
          </Button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card
              key={k.label}
              className="glass-ethereal group relative overflow-hidden transition-all duration-[420ms] hover:-translate-y-[2px] animate-count-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-15 transition-opacity duration-500 group-hover/card:opacity-25"
                style={{ background: k.accent }}
              />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <span className="text-[9px] font-medium uppercase tracking-[0.10em] text-muted-foreground/50">
                    {k.label}
                  </span>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover/card:scale-110"
                    style={{ background: `color-mix(in oklch, ${k.accent}, transparent 88%)` }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: k.accent }} />
                  </div>
                </div>
                <div className="mt-5 font-display text-[22px] font-normal italic tracking-tight text-white">
                  {k.value}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-[12px] text-foreground/60">{k.metric}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      k.positive
                        ? "border-[color:var(--positive)]/20 bg-[color:var(--positive)]/8 text-[color:var(--positive)]"
                        : "border-primary/20 bg-primary/8 text-primary"
                    }`}
                  >
                    <Sparkles className="h-2.5 w-2.5" /> {k.badge}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ranking + Donut */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="glass-ethereal lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-display text-[17px] font-normal italic text-white">Ranking dos Centros de Custo</CardTitle>
                <CardDescription>
                  {selectedCenter
                    ? `Filtrado por: ${selectedCenter}`
                    : "Ordenados por consumo — clique para inspecionar"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="border-primary/20 bg-primary/8 text-primary text-[10px]">
                {dados.enriched.length} centros
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-4">
            {dados.ordenados.map((c, i) => {
              const barPct = (c.utilizado / maiorValor) * 100;
              const up = c.varPct > 0;
              const isSelected = !selectedCenter || selectedCenter === c.nome;

              return (
                <div
                  key={c.nome}
                  onClick={() => setSelectedCenter(selectedCenter === c.nome ? null : c.nome)}
                  className={cn(
                    "group/row relative rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer animate-count-up",
                    selectedCenter === c.nome
                      ? "border-primary/30 bg-primary/[0.06] shadow-[0_0_20px_-6px_oklch(0.63_0.21_32/0.20)]"
                      : selectedCenter
                      ? "border-transparent bg-white/[0.008] opacity-35 hover:opacity-70"
                      : "border-transparent bg-white/[0.015] hover:border-white/[0.06] hover:bg-white/[0.025]"
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover/row:scale-110"
                        style={{ background: `color-mix(in oklch, ${c.tone}, transparent 88%)` }}
                      >
                        <Building2 className="h-3.5 w-3.5" style={{ color: c.tone }} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium text-white">{c.nome}</div>
                        <div className="text-[10px] text-muted-foreground/40 mt-0.5">
                          {c.participacao.toFixed(1)}% do total · savings {brl(c.savings)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          up
                            ? "bg-[color:var(--negative)]/10 text-[color:var(--negative)]"
                            : "bg-[color:var(--positive)]/10 text-[color:var(--positive)]"
                        }`}
                      >
                        {up ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                        {Math.abs(c.varPct).toFixed(1)}%
                      </span>
                      <span className="font-mono text-[13px] font-semibold tabular-nums text-white">
                        {brl(c.utilizado)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.03]">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${barPct}%`,
                        background: `linear-gradient(90deg, ${c.tone}, oklch(0.63 0.21 32))`,
                        boxShadow: isSelected && selectedCenter ? `0 0 12px -2px ${c.tone}` : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass-ethereal lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-[17px] font-normal italic text-white">Participação dos Centros</CardTitle>
            <CardDescription>Distribuição percentual do orçamento consumido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-52 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dados.enriched}
                    dataKey="utilizado"
                    nameKey="nome"
                    innerRadius={65}
                    outerRadius={92}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {dados.enriched.map((c) => {
                      const isSelected = !selectedCenter || selectedCenter === c.nome;
                      return (
                        <Cell
                          key={c.nome}
                          fill={c.tone}
                          opacity={isSelected ? 1 : 0.20}
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
                <div className="text-[8px] uppercase tracking-[0.10em] text-muted-foreground/40 font-medium">
                  {selectedCenter ? "Selecionado" : "Total"}
                </div>
                <div className="font-display text-[19px] font-normal italic text-white mt-0.5">
                  {brl(selectedCenterData ? selectedCenterData.utilizado : dados.total)}
                </div>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5">
              {dados.enriched.map((c) => {
                const isSelected = !selectedCenter || selectedCenter === c.nome;
                return (
                  <li
                    key={c.nome}
                    onClick={() => setSelectedCenter(selectedCenter === c.nome ? null : c.nome)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-2 text-[12px] cursor-pointer transition-all duration-200",
                      selectedCenter === c.nome
                        ? "bg-white/[0.035] border border-white/[0.08]"
                        : selectedCenter
                        ? "opacity-30"
                        : "hover:bg-white/[0.025]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.tone }} />
                      <span className="text-foreground/80 font-medium">{c.nome}</span>
                    </span>
                    <span className="font-mono tabular-nums text-[11px] text-muted-foreground/50 font-medium">
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
      <Card className="glass-ethereal mt-6">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-display text-[17px] font-normal italic text-white">Detalhamento por Centro</CardTitle>
              <CardDescription>Gestores, savings e status operacional</CardDescription>
            </div>
            <Badge variant="outline" className="border-white/[0.06] bg-white/[0.02] text-[9px] text-muted-foreground/50 font-medium">
              Atualizado em tempo real
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.008]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.04] hover:bg-transparent">
                  <TableHead>Centro</TableHead>
                  <TableHead>Gestor</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Savings</TableHead>
                  <TableHead className="text-right">%</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Atualizado</TableHead>
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
                        "group/row border-white/[0.03] cursor-pointer transition-all duration-300 hover:bg-white/[0.015]",
                        selectedCenter === c.nome
                          ? "bg-primary/[0.04]"
                          : selectedCenter
                          ? "opacity-30 hover:opacity-70"
                          : ""
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span
                            className="h-6 w-6 rounded-md flex items-center justify-center transition-transform duration-300 group-hover/row:scale-110"
                            style={{ background: `color-mix(in oklch, ${c.tone}, transparent 88%)` }}
                          >
                            <Building2 className="h-3 w-3" style={{ color: c.tone }} />
                          </span>
                          <span className="font-medium text-white text-[13px]">{c.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground/50 font-medium">{c.gestor}</TableCell>
                      <TableCell className="text-right font-mono font-semibold tabular-nums text-white text-[13px]">
                        {brl(c.utilizado)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold tabular-nums text-[color:var(--positive)] text-[13px]">
                        {brl(c.savings)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums text-muted-foreground/40 text-[12px]">
                        {c.participacao.toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${statusStyles(c.status)}`}>
                          {c.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-[11px] text-muted-foreground/35">{c.atualizado}</TableCell>
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
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-[17px] font-normal italic text-white">Insights Inteligentes</h2>
            <p className="text-[12px] text-muted-foreground/40 mt-0.5">Gerados por IA a partir do consumo consolidado</p>
          </div>
          <Badge variant="outline" className="border-primary/20 bg-primary/8 text-primary text-[10px]">
            <Sparkles className="mr-1 h-2.5 w-2.5" /> IA
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {insights.map((ins, i) => {
            const Icon = ins.icon;
            const toneClass =
              ins.tone === "positive"
                ? "text-[color:var(--positive)] bg-[color:var(--positive)]/8 border-[color:var(--positive)]/20"
                : ins.tone === "warning"
                ? "text-amber-400 bg-amber-500/8 border-amber-500/20"
                : ins.tone === "info"
                ? "text-[color:var(--info)] bg-[color:var(--info)]/8 border-[color:var(--info)]/20"
                : "text-primary bg-primary/8 border-primary/20";
            return (
              <Card
                key={ins.badge + i}
                className="glass-ethereal group transition-all duration-[420ms] hover:-translate-y-[2px] animate-count-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <CardContent className="relative p-5">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${toneClass} transition-transform duration-300 group-hover/card:scale-110`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <Badge variant="outline" className={`text-[9px] uppercase tracking-wider ${toneClass}`}>
                      {ins.badge}
                    </Badge>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-foreground/80">{ins.text}</p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-muted-foreground/30 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                    <AlertTriangle className="h-2.5 w-2.5" /> Ação recomendada disponível
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
