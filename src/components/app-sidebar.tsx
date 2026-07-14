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
      className="border-r border-border/60 bg-transparent [&>[data-sidebar=sidebar]]:bg-background/40 [&>[data-sidebar=sidebar]]:backdrop-blur-2xl"
    >
      <SidebarHeader className="border-b border-border/60">
        <div className="flex items-center gap-2.5 px-2 py-3.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface/60 overflow-hidden">
            <div
              className="absolute inset-0 opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            />
            <span className="relative font-display text-lg font-medium text-primary-foreground leading-none">
              e
            </span>
            <div
              className="absolute -inset-2 opacity-40 blur-xl"
              style={{ background: "var(--gradient-primary)" }}
            />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-base tracking-tight text-foreground">
              The Econommy
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
              Intelligence Suite
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1.5 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
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
                      className="group/item relative h-10 rounded-lg px-2.5 text-sm text-muted-foreground transition-all duration-300 hover:bg-white/[0.04] hover:text-foreground data-[active=true]:bg-white/[0.05] data-[active=true]:text-foreground"
                    >
                      <Link to={item.url}>
                        {active && (
                          <span
                            className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full"
                            style={{ background: "var(--gradient-primary)", boxShadow: "0 0 12px var(--primary)" }}
                          />
                        )}
                        <item.icon
                          className={`h-[18px] w-[18px] transition-colors duration-300 ${
                            active ? "text-primary" : "text-muted-foreground group-hover/item:text-foreground"
                          }`}
                        />
                        <span className="font-medium tracking-tight">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60">
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--positive)] animate-pulse-glow" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            v2.6 · Enterprise
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
