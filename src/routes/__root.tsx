import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { CinematicIntro } from "@/components/cinematic-intro";
import { AmbientBackground } from "@/components/experience/AmbientBackground";
import { FloatingNav } from "@/components/experience/FloatingNav";

const NAV_SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "overview", label: "Visão" },
  { id: "kpis", label: "KPIs" },
  { id: "revenue", label: "Receita" },
  { id: "expenses", label: "Despesas" },
  { id: "cashflow", label: "Caixa" },
  { id: "categories", label: "Categorias" },
  { id: "cost-centers", label: "Centros" },
  { id: "performance", label: "Performance" },
  { id: "forecast", label: "Forecast" },
  { id: "ai-insights", label: "IA" },
  { id: "reports", label: "Relatórios" },
  { id: "settings", label: "Config" },
];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O recurso que você procura não existe ou foi movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Você pode tentar novamente ou voltar ao dashboard.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Econommy — Plataforma de Inteligência Financeira Corporativa" },
      {
        name: "description",
        content:
          "Dashboard executivo, análise de custos, centros de custo, relatórios e KPIs para gestão financeira corporativa.",
      },
      { name: "author", content: "The Econommy" },
      { property: "og:title", content: "The Econommy — Plataforma de Inteligência Financeira Corporativa" },
      {
        property: "og:description",
        content: "Dashboard executivo, análise de custos, centros de custo, relatórios e KPIs para gestão financeira corporativa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Econommy — Plataforma de Inteligência Financeira Corporativa" },
      { name: "twitter:description", content: "Dashboard executivo, análise de custos, centros de custo, relatórios e KPIs para gestão financeira corporativa." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bb56d337-2f99-4d8b-b676-97d460b7aaf2/id-preview-ee09e928--ac4bf208-c3ef-43d9-b16b-9279b3a2c685.lovable.app-1783964798156.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bb56d337-2f99-4d8b-b676-97d460b7aaf2/id-preview-ee09e928--ac4bf208-c3ef-43d9-b16b-9279b3a2c685.lovable.app-1783964798156.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CinematicIntro />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <AppHeader />
          <div className="flex-1">
            <Outlet />
          </div>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
