import { Bell, Search, Calendar } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { empresa } from "@/lib/mock-data";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="hidden md:flex items-center gap-2">
        <div className="h-8 w-px bg-border/60" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{empresa.nome}</span>
          <span className="text-[11px] text-muted-foreground">Grupo Corporativo · CNPJ 00.***.***/0001-00</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative hidden lg:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar fornecedor, categoria, centro..."
            className="w-72 pl-9 bg-surface/60 border-border/60"
          />
        </div>

        <Badge variant="secondary" className="hidden md:flex items-center gap-1.5 bg-surface/80 border border-border/60 text-foreground">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium">{empresa.periodo}</span>
        </Badge>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-surface/60 text-muted-foreground transition hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-xs font-medium">{empresa.usuario.nome}</span>
            <span className="text-[10px] text-muted-foreground">{empresa.usuario.cargo}</span>
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            {empresa.usuario.iniciais}
          </div>
        </div>
      </div>
    </header>
  );
}
