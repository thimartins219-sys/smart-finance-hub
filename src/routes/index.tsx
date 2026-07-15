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

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

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
    },
    {
      label: "Economia Identificada",
      value: dynamicEconomia,
      delta: "+R$ 12k",
      up: true,
      icon: Sparkles,
      hint: "oportunidades mapeadas",
    },
    {
      label: "Custos Operacionais",
      value: dynamicOperacionais,
      delta: "-1,8%",
      up: true,
      icon: Cog,
      hint: "otimização em curso",
    },
  ];

  // Adjust monthly evolution chart to show filtered values
  const filteredEvolucaoMensal = evolucaoMensal.map((m) => {
    // Generate a visual breakdown based on the selected category with subtle fluctuations
    const categoryFactor = selectedCategoryData
      ? (selectedCategoryData.valor / kpisDashboard.despesas) * (1 + 0.08 * Math.sin(m.mes.charCodeAt(0)))
      : 1;

    return {
      ...m,
      despesas: m.despesas * categoryFactor,
      // If a category is selected, scale down the revenue for visual proportion
      receita: selectedCategory ? m.receita * categoryFactor * 1.2 : m.receita,
    };
  });

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedMonth(null);
  };

  // Custom tooltips (Premium Glass design)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong border border-border-strong rounded-xl p-4 shadow-large backdrop-blur-2xl animate-scale">
          <div className="font-display font-medium text-sm text-white mb-2">{label}</div>
          <div className="space-y-1.5">
            {payload.map((p: any) => (
              <div key={p.name} className="flex items-center gap-6 justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
                  <span className="text-muted-foreground capitalize">
                    {p.name === "receita" ? "Receita" : p.name === "despesas" ? "Despesas" : p.name}
                  </span>
                </span>
                <span className="font-mono font-semibold text-white">{brlFull(p.value)}</span>
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
      actions={
        (selectedCategory || selectedMonth) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="border-primary/30 bg-primary-soft/10 text-primary hover:bg-primary/10 hover:border-primary/50 animate-scale"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Limpar Filtros
            {selectedCategory && <span className="ml-1 font-semibold">({selectedCategory})</span>}
            {selectedMonth && <span className="ml-1 font-semibold">[{selectedMonth}]</span>}
          </Button>
        )
      }
    >
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((k, i) => {
          const Icon = k.icon;
          return (
            <Card
              key={k.label}
              className="glass relative overflow-hidden transition-all duration-300 animate-count-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:bg-primary/20" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground/80 font-medium">
                    {k.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-metric font-semibold text-2xl md:text-3xl tracking-tight text-white mt-1">
                  {brl(k.value)}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                      k.up
                        ? "bg-[color:var(--positive)]/12 text-[color:var(--positive)]"
                        : "bg-[color:var(--negative)]/12 text-[color:var(--negative)]"
                    }`}
                  >
                    {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </span>
                  <span className="text-text-muted">{k.hint}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts Area */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Monthly evolution AreaChart */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-display text-lg text-white">Evolução Mensal de Despesas</CardTitle>
                <CardDescription>
                  {selectedCategory
                    ? `Filtrado por: ${selectedCategory} (Clique nos pontos ou barras para filtrar por mês)`
                    : "Janeiro a Setembro de 2026 (Clique nos pontos para filtrar por mês)"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Despesas
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--info)]" /> Receita
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
                      <stop offset="0%" stopColor="oklch(0.65 0.145 35)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(0.65 0.145 35)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grad-rec" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.12 235)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="oklch(0.68 0.12 235)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    stroke="var(--text-muted)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dx={-8}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(1 0 0 / 0.08)", strokeWidth: 1.5 }} />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="oklch(0.68 0.12 235)"
                    fill="url(#grad-rec)"
                    strokeWidth={2.5}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  >
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-area-rec-${index}`} opacity={isSelected ? 1 : 0.3} />;
                    })}
                  </Area>
                  <Area
                    type="monotone"
                    dataKey="despesas"
                    stroke="oklch(0.65 0.145 35)"
                    fill="url(#grad-desp)"
                    strokeWidth={2.5}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  >
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-area-desp-${index}`} opacity={isSelected ? 1 : 0.3} />;
                    })}
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expenses by Category PieChart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white">Gastos por Categoria</CardTitle>
            <CardDescription>
              {selectedMonth ? `Referente a: ${selectedMonth}` : "Distribuição consolidada do mês"}
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
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {gastosCategoria.map((g) => {
                      const isSelected = !selectedCategory || selectedCategory === g.categoria;
                      // Dynamic value matching selected month
                      const displayValue = selectedMonthData
                        ? g.valor * (selectedMonthData.despesas / kpisDashboard.despesas)
                        : g.valor;

                      return (
                        <Cell
                          key={g.categoria}
                          fill={g.cor}
                          value={displayValue}
                          opacity={isSelected ? 1 : 0.25}
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
              {selectedCategory && (
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Filtrado
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5 truncate max-w-[120px]">
                    {selectedCategory}
                  </span>
                </div>
              )}
            </div>
            <ul className="mt-4 space-y-2">
              {gastosCategoria.map((g) => {
                const isSelected = !selectedCategory || selectedCategory === g.categoria;
                const displayValue = selectedMonthData
                  ? g.valor * (selectedMonthData.despesas / kpisDashboard.despesas)
                  : g.valor;

                return (
                  <li
                    key={g.categoria}
                    onClick={() => setSelectedCategory(selectedCategory === g.categoria ? null : g.categoria)}
                    className={cn(
                      "flex items-center justify-between text-xs cursor-pointer px-2.5 py-1.5 rounded-lg transition-all duration-200",
                      selectedCategory === g.categoria
                        ? "bg-white/[0.04] border border-white/10"
                        : selectedCategory
                        ? "opacity-35"
                        : "hover:bg-white/[0.03]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: g.cor }} />
                      <span className="text-foreground/90 font-medium">{g.categoria}</span>
                    </span>
                    <span className="font-mono text-text-secondary font-semibold">{brl(displayValue)}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Comparative Revenue vs Expenses BarChart */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white">Comparativo Receita × Despesa</CardTitle>
            <CardDescription>Visualização em colunas comparativas dos últimos 9 meses</CardDescription>
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
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    stroke="var(--text-muted)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="var(--text-muted)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dx={-8}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 0.015)" }} />
                  
                  {/* Revenue Bar (Sapphire Blue look) */}
                  <Bar dataKey="receita" fill="oklch(0.55 0.14 240)" radius={[4, 4, 0, 0]} maxBarSize={28}>
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-bar-rec-${index}`} opacity={isSelected ? 1 : 0.25} cursor="pointer" />;
                    })}
                  </Bar>
                  
                  {/* Expense Bar (Premium Orange look) */}
                  <Bar dataKey="despesas" fill="oklch(0.65 0.145 35)" radius={[4, 4, 0, 0]} maxBarSize={28}>
                    {filteredEvolucaoMensal.map((entry, index) => {
                      const isSelected = !selectedMonth || selectedMonth === entry.mes;
                      return <Cell key={`cell-bar-desp-${index}`} opacity={isSelected ? 1 : 0.25} cursor="pointer" />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Financial Performance score */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white">Performance Financeira</CardTitle>
            <CardDescription>Índice consolidado de eficiência</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-5">
              <div className="relative flex h-28 w-28 items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" stroke="oklch(1 0 0 / 0.08)" strokeWidth="9.5" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#gradPerf)"
                    strokeWidth="9.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${0.87 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradPerf" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.145 35)" />
                      <stop offset="100%" stopColor="oklch(0.78 0.11 85)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <div className="font-display text-3xl font-bold text-white tracking-tight">87</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80">score</div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-[color:var(--positive)] font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  <span>Tendência Positiva</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Índice combinado de eficiência, controle e economia corporativa. Acima da meta do trimestre (85).
                </p>
              </div>
            </div>
            
            {/* Score subindicators */}
            <div className="mt-6 grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="rounded-xl bg-surface/50 border border-border-soft p-3 transition-all duration-300 hover:bg-surface/80">
                <div className="font-mono text-base font-bold text-white">92</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">Controle</div>
              </div>
              <div className="rounded-xl bg-surface/50 border border-border-soft p-3 transition-all duration-300 hover:bg-surface/80">
                <div className="font-mono text-base font-bold text-white">85</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">Eficiência</div>
              </div>
              <div className="rounded-xl bg-surface/50 border border-border-soft p-3 transition-all duration-300 hover:bg-surface/80">
                <div className="font-mono text-base font-bold text-white">84</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">Economia</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
