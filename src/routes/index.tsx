import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  LineChart,
  Layers,
  Zap,
  Eye,
  BrainCircuit,
  AlertTriangle,
  Plug,
  BarChart3,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  Building2,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground font-sans">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute top-[40%] -left-40 h-[400px] w-[400px] rounded-full bg-info/10 blur-[120px]" />
        <div className="absolute top-[80%] right-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
      </div>

      <Nav />
      <Hero />
      <Ticker />
      <Problem />
      <HowItWorks />
      <DashboardPreview />
      <Benefits />
      <Trust />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl glass-strong px-5 py-3 mx-4 md:mx-auto md:px-6">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            The Econommy
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#problema" className="hover:text-foreground transition-colors">Problema</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#produto" className="hover:text-foreground transition-colors">Produto</a>
          <a href="#beneficios" className="hover:text-foreground transition-colors">Benefícios</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden text-sm text-muted-foreground hover:text-foreground md:block">
            Entrar
          </button>
          <PrimaryButton size="sm">Começar agora</PrimaryButton>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_20px_-4px_var(--primary)]">
      <span className="font-display text-sm font-bold text-primary-foreground">E</span>
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 md:px-6 md:pt-24">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="animate-count-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Inteligência financeira em tempo real
          </div>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[68px]">
            <span className="text-gradient">Transforme gastos em</span>{" "}
            <span className="text-gradient-primary">decisões inteligentes.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tenha controle absoluto dos custos da sua empresa e descubra onde economizar —
            antes que o dinheiro desapareça.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton>
              Começar agora <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <SecondaryButton>Ver demonstração</SecondaryButton>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            <Stat value="R$ 2.4M" label="economizados" />
            <Stat value="38%" label="redução média" />
            <Stat value="+ 400" label="empresas" />
          </div>
        </div>

        <div className="relative">
          <HeroApp />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-gradient-primary">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function HeroApp() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-8 rounded-[36px] bg-gradient-to-br from-primary/30 via-primary/5 to-info/20 opacity-70 blur-3xl" />

      {/* Main app card */}
      <div className="relative rounded-3xl glass-strong p-1.5 shadow-[var(--shadow-elevated)]">
        <div className="rounded-[20px] bg-gradient-to-b from-surface to-background p-5">
          {/* window chrome */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <div className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              app.theeconommy.com
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-positive animate-pulse-glow" />
              ao vivo
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <KpiCard
              label="Economia gerada"
              value="R$ 482.900"
              delta="+18.2%"
              positive
              icon={<Wallet className="h-3.5 w-3.5" />}
            />
            <KpiCard
              label="Gastos do mês"
              value="R$ 1.24M"
              delta="-6.4%"
              positive
              icon={<TrendingDown className="h-3.5 w-3.5" />}
            />
          </div>

          {/* Chart */}
          <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Evolução de gastos</div>
                <div className="mt-1 font-display text-lg font-semibold">R$ 8.42M ano</div>
              </div>
              <div className="flex gap-1 rounded-md bg-white/5 p-0.5 text-[10px]">
                {["1M", "3M", "1A"].map((t, i) => (
                  <span
                    key={t}
                    className={
                      i === 2
                        ? "rounded bg-primary/20 px-1.5 py-0.5 text-primary"
                        : "px-1.5 py-0.5 text-muted-foreground"
                    }
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <MiniChart />
          </div>

          {/* Categories + alert */}
          <div className="mt-3 grid grid-cols-5 gap-3">
            <div className="col-span-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-xs text-muted-foreground">Categorias de despesa</div>
              <div className="mt-3 space-y-2.5">
                <Category name="Infraestrutura Cloud" pct={42} color="var(--primary)" />
                <Category name="Softwares & SaaS" pct={28} color="var(--info)" />
                <Category name="Marketing" pct={18} color="oklch(0.7 0.15 320)" />
                <Category name="Operações" pct={12} color="oklch(0.72 0.18 155)" />
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <AlertRow
                tone="warning"
                title="Fornecedor duplicado"
                text="Cloudflare +Fastly"
              />
              <AlertRow
                tone="positive"
                title="Economia possível"
                text="R$ 24k/mês"
              />
              <AlertRow tone="info" title="Novo insight" text="Renegociar AWS" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <FloatingBadge className="absolute -left-4 top-14 hidden md:flex animate-float">
        <BrainCircuit className="h-4 w-4 text-primary" />
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            IA sugere
          </div>
          <div className="text-xs font-medium">Consolidar 3 SaaS</div>
        </div>
      </FloatingBadge>

      <FloatingBadge
        className="absolute -right-5 bottom-20 hidden md:flex animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        <TrendingUp className="h-4 w-4 text-positive" />
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Economia YTD
          </div>
          <div className="text-xs font-medium text-positive">+R$ 1.2M</div>
        </div>
      </FloatingBadge>
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  positive,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {icon}
          {label}
        </div>
        <span
          className={`flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
            positive
              ? "bg-positive/10 text-positive"
              : "bg-negative/10 text-negative"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {delta}
        </span>
      </div>
      <div className="mt-2 font-display text-xl font-semibold">{value}</div>
      <SparkLine positive={positive} />
    </div>
  );
}

function SparkLine({ positive }: { positive?: boolean }) {
  const color = positive ? "var(--positive)" : "var(--negative)";
  return (
    <svg viewBox="0 0 100 24" className="mt-2 h-6 w-full">
      <defs>
        <linearGradient id={`sg-${positive ? "p" : "n"}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,18 L15,15 L30,17 L45,10 L60,13 L75,6 L90,8 L100,3"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0,18 L15,15 L30,17 L45,10 L60,13 L75,6 L90,8 L100,3 L100,24 L0,24 Z"
        fill={`url(#sg-${positive ? "p" : "n"})`}
      />
    </svg>
  );
}

function MiniChart() {
  const points = [40, 55, 48, 62, 58, 70, 65, 78, 74, 88, 82, 95];
  const max = 100;
  const w = 100;
  const h = 60;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / max) * h}`)
    .join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <div className="mt-3">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#chartGrad)" />
        <path
          d={path}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-line"
        />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
        {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map(
          (m) => (
            <span key={m}>{m}</span>
          ),
        )}
      </div>
    </div>
  );
}

function Category({ name, pct, color }: { name: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground">{name}</span>
        <span className="font-mono text-foreground">{pct}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function AlertRow({
  tone,
  title,
  text,
}: {
  tone: "warning" | "positive" | "info";
  title: string;
  text: string;
}) {
  const toneMap = {
    warning: { bg: "bg-primary/10", text: "text-primary", icon: <AlertTriangle className="h-3 w-3" /> },
    positive: { bg: "bg-positive/10", text: "text-positive", icon: <TrendingUp className="h-3 w-3" /> },
    info: { bg: "bg-info/10", text: "text-info", icon: <Sparkles className="h-3 w-3" /> },
  } as const;
  const t = toneMap[tone];
  return (
    <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
      <div className={`inline-flex items-center gap-1 rounded-md ${t.bg} ${t.text} px-1.5 py-0.5 text-[9px] font-medium`}>
        {t.icon} {title}
      </div>
      <div className="mt-1 text-[11px]">{text}</div>
    </div>
  );
}

function FloatingBadge({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`items-center gap-2 rounded-xl glass-strong px-3 py-2 shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- TICKER ---------------- */
function Ticker() {
  const items = [
    "Cloud AWS  −12.4%",
    "SaaS Consolidados  +R$ 84K",
    "Fornecedores  318 ativos",
    "Marketing ROAS  4.2x",
    "Operações  −8.1%",
    "Renegociações  27",
    "Alertas  ao vivo",
  ];
  const all = [...items, ...items];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-4">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-ticker gap-12 font-mono text-xs text-muted-foreground">
          {all.map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const items = [
    {
      icon: Layers,
      title: "Gastos espalhados",
      text: "Dados fragmentados em planilhas, ERPs, cartões e fornecedores diferentes.",
    },
    {
      icon: Eye,
      title: "Falta de visão estratégica",
      text: "Sem consolidação, é impossível enxergar o quadro real do negócio.",
    },
    {
      icon: Target,
      title: "Decisões por achismo",
      text: "Escolhas críticas tomadas sem contexto, sem dado, sem certeza.",
    },
    {
      icon: TrendingDown,
      title: "Economias perdidas",
      text: "Contratos duplicados, cobranças esquecidas e desperdício invisível.",
    },
  ];

  return (
    <section id="problema" className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <SectionHeader
        tag="O problema"
        title="Você sabe exatamente para onde seu dinheiro está indo?"
        subtitle="A maioria das empresas não sabe. E é exatamente aí que a economia se perde."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      icon: Plug,
      title: "Conecte seus dados",
      text: "Integre ERPs, bancos, cartões e planilhas em minutos. Sem código, sem TI.",
    },
    {
      icon: BarChart3,
      title: "Analise seus custos",
      text: "Nossa IA identifica padrões, duplicidades e oportunidades escondidas.",
    },
    {
      icon: BrainCircuit,
      title: "Decida com inteligência",
      text: "Receba recomendações claras e aja com confiança nos números.",
    },
  ];

  return (
    <section id="como-funciona" className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <SectionHeader
        tag="Como funciona"
        title="Três passos entre você e o controle total."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="group relative rounded-3xl glass p-8 transition-all hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)]">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="font-mono text-4xl font-semibold text-white/5 transition-colors group-hover:text-primary/20">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- DASHBOARD PREVIEW ---------------- */
function DashboardPreview() {
  return (
    <section id="produto" className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <SectionHeader
        tag="O produto"
        title="Um centro de comando para toda a sua operação financeira."
        subtitle="KPIs, análises e alertas — em uma interface pensada para decidir rápido."
      />

      <div className="relative mt-14">
        <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-primary/20 via-transparent to-info/10 blur-3xl" />
        <div className="relative rounded-3xl glass-strong p-2 shadow-[var(--shadow-elevated)]">
          <div className="rounded-[22px] bg-gradient-to-b from-surface to-background p-6 md:p-8">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Painel financeiro
                </div>
                <div className="mt-1 font-display text-2xl font-semibold">
                  Visão geral · Outubro
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg glass px-3 py-1.5 text-xs text-muted-foreground">
                  Últimos 30 dias
                </div>
                <div className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs text-primary">
                  Exportar
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <BigKpi label="Economia gerada" value="R$ 482.900" delta="+18.2%" positive />
              <BigKpi label="Gastos mensais" value="R$ 1.24M" delta="-6.4%" positive />
              <BigKpi label="Redução de custos" value="38%" delta="+4.1pp" positive />
              <BigKpi label="Fornecedores analisados" value="318" delta="+22" positive />
            </div>

            {/* Charts */}
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Evolução mensal de gastos</div>
                    <div className="mt-1 font-display text-lg font-semibold">
                      R$ 8.42M <span className="text-muted-foreground text-sm font-normal">/ ano</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <LegendDot color="var(--primary)" label="Gastos" />
                    <LegendDot color="var(--info)" label="Economia" />
                  </div>
                </div>
                <BigChart />
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="text-xs text-muted-foreground">Gastos por categoria</div>
                <div className="mt-4 flex items-center justify-center">
                  <Donut />
                </div>
                <div className="mt-4 space-y-2">
                  <Category name="Cloud" pct={42} color="var(--primary)" />
                  <Category name="SaaS" pct={28} color="var(--info)" />
                  <Category name="Marketing" pct={18} color="oklch(0.7 0.15 320)" />
                  <Category name="Operações" pct={12} color="var(--positive)" />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Linha do tempo financeira</div>
                <div className="text-[11px] font-mono text-muted-foreground">
                  atualizado agora
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <TimelineItem
                  time="14:32"
                  title="Contrato duplicado detectado"
                  text="Cloudflare + Fastly · sobreposição de 78%"
                  tone="warning"
                  amount="-R$ 24.000/mês"
                />
                <TimelineItem
                  time="11:08"
                  title="Renegociação AWS concluída"
                  text="Novo compromisso Savings Plan · 3 anos"
                  tone="positive"
                  amount="+R$ 41.200/mês"
                />
                <TimelineItem
                  time="09:15"
                  title="Alerta orçamentário"
                  text="Marketing ultrapassou 90% do budget"
                  tone="negative"
                  amount="R$ 312.000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigKpi({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="font-display text-2xl font-semibold tracking-tight">{value}</div>
        <span
          className={`flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium ${
            positive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {delta}
        </span>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function BigChart() {
  const bars = [62, 70, 58, 74, 66, 80, 72, 88, 82, 95, 78, 92];
  return (
    <div className="mt-6 flex h-52 items-end gap-2">
      {bars.map((b, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-primary/60 via-primary to-primary-glow animate-bar-grow"
            style={{ height: `${b}%`, animationDelay: `${i * 60}ms` }}
          />
          <span className="font-mono text-[9px] text-muted-foreground">
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
          </span>
        </div>
      ))}
    </div>
  );
}

function Donut() {
  const segments = [
    { pct: 42, color: "var(--primary)" },
    { pct: 28, color: "var(--info)" },
    { pct: 18, color: "oklch(0.7 0.15 320)" },
    { pct: 12, color: "var(--positive)" },
  ];
  let offset = 0;
  const c = 2 * Math.PI * 40;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        {segments.map((s, i) => {
          const len = (s.pct / 100) * c;
          const el = (
            <circle
              key={i}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={s.color}
              strokeWidth="12"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
        <div className="font-display text-lg font-semibold">R$ 1.24M</div>
      </div>
    </div>
  );
}

function TimelineItem({
  time,
  title,
  text,
  tone,
  amount,
}: {
  time: string;
  title: string;
  text: string;
  tone: "positive" | "negative" | "warning";
  amount: string;
}) {
  const toneColor = {
    positive: "text-positive bg-positive/10",
    negative: "text-negative bg-negative/10",
    warning: "text-primary bg-primary/10",
  }[tone];
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <span className="font-mono text-xs text-muted-foreground">{time}</span>
      <span className={`h-2 w-2 rounded-full ${toneColor.split(" ")[0].replace("text-", "bg-")}`} />
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{text}</div>
      </div>
      <span className={`rounded-md px-2 py-1 font-mono text-xs ${toneColor}`}>{amount}</span>
    </div>
  );
}

/* ---------------- BENEFITS ---------------- */
function Benefits() {
  const items = [
    {
      icon: TrendingDown,
      title: "Redução inteligente de custos",
      text: "IA identifica desperdícios, duplicidades e renegociações possíveis.",
    },
    {
      icon: ShieldCheck,
      title: "Maior controle financeiro",
      text: "Governança e trilhas de auditoria em cada linha de gasto.",
    },
    {
      icon: Eye,
      title: "Visibilidade operacional",
      text: "Todos os times, contratos e fornecedores em uma só visão viva.",
    },
    {
      icon: LineChart,
      title: "Decisões baseadas em dados",
      text: "Chega de achismo. Cada escolha ancorada em evidência real.",
    },
  ];

  return (
    <section id="beneficios" className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <SectionHeader
        tag="Benefícios"
        title="Feito para quem opera com precisão."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {items.map((b) => (
          <div
            key={b.title}
            className="group relative overflow-hidden rounded-3xl glass p-8 transition-all hover:border-primary/30"
          >
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_10px_30px_-10px_var(--primary)]">
                <b.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Saiba mais <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TRUST ---------------- */
function Trust() {
  const logos = ["Northwind", "Vertex", "Kairos", "Meridian", "Halcyon", "Orbita", "Lumen", "Praxis"];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="rounded-3xl glass-strong px-8 py-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <Building2 className="h-3 w-3" /> Empresas que operam melhor
        </div>
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Construído para empresas que querem{" "}
          <span className="text-gradient-primary">operar melhor.</span>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-4">
          {logos.map((l) => (
            <div
              key={l}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] py-4 font-display text-sm font-semibold tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {l.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> SOC 2 Type II</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> LGPD Compliant</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> ISO 27001</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 99.99% uptime</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <div className="relative overflow-hidden rounded-[36px] glass-strong px-8 py-20 text-center md:px-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 -top-40 mx-auto h-96 w-[70%] rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
            <Zap className="h-3 w-3" /> Comece em minutos
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="text-gradient">Comece a transformar seus gastos em</span>{" "}
            <span className="text-gradient-primary">oportunidades.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Sem cartão de crédito. Sem integrações complexas. Insights financeiros
            em menos de 10 minutos.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton size="lg">
              Criar minha conta <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <SecondaryButton size="lg">Falar com especialista</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-6">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-sm font-semibold">The Econommy</span>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Produto</a>
          <a href="#" className="hover:text-foreground">Segurança</a>
          <a href="#" className="hover:text-foreground">Contato</a>
          <a href="#" className="hover:text-foreground">Termos</a>
          <a href="#" className="hover:text-foreground">Privacidade</a>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} The Econommy · Inteligência financeira corporativa
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-primary" />
        {tag}
      </div>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

function PrimaryButton({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const pad =
    size === "sm" ? "px-4 py-2 text-sm" : size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm";
  return (
    <button
      className={`group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-primary-glow to-primary font-medium text-primary-foreground shadow-[0_10px_30px_-8px_var(--primary)] transition-all hover:shadow-[0_15px_40px_-8px_var(--primary)] hover:-translate-y-0.5 ${pad}`}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/30 to-transparent opacity-40" />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}

function SecondaryButton({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const pad =
    size === "sm" ? "px-4 py-2 text-sm" : size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm";
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl glass font-medium text-foreground transition-all hover:border-primary/40 hover:-translate-y-0.5 ${pad}`}
    >
      {children}
    </button>
  );
}
