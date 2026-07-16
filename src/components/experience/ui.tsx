import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const tooltipStyle = {
  background: "oklch(0.11 0.006 260 / 0.95)",
  border: "1px solid oklch(1 0 0 / 0.08)",
  borderRadius: 12,
  padding: "10px 14px",
  color: "white",
  fontSize: 12,
  backdropFilter: "blur(20px)",
} as const;

export function ModuleShell({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative min-h-screen w-full px-6 py-24 md:px-12 md:py-28 ${className}`}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[--primary-orange] shadow-[0_0_8px_var(--primary-orange)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.02] tracking-[-0.028em] text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/50">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function GlassPanel({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`group/panel relative overflow-hidden rounded-[22px] border border-white/[0.06] bg-white/[0.018] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        interactive
          ? "hover:-translate-y-[2px] hover:border-white/[0.11] hover:bg-white/[0.03] hover:shadow-[0_28px_60px_-32px_oklch(0_0_0/0.7)]"
          : ""
      } ${className}`}
    >
      {/* top hairline highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
      />
      {children}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pago: "oklch(0.72 0.17 155)",
    Aprovado: "oklch(0.55 0.20 260)",
    Pendente: "oklch(0.80 0.14 75)",
    Saudável: "oklch(0.72 0.17 155)",
    Otimizado: "oklch(0.55 0.20 260)",
    Atenção: "oklch(0.80 0.14 75)",
    Crítico: "oklch(0.62 0.22 25)",
  };
  const tint = map[status] ?? "oklch(0.60 0.02 260)";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-[0.02em]"
      style={{ borderColor: `${tint}38`, background: `${tint}14`, color: tint }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: tint }} />
      {status}
    </span>
  );
}

/**
 * Premium KPI card — the canonical stat surface for the product.
 * Generous padding, oversized display number, refined delta pill.
 */
export function KpiCard({
  label,
  value,
  delta,
  positive,
  icon: Icon,
  tint = "oklch(0.72 0.17 155)",
  footnote,
  onClick,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  positive?: boolean;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  tint?: string;
  footnote?: string;
  onClick?: () => void;
}) {
  const Comp: any = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-white/[0.06] bg-white/[0.018] p-6 text-left backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        onClick
          ? "hover:-translate-y-[2px] hover:border-white/[0.12] hover:bg-white/[0.032] hover:shadow-[0_28px_60px_-30px_oklch(0_0_0/0.75)]"
          : ""
      }`}
    >
      {/* top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.11] to-transparent"
      />
      {/* corner ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-[0.14] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.22]"
        style={{ background: tint }}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/45">
          {label}
        </span>
        {Icon && (
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02]"
            style={{ color: tint }}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <div className="relative mt-4 font-[family-name:var(--font-display)] text-[36px] font-semibold leading-none tracking-[-0.025em] text-white">
        {value}
      </div>

      <div className="relative mt-3 flex items-center justify-between">
        {delta ? (
          <span
            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium tabular-nums"
            style={{
              borderColor: positive
                ? "oklch(0.72 0.17 155 / 0.28)"
                : "oklch(0.62 0.22 25 / 0.28)",
              background: positive
                ? "oklch(0.72 0.17 155 / 0.10)"
                : "oklch(0.62 0.22 25 / 0.10)",
              color: positive ? "oklch(0.78 0.17 155)" : "oklch(0.72 0.20 25)",
            }}
          >
            <span
              aria-hidden
              className="h-[3px] w-[3px] rounded-full"
              style={{ background: positive ? "oklch(0.78 0.17 155)" : "oklch(0.72 0.20 25)" }}
            />
            {delta}
          </span>
        ) : (
          <span />
        )}
        {footnote && (
          <span className="text-[10.5px] text-white/35">{footnote}</span>
        )}
      </div>
    </Comp>
  );
}
