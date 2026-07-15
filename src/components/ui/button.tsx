import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.96]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_oklch(1_0_0/0.15)_inset,0_8px_20px_-8px_oklch(0.65_0.145_35/0.4),0_0_12px_0_oklch(0.65_0.145_35/0.15)] hover:brightness-105 hover:-translate-y-[2px] hover:shadow-[0_1px_0_0_oklch(1_0_0/0.22)_inset,0_12px_28px_-8px_oklch(0.65_0.145_35/0.5),0_0_22px_1px_oklch(0.65_0.145_35/0.3)] button-press",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 button-press",
        outline:
          "border border-border/70 bg-white/[0.02] text-foreground backdrop-blur hover:bg-white/[0.05] hover:border-border-strong hover:text-white hover:-translate-y-px hover:shadow-soft button-press",
        secondary:
          "bg-white/[0.04] text-foreground border border-border/50 hover:bg-white/[0.07] hover:border-border-strong button-press",
        ghost: "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground button-press",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-[15px]",
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
