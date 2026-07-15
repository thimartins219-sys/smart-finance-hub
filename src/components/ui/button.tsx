import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-35 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.96]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_oklch(1_0_0/0.12)_inset,0_6px_18px_-6px_oklch(0.63_0.21_32/0.45),0_0_10px_0_oklch(0.63_0.21_32/0.12)] hover:brightness-110 hover:-translate-y-px hover:shadow-[0_1px_0_0_oklch(1_0_0/0.18)_inset,0_10px_24px_-6px_oklch(0.63_0.21_32/0.55),0_0_20px_0_oklch(0.63_0.21_32/0.20)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-white/[0.06] bg-white/[0.015] text-foreground/90 backdrop-blur-lg hover:bg-white/[0.04] hover:border-white/[0.10] hover:text-white hover:-translate-y-px",
        secondary:
          "bg-white/[0.03] text-foreground/90 border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.10]",
        ghost: "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-[12px]",
        lg: "h-11 rounded-lg px-6 text-[14px]",
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
