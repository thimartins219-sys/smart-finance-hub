import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route = createFileRoute("/relatorios")({ component: () => <Navigate to="/" hash="reports" replace /> });
