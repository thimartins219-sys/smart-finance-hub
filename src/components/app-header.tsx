import { Bell, Search, Calendar, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { empresa } from "@/lib/mock-data";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-border/40 bg-background/40 px-6 backdrop-blur-3xl md:px-8">
      <SidebarTrigger className="text-muted-foreground/70 transition-colors hover:text-foreground" />
      <div className="hidden md:flex items-center gap-3">
        <div className="h-5 w-px bg-border/50" />
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-medium tracking-[-0.01em]">{empresa.nome}</span>
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50 font-medium">
            Grupo Corporativo
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2.5 md:gap-3">
        {/* Search — Command Palette style */}
        <div className="relative hidden lg:block group">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Buscar transações, centros, fornecedores..."
            className="w-[340px] pl-10 pr-16 h-9 rounded-lg bg-white/[0.02] border border-border/50 text-[13px] placeholder:text-muted-foreground/40 transition-all duration-300 focus-visible:bg-white/[0.04] focus-visible:border-[color:var(--info)]/30 focus-visible:ring-2 focus-visible:ring-[color:var(--info)]/8"
          />
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-border/50 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground/50">
            <Command className="h-2.5 w-2.5" />K
          </div>
        </div>

        {/* Pulse Financeiro */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border/40 bg-white/[0.02] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50 font-medium">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--positive)] opacity-50 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--positive)]" />
          </span>
          <span>Ao vivo</span>
        </div>

        {/* Período */}
        <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-border/40 bg-white/[0.02] px-2.5 py-1.5 text-[12px] font-medium text-foreground/80 transition-colors hover:bg-white/[0.04]">
          <Calendar className="h-3 w-3 text-primary/80" />
          <span>{empresa.periodo}</span>
        </div>

        {/* Notificações */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-white/[0.02] text-muted-foreground/60 transition-all duration-300 hover:text-foreground hover:bg-white/[0.04]">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] animate-pulse-glow" />
        </button>

        {/* Avatar & User */}
        <div className="flex items-center gap-3 pl-3 ml-1 border-l border-border/40">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-[12px] font-medium tracking-[-0.01em]">{empresa.usuario.nome}</span>
            <span className="text-[9px] text-muted-foreground/50">{empresa.usuario.cargo}</span>
          </div>
          <div className="relative">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-primary-foreground ring-1 ring-white/[0.08]"
              style={{ background: "var(--gradient-primary)" }}
            >
              {empresa.usuario.iniciais}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[color:var(--positive)] ring-[1.5px] ring-background" />
          </div>
        </div>
      </div>
    </header>
  );
}
