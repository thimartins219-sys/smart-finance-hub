import type { ReactNode } from "react";

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
  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-8 md:px-10 md:py-12">
      {/* Ambient hero gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-10 h-[420px] opacity-90"
        style={{ background: "var(--gradient-hero)" }}
      />
      {/* Subtle grid overlay behind hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] grid-bg opacity-40" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-count-up">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
                The Econommy · Suite
              </span>
            </div>
            <h1 className="font-display text-3xl font-normal tracking-tight text-gradient md:text-[42px] md:leading-[1.05]">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2 animate-fade-in-soft">{actions}</div>}
        </div>
        <div className="animate-fade-in-soft [animation-delay:120ms]">{children}</div>
      </div>
    </div>
  );
}
