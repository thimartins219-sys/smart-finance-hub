import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
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
import { brl, centrosCusto } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/centros-custo")({
  component: CentrosCustoPage,
});

// tons de laranja derivados de oklch(0.65 0.145 35)
const ORANGE_TONES = [
  "oklch(0.72 0.16 35)",
  "oklch(0.65 0.145 35)",
  "oklch(0.58 0.13 35)",
  "oklch(0.51 0.115 35)",
  "oklch(0.44 0.10 35)",
  "oklch(0.37 0.085 35)",
];

function statusStyles(s: string) {
  if (s === "Otimizado") return "bg-[color:var(--positive)]/12 text-[color:var(--positive)] border-[color:var(--positive)]/25";
  if (s === "Atenção") return "bg-amber-500/12 text-amber-400 border-amber-500/25";
  return "bg-primary/10 text-primary border-primary/25";
}

function CentrosCustoPage() {
  const dados = useMemo(() => {
    const total = centrosCusto.reduce((s, c) => s + c.utilizado, 0);
    const enriched = centrosCusto.map((c, i) => {
      const participacao = (c.utilizado / total) * 100;
      const varPct = ((c.utilizado - c.anterior) / c.anterior) * 100;
      const consumoPct = (c.utilizado / c.orcamento) * 100;
      return { ...c, participacao, varPct, consumoPct, tone: ORANGE_TONES[i % ORANGE_TONES.length] };
    });
    const ordenados = [...enriched].sort((a, b) => b.utilizado - a.utilizado);
    const maior = ordenados[0];
    const maisEconomico = [...enriched].sort((a, b) => b.savings / b.utilizado - a.savings / a.utilizado)[0];
    const ativos = enriched.filter((c) => c.consumoPct > 0).length;
    return { enriched, ordenados, total, maior, maisEconomico, ativos };
  }, []);

  const maiorValor = dados.ordenados[0].utilizado;

  const kpis = [
    {
      label: "Maior centro de custo",
      value: dados.maior.nome,
      metric: brl(dados.maior.utilizado),
      badge: `${dados.maior.participacao.toFixed(1)}% do total`,
      icon: Trophy,
    },
    {
      label: "Mais econômico",
      value: dados.maisEconomico.nome,
      metric: brl(dados.maisEconomico.savings),
      badge: `${((dados.maisEconomico.savings / dados.maisEconomico.utilizado) * 100).toFixed(1)}% de economia`,
      icon: PiggyBank,
      positive: true,
    },
    {
      label: "Total de centros",
      value: `${dados.enriched.length}`,
      metric: "Unidades ativas",
      badge: "Grupo consolidado",
      icon: Layers,
    },
    {
      label: "Centros ativos",
      value: `${dados.ativos}`,
      metric: "Em execução",
      badge: "Tempo real",
      icon: Activity,
      positive: true,
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

  return (
    <PageShell
      title="Centros de Custo"
      description="Controle financeiro por departamento — visão consolidada, comparativa e inteligente."
      actions={
        <>
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
                <div className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-[26px]">
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
                <CardTitle className="font-display text-lg">Ranking dos Centros de Custo</CardTitle>
                <CardDescription>Ordenados por consumo — clique para inspecionar</CardDescription>
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
              return (
                <div
                  key={c.nome}
                  className="group/row relative rounded-2xl border border-transparent bg-surface/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-surface/50 animate-count-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover/row:scale-110">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{c.nome}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {c.participacao.toFixed(1)}% do total · savings {brl(c.savings)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          up
                            ? "bg-[color:var(--negative)]/12 text-[color:var(--negative)]"
                            : "bg-[color:var(--positive)]/12 text-[color:var(--positive)]"
                        }`}
                      >
                        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(c.varPct).toFixed(1)}%
                      </span>
                      <span className="font-mono text-sm font-semibold tabular-nums">{brl(c.utilizado)}</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface/70">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${barPct}%`,
                        background: `linear-gradient(90deg, ${c.tone}, oklch(0.72 0.16 35))`,
                        boxShadow: "0 0 20px -6px oklch(0.65 0.145 35 / 0.4)",
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
            <CardTitle className="font-display text-lg">Participação dos Centros</CardTitle>
            <CardDescription>Distribuição percentual do orçamento consumido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dados.enriched}
                    dataKey="utilizado"
                    nameKey="nome"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {dados.enriched.map((c) => (
                      <Cell key={c.nome} fill={c.tone} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: 11,
                      boxShadow: "var(--shadow-medium)",
                    }}
                    formatter={(v: number) => brl(v)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total</div>
                <div className="font-display text-xl font-bold">{brl(dados.total)}</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2">
              {dados.enriched.map((c) => (
                <li
                  key={c.nome}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs transition-colors duration-300 hover:bg-surface/50"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.tone }} />
                    <span className="text-foreground/90">{c.nome}</span>
                  </span>
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {c.participacao.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card className="glass mt-6 border-border/40">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-display text-lg">Detalhamento por Centro</CardTitle>
              <CardDescription>Gestores, savings e status operacional</CardDescription>
            </div>
            <Badge variant="outline" className="border-border/50 bg-surface/50">
              Atualizado em tempo real
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-2xl border border-border/40">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 bg-surface/40 hover:bg-surface/40">
                  <TableHead className="text-xs uppercase tracking-wider">Centro</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider">Gestor</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider">Valor</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider">Savings</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider">%</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider">Atualizado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.enriched.map((c) => (
                  <TableRow
                    key={c.nome}
                    className="group/row border-border/30 transition-all duration-300 hover:bg-primary/[0.04]"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center transition-transform duration-300 group-hover/row:scale-110">
                          <Building2 className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <span className="font-medium">{c.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.gestor}</TableCell>
                    <TableCell className="text-right font-mono font-semibold tabular-nums">
                      {brl(c.utilizado)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-[color:var(--positive)]">
                      {brl(c.savings)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                      {c.participacao.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusStyles(c.status)}`}>
                        {c.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{c.atualizado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Insights Inteligentes</h2>
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
