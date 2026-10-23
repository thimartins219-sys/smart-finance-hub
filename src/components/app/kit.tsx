import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { brl } from "@/lib/finance";
import { useFinance } from "@/lib/finance-store";

/* ─────────────── page choreography ─────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className={cn("space-y-6", className)}>
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-5 pb-2 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
        </div>
        <h1 className="font-display text-[2.4rem] font-normal leading-[1.05] tracking-tight text-foreground md:text-[3rem]">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </Reveal>
  );
}

/* ─────────────── surfaces ─────────────── */

export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <Reveal className={cn("surface overflow-hidden transition-shadow duration-500 hover:shadow-lift", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            {title && <h2 className="font-display text-[1.3rem] font-normal leading-tight tracking-tight">{title}</h2>}
            {subtitle && <p className="mt-1 text-[12.5px] text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn("p-6", bodyClassName)}>{children}</div>
    </Reveal>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone = "default",
  cents,
}: {
  label: string;
  value: number;
  hint?: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "positive" | "negative";
  cents?: boolean;
}) {
  return (
    <Reveal className="surface group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-700 group-hover:bg-primary/15" />
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary [&_svg]:h-[18px] [&_svg]:w-[18px]">
            {icon}
          </span>
        )}
      </div>
      <div
        className={cn(
          "num mt-5 font-display text-[2.1rem] font-normal leading-none",
          tone === "positive" && "text-success",
          tone === "negative" && "text-destructive",
        )}
      >
        <CountUp value={value} cents={cents} />
      </div>
      {hint && <div className="mt-3 text-[12.5px] text-muted-foreground">{hint}</div>}
    </Reveal>
  );
}

/* ─────────────── numbers ─────────────── */

const MASCARA = "R$ ••••••";

export function Money({ value, cents, signed, className }: { value: number; cents?: boolean; signed?: boolean; className?: string }) {
  const { prefs } = useFinance();
  if (prefs.ocultarValores) return <span className={cn("num", className)}>{MASCARA}</span>;
  const txt = brl(Math.abs(value), cents);
  const sinal = signed ? (value >= 0 ? "+ " : "− ") : value < 0 ? "− " : "";
  return <span className={cn("num", className)}>{sinal + txt}</span>;
}

export function CountUp({ value, cents, format }: { value: number; cents?: boolean; format?: (n: number) => string }) {
  const { prefs } = useFinance();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(0);
  const fmt = format ?? ((n: number) => (n < 0 ? "− " : "") + brl(Math.abs(n), cents));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefs.ocultarValores) return;
    if (reduce) {
      el.textContent = fmt(value);
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        el.textContent = fmt(n);
      },
    });
    prev.current = value;
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, prefs.ocultarValores, reduce]);

  if (prefs.ocultarValores) return <span className="num">{MASCARA}</span>;
  return (
    <span ref={ref} className="num">
      {fmt(0)}
    </span>
  );
}

export function Delta({ value, inverse }: { value: number; inverse?: boolean }) {
  const bom = inverse ? value <= 0 : value >= 0;
  return (
    <span
      className={cn(
        "num inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11.5px] font-semibold",
        bom ? "bg-success/12 text-success" : "bg-destructive/10 text-destructive",
      )}
    >
      {value >= 0 ? "▲" : "▼"} {Math.abs(value).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
    </span>
  );
}

/* ─────────────── charts ─────────────── */

interface TooltipPayload {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string | number;
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  labelFormatter?: (l: string | number) => string;
}) {
  const { prefs } = useFinance();
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[160px] rounded-2xl border border-shell-border bg-shell px-4 py-3 text-shell-foreground shadow-lift">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-shell-muted">
        {labelFormatter && label !== undefined ? labelFormatter(label) : label}
      </div>
      <div className="space-y-1.5">
        {payload.map((p) => (
          <div key={String(p.dataKey)} className="flex items-center justify-between gap-6 text-[12.5px]">
            <span className="flex items-center gap-2 text-shell-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              {p.name}
            </span>
            <span className="num font-semibold">{prefs.ocultarValores ? MASCARA : brl(Number(p.value ?? 0))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

/* ─────────────── misc ─────────────── */

export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
      <div className="font-display text-xl">{title}</div>
      {description && <p className="mt-1 max-w-sm text-[13px] text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Pointer-following 3D tilt with a light sheen. */
export function Tilt({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const sheen = useTransform([x, y] as never, ([a, b]: number[]) =>
    `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, oklch(1 0 0 / 0.22), transparent 45%)`,
  );
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: sheen, opacity: hover ? 1 : 0, transition: "opacity .4s" }}
        />
      )}
    </motion.div>
  );
}
