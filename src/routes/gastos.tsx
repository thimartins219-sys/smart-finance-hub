import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { brlFull, gastos } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/gastos")({
  component: GastosPage,
});

const categorias = ["Todas", "Operações", "Compras", "Logística", "Administrativo", "Tecnologia"];
const periodos = ["Setembro 2026", "Agosto 2026", "Julho 2026", "Q3 2026"];

function statusColor(s: string) {
  if (s === "Pago") return "bg-[color:var(--positive)]/15 text-[color:var(--positive)] border-[color:var(--positive)]/30";
  if (s === "Aprovado") return "bg-[color:var(--info)]/15 text-[color:var(--info)] border-[color:var(--info)]/30";
  return "bg-amber-500/15 text-amber-400 border-amber-500/30";
}

function GastosPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [ordem, setOrdem] = useState<"desc" | "asc">("desc");

  const rows = useMemo(() => {
    let r = gastos.filter((g) => {
      const match =
        g.fornecedor.toLowerCase().includes(q.toLowerCase()) ||
        g.descricao.toLowerCase().includes(q.toLowerCase()) ||
        g.cc.toLowerCase().includes(q.toLowerCase());
      const catOk = cat === "Todas" || g.categoria === cat;
      return match && catOk;
    });
    r = [...r].sort((a, b) => (ordem === "desc" ? b.valor - a.valor : a.valor - b.valor));
    return r;
  }, [q, cat, ordem]);

  const total = rows.reduce((s, r) => s + r.valor, 0);

  return (
    <PageShell
      title="Gastos"
      description="Rastreabilidade completa das transações financeiras corporativas."
      actions={
        <>
          <Button variant="outline" className="border-border/60" onClick={() => toast.success("Filtros salvos")}>
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
          <Button
            className="text-primary-foreground shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-primary)" }}
            onClick={() => toast.success("Exportação iniciada")}
          >
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </>
      }
    >
      <Card className="glass border-border/60">
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px] group">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por fornecedor, descrição, centro de custo..."
                className="pl-9 bg-surface/60 border-border/60"
              />
            </div>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="w-48 bg-surface/60 border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-48 bg-surface/60 border-border/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodos.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-border/60 hover:border-primary/40"
              onClick={() => setOrdem(ordem === "desc" ? "asc" : "desc")}
            >
              <ArrowUpDown className="mr-2 h-4 w-4 text-primary" />
              Valor {ordem === "desc" ? "↓" : "↑"}
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/40 bg-surface/10">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 bg-surface/40 hover:bg-surface/40">
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Data</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Categoria</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Fornecedor</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Centro de Custo</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Descrição</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wider font-semibold">Valor</TableHead>
                  <TableHead className="text-xs uppercase tracking-wider font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((g, i) => (
                  <TableRow key={i} className="group/row border-border/30 transition-colors hover:bg-primary/[0.03]">
                    <TableCell className="font-mono text-xs text-text-muted">{g.data}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border/60 bg-surface/60 text-xs">
                        {g.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-white">{g.fornecedor}</TableCell>
                    <TableCell className="text-text-secondary font-medium">{g.cc}</TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-text-muted">{g.descricao}</TableCell>
                    <TableCell className="text-right font-mono font-semibold text-white">{brlFull(g.valor)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusColor(g.status)}`}>
                        {g.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-sm text-text-muted">
                      Nenhum lançamento corresponde aos filtros.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
            <span className="text-text-secondary font-medium">{rows.length} lançamentos exibidos</span>
            <span className="font-mono font-semibold text-white bg-surface/40 border border-border-soft px-4 py-2 rounded-xl">
              Total filtrado: <span className="text-primary text-base font-bold">{brlFull(total)}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
