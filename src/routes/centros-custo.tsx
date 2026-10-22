import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL kept working: the content now lives in a section of the main page.
export const Route = createFileRoute("/centros-custo")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "distribuicao", replace: true });
  },
});
