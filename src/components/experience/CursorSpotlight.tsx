import { useEffect, useRef } from "react";

/**
 * Elegant cursor spotlight — a soft radial glow that follows the pointer
 * across the entire viewport. Uses rAF-throttled updates via CSS variables
 * on a single fixed element for GPU-friendly, 60fps interaction. Hidden on
 * touch devices.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      raf = 0;
      el.style.setProperty("--sx", `${x}px`);
      el.style.setProperty("--sy", `${y}px`);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    paint();

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      style={{
        background:
          "radial-gradient(520px circle at var(--sx, 50%) var(--sy, 50%), oklch(0.75 0.20 40 / 0.10), transparent 55%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
