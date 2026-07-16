import { motion, useScroll, useTransform } from "framer-motion";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [32, 260, 155]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-3] overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[oklch(0.07_0.005_260)]" />

      {/* Animated mesh blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-40 left-[-10%] h-[70vh] w-[70vh] rounded-full blur-[120px] opacity-60"
        style={{
          y: y1,
          background: useTransform(hue, (h) => `radial-gradient(circle, oklch(0.62 0.22 ${h} / 0.35), transparent 65%)`),
        }}
      />
      <motion.div
        aria-hidden
        className="absolute top-[40%] right-[-15%] h-[80vh] w-[80vh] rounded-full blur-[140px] opacity-55"
        style={{
          y: y2,
          background: useTransform(hue, (h) => `radial-gradient(circle, oklch(0.55 0.20 ${(h + 220) % 360} / 0.28), transparent 65%)`),
        }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-20%] left-[30%] h-[60vh] w-[60vh] rounded-full blur-[130px] opacity-45"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.18 38 / 0.25), transparent 65%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,transparent_20%,oklch(0_0_0/0.75)_100%)]" />
    </div>
  );
}
