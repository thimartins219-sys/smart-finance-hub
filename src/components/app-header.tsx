import { Bell, Search, Calendar, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { empresa } from "@/lib/mock-data";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/50 px-4 backdrop-blur-2xl md:px-6">
      <SidebarTrigger className="text-muted-foreground transition-colors hover:text-foreground" />
      <div className="hidden md:flex items-center gap-3">
        <div className="h-6 w-px bg-border/70" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium tracking-tight">{empresa.nome}</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
            Grupo Corporativo
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative hidden lg:block group">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Buscar fornecedor, categoria, centro..."
            className="w-80 pl-9 pr-14 h-9 rounded-lg bg-white/[0.03] border border-border/60 text-sm placeholder:text-muted-foreground/60 transition-all duration-300 focus-visible:bg-white/[0.05] focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/10"
          />
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-md border border-border/70 bg-surface/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-border/60 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:bg-white/[0.06]">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>{empresa.periodo}</span>
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/[0.06]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] animate-pulse-glow" />
        </button>

        <div className="flex items-center gap-2.5 pl-2.5 ml-1 border-l border-border/60">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-xs font-medium tracking-tight">{empresa.usuario.nome}</span>
            <span className="text-[10px] text-muted-foreground/80">{empresa.usuario.cargo}</span>
          </div>
          <div className="relative">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground ring-1 ring-white/10"
              style={{ background: "var(--gradient-primary)" }}
            >
              {empresa.usuario.iniciais}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[color:var(--positive)] ring-2 ring-background" />
          </div>
        </div>
      </div>
    </header>
  );
}
