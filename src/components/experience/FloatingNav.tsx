import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export type NavSection = { id: string; label: string };

export function FloatingNav({ sections }: { sections: NavSection[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeSection = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, oklch(0.65 0.22 32), oklch(0.58 0.20 260))",
        }}
      />

      {/* Top glass nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-1/2 top-4 z-[70] -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "w-[min(94vw,720px)]" : "w-[min(94vw,820px)]"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-6 rounded-full border px-5 py-2.5 backdrop-blur-2xl transition-all duration-500 ${
            scrolled
              ? "border-white/[0.08] bg-black/40 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.6)]"
              : "border-white/[0.04] bg-black/20"
          }`}
        >
          <button
            onClick={() => scrollTo(sections[0].id)}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg">
              <div className="absolute inset-0" style={{ background: "var(--gradient-primary)" }} />
              <span className="relative font-[family-name:var(--font-display)] text-sm font-bold text-white leading-none">e</span>
            </div>
            <span className="font-[family-name:var(--font-display)] text-[13.5px] font-semibold tracking-tight text-white/95">
              The Econommy
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {sections.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`relative rounded-full px-3 py-1 text-[11px] font-medium tracking-wide transition-colors ${
                  active === s.id ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("ai-insights")}
            className="rounded-full px-4 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_24px_-8px_oklch(0.65_0.22_32/0.6)] transition-transform hover:scale-[1.03]"
            style={{ background: "var(--gradient-primary)" }}
          >
            Explorar IA
          </button>
        </div>
      </motion.header>

      {/* Right-edge minimal indicator — hairline rail + refined dots */}
      <nav className="fixed right-6 top-1/2 z-[70] hidden -translate-y-1/2 lg:block">
        <div className="relative flex flex-col items-end gap-4 py-2">
          {/* vertical hairline behind dots */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-[3px] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent"
          />
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="group relative flex items-center justify-end gap-3"
                aria-label={s.label}
              >
                <span
                  className={`whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "text-white/80 opacity-100 translate-x-0"
                      : "text-white/45 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  {s.label}
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.7,
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`block h-[7px] w-[7px] rounded-full border transition-colors duration-500 ${
                    isActive
                      ? "border-[--primary-orange] bg-[--primary-orange] shadow-[0_0_10px_oklch(0.65_0.22_32/0.45)]"
                      : "border-white/25 bg-transparent group-hover:border-white/55"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom section label — mobile */}
      <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.06] bg-black/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-xl lg:hidden">
        <span className="h-1 w-1 rounded-full bg-[--primary-orange] shadow-[0_0_6px_var(--primary-orange)]" />
        {activeSection?.label}
      </div>
    </>
  );
}
