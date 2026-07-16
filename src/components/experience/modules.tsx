import { useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  BellRing,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  DollarSign,
  Download,
  Edit3,
  Filter,
  Layers,
  Link2,
  Palette,
  Plus,
  Search,
  Send,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Typewriter } from "@/components/experience/Typewriter";
import { CountUp } from "@/components/experience/CountUp";
import { GlassPanel, ModuleShell, StatusPill, tooltipStyle } from "@/components/experience/ui";
import {
  brl,
  centrosCusto as seedCentros,
  empresa,
  evolucaoMensal,
  gastos as seedGastos,
  gastosCategoria as seedCategorias,
  kpiSerie,
  kpisDashboard,
} from "@/lib/mock-data";

/* ═══════════════════════════════════════════════════════════════════
   HERO — quick entry into the product
   ═══════════════════════════════════════════════════════════════════ */
export function HeroModule() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 30);
        my.set((e.clientY / window.innerHeight - 0.5) * 20);
      }}
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 md:px-12"
    >
      <motion.div
        aria-hidden
        style={{ x: mx, y: my }}
        className="pointer-events-none absolute left-[8%] top-[15%] h-[40vh] w-[40vh] rounded-full blur-[110px] opacity-70"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.65 0.22 32 / 0.55), transparent 65%)" }} />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: useTransform(mx, (v) => -v), y: useTransform(my, (v) => -v) }}
        className="pointer-events-none absolute right-[6%] top-[30%] h-[45vh] w-[45vh] rounded-full blur-[130px] opacity-60"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.5), transparent 65%)" }} />
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] text-white/70 backdrop-blur-xl"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--primary-orange] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[--primary-orange]" />
            </span>
            {empresa.nome} · {empresa.periodo} · {empresa.usuario.cargo} {empresa.usuario.nome}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-[family-name:var(--font-display)] text-[clamp(44px,7vw,88px)] font-semibold leading-[0.98] tracking-[-0.035em] text-white"
          >
            Bem-vindo de volta,
            <br />
            <span className="italic" style={{ background: "linear-gradient(120deg, oklch(0.75 0.20 38), oklch(0.55 0.22 260) 60%, oklch(0.72 0.17 155))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {empresa.usuario.nome.split(" ")[0]}.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 flex flex-wrap items-center gap-2 text-[15px] text-white/60"
          >
            <span>Seu painel está</span>
            <Typewriter className="min-w-[140px] font-[family-name:var(--font-display)] italic text-white" words={["atualizado", "priorizando alertas", "pronto para decisões"]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold text-white shadow-[0_20px_60px_-15px_oklch(0.65_0.22_32/0.7)] transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-primary)" }}
            >
              Entrar no sistema <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => document.getElementById("ai")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[13px] font-medium text-white/85 backdrop-blur-xl transition-colors hover:bg-white/[0.06]"
            >
              <Sparkles className="h-3.5 w-3.5" /> Perguntar à IA
            </button>
          </motion.div>
        </div>

        {/* Live quick-glance panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassPanel className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Resumo em tempo real</div>
              <span className="text-[10px] text-white/40">atualizado agora</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Receita", value: kpisDashboard.receita, icon: DollarSign, tint: "oklch(0.72 0.17 155)" },
                { label: "Despesas", value: kpisDashboard.despesas, icon: Wallet, tint: "oklch(0.65 0.22 32)" },
                { label: "Economia", value: kpisDashboard.economia, icon: Sparkles, tint: "oklch(0.55 0.20 260)" },
                { label: "Operacional", value: kpisDashboard.operacionais, icon: Activity, tint: "oklch(0.78 0.14 70)" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">{k.label}</span>
                    <k.icon className="h-3.5 w-3.5" style={{ color: k.tint }} />
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">
                    <CountUp to={k.value} prefix="R$ " />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpiSerie}>
                  <defs>
                    <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.75 0.20 38)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.75 0.20 38)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="eficiencia" stroke="oklch(0.75 0.20 38)" strokeWidth={2} fill="url(#hero-fill)" />
                  <XAxis dataKey="mes" hide /><YAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXECUTIVE DASHBOARD
   ═══════════════════════════════════════════════════════════════════ */
type Alert = { id: string; level: "critical" | "warning" | "info"; title: string; body: string };
const INITIAL_ALERTS: Alert[] = [
  { id: "a1", level: "critical", title: "Contrato de energia vence em 8 dias", body: "Renegocie antes do reajuste de 12,4% previsto para outubro." },
  { id: "a2", level: "warning", title: "Frete rodoviário 6% acima da média", body: "Rota Santos → São Paulo teve 4 desvios nesta semana." },
  { id: "a3", level: "info", title: "Nova sugestão de IA disponível", body: "Consolidar fornecedores de combustível pode gerar R$ 42k/mês." },
];

export function ExecutiveModule() {
  const [period, setPeriod] = useState("30d");
  const [metric, setMetric] = useState<"receita" | "despesas">("receita");
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [drill, setDrill] = useState<null | { title: string; total: number; series: { mes: string; v: number }[] }>(null);

  const factor = period === "7d" ? 0.25 : period === "30d" ? 1 : period === "90d" ? 3 : 9;
  const kpis = [
    { key: "receita" as const, label: "Receita", value: Math.round(kpisDashboard.receita * factor), delta: "+12,4%", up: true, icon: DollarSign, tint: "oklch(0.72 0.17 155)" },
    { key: "despesas" as const, label: "Despesas", value: Math.round(kpisDashboard.despesas * factor), delta: "-4,8%", up: false, icon: Wallet, tint: "oklch(0.65 0.22 32)" },
    { key: "economia" as const, label: "Economia", value: Math.round(kpisDashboard.economia * factor), delta: "+18,2%", up: true, icon: Sparkles, tint: "oklch(0.55 0.20 260)" },
    { key: "operacional" as const, label: "Operacional", value: Math.round(kpisDashboard.operacionais * factor), delta: "+3,1%", up: true, icon: Activity, tint: "oklch(0.78 0.14 70)" },
  ];

  return (
    <ModuleShell
      id="dashboard"
      eyebrow="Dashboard Executivo"
      title={<>Comando financeiro <span className="italic text-white/60">em tempo real.</span></>}
      description="Monitore, priorize e responda. Todos os sinais do negócio em uma superfície."
      actions={
        <>
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList className="border border-white/[0.06] bg-white/[0.02]">
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
              <TabsTrigger value="ytd">YTD</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={() => toast.success("Painel exportado (PDF)")}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <button
            key={k.key}
            onClick={() =>
              setDrill({
                title: k.label,
                total: k.value,
                series: evolucaoMensal.map((m) => ({ mes: m.mes, v: k.key === "despesas" ? m.despesas : m.receita })),
              })
            }
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-left backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04]"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl" style={{ background: k.tint }} />
            <div className="relative flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{k.label}</div>
              <k.icon className="h-3.5 w-3.5" style={{ color: k.tint }} />
            </div>
            <div className="relative mt-3 font-[family-name:var(--font-display)] text-[30px] font-semibold text-white">
              <CountUp to={k.value} prefix="R$ " />
            </div>
            <div className={`relative mt-1.5 flex items-center gap-1 text-[11px] ${k.up ? "text-[--positive]" : "text-[--negative]"}`}>
              {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {k.delta} · toque para detalhar
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassPanel className="p-6 lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">Evolução consolidada</div>
              <div className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-white">
                {metric === "receita" ? "Receita mensal" : "Despesas mensais"}
              </div>
            </div>
            <Tabs value={metric} onValueChange={(v) => setMetric(v as "receita" | "despesas")}>
              <TabsList className="border border-white/[0.06] bg-white/[0.02]">
                <TabsTrigger value="receita">Receita</TabsTrigger>
                <TabsTrigger value="despesas">Despesas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolucaoMensal}>
                <defs>
                  <linearGradient id="exec-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={metric === "receita" ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 32)"} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={metric === "receita" ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 32)"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Area type="monotone" dataKey={metric} stroke={metric === "receita" ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 32)"} strokeWidth={2.5} fill="url(#exec-fill)" animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-[--primary-orange]" />
              <div className="text-[13px] font-semibold text-white">Alertas ativos</div>
            </div>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/60">{alerts.length}</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
            {alerts.length === 0 && (
              <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/[0.08] p-8 text-center text-[12px] text-white/40">
                <CheckCircle2 className="mr-2 h-4 w-4 text-[--positive]" />
                Nenhum alerta ativo.
              </div>
            )}
            {alerts.map((a) => {
              const tint = a.level === "critical" ? "oklch(0.62 0.22 25)" : a.level === "warning" ? "oklch(0.80 0.14 75)" : "oklch(0.55 0.20 260)";
              return (
                <div key={a.id} className="group rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5 transition-colors hover:bg-white/[0.03]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${tint}22`, color: tint }}>
                      <AlertTriangle className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-medium text-white/90">{a.title}</div>
                      <div className="mt-0.5 text-[11.5px] text-white/50">{a.body}</div>
                    </div>
                    <button
                      onClick={() => setAlerts((cur) => cur.filter((x) => x.id !== a.id))}
                      className="text-white/30 opacity-0 transition-opacity hover:text-white/80 group-hover:opacity-100"
                      aria-label="Descartar alerta"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      <Dialog open={!!drill} onOpenChange={(o) => !o && setDrill(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{drill?.title}</DialogTitle>
            <DialogDescription>Detalhamento mensal · período {period}</DialogDescription>
          </DialogHeader>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">Total</div>
          <div className="font-[family-name:var(--font-display)] text-[36px] font-semibold text-white">{brl(drill?.total ?? 0)}</div>
          <div className="mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drill?.series ?? []}>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Bar dataKey="v" fill="oklch(0.65 0.22 32)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RECEITAS — synthesized invoice table with CRUD
   ═══════════════════════════════════════════════════════════════════ */
type Receita = { id: string; data: string; cliente: string; contrato: string; valor: number; status: "Pago" | "Aprovado" | "Pendente" };
const seedReceitas: Receita[] = [
  { id: "r1", data: "12/09/2026", cliente: "Maersk Brasil", contrato: "MRK-2410", valor: 486_200, status: "Pago" },
  { id: "r2", data: "10/09/2026", cliente: "CMA CGM", contrato: "CMA-1188", valor: 312_400, status: "Pago" },
  { id: "r3", data: "08/09/2026", cliente: "MSC Mediterranean", contrato: "MSC-9021", valor: 274_800, status: "Aprovado" },
  { id: "r4", data: "05/09/2026", cliente: "Hapag-Lloyd", contrato: "HPL-3345", valor: 198_600, status: "Pago" },
  { id: "r5", data: "03/09/2026", cliente: "Evergreen Line", contrato: "EVG-7712", valor: 165_400, status: "Pendente" },
  { id: "r6", data: "01/09/2026", cliente: "ONE Network", contrato: "ONE-4429", valor: 224_100, status: "Pago" },
  { id: "r7", data: "28/08/2026", cliente: "COSCO Shipping", contrato: "COS-2251", valor: 302_800, status: "Aprovado" },
  { id: "r8", data: "24/08/2026", cliente: "Yang Ming", contrato: "YML-6698", valor: 148_900, status: "Pago" },
  { id: "r9", data: "22/08/2026", cliente: "ZIM Integrated", contrato: "ZIM-8814", valor: 178_300, status: "Pendente" },
  { id: "r10", data: "20/08/2026", cliente: "PIL Shipping", contrato: "PIL-3390", valor: 132_700, status: "Pago" },
];

export function ReceitasModule() {
  return (
    <CrudTableModule
      id="receitas"
      eyebrow="Receitas"
      title={<>Contratos e <span className="italic text-white/60">recebíveis.</span></>}
      description="Cada linha é um contrato ativo. Filtre, edite e exporte sem sair da tela."
      accent="oklch(0.72 0.17 155)"
      seed={seedReceitas}
      columns={[
        { key: "data", label: "Data", width: "110px" },
        { key: "cliente", label: "Cliente" },
        { key: "contrato", label: "Contrato", width: "140px", mono: true },
        { key: "valor", label: "Valor", numeric: true, width: "140px" },
        { key: "status", label: "Status", width: "120px" },
      ]}
      totalLabel="Total recebível"
      addLabel="Nova receita"
      searchKeys={["cliente", "contrato"]}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DESPESAS — full CRUD table using mock gastos
   ═══════════════════════════════════════════════════════════════════ */
type Despesa = { id: string; data: string; categoria: string; cliente: string; contrato: string; valor: number; status: "Pago" | "Aprovado" | "Pendente" };
const seedDespesas: Despesa[] = seedGastos.map((g, i) => ({
  id: `d${i}`,
  data: g.data,
  categoria: g.categoria,
  cliente: g.fornecedor,
  contrato: g.cc,
  valor: g.valor,
  status: g.status as Despesa["status"],
}));

export function DespesasModule() {
  return (
    <CrudTableModule
      id="despesas"
      eyebrow="Despesas"
      title={<>Cada centavo, <span className="italic text-white/60">rastreado.</span></>}
      description="Aprove, edite ou reclassifique despesas. Filtros por categoria e status."
      accent="oklch(0.65 0.22 32)"
      seed={seedDespesas}
      columns={[
        { key: "data", label: "Data", width: "110px" },
        { key: "categoria", label: "Categoria", width: "140px" },
        { key: "cliente", label: "Fornecedor" },
        { key: "contrato", label: "Centro de custo", width: "180px" },
        { key: "valor", label: "Valor", numeric: true, width: "140px" },
        { key: "status", label: "Status", width: "120px" },
      ]}
      filterKey="categoria"
      totalLabel="Total"
      addLabel="Nova despesa"
      searchKeys={["cliente", "contrato", "categoria"]}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Shared CRUD table module used by Receitas & Despesas
   ═══════════════════════════════════════════════════════════════════ */
type Column<T> = {
  key: keyof T & string;
  label: string;
  numeric?: boolean;
  mono?: boolean;
  width?: string;
};

type Row = {
  id: string;
  data: string;
  cliente: string;
  contrato: string;
  categoria?: string;
  valor: number;
  status: "Pago" | "Aprovado" | "Pendente";
};

function CrudTableModule<T extends Row>({
  id, eyebrow, title, description, accent, seed, columns, filterKey, totalLabel, addLabel, searchKeys,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  accent: string;
  seed: T[];
  columns: Column<T>[];
  filterKey?: keyof T & string;
  totalLabel: string;
  addLabel: string;
  searchKeys: (keyof T & string)[];
}) {
  const [rows, setRows] = useState<T[]>(seed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [cat, setCat] = useState<string>("all");
  const [sortKey, setSortKey] = useState<keyof T & string>("data");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const perPage = 6;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows
      .filter((r) => (status === "all" ? true : r.status === status))
      .filter((r) => (filterKey && cat !== "all" ? String(r[filterKey]) === cat : true))
      .filter((r) => (q === "" ? true : searchKeys.some((k) => String(r[k]).toLowerCase().includes(q))));
  }, [rows, query, status, cat, filterKey, searchKeys]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === "number" && typeof vb === "number") return sortDesc ? vb - va : va - vb;
      return sortDesc ? String(vb).localeCompare(String(va)) : String(va).localeCompare(String(vb));
    });
    return arr;
  }, [filtered, sortKey, sortDesc]);

  const total = filtered.reduce((s, r) => s + r.valor, 0);
  const pages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  const catOptions = filterKey ? Array.from(new Set(seed.map((r) => String(r[filterKey])))) : [];

  const openNew = () => {
    setEditing({
      id: `x${Date.now()}`,
      data: new Date().toLocaleDateString("pt-BR"),
      cliente: "",
      contrato: "",
      ...(filterKey ? { categoria: catOptions[0] ?? "Operações" } : {}),
      valor: 0,
      status: "Pendente",
    } as unknown as T);
    setOpen(true);
  };
  const openEdit = (r: T) => { setEditing({ ...r }); setOpen(true); };
  const save = () => {
    if (!editing) return;
    setRows((cur) => cur.some((r) => r.id === editing.id) ? cur.map((r) => r.id === editing.id ? editing : r) : [editing, ...cur]);
    setOpen(false);
    toast.success("Registro salvo");
  };
  const remove = (r: T) => {
    setRows((cur) => cur.filter((x) => x.id !== r.id));
    toast.success("Registro removido");
  };

  return (
    <ModuleShell
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Exportado (CSV)")}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar
          </Button>
          <Button size="sm" onClick={openNew} style={{ background: accent, color: "white" }} className="border-transparent hover:opacity-90">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> {addLabel}
          </Button>
        </>
      }
    >
      {/* Summary strip */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <GlassPanel className="p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{totalLabel}</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">{brl(total)}</div>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Registros</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">{filtered.length}</div>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Ticket médio</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">{brl(filtered.length ? total / filtered.length : 0)}</div>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Pendentes</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">
            {filtered.filter((r) => r.status === "Pendente").length}
          </div>
        </GlassPanel>
      </div>

      <GlassPanel>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.05] px-5 py-3">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-white/40" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Pesquisar…"
              className="w-56 bg-transparent text-[12px] text-white/90 outline-none placeholder:text-white/35"
            />
          </div>
          {filterKey && (
            <Select value={cat} onValueChange={(v) => { setCat(v); setPage(1); }}>
              <SelectTrigger className="h-8 w-[160px] rounded-full border-white/[0.06] bg-white/[0.02] text-[12px]">
                <Filter className="mr-1.5 h-3 w-3" /><SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {catOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="h-8 w-[140px] rounded-full border-white/[0.06] bg-white/[0.02] text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="Pago">Pago</SelectItem>
              <SelectItem value="Aprovado">Aprovado</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-[11px] text-white/45">{sorted.length} resultados</div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead
                    key={c.key}
                    className={c.numeric ? "text-right" : ""}
                    style={c.width ? { width: c.width } : {}}
                  >
                    <button
                      onClick={() => { if (sortKey === c.key) setSortDesc((v) => !v); else { setSortKey(c.key); setSortDesc(true); } }}
                      className="inline-flex items-center gap-1 text-inherit hover:text-white"
                    >
                      {c.label}
                      {sortKey === c.key && (sortDesc ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                    </button>
                  </TableHead>
                ))}
                <TableHead className="text-right" style={{ width: 80 }}>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((r) => (
                <TableRow key={r.id}>
                  {columns.map((c) => {
                    const raw = r[c.key];
                    let content: React.ReactNode = String(raw ?? "");
                    if (c.key === "valor") content = <span className="font-mono text-white/90">{brl(Number(raw))}</span>;
                    else if (c.key === "status") content = <StatusPill status={String(raw)} />;
                    else if (c.mono) content = <span className="font-mono text-white/70">{String(raw)}</span>;
                    return (
                      <TableCell key={c.key} className={c.numeric ? "text-right" : ""}>{content}</TableCell>
                    );
                  })}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(r)}>
                        <Edit3 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(r)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="py-12 text-center text-[13px] text-white/45">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.05] px-5 py-3">
          <div className="text-[11px] text-white/45">Página {page} de {pages}</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }} />
              </PaginationItem>
              {Array.from({ length: pages }).slice(0, 5).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={page === i + 1} onClick={(e) => { e.preventDefault(); setPage(i + 1); }}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(pages, p + 1)); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </GlassPanel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing && rows.some((r) => r.id === editing.id) ? "Editar registro" : addLabel}</DialogTitle>
            <DialogDescription>Preencha os campos abaixo. Alterações são salvas na sessão atual.</DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[11px] text-white/60">Data</Label>
                  <Input value={editing.data} onChange={(e) => setEditing({ ...editing, data: e.target.value })} />
                </div>
                <div>
                  <Label className="text-[11px] text-white/60">Valor (R$)</Label>
                  <Input type="number" value={editing.valor} onChange={(e) => setEditing({ ...editing, valor: Number(e.target.value) })} />
                </div>
              </div>
              {filterKey && (
                <div>
                  <Label className="text-[11px] text-white/60">Categoria</Label>
                  <Select value={String(editing[filterKey])} onValueChange={(v) => setEditing({ ...editing, [filterKey]: v } as T)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {catOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label className="text-[11px] text-white/60">{filterKey ? "Fornecedor" : "Cliente"}</Label>
                <Input value={editing.cliente} onChange={(e) => setEditing({ ...editing, cliente: e.target.value })} />
              </div>
              <div>
                <Label className="text-[11px] text-white/60">{filterKey ? "Centro de custo" : "Contrato"}</Label>
                <Input value={editing.contrato} onChange={(e) => setEditing({ ...editing, contrato: e.target.value })} />
              </div>
              <div>
                <Label className="text-[11px] text-white/60">Status</Label>
                <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as Row["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pago">Pago</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} style={{ background: accent, color: "white" }} className="border-transparent hover:opacity-90">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLUXO DE CAIXA
   ═══════════════════════════════════════════════════════════════════ */
export function CashFlowModule() {
  const [range, setRange] = useState("9m");
  const [view, setView] = useState<"linha" | "barra">("linha");

  const monthsCount = range === "3m" ? 3 : range === "6m" ? 6 : 9;
  const base = evolucaoMensal.slice(-monthsCount);
  const data = base.map((m) => ({
    mes: m.mes,
    entrada: m.receita,
    saida: m.despesas,
    saldo: m.receita - m.despesas,
  }));
  const totals = data.reduce((a, d) => ({ e: a.e + d.entrada, s: a.s + d.saida }), { e: 0, s: 0 });

  return (
    <ModuleShell
      id="cashflow"
      eyebrow="Fluxo de Caixa"
      title={<>Entradas, saídas <span className="italic text-white/60">e o saldo real.</span></>}
      description="Ajuste janela e visualização. Cada movimento traz contexto de origem."
      actions={
        <>
          <Tabs value={range} onValueChange={setRange}>
            <TabsList className="border border-white/[0.06] bg-white/[0.02]">
              <TabsTrigger value="3m">3m</TabsTrigger>
              <TabsTrigger value="6m">6m</TabsTrigger>
              <TabsTrigger value="9m">9m</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={view} onValueChange={(v) => setView(v as "linha" | "barra")}>
            <TabsList className="border border-white/[0.06] bg-white/[0.02]">
              <TabsTrigger value="linha">Linha</TabsTrigger>
              <TabsTrigger value="barra">Barras</TabsTrigger>
            </TabsList>
          </Tabs>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Entradas", value: totals.e, tint: "oklch(0.72 0.17 155)", icon: TrendingUp },
          { label: "Saídas", value: totals.s, tint: "oklch(0.65 0.22 32)", icon: TrendingDown },
          { label: "Saldo líquido", value: totals.e - totals.s, tint: "oklch(0.55 0.20 260)", icon: Wallet },
        ].map((c) => (
          <GlassPanel key={c.label} className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{c.label}</div>
              <c.icon className="h-3.5 w-3.5" style={{ color: c.tint }} />
            </div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-[30px] font-semibold" style={{ color: c.tint }}>
              <CountUp to={c.value} prefix="R$ " />
            </div>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="mt-4 p-6">
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            {view === "linha" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Line type="monotone" dataKey="entrada" stroke="oklch(0.72 0.17 155)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="saida" stroke="oklch(0.65 0.22 32)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="saldo" stroke="oklch(0.55 0.20 260)" strokeWidth={2.5} dot={{ r: 3 }} strokeDasharray="6 4" />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Bar dataKey="entrada" fill="oklch(0.72 0.17 155)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="saida" fill="oklch(0.65 0.22 32)" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CATEGORIAS — CRUD
   ═══════════════════════════════════════════════════════════════════ */
type Categoria = { id: string; nome: string; valor: number; cor: string; meta: number };
const seedCategoriasRich: Categoria[] = seedCategorias.map((c, i) => ({
  id: `c${i}`, nome: c.categoria, valor: c.valor, cor: c.cor, meta: Math.round(c.valor * 1.15),
}));

export function CategoriasModule() {
  const [items, setItems] = useState<Categoria[]>(seedCategoriasRich);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [open, setOpen] = useState(false);

  const total = items.reduce((s, i) => s + i.valor, 0);
  const totalMeta = items.reduce((s, i) => s + i.meta, 0);

  const openNew = () => { setEditing({ id: `c${Date.now()}`, nome: "", valor: 0, cor: "hsl(24 95% 60%)", meta: 0 }); setOpen(true); };
  const save = () => {
    if (!editing) return;
    setItems((cur) => cur.some((i) => i.id === editing.id) ? cur.map((i) => i.id === editing.id ? editing : i) : [...cur, editing]);
    setOpen(false); toast.success("Categoria salva");
  };
  const remove = (id: string) => { setItems((cur) => cur.filter((i) => i.id !== id)); toast.success("Removida"); };

  return (
    <ModuleShell
      id="categorias"
      eyebrow="Categorias"
      title={<>Organize o gasto <span className="italic text-white/60">por natureza.</span></>}
      description="Crie, edite e monitore o consumo por categoria vs. meta."
      actions={
        <Button size="sm" onClick={openNew} className="bg-[--primary-orange] text-white hover:bg-[--primary-orange]/90 border-transparent">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Nova categoria
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
        <GlassPanel className="p-6">
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Consumo x meta</div>
          <div className="mt-1 font-[family-name:var(--font-display)] text-[28px] font-semibold text-white">
            {brl(total)} <span className="text-[13px] text-white/45">/ {brl(totalMeta)}</span>
          </div>
          <Progress value={Math.min(100, (total / totalMeta) * 100)} className="mt-4 h-2 bg-white/[0.04]" />
          <div className="mt-8 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={items} dataKey="valor" nameKey="nome" innerRadius="55%" outerRadius="90%" paddingAngle={2} stroke="none">
                  {items.map((i) => <Cell key={i.id} fill={i.cor} />)}
                </Pie>
                <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="p-2">
          <div className="flex flex-col divide-y divide-white/[0.04]">
            {items.map((i) => {
              const pct = Math.min(100, (i.valor / i.meta) * 100);
              const over = i.valor > i.meta;
              return (
                <div key={i.id} className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.02]">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: i.cor, boxShadow: `0 0 10px ${i.cor}` }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[13.5px] font-medium text-white/90">{i.nome}</span>
                      <span className="font-mono text-[12.5px] text-white/70">{brl(i.valor)} / {brl(i.meta)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full" style={{ background: over ? "oklch(0.62 0.22 25)" : i.cor }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditing(i); setOpen(true); }}>
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(i.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{items.some((i) => i.id === editing?.id) ? "Editar categoria" : "Nova categoria"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid gap-4">
              <div>
                <Label className="text-[11px] text-white/60">Nome</Label>
                <Input value={editing.nome} onChange={(e) => setEditing({ ...editing, nome: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[11px] text-white/60">Consumo atual</Label>
                  <Input type="number" value={editing.valor} onChange={(e) => setEditing({ ...editing, valor: Number(e.target.value) })} />
                </div>
                <div>
                  <Label className="text-[11px] text-white/60">Meta</Label>
                  <Input type="number" value={editing.meta} onChange={(e) => setEditing({ ...editing, meta: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <Label className="text-[11px] text-white/60">Cor (HSL)</Label>
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-md" style={{ background: editing.cor }} />
                  <Input value={editing.cor} onChange={(e) => setEditing({ ...editing, cor: e.target.value })} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CENTRO DE CUSTOS — CRUD table + drill
   ═══════════════════════════════════════════════════════════════════ */
type Centro = { id: string; nome: string; gestor: string; orcamento: number; utilizado: number; savings: number; status: "Saudável" | "Otimizado" | "Atenção" | "Crítico" };
const seedCentrosRich: Centro[] = seedCentros.map((c, i) => ({
  id: `cc${i}`, nome: c.nome, gestor: c.gestor, orcamento: c.orcamento, utilizado: c.utilizado, savings: c.savings, status: c.status as Centro["status"],
}));

export function CentrosModule() {
  const [items, setItems] = useState<Centro[]>(seedCentrosRich);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Centro | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = items
    .filter((c) => (status === "all" ? true : c.status === status))
    .filter((c) => c.nome.toLowerCase().includes(query.toLowerCase()) || c.gestor.toLowerCase().includes(query.toLowerCase()));

  const totalOrc = filtered.reduce((s, c) => s + c.orcamento, 0);
  const totalUti = filtered.reduce((s, c) => s + c.utilizado, 0);
  const totalSav = filtered.reduce((s, c) => s + c.savings, 0);

  const openNew = () => { setEditing({ id: `cc${Date.now()}`, nome: "", gestor: "", orcamento: 0, utilizado: 0, savings: 0, status: "Saudável" }); setOpen(true); };
  const save = () => {
    if (!editing) return;
    setItems((cur) => cur.some((c) => c.id === editing.id) ? cur.map((c) => c.id === editing.id ? editing : c) : [...cur, editing]);
    setOpen(false); toast.success("Centro salvo");
  };
  const remove = (id: string) => { setItems((cur) => cur.filter((c) => c.id !== id)); toast.success("Removido"); };

  return (
    <ModuleShell
      id="centros"
      eyebrow="Centros de Custo"
      title={<>Estrutura orçamentária <span className="italic text-white/60">por gestor.</span></>}
      description="Acompanhe consumo por unidade de negócio com gestão inline."
      actions={
        <Button size="sm" onClick={openNew} className="bg-[--primary-orange] text-white hover:bg-[--primary-orange]/90 border-transparent">
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Novo centro
        </Button>
      }
    >
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <GlassPanel className="p-4"><div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Centros</div><div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">{filtered.length}</div></GlassPanel>
        <GlassPanel className="p-4"><div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Orçamento</div><div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">{brl(totalOrc)}</div></GlassPanel>
        <GlassPanel className="p-4"><div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Utilizado</div><div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-white">{brl(totalUti)}</div></GlassPanel>
        <GlassPanel className="p-4"><div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Economia</div><div className="mt-1 font-[family-name:var(--font-display)] text-[22px] font-semibold text-[--positive]">{brl(totalSav)}</div></GlassPanel>
      </div>

      <GlassPanel>
        <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.05] px-5 py-3">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-white/40" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Centro ou gestor…" className="w-56 bg-transparent text-[12px] text-white/90 outline-none placeholder:text-white/35" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-8 w-[160px] rounded-full border-white/[0.06] bg-white/[0.02] text-[12px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="Saudável">Saudável</SelectItem>
              <SelectItem value="Otimizado">Otimizado</SelectItem>
              <SelectItem value="Atenção">Atenção</SelectItem>
              <SelectItem value="Crítico">Crítico</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-[11px] text-white/45">{filtered.length} centros</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Centro</TableHead>
              <TableHead>Gestor</TableHead>
              <TableHead className="text-right">Orçamento</TableHead>
              <TableHead>Utilização</TableHead>
              <TableHead className="text-right">Economia</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right" style={{ width: 80 }}>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => {
              const pct = (c.utilizado / c.orcamento) * 100;
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-medium text-white/90">{c.nome}</TableCell>
                  <TableCell>{c.gestor}</TableCell>
                  <TableCell className="text-right font-mono">{brl(c.orcamento)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.05]">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, oklch(0.65 0.22 32), oklch(0.55 0.20 260))" }} />
                      </div>
                      <span className="font-mono text-[11.5px] text-white/70">{pct.toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-[--positive]">+{brl(c.savings)}</TableCell>
                  <TableCell><StatusPill status={c.status} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditing(c); setOpen(true); }}><Edit3 className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </GlassPanel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{items.some((c) => c.id === editing?.id) ? "Editar centro" : "Novo centro"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid gap-4">
              <div><Label className="text-[11px] text-white/60">Nome</Label><Input value={editing.nome} onChange={(e) => setEditing({ ...editing, nome: e.target.value })} /></div>
              <div><Label className="text-[11px] text-white/60">Gestor</Label><Input value={editing.gestor} onChange={(e) => setEditing({ ...editing, gestor: e.target.value })} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label className="text-[11px] text-white/60">Orçamento</Label><Input type="number" value={editing.orcamento} onChange={(e) => setEditing({ ...editing, orcamento: Number(e.target.value) })} /></div>
                <div><Label className="text-[11px] text-white/60">Utilizado</Label><Input type="number" value={editing.utilizado} onChange={(e) => setEditing({ ...editing, utilizado: Number(e.target.value) })} /></div>
                <div><Label className="text-[11px] text-white/60">Economia</Label><Input type="number" value={editing.savings} onChange={(e) => setEditing({ ...editing, savings: Number(e.target.value) })} /></div>
              </div>
              <div>
                <Label className="text-[11px] text-white/60">Status</Label>
                <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as Centro["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saudável">Saudável</SelectItem>
                    <SelectItem value="Otimizado">Otimizado</SelectItem>
                    <SelectItem value="Atenção">Atenção</SelectItem>
                    <SelectItem value="Crítico">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INDICADORES — analytical dashboard with filters
   ═══════════════════════════════════════════════════════════════════ */
export function IndicadoresModule() {
  const [period, setPeriod] = useState("6m");
  const [dim, setDim] = useState("eficiencia");
  const months = period === "3m" ? 3 : period === "6m" ? 6 : 9;
  const serie = kpiSerie.slice(-Math.min(months, kpiSerie.length));

  return (
    <ModuleShell
      id="indicadores"
      eyebrow="Indicadores"
      title={<>Analítico <span className="italic text-white/60">multidimensional.</span></>}
      description="Combine dimensão e período. Explore comportamento por área."
      actions={
        <>
          <Select value={dim} onValueChange={setDim}>
            <SelectTrigger className="h-8 w-[180px] border-white/[0.06] bg-white/[0.02] text-[12px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="eficiencia">Eficiência operacional</SelectItem>
              <SelectItem value="economia">Economia acumulada</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList className="border border-white/[0.06] bg-white/[0.02]">
              <TabsTrigger value="3m">3m</TabsTrigger>
              <TabsTrigger value="6m">6m</TabsTrigger>
              <TabsTrigger value="9m">9m</TabsTrigger>
            </TabsList>
          </Tabs>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
        <GlassPanel className="p-6 md:col-span-4 md:row-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{dim === "eficiencia" ? "Eficiência operacional" : "Economia acumulada"}</div>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[36px] font-semibold text-white">
                <CountUp to={dim === "eficiencia" ? 88 : 82} suffix={dim === "eficiencia" ? "%" : "%"} />
              </div>
            </div>
            <div className="rounded-full border border-[--positive]/25 bg-[--positive]/[0.08] px-2 py-0.5 text-[10px] text-[--positive]">+5,1 p.p.</div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={serie}>
                <defs>
                  <linearGradient id="ind-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <RTooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey={dim} stroke="oklch(0.55 0.20 260)" strokeWidth={2.5} fill="url(#ind-fill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
        {[
          { label: "Meta trimestral", value: "87%", tip: "5 p.p. acima" },
          { label: "ROI iniciativas", value: "3,4x", tip: "+0,6x" },
          { label: "Desvio orçamento", value: "-4,8%", tip: "abaixo do plano" },
          { label: "NPS interno", value: "72", tip: "+8 pts" },
        ].map((k) => (
          <GlassPanel key={k.label} className="p-5">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{k.label}</div>
            <div className="mt-2 font-[family-name:var(--font-display)] text-[26px] font-semibold text-white">{k.value}</div>
            <div className="mt-1 text-[11px] text-[--positive]">{k.tip}</div>
          </GlassPanel>
        ))}
      </div>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AI — functional chat with heuristic replies backed by real data
   ═══════════════════════════════════════════════════════════════════ */
type ChatMsg = { id: string; role: "user" | "ai"; text: string };
const SUGGESTIONS = [
  "Quais categorias podem economizar mais?",
  "Como está a saúde do fluxo de caixa?",
  "Onde está o maior desvio de orçamento?",
  "Resuma a performance do mês.",
];

function generateAIReply(q: string): string {
  const lc = q.toLowerCase();
  const top = [...seedCategorias].sort((a, b) => b.valor - a.valor)[0];
  const criticoCC = [...seedCentros].sort((a, b) => (b.utilizado / b.orcamento) - (a.utilizado / a.orcamento))[0];
  const savings = seedCentros.reduce((s, c) => s + c.savings, 0);
  const receita = kpisDashboard.receita;
  const despesas = kpisDashboard.despesas;
  const margem = ((receita - despesas) / receita) * 100;

  if (lc.includes("categoria") || lc.includes("economi")) {
    return `A categoria de maior consumo é **${top.categoria}** com ${brl(top.valor)}. Consolidando fornecedores estratégicos, estimo redução de 6-8% (~${brl(Math.round(top.valor * 0.07))}/mês). Economia acumulada YTD atual: ${brl(savings)}.`;
  }
  if (lc.includes("caixa") || lc.includes("fluxo") || lc.includes("saúde") || lc.includes("saude")) {
    return `Saúde do caixa: **positiva**. Receita ${brl(receita)} vs. Despesas ${brl(despesas)}, margem operacional de ${margem.toFixed(1)}%. Tendência de 9 meses ascendente com desvio -4,8% abaixo do orçado.`;
  }
  if (lc.includes("desvio") || lc.includes("orçament") || lc.includes("orcament")) {
    const pct = ((criticoCC.utilizado / criticoCC.orcamento) * 100).toFixed(0);
    return `Maior pressão em **${criticoCC.nome}** (gestor: ${criticoCC.gestor}) — ${pct}% do orçamento consumido. Recomendo revisar contratos ativos e revalidar previsão para o próximo mês.`;
  }
  if (lc.includes("resum") || lc.includes("mes") || lc.includes("mês") || lc.includes("performance")) {
    return `**Resumo ${empresa.periodo}**: Receita ${brl(receita)} (+18,2% YoY), despesas ${brl(despesas)} (-4,8% vs. plano), economia realizada ${brl(kpisDashboard.economia)}. 3 alertas ativos, 1 crítico. Recomendação: acelerar renegociação de energia.`;
  }
  return `Analisei os dados atuais. Receita ${brl(receita)}, despesas ${brl(despesas)}, margem ${margem.toFixed(1)}%. Posso detalhar por categoria, centro de custo ou período — é só pedir.`;
}

export function AIModule() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "m0", role: "ai", text: `Olá ${empresa.usuario.nome.split(" ")[0]}, sou seu copiloto financeiro. Pergunte sobre categorias, fluxo de caixa, desvios ou peça um resumo do mês.` },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMsg = { id: `u${Date.now()}`, role: "user", text: text.trim() };
    setMessages((cur) => [...cur, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((cur) => [...cur, { id: `a${Date.now()}`, role: "ai", text: generateAIReply(text) }]);
      setThinking(false);
    }, 700);
  };

  return (
    <ModuleShell
      id="ai"
      eyebrow="Inteligência Artificial"
      title={<>Um <span className="italic text-white/60">copiloto</span> para decisões financeiras.</>}
      description="Converse com seus dados. Pergunte, filtre, projete — sem sair do painel."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <GlassPanel className="flex h-[560px] flex-col">
          <div className="flex items-center gap-2 border-b border-white/[0.05] px-5 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white">Copiloto Econommy</div>
              <div className="text-[10.5px] text-white/45">Conectado aos seus dados em tempo real</div>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {messages.map((m) => (
              <motion.div
                key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-white/[0.08] text-white"
                      : "border border-white/[0.06] bg-white/[0.02] text-white/85"
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }}
                />
              </motion.div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i} className="block h-1.5 w-1.5 rounded-full bg-white/60"
                        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-white/[0.05] p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Pergunte sobre categorias, fluxo, desvios…"
                rows={1}
                className="min-h-[36px] resize-none border-0 bg-transparent text-[13.5px] focus-visible:ring-0"
              />
              <Button size="icon" onClick={() => send(input)} disabled={!input.trim() || thinking} className="h-9 w-9 shrink-0" style={{ background: "var(--gradient-primary)" }}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </GlassPanel>

        <div className="flex flex-col gap-4">
          <GlassPanel className="p-5">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">Sugestões</div>
            <div className="mt-3 flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s} onClick={() => send(s)}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5 text-left text-[12.5px] text-white/75 transition-all hover:border-white/[0.14] hover:bg-white/[0.04]"
                >
                  {s}
                  <ChevronRight className="h-3.5 w-3.5 opacity-40 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-[--primary-orange]" />
              <div className="text-[13px] font-semibold text-white">Insights recentes</div>
            </div>
            <ul className="space-y-3 text-[12.5px] text-white/60">
              <li className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[--positive]" /> Consolidação de combustível pode gerar R$ 42k/mês.</li>
              <li className="flex gap-2"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[--warning]" /> Frete rodoviário 6% acima da média histórica.</li>
              <li className="flex gap-2"><TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[--info]" /> Q4 projetado 2,3% acima do plano.</li>
            </ul>
          </GlassPanel>
        </div>
      </div>
    </ModuleShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONFIGURAÇÕES — real forms
   ═══════════════════════════════════════════════════════════════════ */
export function SettingsModule() {
  const [profile, setProfile] = useState({ nome: empresa.usuario.nome, cargo: empresa.usuario.cargo, email: "ricardo@porto-meridian.com" });
  const [prefs, setPrefs] = useState({ moeda: "BRL", locale: "pt-BR", tema: "dark", radius: [12] as number[] });
  const [notif, setNotif] = useState({ alertas: true, email: true, resumo: false, ai: true });
  const [integrations, setIntegrations] = useState({ sap: true, oracle: false, totvs: true, slack: false });

  return (
    <ModuleShell
      id="settings"
      eyebrow="Configurações"
      title={<>Personalize <span className="italic text-white/60">a plataforma.</span></>}
      description="Perfil, preferências, notificações e integrações — no seu ritmo."
      actions={<Button size="sm" onClick={() => toast.success("Configurações salvas")} className="bg-[--primary-orange] text-white hover:bg-[--primary-orange]/90 border-transparent">Salvar tudo</Button>}
    >
      <GlassPanel className="p-2">
        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="w-full justify-start border-b border-white/[0.05] bg-transparent">
            <TabsTrigger value="perfil"><Building2 className="mr-1.5 h-3.5 w-3.5" />Perfil</TabsTrigger>
            <TabsTrigger value="prefs"><Palette className="mr-1.5 h-3.5 w-3.5" />Preferências</TabsTrigger>
            <TabsTrigger value="notif"><Bell className="mr-1.5 h-3.5 w-3.5" />Notificações</TabsTrigger>
            <TabsTrigger value="integr"><Link2 className="mr-1.5 h-3.5 w-3.5" />Integrações</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div><Label>Nome</Label><Input value={profile.nome} onChange={(e) => setProfile({ ...profile, nome: e.target.value })} /></div>
              <div><Label>Cargo</Label><Input value={profile.cargo} onChange={(e) => setProfile({ ...profile, cargo: e.target.value })} /></div>
              <div className="md:col-span-2"><Label>E-mail</Label><Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></div>
            </div>
          </TabsContent>

          <TabsContent value="prefs" className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
            <div>
              <Label>Moeda</Label>
              <Select value={prefs.moeda} onValueChange={(v) => setPrefs({ ...prefs, moeda: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">Real (R$)</SelectItem>
                  <SelectItem value="USD">Dólar (US$)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Idioma</Label>
              <Select value={prefs.locale} onValueChange={(v) => setPrefs({ ...prefs, locale: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português</SelectItem>
                  <SelectItem value="en-US">English</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tema</Label>
              <Select value={prefs.tema} onValueChange={(v) => setPrefs({ ...prefs, tema: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Raio de bordas: {prefs.radius[0]}px</Label>
              <Slider value={prefs.radius} onValueChange={(v) => setPrefs({ ...prefs, radius: v })} min={0} max={24} step={2} className="mt-3" />
            </div>
          </TabsContent>

          <TabsContent value="notif" className="p-6">
            <div className="flex flex-col gap-4">
              {[
                { key: "alertas" as const, label: "Alertas críticos no app", desc: "Notificações em tempo real dentro da plataforma." },
                { key: "email" as const, label: "Resumo por e-mail", desc: "Digest diário às 08:00." },
                { key: "resumo" as const, label: "Resumo semanal executivo", desc: "PDF enviado toda segunda-feira." },
                { key: "ai" as const, label: "Insights de IA", desc: "Sugestões automáticas quando padrões mudam." },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between border-b border-white/[0.05] pb-4 last:border-0">
                  <div>
                    <div className="text-[13.5px] font-medium text-white/90">{n.label}</div>
                    <div className="text-[12px] text-white/50">{n.desc}</div>
                  </div>
                  <Switch checked={notif[n.key]} onCheckedChange={(v) => setNotif({ ...notif, [n.key]: v })} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integr" className="grid grid-cols-1 gap-3 p-6 md:grid-cols-2">
            {[
              { key: "sap" as const, name: "SAP", icon: Cpu, desc: "Integração ERP financeiro." },
              { key: "oracle" as const, name: "Oracle", icon: Layers, desc: "Sincronização de plano de contas." },
              { key: "totvs" as const, name: "TOTVS", icon: Building2, desc: "Consolidação por unidade." },
              { key: "slack" as const, name: "Slack", icon: Bell, desc: "Alertas em canais dedicados." },
            ].map((it) => (
              <div key={it.key} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                    <it.icon className="h-4 w-4 text-white/80" />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-white/90">{it.name}</div>
                    <div className="text-[11.5px] text-white/50">{it.desc}</div>
                  </div>
                </div>
                <Switch checked={integrations[it.key]} onCheckedChange={(v) => setIntegrations({ ...integrations, [it.key]: v })} />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </GlassPanel>
    </ModuleShell>
  );
}
