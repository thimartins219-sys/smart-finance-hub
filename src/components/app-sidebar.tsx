import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Receipt,
  Building2,
  FileBarChart,
  Gauge,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Gastos", url: "/gastos", icon: Receipt },
  { title: "Centros de Custo", url: "/centros-custo", icon: Building2 },
  { title: "Relatórios", url: "/relatorios", icon: FileBarChart },
  { title: "Indicadores", url: "/indicadores", icon: Gauge },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/40 bg-transparent [&>[data-sidebar=sidebar]]:bg-background/30 [&>[data-sidebar=sidebar]]:backdrop-blur-3xl"
    >
      <SidebarHeader className="border-b border-border/40 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute -inset-3 opacity-35 blur-xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <span className="relative font-display text-lg text-primary-foreground leading-none italic">
              e
            </span>
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-[17px] tracking-tight text-foreground italic">
              The Econommy
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60 font-medium mt-0.5">
              Intelligence Suite
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-2 text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="group/item relative h-10 rounded-xl px-3 text-[13px] text-muted-foreground/70 transition-all duration-300 hover:bg-white/[0.03] hover:text-white data-[active=true]:bg-primary/[0.12] data-[active=true]:text-white"
                    >
                      <Link to={item.url}>
                        <item.icon
                          className={`h-[16px] w-[16px] transition-all duration-300 group-hover/item:translate-x-0.5 ${
                            active ? "text-primary scale-105" : "text-muted-foreground/50 group-hover/item:text-white"
                          }`}
                        />
                        <span className={`font-semibold tracking-[-0.01em] transition-colors ${active ? "text-white" : ""}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40">
        <div className="flex items-center gap-2 px-4 py-3 group-data-[collapsible=icon]:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--positive)] animate-pulse-glow" />
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/50 font-medium">
            v2.0 · Enterprise
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
