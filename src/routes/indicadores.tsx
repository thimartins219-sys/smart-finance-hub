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
} from "recharts";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { kpis, kpiSerie } from "@/lib/mock-data";

export const Route = createFileRoute("/indicadores")({
  component: IndicadoresPage,
});

const radialData = [
  { name: "Meta", value: 87, fill: "oklch(0.65 0.145 35)" },
];

function IndicadoresPage() {
  return (
    <PageShell
      title="Indicadores"
      description="KPIs estratégicos que guiam a tomada de decisão financeira."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((k, i) => {
          const up = k.tendencia === "up";
          return (
            <Card
              key={k.titulo}
              className="glass relative overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] animate-count-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <CardHeader className="pb-2">
                <CardDescription className="uppercase tracking-widest text-[10px]">
                  {k.titulo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold tracking-tight">{k.valor}</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                      up
                        ? "bg-[color:var(--positive)]/15 text-[color:var(--positive)]"
                        : "bg-[color:var(--negative)]/15 text-[color:var(--negative)]"
                    }`}
                  >
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </span>
                  <span className="text-muted-foreground">{k.descricao}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Evolução dos KPIs</CardTitle>
            <CardDescription>Eficiência operacional e economia acumulada (últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpiSerie}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      boxShadow: "var(--shadow-medium)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="eficiencia"
                    stroke="oklch(0.68 0.12 235)"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="economia"
                    stroke="oklch(0.65 0.145 35)"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/60">
          <CardHeader>
            <CardTitle className="font-display">Meta trimestral</CardTitle>
            <CardDescription>Score de performance consolidado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold">87 / 100</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Superando a meta trimestral de 85 pontos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
