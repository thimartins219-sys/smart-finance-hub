import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Living aurora background — colored blobs drift, breathe, and shift hue
 * with scroll. Sits above body::before atmosphere; sub-content still stays
 * over a lifted deep-indigo (never pure black).
 */
export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [28, 275, 155]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-3] overflow-hidden">
      {/* Aurora blob — warm */}
      <motion.div
        aria-hidden
        className="absolute -top-[20%] left-[-12%] h-[80vh] w-[80vh] rounded-full opacity-70 will-change-transform"
        style={{
          y: y1,
          filter: "blur(120px)",
          background: useTransform(
            hue,
            (h) => `radial-gradient(circle, oklch(0.70 0.22 ${h} / 0.55), transparent 65%)`,
          ),
        }}
        animate={{ x: [0, 60, -40, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob — cool */}
      <motion.div
        aria-hidden
        className="absolute top-[30%] right-[-18%] h-[90vh] w-[90vh] rounded-full opacity-65 will-change-transform"
        style={{
          y: y2,
          filter: "blur(140px)",
          background: useTransform(
            hue,
            (h) => `radial-gradient(circle, oklch(0.60 0.22 ${(h + 220) % 360} / 0.42), transparent 65%)`,
          ),
        }}
        animate={{ x: [0, -50, 30, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob — emerald signature (finance) */}
      <motion.div
        aria-hidden
        className="absolute bottom-[-25%] left-[25%] h-[70vh] w-[70vh] rounded-full opacity-55 will-change-transform"
        style={{
          y: y3,
          filter: "blur(130px)",
          background:
            "radial-gradient(circle, oklch(0.72 0.18 155 / 0.42), transparent 65%)",
        }}
        animate={{ x: [0, 40, -30, 0], scale: [1, 1.12, 0.94, 1], opacity: [0.45, 0.6, 0.45] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob — magenta accent */}
      <motion.div
        aria-hidden
        className="absolute top-[55%] left-[45%] h-[55vh] w-[55vh] rounded-full opacity-40 will-change-transform"
        style={{
          filter: "blur(150px)",
          background:
            "radial-gradient(circle, oklch(0.65 0.24 320 / 0.35), transparent 65%)",
        }}
        animate={{ x: [0, -80, 60, 0], y: [0, 60, -40, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fine grid — masked, low opacity, financial precision */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Vertical scan lines — very faint, tech texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, white 0 1px, transparent 1px 3px)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />

      {/* Soft top-highlight — like light hitting glass */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-[linear-gradient(180deg,oklch(1_0_0/0.04),transparent)]" />
    </div>
  );
}
