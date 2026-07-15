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
      {/* Mesh gradient background — Sanity-inspired dual glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 40% 45%, oklch(0.63 0.21 32 / 0.22), transparent 60%), radial-gradient(500px 350px at 60% 55%, oklch(0.50 0.20 260 / 0.12), transparent 55%), radial-gradient(900px 600px at 50% 50%, oklch(0.10 0.005 260 / 0.90), transparent 70%)",
        }}
      />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* SVG data network — organic flowing lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="introLineA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.18 38)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.55 0.20 260)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="introLineB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.55 0.20 260)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.63 0.21 32)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[
          { d: "M100,500 C220,400 300,320 400,300 S620,220 700,120", grad: "url(#introLineA)" },
          { d: "M60,320 C200,300 320,280 400,300 S560,340 740,320", grad: "url(#introLineB)" },
          { d: "M120,140 C260,220 340,260 400,300 S560,380 720,460", grad: "url(#introLineA)" },
        ].map((line, i) => (
          <path
            key={i}
            d={line.d}
            fill="none"
            stroke={line.grad}
            strokeWidth="0.8"
            className="animate-draw-line"
            style={{ animationDelay: `${i * 250}ms` }}
          />
        ))}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 60 + ((i * 53) % 720);
          const y = 100 + ((i * 71) % 420);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.2"
              fill={i % 3 === 0 ? "oklch(0.55 0.20 260)" : "oklch(0.75 0.18 38)"}
              opacity="0.5"
              className="animate-pulse-glow"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center animate-blur-in">
        {/* Logo mark */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div
            className="absolute -inset-6 blur-3xl opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          />
          <span className="relative font-display text-2xl text-primary-foreground leading-none italic">
            e
          </span>
        </div>
        {/* Title */}
        <div>
          <div className="font-display text-4xl md:text-5xl tracking-tight text-gradient italic">
            The Econommy
          </div>
          <div
            className="mt-3 text-[10px] uppercase tracking-[0.20em] text-shimmer font-medium"
            style={{ animationDelay: "600ms" }}
          >
            Transformando dados em decisões
          </div>
        </div>
        {/* Skip */}
        <button
          onClick={skip}
          className="mt-4 text-[9px] uppercase tracking-[0.16em] text-muted-foreground/40 transition-colors hover:text-foreground/70"
        >
          Pular intro
        </button>
      </div>
    </div>
  );
}
