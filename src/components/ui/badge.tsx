import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[--radius-sm] border px-2.5 py-0.5 text-xs font-semibold transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "border-[--glass-border-raw] bg-[oklch(1_0_0/0.025)] text-secondary-foreground hover:bg-[oklch(1_0_0/0.045)]",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "text-foreground border-[--glass-border-raw]",
        success: "border-transparent bg-[--success-raw]/15 text-[--success-raw]",
        warning: "border-transparent bg-[--warning-raw]/15 text-[--warning-raw]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
