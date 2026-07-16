import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route = createFileRoute("/centros-custo")({ component: () => <Navigate to="/" hash="cost-centers" replace /> });
