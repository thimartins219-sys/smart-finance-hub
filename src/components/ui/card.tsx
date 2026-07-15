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
          "group/card relative rounded-xl border border-[--glass-border-raw] bg-[--card] text-card-foreground backdrop-blur-2xl overflow-hidden",
          /* Glass inset highlight + shadow */
          "shadow-[0_1px_0_0_oklch(1_0_0/0.04)_inset,0_0_0_1px_oklch(1_0_0/0.02)_inset,var(--shadow-soft)]",
          /* Hover: lift + glow + border brighten */
          "transition-all duration-[var(--duration-smooth)] ease-[var(--ease-out-expo)]",
          "hover:border-[--glass-border-hover-raw] hover:-translate-y-[2px]",
          "hover:shadow-[0_1px_0_0_oklch(1_0_0/0.08)_inset,var(--shadow-large),0_0_24px_-4px_oklch(0.65_0.22_32/0.08)]",
          /* Mouse-tracking radial spotlight */
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
          "before:bg-[radial-gradient(350px_circle_at_var(--mx,50%)_var(--my,50%),oklch(0.65_0.22_32/0.05),oklch(0.58_0.20_260/0.015)_50%,transparent_70%)]",
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
      className={cn("font-semibold leading-none tracking-tight font-[family-name:var(--font-display)]", className)}
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
