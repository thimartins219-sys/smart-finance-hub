import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[--radius-md] border border-[--glass-border-raw] bg-[--glass-surface-raw] px-3 py-1 text-[13px] shadow-sm backdrop-blur-md transition-all duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:border-[oklch(0.58_0.20_260/0.40)] focus-visible:ring-2 focus-visible:ring-[oklch(0.58_0.20_260/0.08)] focus-visible:bg-[oklch(1_0_0/0.030)] disabled:cursor-not-allowed disabled:opacity-35 disabled:bg-transparent hover:border-[--glass-border-hover-raw] hover:bg-[oklch(1_0_0/0.028)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
