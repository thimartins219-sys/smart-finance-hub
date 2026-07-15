import { useEffect, useState } from "react";

const STORAGE_KEY = "econommy:intro:seen";

export function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;
    setVisible(true);
    const t1 = window.setTimeout(() => setPhase("out"), 2400);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }, 3100);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  const skip = () => {
    setPhase("out");
    window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${
        phase === "out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient radial glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 50%, oklch(0.74 0.17 50 / 0.28), transparent 65%), radial-gradient(900px 600px at 50% 50%, oklch(0.62 0.14 40 / 0.10), transparent 70%)",
        }}
      />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* SVG data network */}
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="introLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.14 72)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 45)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[
          "M100,500 C220,400 300,320 400,300 S620,220 700,120",
          "M60,320 C200,300 320,280 400,300 S560,340 740,320",
          "M120,140 C260,220 340,260 400,300 S560,380 720,460",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#introLine)"
            strokeWidth="1.2"
            className="animate-draw-line"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 60 + ((i * 43) % 720);
          const y = 100 + ((i * 71) % 420);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill="oklch(0.86 0.14 72)"
              opacity="0.6"
              className="animate-pulse-glow"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center animate-fade-in-soft">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div
            className="absolute -inset-4 blur-2xl opacity-70"
            style={{ background: "var(--gradient-primary)" }}
          />
          <span className="relative font-display text-3xl text-primary-foreground leading-none">
            e
          </span>
        </div>
        <div>
          <div className="font-display text-4xl md:text-5xl tracking-tight text-gradient">
            The Econommy
          </div>
          <div
            className="mt-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80 animate-fade-in-soft"
            style={{ animationDelay: "600ms" }}
          >
            Transformando dados em decisões
          </div>
        </div>
        <button
          onClick={skip}
          className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground/60 transition-colors hover:text-foreground"
        >
          Pular intro
        </button>
      </div>
    </div>
  );
}
