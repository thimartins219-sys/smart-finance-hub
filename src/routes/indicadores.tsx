import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route = createFileRoute("/indicadores")({ component: () => <Navigate to="/" hash="indicadores" replace /> });
