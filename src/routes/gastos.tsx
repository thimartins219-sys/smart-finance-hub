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
  if (s === "Pago") return "bg-[color:var(--positive)]/10 text-[color:var(--positive)] border-[color:var(--positive)]/20";
  if (s === "Aprovado") return "bg-[color:var(--info)]/10 text-[color:var(--info)] border-[color:var(--info)]/20";
  return "bg-amber-500/10 text-amber-400 border-amber-500/20";
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
          <Button variant="outline" onClick={() => toast.success("Filtros salvos")}>
            <Filter className="mr-2 h-3.5 w-3.5" /> Filtros
          </Button>
          <Button
            className="text-primary-foreground shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-primary)" }}
            onClick={() => toast.success("Exportação iniciada")}
          >
            <Download className="mr-2 h-3.5 w-3.5" /> Exportar
          </Button>
        </>
      }
    >
      <Card className="glass-ethereal">
        <CardContent className="p-6 md:p-7">
          {/* Filter bar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px] group">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40 transition-colors group-focus-within:text-primary" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por fornecedor, descrição, centro de custo..."
                className="pl-9 bg-white/[0.015] border-white/[0.05]"
              />
            </div>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="w-44 bg-white/[0.015] border-white/[0.05]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-44 bg-white/[0.015] border-white/[0.05]">
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
              onClick={() => setOrdem(ordem === "desc" ? "asc" : "desc")}
            >
              <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-primary" />
              Valor {ordem === "desc" ? "↓" : "↑"}
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.008]">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.04] hover:bg-transparent">
                  <TableHead>Data</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Centro de Custo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((g, i) => (
                  <TableRow key={i} className="group/row border-white/[0.03] transition-colors hover:bg-white/[0.015]">
                    <TableCell className="font-mono text-[11px] text-muted-foreground/40">{g.data}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/[0.06] bg-white/[0.02] text-[11px] font-medium">
                        {g.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-white">{g.fornecedor}</TableCell>
                    <TableCell className="text-muted-foreground/60 font-medium">{g.cc}</TableCell>
                    <TableCell className="max-w-xs truncate text-[13px] text-muted-foreground/40">{g.descricao}</TableCell>
                    <TableCell className="text-right font-mono font-semibold text-white text-[13px]">{brlFull(g.valor)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${statusColor(g.status)}`}>
                        {g.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-16 text-center text-[13px] text-muted-foreground/40">
                      Nenhum lançamento corresponde aos filtros.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer totals */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[13px]">
            <span className="text-muted-foreground/50 font-medium">{rows.length} lançamentos exibidos</span>
            <span className="font-mono font-semibold text-white bg-white/[0.02] border border-white/[0.05] px-4 py-2 rounded-lg">
              Total filtrado: <span className="text-primary text-[14px] font-bold">{brlFull(total)}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
