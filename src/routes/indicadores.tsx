import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { brlFull, kpis, kpiSerie } from "@/lib/mock-data";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export const Route = createFileRoute("/indicadores")({
  component: IndicadoresPage,
});

const radialData = [
  { name: "Meta", value: 87, fill: "oklch(0.63 0.21 32)" },
];

// Helper to parse metric value and return raw number and custom formatter
function parseKpiMetric(valueStr: string) {
  if (valueStr.includes("%")) {
    const val = parseFloat(valueStr.replace(",", ".").replace("%", ""));
    return {
      value: val,
      formatter: (v: number) => v.toFixed(1).replace(".", ",") + "%"
    };
  }
  if (valueStr.includes("R$")) {
    const val = parseFloat(valueStr.replace("R$ ", "").replace("k", ""));
    return {
      value: val,
      formatter: (v: number) => `R$ ${Math.round(v)}k`
    };
  }
  if (valueStr.includes("x")) {
    const val = parseFloat(valueStr.replace(",", ".").replace("x", ""));
    return {
      value: val,
      formatter: (v: number) => v.toFixed(1).replace(".", ",") + "x"
    };
  }
  return {
    value: parseFloat(valueStr) || 0,
    formatter: (v: number) => v.toString()
  };
}

function IndicadoresPage() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-large backdrop-blur-3xl animate-scale min-w-[180px] border border-white/[0.08]">
          <div className="font-display text-[13px] font-normal italic text-white mb-2.5">{label}</div>
          <div className="space-y-2">
            {payload.map((p: any) => (
              <div key={p.name} className="flex items-center gap-4 justify-between text-[12px]">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-white/70">
                    {p.name === "eficiencia" ? "Eficiência" : "Economia"}
                  </span>
                </span>
                <span className="font-mono font-semibold text-white text-[11.5px]">
                  {p.name === "eficiencia" ? `${p.value}%` : `R$ ${p.value}k`}
                </span>
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
      title="Indicadores"
      description="KPIs estratégicos que guiam a tomada de decisão financeira."
    >
      {/* KPIs Grid - Increased gaps for premium breathability */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((k, i) => {
          const up = k.tendencia === "up";
          const { value, formatter } = parseKpiMetric(k.valor);

          return (
            <Card
              key={k.titulo}
              className="glass-ethereal relative overflow-hidden transition-all duration-[420ms] hover:-translate-y-[2px] animate-count-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-3xl" />
              <CardHeader className="pb-1">
                <CardDescription className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
                  {k.titulo}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="font-mono text-[26px] font-bold tracking-tight text-white mt-1">
                  <AnimatedCounter value={value} formatter={formatter} duration={900} />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px]">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
                      up
                        ? "bg-[color:var(--positive)]/8 text-[color:var(--positive)] border border-[color:var(--positive)]/10"
                        : "bg-[color:var(--negative)]/8 text-[color:var(--negative)] border border-[color:var(--negative)]/10"
                    )}
                  >
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </span>
                  <span className="text-muted-foreground/45 font-medium">{k.descricao}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Evolution curve */}
        <Card className="glass-ethereal lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-[19px] font-normal italic text-white">Evolução dos KPIs</CardTitle>
            <CardDescription className="mt-1 font-medium">Eficiência operacional e economia acumulada (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpiSerie} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(1 0 0 / 0.05)", strokeWidth: 1 }} />
                  
                  <Line
                    type="monotone"
                    name="eficiencia"
                    dataKey="eficiencia"
                    stroke="oklch(0.55 0.18 210)"
                    strokeWidth={2}
                    dot={{ r: 3.5, strokeWidth: 0, fill: "oklch(0.55 0.18 210)" }}
                    activeDot={{ r: 5, strokeWidth: 0, fill: "oklch(0.55 0.18 210)" }}
                  />
                  
                  <Line
                    type="monotone"
                    name="economia"
                    dataKey="economia"
                    stroke="oklch(0.63 0.21 32)"
                    strokeWidth={2}
                    dot={{ r: 3.5, strokeWidth: 0, fill: "oklch(0.63 0.21 32)" }}
                    activeDot={{ r: 5, strokeWidth: 0, fill: "oklch(0.63 0.21 32)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radial Target score */}
        <Card className="glass-ethereal">
          <CardHeader>
            <CardTitle className="font-display text-[19px] font-normal italic text-white">Meta Trimestral</CardTitle>
            <CardDescription className="mt-1">Score de performance consolidado</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-52 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="75%"
                  outerRadius="105%"
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background dataKey="value" cornerRadius={20}>
                    <Cell fill="url(#radialGrad)" />
                  </RadialBar>
                  <defs>
                    <linearGradient id="radialGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.63 0.21 32)" />
                      <stop offset="100%" stopColor="oklch(0.80 0.12 80)" />
                    </linearGradient>
                  </defs>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <div className="font-display text-[30px] font-normal italic text-white tracking-tight">
                  <AnimatedCounter value={87} duration={900} />
                </div>
                <div className="text-[8px] uppercase tracking-[0.14em] text-muted-foreground/45 font-bold mt-0.5">score</div>
              </div>
            </div>
            <div className="text-center mt-3">
              <div className="font-display text-[22px] font-normal italic text-white/90">
                <AnimatedCounter value={87} /> / 100
              </div>
              <p className="mt-3 text-[12px] text-muted-foreground/45 leading-relaxed font-semibold">
                Superando a meta trimestral de 85 pontos estabelecida pelo board.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
