import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Receipt,
  Building2,
  FileBarChart,
  Gauge,
  Settings,
  Sparkles,
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
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="border-b border-border/60">
        <div className="flex items-center gap-2 px-2 py-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-sm font-bold tracking-tight">The Econommy</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Intelligence Suite
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="data-[active=true]:bg-primary/15 data-[active=true]:text-primary data-[active=true]:font-medium"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
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
        <div className="px-2 py-2 text-[10px] text-muted-foreground group-data-[collapsible=icon]:hidden">
          v2.6 · Ambiente Enterprise
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
