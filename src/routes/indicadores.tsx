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

export const Route = createFileRoute("/indicadores")({
  component: IndicadoresPage,
});

const radialData = [
  { name: "Meta", value: 87, fill: "oklch(0.65 0.145 35)" },
];

function IndicadoresPage() {
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
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-muted-foreground capitalize">
                    {p.name === "eficiencia" ? "Eficiência" : "Economia"}
                  </span>
                </span>
                <span className="font-mono font-semibold text-white">
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((k, i) => {
          const up = k.tendencia === "up";
          return (
            <Card
              key={k.titulo}
              className="glass relative overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 animate-count-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:bg-primary/20" />
              <CardHeader className="pb-2">
                <CardDescription className="uppercase tracking-widest text-[10px] font-semibold text-text-muted">
                  {k.titulo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-3xl font-semibold tracking-tight text-white mt-1">
                  {k.valor}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                      up
                        ? "bg-[color:var(--positive)]/12 text-[color:var(--positive)]"
                        : "bg-[color:var(--negative)]/12 text-[color:var(--negative)]"
                    }`}
                  >
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </span>
                  <span className="text-text-muted">{k.descricao}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Evolution curve Area/Line chart */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white">Evolução dos KPIs</CardTitle>
            <CardDescription>Eficiência operacional e economia acumulada (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpiSerie} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(1 0 0 / 0.08)", strokeWidth: 1.5 }} />
                  
                  {/* Eficiência (Sapphire Blue look) */}
                  <Line
                    type="monotone"
                    name="eficiencia"
                    dataKey="eficiencia"
                    stroke="oklch(0.55 0.14 240)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 0, fill: "oklch(0.55 0.14 240)" }}
                    activeDot={{ r: 6 }}
                  />
                  
                  {/* Economia (Premium Orange look) */}
                  <Line
                    type="monotone"
                    name="economia"
                    dataKey="economia"
                    stroke="oklch(0.65 0.145 35)"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 0, fill: "oklch(0.65 0.145 35)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radial Target score */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display text-lg text-white">Meta Trimestral</CardTitle>
            <CardDescription>Score de performance consolidado</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-56 w-full relative flex items-center justify-center">
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
                      <stop offset="0%" stopColor="oklch(0.65 0.145 35)" />
                      <stop offset="100%" stopColor="oklch(0.78 0.11 85)" />
                    </linearGradient>
                  </defs>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <div className="font-display text-3xl font-bold text-white tracking-tight">87</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80 font-medium">score</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="font-display text-2xl font-bold text-white">87 / 100</div>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">
                Superando a meta trimestral de 85 pontos estabelecida pelo board.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
