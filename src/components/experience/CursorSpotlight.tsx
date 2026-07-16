import { useEffect, useRef } from "react";

/**
 * Discreet cursor spotlight — a barely-there radial highlight that follows
 * the pointer. Kept intentionally subtle: small radius, low opacity, no
 * flashlight sensation. Hidden on touch devices.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const paint = () => {
      // gentle easing towards target for smoother, more natural feel
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.setProperty("--sx", `${cx}px`);
      el.style.setProperty("--sy", `${cy}px`);
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(paint);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden opacity-70 md:block"
      style={{
        background:
          "radial-gradient(220px circle at var(--sx, 50%) var(--sy, 50%), oklch(0.85 0.10 40 / 0.035), transparent 60%)",
      }}
    />
  );
}
