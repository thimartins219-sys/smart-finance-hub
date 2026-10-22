import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL kept working: the content now lives in a section of the main page.
export const Route = createFileRoute("/gastos")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "movimentacoes", replace: true });
  },
});
