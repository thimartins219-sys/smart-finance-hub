import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route = createFileRoute("/gastos")({ component: () => <Navigate to="/" hash="expenses" replace /> });
