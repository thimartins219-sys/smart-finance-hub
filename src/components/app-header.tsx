import { Bell, Search, Calendar, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { empresa } from "@/lib/mock-data";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-5 border-b border-[--divider-raw] bg-background/35 px-6 backdrop-blur-3xl md:px-8">
      <SidebarTrigger className="text-muted-foreground/45 transition-colors hover:text-white" />
      
      <div className="hidden md:flex items-center gap-4">
        <div className="h-6 w-px bg-[--divider-raw]" />
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold tracking-[-0.015em] text-white/90">{empresa.nome}</span>
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/40 font-medium mt-0.5">
            Grupo Corporativo
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Search — Command Palette style */}
        <div className="relative hidden lg:block group">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/30 transition-colors group-focus-within:text-[--primary-orange]" />
          <Input
            placeholder="Buscar transações, centros, fornecedores..."
            className="w-[360px] pl-10 pr-16 h-9 rounded-[--radius-md] bg-[--glass-surface-raw] border border-[--glass-border-raw] text-[12.5px] placeholder:text-muted-foreground/30 transition-all duration-[var(--duration-slow)] focus-visible:bg-[oklch(1_0_0/0.025)] focus-visible:border-[oklch(0.58_0.20_260/0.28)] focus-visible:ring-2 focus-visible:ring-[oklch(0.58_0.20_260/0.06)]"
          />
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-[--radius-sm] border border-[--glass-border-raw] bg-[oklch(1_0_0/0.020)] px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground/35 font-[family-name:var(--font-mono)]">
            <Command className="h-2.5 w-2.5" />K
          </div>
        </div>

        {/* Pulse Financeiro */}
        <div className="hidden md:flex items-center gap-2 rounded-[--radius-md] border border-[--glass-border-raw] bg-[--glass-surface-raw] px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] text-muted-foreground/40 font-semibold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[--success-raw] opacity-40 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[--success-raw]" />
          </span>
          <span className="text-[--success-raw]/80">Ao vivo</span>
        </div>

        {/* Período */}
        <div className="hidden md:flex items-center gap-2 rounded-[--radius-md] border border-[--glass-border-raw] bg-[--glass-surface-raw] px-3 py-1.5 text-[12px] font-medium text-foreground/80 transition-all duration-[var(--duration-normal)] hover:bg-[oklch(1_0_0/0.025)] hover:border-[--glass-border-hover-raw] cursor-pointer">
          <Calendar className="h-3 w-3 text-[--primary-orange]/70" />
          <span className="text-[12.5px] text-white/80">{empresa.periodo}</span>
        </div>

        {/* Notificações */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-[--radius-md] border border-[--glass-border-raw] bg-[--glass-surface-raw] text-muted-foreground/45 transition-all duration-[var(--duration-smooth)] hover:text-white hover:bg-[oklch(1_0_0/0.025)] hover:border-[--glass-border-hover-raw] cursor-pointer active:scale-95">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[--primary-orange] shadow-[var(--shadow-glow)] animate-pulse-glow" />
        </button>

        {/* Avatar & User */}
        <div className="flex items-center gap-3 pl-4 ml-1 border-l border-[--glass-border-raw]">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-[12px] font-semibold tracking-[-0.01em] text-white/95">{empresa.usuario.nome}</span>
            <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider mt-0.5 font-medium">{empresa.usuario.cargo}</span>
          </div>
          <div className="relative group/avatar cursor-pointer">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-[--neutral-00] ring-1 ring-[--glass-border-raw] transition-all duration-[var(--duration-smooth)] group-hover/avatar:scale-105 group-hover/avatar:ring-[--glass-border-hover-raw]"
              style={{ background: "var(--gradient-primary)" }}
            >
              {empresa.usuario.iniciais}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[--success-raw] ring-[1.5px] ring-background" />
          </div>
        </div>
      </div>
    </header>
  );
}
