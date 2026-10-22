import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL kept working: the content now lives in a section of the main page.
export const Route = createFileRoute("/configuracoes")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "settings", replace: true });
  },
});
