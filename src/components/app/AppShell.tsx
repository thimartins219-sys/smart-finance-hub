import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeftRight,
  CalendarClock,
  Eye,
  EyeOff,
  FileBarChart2,
  LayoutDashboard,
  Menu,
  Moon,
  Plus,
  Settings2,
  Sparkles,
  Sun,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFinance } from "@/lib/finance-store";
import { dataExtenso, statusVencimento } from "@/lib/finance";
import { HOJE } from "@/lib/mock-data";
import { TransactionDialog } from "./TransactionDialog";

export const NAV = [
  { to: "/", label: "Painel", icon: LayoutDashboard },
  { to: "/contas", label: "Contas e Cartões", icon: WalletCards },
  { to: "/transacoes", label: "Transações", icon: ArrowLeftRight },
  { to: "/agenda", label: "A Pagar e Receber", icon: CalendarClock },
  { to: "/fluxo", label: "Fluxo de Caixa", icon: TrendingUp },
  { to: "/relatorios", label: "Relatórios", icon: FileBarChart2 },
  { to: "/copiloto", label: "Copiloto IA", icon: Sparkles },
  { to: "/configuracoes", label: "Configurações", icon: Settings2 },
] as const;

function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary font-display text-xl text-primary-foreground shadow-glow">
        E
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-[1.15rem] tracking-tight text-shell-foreground">The Econommy</span>
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.22em] text-shell-muted">Private finance</span>
        </span>
      )}
    </Link>
  );
}

function NavList({ pathname, compact, onNavigate }: { pathname: string; compact?: boolean; onNavigate?: () => void }) {
  const { vencimentos } = useFinance();
  const atrasados = vencimentos.filter((v) => statusVencimento(v) === "atrasado").length;

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={compact ? item.label : undefined}
            className={cn(
              "group relative flex h-11 items-center gap-3 rounded-2xl text-[13.5px] font-medium transition-colors duration-300",
              compact ? "justify-center px-0" : "px-3.5",
              active ? "text-shell-foreground" : "text-shell-muted hover:text-shell-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={compact ? "nav-pill-compact" : "nav-pill"}
                className="absolute inset-0 rounded-2xl border border-shell-border bg-shell-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              >
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary shadow-glow" />
              </motion.span>
            )}
            <Icon className={cn("relative h-[18px] w-[18px] transition-colors", active ? "text-primary" : "group-hover:text-shell-foreground")} />
            {!compact && <span className="relative flex-1">{item.label}</span>}
            {item.to === "/agenda" && atrasados > 0 && (
              <span
                className={cn(
                  "relative flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10.5px] font-bold text-primary-foreground",
                  compact && "absolute right-1.5 top-1 h-4 min-w-4 text-[9px]",
                )}
              >
                {atrasados}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard({ compact }: { compact?: boolean }) {
  const { perfil, empresa } = useFinance();
  const iniciais = perfil.nome.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <Link
      to="/configuracoes"
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-shell-border bg-shell-accent p-2.5 transition-colors hover:border-primary/40",
        compact && "justify-center border-transparent bg-transparent p-0",
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-[12px] font-bold text-primary-foreground">
        {iniciais}
      </span>
      {!compact && (
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[13px] font-semibold text-shell-foreground">{perfil.nome}</span>
          <span className="block truncate text-[11.5px] text-shell-muted">{perfil.cargo} · {empresa.nome}</span>
        </span>
      )}
    </Link>
  );
}

/** Orange + graphite curtain that sweeps the workspace on every page change. */
function Curtain({ pathname }: { pathname: string }) {
  const reduce = useReducedMotion();
  const primeiro = useRef(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (primeiro.current) {
      primeiro.current = false;
      return;
    }
    setN((x) => x + 1);
  }, [pathname]);
  if (reduce || n === 0) return null;
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 right-0 z-40 overflow-hidden md:left-[88px] lg:left-[264px]">
      <motion.div
        key={n}
        className="absolute inset-0 flex"
        initial={{ x: "-105%" }}
        animate={{ x: "105%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="h-full w-1/3 bg-gradient-primary" />
        <div className="h-full flex-1 bg-shell" />
      </motion.div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const fin = useFinance();
  const [mobile, setMobile] = useState(false);
  const [novaAberta, setNovaAberta] = useState(false);
  const reduce = useReducedMotion();
  const atual = useMemo(
    () => NAV.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to))) ?? NAV[0],
    [pathname],
  );
  const montou = useRef(false);
  useEffect(() => {
    montou.current = true;
  }, []);

  return (
    <div className="min-h-screen bg-shell bg-[image:var(--gradient-shell)]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col px-5 py-6 lg:flex">
        <Logo />
        <div className="mt-10 mb-3 px-3.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-shell-muted/70">Menu</div>
        <NavList pathname={pathname} />
        <div className="mt-auto space-y-4">
          <div className="grain overflow-hidden rounded-2xl border border-shell-border bg-gradient-hero p-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="mt-2 text-[12.5px] leading-relaxed text-shell-foreground">Pergunte ao Copiloto onde dá para economizar este mês.</p>
            <Link to="/copiloto" className="mt-3 inline-block text-[12px] font-semibold text-primary hover:underline">Abrir Copiloto →</Link>
          </div>
          <UserCard />
        </div>
      </aside>

      {/* Tablet rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[88px] flex-col items-center px-3 py-6 md:flex lg:hidden">
        <Logo compact />
        <div className="mt-10 w-full">
          <NavList pathname={pathname} compact />
        </div>
        <div className="mt-auto">
          <UserCard compact />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-shell/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-shell px-5 py-6 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setMobile(false)} className="cursor-pointer text-shell-muted hover:text-shell-foreground" aria-label="Fechar menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8">
                <NavList pathname={pathname} onNavigate={() => setMobile(false)} />
              </div>
              <div className="mt-auto">
                <UserCard />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="md:pl-[88px] lg:pl-[264px]">
        <div className="md:py-3 md:pr-3">
          <div className="relative min-h-screen overflow-clip bg-background md:min-h-[calc(100vh-24px)] md:rounded-[28px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-ambient" />

            {/* Top bar */}
            <header className="sticky top-0 z-20 border-b border-border/60 bg-background/75 backdrop-blur-xl">
              <div className="flex h-16 items-center gap-3 px-5 md:px-8">
                <button
                  onClick={() => setMobile(true)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={atual.to}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="truncate text-[13.5px] font-semibold"
                    >
                      {atual.label}
                    </motion.div>
                  </AnimatePresence>
                  <div className="hidden truncate text-[11.5px] capitalize text-muted-foreground sm:block">{dataExtenso(HOJE)}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fin.setPrefs({ ocultarValores: !fin.prefs.ocultarValores })}
                  aria-label={fin.prefs.ocultarValores ? "Mostrar valores" : "Ocultar valores"}
                  title={fin.prefs.ocultarValores ? "Mostrar valores" : "Ocultar valores"}
                >
                  {fin.prefs.ocultarValores ? <EyeOff /> : <Eye />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fin.setPrefs({ tema: fin.prefs.tema === "escuro" ? "claro" : "escuro" })}
                  aria-label="Alternar modo escuro"
                  title="Alternar modo escuro"
                >
                  {fin.prefs.tema === "escuro" ? <Sun /> : <Moon />}
                </Button>
                <Button onClick={() => setNovaAberta(true)} className="hidden sm:inline-flex">
                  <Plus /> Nova transação
                </Button>
                <Button onClick={() => setNovaAberta(true)} size="icon" className="sm:hidden" aria-label="Nova transação">
                  <Plus />
                </Button>
              </div>
            </header>

            <main className="relative px-5 pb-16 pt-8 md:px-8 lg:px-10">
              <motion.div
                key={pathname}
                initial={montou.current && !reduce ? { opacity: 0, scale: 0.985 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[1320px]"
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </div>

      <Curtain pathname={pathname} />
      <TransactionDialog open={novaAberta} onOpenChange={setNovaAberta} />
    </div>
  );
}
