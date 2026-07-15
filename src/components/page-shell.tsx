import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

const ROUTE_LABELS: Record<string, string> = {
  "": "Dashboard",
  gastos: "Gastos",
  "centros-custo": "Centros de Custo",
  relatorios: "Relatórios",
  indicadores: "Indicadores",
  configuracoes: "Configurações",
};

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div
      key={pathname}
      className="relative min-h-[calc(100vh-4.5rem)] px-6 py-10 md:px-12 md:py-14 animate-page-in"
    >
      {/* Ambient hero gradient — wide, diffuse, asymmetric */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 h-[480px] opacity-80"
        style={{ background: "var(--gradient-hero)" }}
      />
      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-[480px] grid-bg opacity-30" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-[11px] text-muted-foreground/50">
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-foreground/80"
          >
            <Home className="h-3 w-3" />
            <span>Início</span>
          </Link>
          {segments.map((seg, i) => (
            <span key={seg} className="flex items-center gap-1.5">
              <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/30" />
              <span
                className={
                  i === segments.length - 1
                    ? "text-foreground/80 font-medium"
                    : "text-muted-foreground/50"
                }
              >
                {ROUTE_LABELS[seg] ?? seg}
              </span>
            </span>
          ))}
        </nav>

        {/* Page Title Section */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 animate-count-up">
          <div className="max-w-2xl">
            {/* Suite badge */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-shimmer">
                The Econommy · Suite
              </span>
            </div>
            {/* Title with Instrument Serif */}
            <h1 className="font-display text-[38px] font-normal italic tracking-tight text-gradient md:text-[46px] md:leading-[1.08]">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground/70 max-w-lg">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>

        {/* Page Content */}
        <div className="animate-count-up [animation-delay:80ms]">{children}</div>
      </div>
    </div>
  );
}
