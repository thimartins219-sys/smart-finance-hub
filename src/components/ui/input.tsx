import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-1 text-[13px] shadow-sm backdrop-blur-md transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:border-[color:var(--info)]/40 focus-visible:ring-2 focus-visible:ring-[color:var(--info)]/8 disabled:cursor-not-allowed disabled:opacity-35 disabled:bg-transparent",
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
