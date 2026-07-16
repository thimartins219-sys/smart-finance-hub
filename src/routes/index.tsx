import { createFileRoute } from "@tanstack/react-router";
import {
  AIModule,
  CashFlowModule,
  CategoriasModule,
  CentrosModule,
  DespesasModule,
  ExecutiveModule,
  HeroModule,
  IndicadoresModule,
  ReceitasModule,
  SettingsModule,
} from "@/components/experience/modules";

export const Route = createFileRoute("/")({
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <main className="relative">
      <HeroModule />
      <ExecutiveModule />
      <ReceitasModule />
      <DespesasModule />
      <CashFlowModule />
      <CategoriasModule />
      <CentrosModule />
      <IndicadoresModule />
      <AIModule />
      <SettingsModule />
    </main>
  );
}
