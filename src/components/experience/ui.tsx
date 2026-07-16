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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[--primary-orange] shadow-[0_0_8px_var(--primary-orange)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/50">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function GlassPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl ${className}`}>
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
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium"
      style={{ borderColor: `${tint}44`, background: `${tint}18`, color: tint }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: tint }} />
      {status}
    </span>
  );
}
