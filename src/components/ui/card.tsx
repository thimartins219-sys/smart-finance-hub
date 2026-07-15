import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onMouseMove, ...props }, ref) => {
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
      onMouseMove?.(e);
    };
    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        className={cn(
          "group/card relative rounded-xl border border-white/[0.05] bg-white/[0.02] text-card-foreground backdrop-blur-2xl overflow-hidden",
          /* Inner glow line + deep shadow */
          "shadow-[0_1px_0_0_oklch(1_0_0/0.05)_inset,0_0_0_1px_oklch(1_0_0/0.025)_inset,0_4px_16px_-4px_oklch(0_0_0/0.4)]",
          /* Hover: lift + glow + border brighten */
          "transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:border-white/[0.09] hover:-translate-y-[2px]",
          "hover:shadow-[0_1px_0_0_oklch(1_0_0/0.08)_inset,0_16px_40px_-10px_oklch(0_0_0/0.55),0_0_28px_-4px_oklch(0.63_0.21_32/0.10)]",
          /* Mouse-tracking radial spotlight (orange + sapphire blend) */
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100",
          "before:bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,50%),oklch(0.63_0.21_32/0.06),oklch(0.50_0.20_260/0.02)_50%,transparent_70%)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 md:p-7", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-[13px] text-muted-foreground/70", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 md:p-7 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
