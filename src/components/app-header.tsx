import { Bell, Search, Calendar, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { empresa } from "@/lib/mock-data";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center gap-5 border-b border-white/[0.04] bg-background/35 px-6 backdrop-blur-3xl md:px-8">
      <SidebarTrigger className="text-muted-foreground/50 transition-colors hover:text-white" />
      
      <div className="hidden md:flex items-center gap-4">
        <div className="h-6 w-px bg-white/[0.08]" />
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold tracking-[-0.015em] text-white/90">{empresa.nome}</span>
          <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground/45 font-medium mt-0.5">
            Grupo Corporativo
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Search — Command Palette style */}
        <div className="relative hidden lg:block group">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/35 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Buscar transações, centros, fornecedores..."
            className="w-[360px] pl-10 pr-16 h-9 rounded-lg bg-white/[0.012] border border-white/[0.05] text-[12.5px] placeholder:text-muted-foreground/35 transition-all duration-300 focus-visible:bg-white/[0.025] focus-visible:border-[color:var(--info)]/30 focus-visible:ring-2 focus-visible:ring-[color:var(--info)]/6"
          />
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.025] px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground/40 font-mono">
            <Command className="h-2.5 w-2.5" />K
          </div>
        </div>

        {/* Pulse Financeiro */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.012] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground/45 font-semibold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--positive)] opacity-40 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--positive)]" />
          </span>
          <span className="text-[color:var(--positive)]/80">Ao vivo</span>
        </div>

        {/* Período */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.012] px-3 py-1.5 text-[12px] font-medium text-foreground/80 transition-all hover:bg-white/[0.025] hover:border-white/[0.08] cursor-pointer">
          <Calendar className="h-3 w-3 text-primary/70" />
          <span className="text-[12.5px] text-white/80">{empresa.periodo}</span>
        </div>

        {/* Notificações */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.012] text-muted-foreground/50 transition-all duration-300 hover:text-white hover:bg-white/[0.025] hover:border-white/[0.08] cursor-pointer active:scale-95">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] animate-pulse-glow" />
        </button>

        {/* Avatar & User */}
        <div className="flex items-center gap-3 pl-4 ml-1 border-l border-white/[0.06]">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-[12px] font-semibold tracking-[-0.01em] text-white/95">{empresa.usuario.nome}</span>
            <span className="text-[9px] text-muted-foreground/45 uppercase tracking-wider mt-0.5 font-medium">{empresa.usuario.cargo}</span>
          </div>
          <div className="relative group/avatar cursor-pointer">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-primary-foreground ring-1 ring-white/[0.06] transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:ring-white/[0.12]"
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
