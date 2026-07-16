import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function CountUp({
  to,
  duration = 1600,
  format = (n) => n.toLocaleString("pt-BR"),
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  format?: (n: number) => string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format(Math.round(value))}
      {suffix}
    </span>
  );
}
