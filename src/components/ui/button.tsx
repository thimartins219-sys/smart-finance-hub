import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[--radius-md] text-[13px] font-medium cursor-pointer transition-all duration-[var(--duration-smooth)] ease-[var(--ease-out-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary-orange-glow] disabled:pointer-events-none disabled:opacity-35 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[--primary-orange] to-[--primary-orange-hover] text-[--neutral-00] shadow-[0_1px_0_0_oklch(1_0_0/0.14)_inset,0_6px_18px_-5px_oklch(0.65_0.22_32/0.35),0_0_10px_0_oklch(0.65_0.22_32/0.12)] hover:brightness-110 hover:-translate-y-px hover:shadow-[0_1px_0_0_oklch(1_0_0/0.22)_inset,0_12px_26px_-5px_oklch(0.65_0.22_32/0.45),0_0_20px_0_oklch(0.65_0.22_32/0.20)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.97]",
        outline:
          "border border-[--glass-border-raw] bg-[--glass-surface-raw] text-foreground/90 backdrop-blur-md hover:bg-[oklch(1_0_0/0.030)] hover:border-[oklch(0.58_0.20_260/0.22)] hover:text-white hover:-translate-y-px hover:shadow-[0_0_20px_-4px_oklch(0.58_0.20_260/0.10)]",
        secondary:
          "bg-[oklch(1_0_0/0.025)] text-foreground/95 border border-[--glass-border-raw] hover:bg-[oklch(1_0_0/0.045)] hover:border-[--glass-border-hover-raw] hover:text-white hover:-translate-y-px",
        ghost: "text-muted-foreground hover:bg-[oklch(1_0_0/0.025)] hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-[--radius-sm] px-3 text-[12px]",
        lg: "h-11 rounded-[--radius-md] px-6 text-[14px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
