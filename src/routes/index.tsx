import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Check,
  ChevronRight,
  DollarSign,
  Download,
  FileBarChart,
  Gauge,
  Layers,
  Play,
  Search,
  Settings,
  Sparkles,
  Target,
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

import {
  brl,
  centrosCusto,
  empresa,
  evolucaoMensal,
  gastos,
  gastosCategoria,
  kpiSerie,
  kpis,
  kpisDashboard,
  relatoriosList,
} from "@/lib/mock-data";
import { CountUp } from "@/components/experience/CountUp";
import { Section } from "@/components/experience/Section";
import { TiltCard } from "@/components/experience/TiltCard";
import { Typewriter } from "@/components/experience/Typewriter";

export const Route = createFileRoute("/")({
  component: ExperiencePage,
});

// ─────────────────────────────────────────────────────────────────────
function ExperiencePage() {
  return (
    <main className="relative">
      <Hero />
      <ExecutiveOverview />
      <FinancialKPIs />
      <RevenueAnalytics />
      <ExpensesAnalytics />
      <CashFlow />
      <Categories />
      <CostCenters />
      <PerformanceIndicators />
      <Forecast />
      <AIInsights />
      <Reports />
      <SettingsSection />
      <Footer />
    </main>
  );
}

// ═════════════════════════════════════════════════════════════════════
// HERO
// ═════════════════════════════════════════════════════════════════════
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Floating aurora blobs */}
      <motion.div
        style={{ x: mx, y: my }}
        aria-hidden
        className="pointer-events-none absolute left-[15%] top-[20%] h-[45vh] w-[45vh] rounded-full opacity-70 blur-[120px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.65 0.22 32 / 0.55), transparent 65%)" }} />
      </motion.div>
      <motion.div
        style={{ x: useTransform(mx, (v) => -v * 0.8), y: useTransform(my, (v) => -v * 0.8) }}
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[35%] h-[50vh] w-[50vh] rounded-full opacity-60 blur-[130px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.22 260 / 0.45), transparent 65%)" }} />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/70 backdrop-blur-xl"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--primary-orange] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[--primary-orange]" />
          </span>
          Ao vivo · {empresa.periodo} · {empresa.nome}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-[clamp(52px,10vw,148px)] font-semibold leading-[0.94] tracking-[-0.045em] text-white"
        >
          Cada centavo,
          <br />
          <span className="italic" style={{ background: "linear-gradient(120deg, oklch(0.75 0.20 38), oklch(0.55 0.22 260) 60%, oklch(0.72 0.17 155))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            uma decisão.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 text-[16px] text-white/60 md:text-[19px]"
        >
          <span>Inteligência financeira que</span>
          <Typewriter
            className="min-w-[180px] text-left font-[family-name:var(--font-display)] italic text-white"
            words={["revela oportunidades", "reduz desperdício", "acelera decisões", "prevê o próximo mês"]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold text-white shadow-[0_20px_60px_-15px_oklch(0.65_0.22_32/0.7)] transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Entrar na experiência
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[13px] font-medium text-white/85 backdrop-blur-xl transition-colors hover:bg-white/[0.06]">
            <Play className="h-3.5 w-3.5" /> Ver tour de 90s
          </button>
        </motion.div>

        {/* Floating live KPI cards */}
        <div className="mt-16 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Receita", value: kpisDashboard.receita, icon: DollarSign, tint: "oklch(0.72 0.17 155)" },
            { label: "Despesas", value: kpisDashboard.despesas, icon: Wallet, tint: "oklch(0.65 0.22 32)" },
            { label: "Economia", value: kpisDashboard.economia, icon: Sparkles, tint: "oklch(0.55 0.20 260)" },
            { label: "Operações", value: kpisDashboard.operacionais, icon: Activity, tint: "oklch(0.78 0.14 70)" },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: useTransform(mx, (v) => v * (0.15 + i * 0.05)), y: useTransform(my, (v) => v * (0.15 + i * 0.05)) }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-left backdrop-blur-2xl">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-40" style={{ background: k.tint }} />
                <div className="relative flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">{k.label}</span>
                  <k.icon className="h-3.5 w-3.5" style={{ color: k.tint }} />
                </div>
                <div className="relative mt-3 font-[family-name:var(--font-display)] text-[26px] font-semibold tracking-tight text-white">
                  <CountUp to={k.value} prefix="R$ " format={(n) => n.toLocaleString("pt-BR")} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          Role para explorar
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-[1px] bg-gradient-to-b from-white/60 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// EXECUTIVE OVERVIEW
// ═════════════════════════════════════════════════════════════════════
function ExecutiveOverview() {
  return (
    <Section
      id="overview"
      eyebrow="Visão Executiva"
      title={<>Uma sala de comando<br /><span className="italic text-white/60">para o CFO moderno.</span></>}
      description="Concentre todos os sinais financeiros da operação em uma superfície única. Dados vivos, contexto de negócio e alertas orientados por IA."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <TiltCard className="md:col-span-7">
          <div className="relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.20em] text-white/45">Saúde financeira</div>
                <div className="mt-3 font-[family-name:var(--font-display)] text-[72px] font-semibold leading-none tracking-tight text-white">
                  <CountUp to={94} suffix="/100" />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[--positive]">
                  <ArrowUpRight className="h-3.5 w-3.5" /> +6 pts vs. Q2
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Gauge className="h-4 w-4 text-[--primary-orange]" />
              </div>
            </div>
            <div className="mt-8 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpiSerie}>
                  <defs>
                    <linearGradient id="over-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.17 155)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="oklch(0.72 0.17 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="eficiencia" stroke="oklch(0.72 0.17 155)" strokeWidth={2} fill="url(#over-fill)" isAnimationActive />
                  <XAxis dataKey="mes" hide />
                  <YAxis hide />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TiltCard>

        <div className="grid grid-cols-1 gap-6 md:col-span-5">
          {[
            { icon: Target, label: "Meta trimestral", value: "87%", note: "5 pontos acima do plano" },
            { icon: Zap, label: "Alertas ativos", value: "3", note: "1 crítico · 2 informativos" },
            { icon: Brain, label: "Insights de IA", value: "12", note: "Hoje, atualizados às 09:12" },
          ].map((c) => (
            <TiltCard key={c.label}>
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <c.icon className="h-4 w-4 text-white/80" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{c.label}</div>
                  <div className="mt-0.5 font-[family-name:var(--font-display)] text-[26px] font-semibold text-white">{c.value}</div>
                </div>
                <div className="hidden max-w-[140px] text-right text-[11px] leading-snug text-white/45 sm:block">{c.note}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// FINANCIAL KPIS
// ═════════════════════════════════════════════════════════════════════
function FinancialKPIs() {
  return (
    <Section
      id="kpis"
      eyebrow="Indicadores Financeiros"
      title={<>Números vivos que <span className="italic text-white/60">contam a história.</span></>}
      description="Cada KPI reage à realidade do negócio em tempo real. Contexto, tendência e desvio orçamentário, num só olhar."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k, i) => {
          const up = k.tendencia === "up";
          return (
            <TiltCard key={k.titulo} intensity={6}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl" style={{ background: up ? "oklch(0.72 0.17 155)" : "oklch(0.62 0.22 25)" }} />
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{k.titulo}</div>
                  <div className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${up ? "border-[--positive]/25 bg-[--positive]/[0.08] text-[--positive]" : "border-[--negative]/25 bg-[--negative]/[0.08] text-[--negative]"}`}>
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="font-[family-name:var(--font-display)] text-[44px] font-semibold leading-none tracking-tight text-white">
                    {k.valor}
                  </div>
                  <div className="mt-3 text-[12px] text-white/45">{k.descricao}</div>
                </div>
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// REVENUE
// ═════════════════════════════════════════════════════════════════════
function RevenueAnalytics() {
  return (
    <Section
      id="revenue"
      eyebrow="Receita"
      title={<>Crescimento composto,<br /><span className="italic text-white/60">medido em tempo real.</span></>}
      description="Nove meses consecutivos de expansão. A curva mostra a aceleração da receita consolidada versus o mesmo período do ano anterior."
    >
      <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl md:p-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Receita YTD", value: "R$ 21,1M" },
            { label: "Crescimento", value: "+18,2%" },
            { label: "Ticket médio", value: "R$ 84k" },
            { label: "Clientes ativos", value: "312" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">{s.label}</div>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[26px] font-semibold text-white">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolucaoMensal}>
              <defs>
                <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.22 32)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.65 0.22 32)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
              <Area type="monotone" dataKey="receita" stroke="oklch(0.75 0.20 38)" strokeWidth={2.5} fill="url(#rev-fill)" animationDuration={1600} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// EXPENSES
// ═════════════════════════════════════════════════════════════════════
function ExpensesAnalytics() {
  return (
    <Section
      id="expenses"
      eyebrow="Despesas"
      title={<>Onde o dinheiro <span className="italic text-white/60">realmente vai.</span></>}
      description="Uma leitura mensal por categoria e uma decomposição instantânea de onde priorizar cortes sem sacrificar operação."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-xl lg:col-span-3">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">Despesas mensais</div>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[32px] font-semibold text-white">R$ 4,11M <span className="text-[14px] font-normal text-white/45">YTD</span></div>
            </div>
            <span className="rounded-full border border-[--positive]/25 bg-[--positive]/[0.08] px-2.5 py-0.5 text-[10.5px] font-medium text-[--positive]">-4,8% vs. plano</span>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolucaoMensal}>
                <defs>
                  <linearGradient id="exp-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.22 32)" stopOpacity={1} />
                    <stop offset="100%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
                <Bar dataKey="despesas" fill="url(#exp-fill)" radius={[8, 8, 0, 0]} animationDuration={1400} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-xl lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">Ranking do mês</div>
          <div className="mt-6 flex flex-col gap-4">
            {gastosCategoria.map((g, i) => {
              const max = Math.max(...gastosCategoria.map((x) => x.valor));
              const pct = (g.valor / max) * 100;
              return (
                <motion.div
                  key={g.categoria}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="mb-1.5 flex items-center justify-between text-[12px]">
                    <span className="text-white/80">{g.categoria}</span>
                    <span className="font-mono text-white/60">{brl(g.valor)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: g.cor }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// CASH FLOW
// ═════════════════════════════════════════════════════════════════════
function CashFlow() {
  const cash = evolucaoMensal.map((m) => ({ mes: m.mes, saldo: m.receita - m.despesas }));
  return (
    <Section
      id="cashflow"
      align="center"
      eyebrow="Fluxo de Caixa"
      title={<>O pulso da <span className="italic text-white/60">operação.</span></>}
      description="O saldo mensal em uma única linha viva. Cada movimento tem contexto — cada contexto vira decisão."
    >
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-xl md:p-14">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { label: "Entrada", value: "R$ 21,1M", tint: "oklch(0.72 0.17 155)" },
            { label: "Saída", value: "R$ 4,11M", tint: "oklch(0.65 0.22 32)" },
            { label: "Saldo líquido", value: "R$ 16,9M", tint: "oklch(0.55 0.20 260)" },
          ].map((c) => (
            <div key={c.label}>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">{c.label}</div>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[28px] font-semibold text-white" style={{ color: c.tint }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cash}>
              <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
              <Line type="monotone" dataKey="saldo" stroke="oklch(0.55 0.20 260)" strokeWidth={2.5} dot={{ r: 3, fill: "oklch(0.55 0.20 260)" }} activeDot={{ r: 6 }} animationDuration={1600} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// CATEGORIES
// ═════════════════════════════════════════════════════════════════════
function Categories() {
  return (
    <Section
      id="categories"
      eyebrow="Categorias"
      title={<>Decomposição <span className="italic text-white/60">radial.</span></>}
      description="A distribuição de gastos por categoria — vista da órbita. Cada arco convida a uma investigação."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-[440px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gastosCategoria}
                dataKey="valor"
                nameKey="categoria"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={2}
                stroke="none"
                animationDuration={1600}
              >
                {gastosCategoria.map((g) => (
                  <Cell key={g.categoria} fill={g.cor} />
                ))}
              </Pie>
              <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => brl(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[10px] uppercase tracking-[0.20em] text-white/45">Total</div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-[36px] font-semibold text-white">R$ 487k</div>
            <div className="mt-1 text-[12px] text-white/45">setembro</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {gastosCategoria.map((g, i) => (
            <motion.div
              key={g.categoria}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 backdrop-blur-xl transition-all hover:border-white/[0.14] hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.cor, boxShadow: `0 0 12px ${g.cor}` }} />
                <span className="text-[14px] text-white/85">{g.categoria}</span>
              </div>
              <span className="font-mono text-[13px] text-white/65">{brl(g.valor)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// COST CENTERS — Interactive Logs Table
// ═════════════════════════════════════════════════════════════════════
function CostCenters() {
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const filtered = centrosCusto
    .filter((c) => c.nome.toLowerCase().includes(query.toLowerCase()) || c.gestor.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sortDesc ? b.utilizado - a.utilizado : a.utilizado - b.utilizado));

  return (
    <Section
      id="cost-centers"
      eyebrow="Centros de Custo"
      title={<>Uma tabela que <span className="italic text-white/60">responde.</span></>}
      description="Filtre, ordene e explore. Cada linha é um centro de custo com contexto de gestor, saldo e economia realizada."
    >
      <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.05] px-6 py-4">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar por centro ou gestor…"
              className="w-64 bg-transparent text-[12px] text-white/90 outline-none placeholder:text-white/35"
            />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <button
              onClick={() => setSortDesc((v) => !v)}
              className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-white/70 transition-colors hover:bg-white/[0.05]"
            >
              Ordenar por utilizado {sortDesc ? "↓" : "↑"}
            </button>
            <span>{filtered.length} centros</span>
          </div>
        </div>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr_0.6fr] gap-4 border-b border-white/[0.05] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
          <div>Centro</div>
          <div>Gestor</div>
          <div className="text-right">Orçamento</div>
          <div className="text-right">Utilizado</div>
          <div className="text-right">Economia</div>
          <div className="text-right">Status</div>
        </div>
        <div>
          {filtered.map((c, i) => {
            const pct = (c.utilizado / c.orcamento) * 100;
            const tint = c.status === "Saudável" ? "oklch(0.72 0.17 155)" : c.status === "Otimizado" ? "oklch(0.55 0.20 260)" : "oklch(0.80 0.14 75)";
            return (
              <motion.div
                key={c.nome}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group grid grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr_0.6fr] items-center gap-4 border-b border-white/[0.03] px-6 py-4 text-[13px] transition-colors hover:bg-white/[0.025]"
              >
                <div>
                  <div className="font-medium text-white/90">{c.nome}</div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, oklch(0.65 0.22 32), oklch(0.55 0.20 260))" }}
                    />
                  </div>
                </div>
                <div className="text-white/60">{c.gestor}</div>
                <div className="text-right font-mono text-white/70">{brl(c.orcamento)}</div>
                <div className="text-right font-mono text-white/90">{brl(c.utilizado)}</div>
                <div className="text-right font-mono text-[--positive]">+{brl(c.savings)}</div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: `${tint}44`, background: `${tint}18`, color: tint }}>
                    <span className="h-1 w-1 rounded-full" style={{ background: tint }} />
                    {c.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PERFORMANCE INDICATORS — Bento
// ═════════════════════════════════════════════════════════════════════
function PerformanceIndicators() {
  return (
    <Section
      id="performance"
      eyebrow="Performance"
      title={<>Indicadores em <span className="italic text-white/60">bento.</span></>}
      description="Um mosaico calibrado — eficiência, economia e execução, respirando na mesma superfície."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
        <BentoTile className="md:col-span-3 md:row-span-2">
          <div className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Eficiência operacional</div>
              <div className="mt-3 font-[family-name:var(--font-display)] text-[72px] font-semibold leading-none text-white">
                <CountUp to={88} suffix="%" />
              </div>
              <div className="mt-2 text-[12px] text-[--positive]">+5,1 p.p. vs Q2</div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpiSerie}>
                  <defs>
                    <linearGradient id="perf-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.55 0.20 260)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="eficiencia" stroke="oklch(0.55 0.20 260)" strokeWidth={2} fill="url(#perf-fill)" />
                  <XAxis dataKey="mes" hide />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </BentoTile>
        <BentoTile className="md:col-span-3">
          <div className="flex items-center gap-6 p-8">
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Economia acumulada</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-[48px] font-semibold leading-none text-white">R$ 742k</div>
              <div className="mt-2 text-[12px] text-[--positive]">+R$ 82k no mês</div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <Sparkles className="h-5 w-5 text-[--primary-orange]" />
            </div>
          </div>
        </BentoTile>
        <BentoTile>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Desvio</div>
              <TrendingUp className="h-3.5 w-3.5 text-[--positive]" />
            </div>
            <div className="mt-3 font-[family-name:var(--font-display)] text-[28px] font-semibold text-white">-4,8%</div>
            <div className="text-[11px] text-white/45">abaixo do previsto</div>
          </div>
        </BentoTile>
        <BentoTile className="md:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">ROI iniciativas</div>
              <Layers className="h-3.5 w-3.5 text-white/60" />
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="font-[family-name:var(--font-display)] text-[36px] font-semibold text-white">3,4x</div>
              <div className="text-[12px] text-[--positive]">+0,6x</div>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1">
              {kpiSerie.map((s, i) => (
                <div key={i} className="h-8 rounded-sm" style={{ background: `oklch(0.65 0.22 32 / ${0.15 + (s.economia / 100) * 0.7})` }} />
              ))}
            </div>
          </div>
        </BentoTile>
      </div>
    </Section>
  );
}

function BentoTile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/[0.14] hover:bg-white/[0.035] ${className}`}>
      {children}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// FORECAST
// ═════════════════════════════════════════════════════════════════════
function Forecast() {
  const historic = evolucaoMensal.map((m) => ({ mes: m.mes, real: m.receita, previsto: null as number | null }));
  const projections = [
    { mes: "Out", real: null as number | null, previsto: 2_495_000 },
    { mes: "Nov", real: null, previsto: 2_555_000 },
    { mes: "Dez", real: null, previsto: 2_640_000 },
  ];
  const data = [...historic, ...projections];
  // bridge — repeat last real as previsto start
  data[historic.length - 1].previsto = historic[historic.length - 1].real;

  return (
    <Section
      id="forecast"
      eyebrow="Forecast"
      title={<>O próximo <span className="italic text-white/60">trimestre.</span></>}
      description="Projeção guiada por IA combinando sazonalidade, pipeline comercial e execução orçamentária."
    >
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-xl md:p-12">
        <div className="mb-8 flex flex-wrap gap-6">
          <Legend color="oklch(0.75 0.20 38)" label="Realizado" />
          <Legend color="oklch(0.55 0.20 260)" label="Projeção IA" dashed />
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 6" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="mes" stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(1 0 0 / 0.35)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => (v ? brl(v) : "—")} />
              <Line type="monotone" dataKey="real" stroke="oklch(0.75 0.20 38)" strokeWidth={2.5} dot={{ r: 3 }} animationDuration={1400} connectNulls={false} />
              <Line type="monotone" dataKey="previsto" stroke="oklch(0.55 0.20 260)" strokeWidth={2.5} strokeDasharray="6 6" dot={{ r: 3 }} animationDuration={1400} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Section>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-white/60">
      <span className="block h-[2px] w-8 rounded-full" style={{ background: color, backgroundImage: dashed ? `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 12px)` : undefined }} />
      {label}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// AI INSIGHTS
// ═════════════════════════════════════════════════════════════════════
function AIInsights() {
  const insights = [
    { icon: Sparkles, tint: "oklch(0.72 0.17 155)", badge: "Oportunidade", title: "R$ 42k em economia potencial", body: "Consolidando fornecedores de combustível marítimo em Operações Portuárias, o custo unitário cai 6,2%." },
    { icon: Zap, tint: "oklch(0.80 0.14 75)", badge: "Atenção", title: "Aceleração de gastos em Logística", body: "Frete rodoviário cresce 6% acima da média histórica nos últimos 30 dias. Investigar rotas críticas." },
    { icon: Brain, tint: "oklch(0.55 0.20 260)", badge: "Previsão", title: "Q4 encerra 2,3% acima do plano", body: "Modelo aponta receita consolidada de R$ 7,7M no trimestre, com margem operacional de 21,4%." },
    { icon: Target, tint: "oklch(0.65 0.22 32)", badge: "Ação", title: "Recompra sugerida para Compras", body: "Antecipar pedido de rolamentos industriais no lote 88 evita reajuste de 4,1% previsto para outubro." },
  ];
  return (
    <Section
      id="ai-insights"
      eyebrow="Inteligência Artificial"
      title={<>A IA que <Typewriter className="font-[family-name:var(--font-display)] italic text-white/90" words={["prevê", "orienta", "decide junto"]} typeSpeed={80} eraseSpeed={45} /></>}
      description="Insights gerados a cada 15 minutos, cruzando dados operacionais, orçamentários e sinais de mercado."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {insights.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: it.tint }} />
                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08]" style={{ background: `${it.tint}18`, color: it.tint }}>
                    <it.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]" style={{ borderColor: `${it.tint}44`, background: `${it.tint}18`, color: it.tint }}>
                    {it.badge}
                  </span>
                </div>
                <div className="relative mt-6 font-[family-name:var(--font-display)] text-[22px] font-semibold leading-tight text-white">
                  {it.title}
                </div>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/55">{it.body}</p>
                <div className="relative mt-6 flex items-center gap-2 text-[12px] font-medium text-white/70">
                  Investigar <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// REPORTS
// ═════════════════════════════════════════════════════════════════════
function Reports() {
  return (
    <Section
      id="reports"
      eyebrow="Relatórios"
      title={<>Prontos para <span className="italic text-white/60">o board.</span></>}
      description="Documentos executivos gerados sob demanda — narrativa, gráficos e recomendações. Exporte em um clique."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {relatoriosList.map((r, i) => (
          <motion.div
            key={r.titulo}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_-10px_oklch(0.65_0.22_32/0.7)]" style={{ background: "var(--gradient-primary)" }}>
                <FileBarChart className="h-4 w-4" />
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70">{r.tipo}</span>
            </div>
            <div className="mt-6 font-[family-name:var(--font-display)] text-[19px] font-semibold text-white">{r.titulo}</div>
            <p className="mt-2 flex-1 text-[13px] text-white/55">{r.descricao}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4 text-[11px] text-white/45">
              <span>{r.periodo}</span>
              <span className="inline-flex items-center gap-1 text-white/70 transition-transform group-hover:translate-x-0.5">
                <Download className="h-3.5 w-3.5" /> Exportar
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// SETTINGS (preview)
// ═════════════════════════════════════════════════════════════════════
function SettingsSection() {
  return (
    <Section
      id="settings"
      eyebrow="Configurações"
      align="center"
      title={<>Do seu jeito, <span className="italic text-white/60">no seu ritmo.</span></>}
      description="Preferências de conta, integrações e políticas de acesso — em uma superfície minimalista."
    >
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur-xl md:p-12">
        <div className="flex flex-col gap-6">
          {[
            { label: "Notificações inteligentes", desc: "Receba alertas contextuais por e-mail e no app.", on: true },
            { label: "Sincronização com ERP", desc: "SAP, Oracle e TOTVS conectados via API.", on: true },
            { label: "Modo de apresentação", desc: "Layout ampliado para exibições no board.", on: false },
            { label: "Exportação automática", desc: "Relatórios enviados toda 1ª segunda do mês.", on: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-6 border-b border-white/[0.05] pb-6 last:border-0 last:pb-0">
              <div>
                <div className="text-[14px] font-medium text-white/90">{s.label}</div>
                <div className="mt-0.5 text-[12.5px] text-white/50">{s.desc}</div>
              </div>
              <div className={`relative h-6 w-10 rounded-full transition-colors ${s.on ? "bg-[--primary-orange]" : "bg-white/[0.08]"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${s.on ? "left-[18px]" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═════════════════════════════════════════════════════════════════════
// FOOTER
// ═════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05] px-6 py-20 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[300px] opacity-60" style={{ background: "radial-gradient(600px 300px at 50% 100%, oklch(0.65 0.22 32 / 0.25), transparent 70%)" }} />
      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-16">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">The Econommy</div>
          <div className="mt-4 font-[family-name:var(--font-display)] text-[clamp(40px,7vw,88px)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
            Transforme gastos em <span className="italic text-white/60">oportunidades.</span>
          </div>
          <button
            className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold text-white shadow-[0_20px_60px_-15px_oklch(0.65_0.22_32/0.7)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Criar minha conta <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/[0.05] pt-10 text-[12px] text-white/50 md:grid-cols-4">
          {[
            { title: "Produto", items: ["Dashboard", "Analytics", "Forecast", "IA Insights"] },
            { title: "Empresa", items: ["Sobre", "Clientes", "Segurança", "Compliance"] },
            { title: "Recursos", items: ["Documentação", "API", "Status", "Changelog"] },
            { title: "Legal", items: ["Termos", "Privacidade", "LGPD", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">{col.title}</div>
              <ul className="mt-4 flex flex-col gap-2">
                {col.items.map((i) => (
                  <li key={i} className="cursor-pointer transition-colors hover:text-white/85">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 text-[11px] text-white/40 md:flex-row">
          <div>© 2026 The Econommy · Feito para gestores exigentes.</div>
          <div className="flex items-center gap-2">
            <Check className="h-3 w-3 text-[--positive]" />
            Todos os sistemas operacionais
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────
const tooltipStyle = {
  background: "oklch(0.11 0.006 260 / 0.92)",
  border: "1px solid oklch(1 0 0 / 0.08)",
  borderRadius: 12,
  padding: "10px 14px",
  color: "white",
  fontSize: 12,
  backdropFilter: "blur(20px)",
};
