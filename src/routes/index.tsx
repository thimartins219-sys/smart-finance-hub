import { createFileRoute } from "@tanstack/react-router";
import {
  AIModule,
  CashFlowModule,
  DistribuicaoModule,
  ExecutiveModule,
  HeroModule,
  IndicadoresModule,
  MovimentacoesModule,
  SettingsModule,
} from "@/components/experience/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Econommy — Dashboard Financeiro Executivo" },
      {
        name: "description",
        content:
          "Visão executiva em tempo real: KPIs, fluxo de caixa, movimentações, distribuição de gastos e copiloto de IA para gestão financeira corporativa.",
      },
      { property: "og:title", content: "The Econommy — Dashboard Financeiro Executivo" },
      {
        property: "og:description",
        content:
          "Visão executiva em tempo real: KPIs, fluxo de caixa, movimentações, distribuição de gastos e copiloto de IA para gestão financeira corporativa.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <main className="relative">
      <HeroModule />
      <ExecutiveModule />
      <CashFlowModule />
      <MovimentacoesModule />
      <DistribuicaoModule />
      <IndicadoresModule />
      <AIModule />
      <SettingsModule />
    </main>
  );
}
