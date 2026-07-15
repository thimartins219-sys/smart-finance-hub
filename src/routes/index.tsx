import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Cog,
  ArrowUpRight,
  ArrowDownRight,
  X,
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  brl,
  brlFull,
  evolucaoMensal,
  gastosCategoria,
  kpisDashboard,
} from "@/lib/mock-data";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

// Overriding default saturated colors with premium SaaS oklch values
const CATEGORY_COLORS: Record<string, string> = {
  "Operações": "oklch(0.63 0.21 32)",      // Premium Orange / Amber
  "Compras": "oklch(0.80 0.12 80)",         // Gold
  "Logística": "oklch(0.55 0.18 210)",      // Petrol Blue
  "Administrativo": "oklch(0.55 0.18 280)", // Purple
  "Tecnologia": "oklch(0.70 0.16 155)",     // Emerald Green
};

function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Dynamic calculations for Cross-Filtering (Power BI-like behavior)
  const selectedCategoryData = selectedCategory
    ? gastosCategoria.find((g) => g.categoria === selectedCategory)
    : null;

  const selectedMonthData = selectedMonth
    ? evolucaoMensal.find((m) => m.mes === selectedMonth)
    : null;

  // Base multiplier from selected category
  const categoryMultiplier = selectedCategoryData
    ? selectedCategoryData.valor / kpisDashboard.despesas
    : 1;

  // Base multiplier from selected month
  const monthMultiplier = selectedMonthData
    ? selectedMonthData.despesas / kpisDashboard.despesas
    : 1;

  // Combined calculations
  const dynamicDespesas = selectedCategoryData
    ? selectedCategoryData.valor * (selectedMonthData ? (selectedMonthData.despesas / kpisDashboard.despesas) : 1)
    : kpisDashboard.despesas * monthMultiplier;

  const dynamicReceita = kpisDashboard.receita * (selectedMonthData ? (selectedMonthData.receita / kpisDashboard.receita) : 1);

  const dynamicEconomia = kpisDashboard.economia * categoryMultiplier * monthMultiplier;

  const dynamicOperacionais = (selectedCategory === "Operações" || selectedCategory === "Logística")
    ? (selectedCategoryData?.valor || 0) * monthMultiplier
    : kpisDashboard.operacionais * (selectedCategory ? 0.15 : 1) * monthMultiplier;

  const kpiCards = [
    {
      label: selectedMonth ? `Receita (${selectedMonth})` : "Receita Total",
      value: dynamicReceita,
      delta: "+8,4%",
      up: true,
      icon: Wallet,
      hint: "vs. período anterior",
      accent: "oklch(0.55 0.18 210)", // Petrol Blue
    },
    {
      label: selectedCategory
        ? `Despesa (${selectedCategory}${selectedMonth ? ` - ${selectedMonth}` : ""})`
        : selectedMonth
        ? `Despesa (${selectedMonth})`
        : "Despesas Totais",
      value: dynamicDespesas,
      delta: "+2,2%",
      up: false,
      icon: TrendingDown,
      hint: "consolidado filtrado",
      accent: "oklch(0.63 0.21 32)", // Orange
    },
    {
      label: "Economia Identificada",
      value: dynamicEconomia,
      delta: "+R$ 12k",
      up: true,
      icon: Sparkles,
      hint: "oportunidades mapeadas",
      accent: "oklch(0.70 0.16 155)", // Emerald
    },
    {
      label: "Custos Operacionais",
      value: dynamicOperacionais,
      delta: "-1,8%",
      up: true,
      icon: Cog,
      hint: "otimização em curso",
      accent: "oklch(0.80 0.12 80)", // Gold
    },
  ];

  // Adjust monthly evolution chart to show filtered values
  const filteredEvolucaoMensal = evolucaoMensal.map((m) => {
    const categoryFactor = selectedCategoryData
      ? (selectedCategoryData.valor / kpisDashboard.despesas) * (1 + 0.08 * Math.sin(m.mes.charCodeAt(0)))
      : 1;

    return {
      ...m,
      despesas: m.despesas * categoryFactor,
      receita: selectedCategory ? m.receita * categoryFactor * 1.2 : m.receita,
    };
  });

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedMonth(null);
  };

  // Custom tooltip — Cinematic Glass
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-large backdrop-blur-3xl animate-scale min-w-[200px] border border-white/[0.08]">
          <div className="font-display text-[13px] font-normal italic text-white mb-2.5">{label}</div>
          <div className="space-y-2">
            {payload.map((p: any) => (
              <div key={p.name} className="flex items-center gap-4 justify-between text-[12px]">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
                  <span className="text-white/70">
                    {p.name === "receita" ? "Receita" : p.name === "despesas" ? "Despesas" : p.name}
                  </span>
                </span>
                <span className="font-mono font-semibold text-white text-[11.5px]">{brlFull(p.value)}</span>
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
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
                    {k.label}
                  </span>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `color-mix(in oklch, ${k.accent}, transparent 88%)` }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: k.accent }} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {brl(k.value)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
                      k.up
                        ? "bg-[color:var(--positive)]/8 text-[color:var(--positive)] border border-[color:var(--positive)]/10"
                        : "bg-[color:var(--negative)]/8 text-[color:var(--negative)] border border-[color:var(--negative)]/10"
                    )}
                  >
                    {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </span>
                  <span className="text-muted-foreground/45 font-medium">{k.hint}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts Area */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly evolution AreaChart */}
        <Card className="glass-ethereal lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-display text-[19px] font-normal italic text-white">Evolução Mensal de Despesas</CardTitle>
                <CardDescription className="mt-1">
                  {selectedCategory
                    ? `Filtrado por: ${selectedCategory}`
                    : "Janeiro a Setembro de 2026"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground/60 font-semibold uppercase tracking-wider">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Despesas
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.55_0.18_210)]" /> Receita
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredEvolucaoMensal}
                  onClick={(data) => {
                    if (data && data.activeLabel) {
                      setSelectedMonth(selectedMonth === data.activeLabel ? null : data.activeLabel);
                    }
                  }}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="grad-desp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.63 0.21 32)" stopOpacity={0.24} />
                      <stop offset="100%" stopColor="oklch(0.63 0.21 32)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grad-rec" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.18 210)" stopOpacity={0.20} />
                      <stop offset="100%" stopColor="oklch(0.55 0.18 210)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.025)" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dx={-8}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(1 0 0 / 0.05)", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="oklch(0.55 0.18 210)"
                    fill="url(#grad-rec)"
                    strokeWidth={2}
                    activeDot={{ r: 5, strokeWidth: 0, fill: "oklch(0.55 0.18 210)" }}
                  >
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-area-rec-${index}`} opacity={isSelected ? 1 : 0.20} />;
                    })}
                  </Area>
                  <Area
                    type="monotone"
                    dataKey="despesas"
                    stroke="oklch(0.63 0.21 32)"
                    fill="url(#grad-desp)"
                    strokeWidth={2}
                    activeDot={{ r: 5, strokeWidth: 0, fill: "oklch(0.63 0.21 32)" }}
                  >
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-area-desp-${index}`} opacity={isSelected ? 1 : 0.20} />;
                    })}
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expenses by Category PieChart */}
        <Card className="glass-ethereal">
          <CardHeader>
            <CardTitle className="font-display text-[19px] font-normal italic text-white">Gastos por Categoria</CardTitle>
            <CardDescription className="mt-1">
              {selectedMonth ? `Referente a: ${selectedMonth}` : "Distribuição consolidada"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gastosCategoria}
                    dataKey="valor"
                    nameKey="categoria"
                    innerRadius={62}
                    outerRadius={86}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {gastosCategoria.map((g) => {
                      const isSelected = !selectedCategory || selectedCategory === g.categoria;
                      const displayValue = selectedMonthData
                        ? g.valor * (selectedMonthData.despesas / kpisDashboard.despesas)
                        : g.valor;
                      const color = CATEGORY_COLORS[g.categoria] || g.cor;

                      return (
                        <Cell
                          key={g.categoria}
                          fill={color}
                          value={displayValue}
                          opacity={isSelected ? 1 : 0.15}
                          cursor="pointer"
                          className="transition-all duration-300 outline-none"
                          onClick={() => setSelectedCategory(selectedCategory === g.categoria ? null : g.categoria)}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  {selectedCategory ? "Filtrado" : "Categoria"}
                </span>
                <span className="text-[13.5px] font-bold text-white mt-1 truncate max-w-[120px]">
                  {selectedCategory ? selectedCategory : "Todas"}
                </span>
              </div>
            </div>
            <ul className="mt-5 space-y-1.5">
              {gastosCategoria.map((g) => {
                const isSelected = !selectedCategory || selectedCategory === g.categoria;
                const displayValue = selectedMonthData
                  ? g.valor * (selectedMonthData.despesas / kpisDashboard.despesas)
                  : g.valor;
                const color = CATEGORY_COLORS[g.categoria] || g.cor;

                return (
                  <li
                    key={g.categoria}
                    onClick={() => setSelectedCategory(selectedCategory === g.categoria ? null : g.categoria)}
                    className={cn(
                      "flex items-center justify-between text-[12px] cursor-pointer px-3 py-2 rounded-xl transition-all duration-200 border",
                      selectedCategory === g.categoria
                        ? "bg-white/[0.04] border-white/[0.08] shadow-[0_1px_0_0_oklch(1_0_0/0.04)_inset]"
                        : selectedCategory
                        ? "opacity-25 border-transparent"
                        : "hover:bg-white/[0.02] border-transparent"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                      <span className="text-foreground/80 font-medium">{g.categoria}</span>
                    </span>
                    <span className="font-mono text-[11.5px] text-muted-foreground/60 font-semibold">
                      {brl(displayValue)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts row */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Comparative Revenue vs Expenses BarChart */}
        <Card className="glass-ethereal lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-[19px] font-normal italic text-white">Comparativo Receita × Despesa</CardTitle>
            <CardDescription className="mt-1">Visualização em colunas comparativas dos últimos 9 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredEvolucaoMensal}
                  onClick={(data) => {
                    if (data && data.activeLabel) {
                      setSelectedMonth(selectedMonth === data.activeLabel ? null : data.activeLabel);
                    }
                  }}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.025)" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dx={-8}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 0.01)" }} />
                  
                  <Bar dataKey="receita" fill="oklch(0.55 0.18 210)" radius={[5, 5, 0, 0]} maxBarSize={22}>
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-bar-rec-${index}`} opacity={isSelected ? 1 : 0.15} cursor="pointer" />;
                    })}
                  </Bar>
                  
                  <Bar dataKey="despesas" fill="oklch(0.63 0.21 32)" radius={[5, 5, 0, 0]} maxBarSize={22}>
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-bar-desp-${index}`} opacity={isSelected ? 1 : 0.15} cursor="pointer" />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Financial Performance score */}
        <Card className="glass-ethereal">
          <CardHeader>
            <CardTitle className="font-display text-[19px] font-normal italic text-white">Performance Financeira</CardTitle>
            <CardDescription className="mt-1">Índice consolidado de eficiência</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative flex h-28 w-28 items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" stroke="oklch(1 0 0 / 0.04)" strokeWidth="7" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#gradPerf)"
                    strokeWidth="7"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${0.87 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradPerf" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.63 0.21 32)" />
                      <stop offset="100%" stopColor="oklch(0.80 0.12 80)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <div className="font-display text-[30px] font-normal italic text-white tracking-tight">
                    <AnimatedCounter value={87} duration={900} />
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40 font-bold mt-0.5">score</div>
                </div>
              </div>
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center gap-2 text-[color:var(--positive)] font-semibold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Tendência Positiva</span>
                </div>
                <p className="text-[12px] text-muted-foreground/50 leading-relaxed font-medium">
                  Índice de eficiência, controle e economia consolidado. Acima da meta (85).
                </p>
              </div>
            </div>
            
            {/* Score subindicators */}
            <div className="mt-7 grid grid-cols-3 gap-2.5 text-center text-[12px]">
              {[
                { label: "Controle", value: 92 },
                { label: "Eficiência", value: 85 },
                { label: "Economia", value: 84 },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/[0.012] border border-white/[0.04] p-3 transition-all duration-300 hover:bg-white/[0.025] hover:border-white/[0.06]">
                  <div className="font-mono text-[15px] font-bold text-white">
                    <AnimatedCounter value={s.value} duration={1200} />
                  </div>
                  <div className="text-[8.5px] text-muted-foreground/45 mt-1 font-bold uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
