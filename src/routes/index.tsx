import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Cog,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  brl,
  brlFull,
  evolucaoMensal,
  gastosCategoria,
  kpisDashboard,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const kpiCards = [
  {
    label: "Receita Total",
    value: kpisDashboard.receita,
    delta: "+8,4%",
    up: true,
    icon: Wallet,
    hint: "vs. período anterior",
  },
  {
    label: "Despesas Totais",
    value: kpisDashboard.despesas,
    delta: "+2,2%",
    up: false,
    icon: TrendingDown,
    hint: "acumulado no mês",
  },
  {
    label: "Economia Identificada",
    value: kpisDashboard.economia,
    delta: "+R$ 12k",
    up: true,
    icon: Sparkles,
    hint: "oportunidades mapeadas",
  },
  {
    label: "Custos Operacionais",
    value: kpisDashboard.operacionais,
    delta: "-1,8%",
    up: true,
    icon: Cog,
    hint: "otimização em curso",
  },
];

function DashboardPage() {
  return (
    <PageShell
      title="Dashboard Executivo"
      description="Visão estratégica consolidada das finanças corporativas em tempo real."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card
              key={k.label}
              className="glass relative overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] animate-count-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {k.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {brl(k.value)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                      k.up ? "bg-[color:var(--positive)]/15 text-[color:var(--positive)]" : "bg-[color:var(--negative)]/15 text-[color:var(--negative)]"
                    }`}
                  >
                    {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </span>
                  <span className="text-muted-foreground">{k.hint}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass border-border/60 lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-display">Evolução mensal de despesas</CardTitle>
                <CardDescription>Janeiro a Setembro de 2026</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Despesas
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--info)]" /> Receita
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolucaoMensal}>
                  <defs>
                    <linearGradient id="grad-desp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.19 45)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="oklch(0.72 0.19 45)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grad-rec" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.16 245)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.68 0.16 245)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis dataKey="mes" stroke="oklch(0.68 0.02 260)" fontSize={12} />
                  <YAxis
                    stroke="oklch(0.68 0.02 260)"
                    fontSize={12}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.185 0.014 260)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 12,
                      color: "white",
                    }}
                    formatter={(v: number) => brlFull(v)}
                  />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="oklch(0.68 0.16 245)"
                    fill="url(#grad-rec)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="despesas"
                    stroke="oklch(0.72 0.19 45)"
                    fill="url(#grad-desp)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/60">
          <CardHeader>
            <CardTitle className="font-display">Gastos por categoria</CardTitle>
            <CardDescription>Distribuição atual do mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gastosCategoria}
                    dataKey="valor"
                    nameKey="categoria"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {gastosCategoria.map((g) => (
                      <Cell key={g.categoria} fill={g.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.185 0.014 260)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 12,
                      color: "white",
                    }}
                    formatter={(v: number) => brlFull(v)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1.5">
              {gastosCategoria.map((g) => (
                <li key={g.categoria} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: g.cor }} />
                    <span className="text-foreground/90">{g.categoria}</span>
                  </span>
                  <span className="font-mono text-muted-foreground">{brl(g.valor)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Comparativo receita × despesa</CardTitle>
            <CardDescription>Últimos 9 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evolucaoMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis dataKey="mes" stroke="oklch(0.68 0.02 260)" fontSize={12} />
                  <YAxis
                    stroke="oklch(0.68 0.02 260)"
                    fontSize={12}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.185 0.014 260)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 12,
                      color: "white",
                    }}
                    formatter={(v: number) => brlFull(v)}
                  />
                  <Bar dataKey="receita" fill="oklch(0.68 0.16 245)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="despesas" fill="oklch(0.72 0.19 45)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/60">
          <CardHeader>
            <CardTitle className="font-display">Performance financeira</CardTitle>
            <CardDescription>Índice consolidado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
                  <circle
                    cx="50" cy="50" r="42" stroke="url(#gradPerf)" strokeWidth="10" fill="none"
                    strokeLinecap="round" strokeDasharray={`${0.87 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                  />
                  <defs>
                    <linearGradient id="gradPerf" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.19 45)" />
                      <stop offset="100%" stopColor="oklch(0.78 0.21 55)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <div className="font-display text-2xl font-bold">87</div>
                  <div className="text-[10px] text-muted-foreground">score</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[color:var(--positive)]">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Tendência positiva</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Índice combinado de eficiência, controle e economia. Acima da meta do trimestre (85).
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-surface/60 p-2">
                <div className="font-mono text-sm font-semibold">92</div>
                <div className="text-muted-foreground">Controle</div>
              </div>
              <div className="rounded-lg bg-surface/60 p-2">
                <div className="font-mono text-sm font-semibold">85</div>
                <div className="text-muted-foreground">Eficiência</div>
              </div>
              <div className="rounded-lg bg-surface/60 p-2">
                <div className="font-mono text-sm font-semibold">84</div>
                <div className="text-muted-foreground">Economia</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
