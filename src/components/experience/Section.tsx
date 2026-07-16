import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  align = "left",
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative min-h-screen w-full px-6 py-24 md:px-12 md:py-32 ${className}`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16">
        {(eyebrow || title || description) && (
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex max-w-3xl flex-col gap-5 ${align === "center" ? "mx-auto items-center text-center" : ""}`}
          >
            {eyebrow && (
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[--primary-orange] shadow-[0_0_8px_var(--primary-orange)]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                  {eyebrow}
                </span>
              </div>
            )}
            {title && (
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(38px,6vw,84px)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-[15px] leading-relaxed text-white/55 md:text-[17px]">
                {description}
              </p>
            )}
          </motion.header>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
