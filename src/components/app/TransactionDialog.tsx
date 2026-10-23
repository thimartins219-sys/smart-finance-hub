import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field } from "./kit";
import { cn } from "@/lib/utils";
import { useFinance } from "@/lib/finance-store";
import { CATEGORIA_TRANSFERENCIA, CENTROS, HOJE, type TipoTransacao, type Transacao } from "@/lib/mock-data";

const SEM = "__nenhum__";

const TIPOS: { id: TipoTransacao; label: string }[] = [
  { id: "despesa", label: "Despesa" },
  { id: "receita", label: "Receita" },
  { id: "transferencia", label: "Transferência" },
];

export function TransactionDialog({
  open,
  onOpenChange,
  inicial,
  tipoInicial = "despesa",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  inicial?: Transacao | null;
  tipoInicial?: TipoTransacao;
}) {
  const fin = useFinance();
  const [tipo, setTipo] = useState<TipoTransacao>(tipoInicial);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(HOJE);
  const [categoria, setCategoria] = useState("");
  const [contaId, setContaId] = useState("");
  const [contaDestinoId, setContaDestinoId] = useState("");
  const [cartaoId, setCartaoId] = useState(SEM);
  const [centro, setCentro] = useState(SEM);

  useEffect(() => {
    if (!open) return;
    setTipo(inicial?.tipo ?? tipoInicial);
    setDescricao(inicial?.descricao ?? "");
    setValor(inicial ? String(inicial.valor) : "");
    setData(inicial?.data ?? HOJE);
    setCategoria(inicial?.categoria ?? "");
    setContaId(inicial?.contaId ?? fin.contas[0]?.id ?? "");
    setContaDestinoId(inicial?.contaDestinoId ?? fin.contas[1]?.id ?? "");
    setCartaoId(inicial?.cartaoId ?? SEM);
    setCentro(inicial?.centro ?? SEM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, inicial, tipoInicial]);

  const categorias = tipo === "transferencia" ? [CATEGORIA_TRANSFERENCIA] : fin.categoriasDe(tipo);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    const v = Number(valor.replace(",", "."));
    if (!descricao.trim() || !(v > 0)) {
      toast.error("Informe uma descrição e um valor maior que zero.");
      return;
    }
    if (tipo === "transferencia" && contaId === contaDestinoId) {
      toast.error("Escolha contas diferentes para a transferência.");
      return;
    }
    const cat = tipo === "transferencia" ? CATEGORIA_TRANSFERENCIA : categoria || categorias[0];
    fin.salvarTransacao({
      id: inicial?.id,
      tipo,
      descricao: descricao.trim(),
      valor: Math.round(v * 100) / 100,
      data,
      categoria: cat,
      contaId,
      contaDestinoId: tipo === "transferencia" ? contaDestinoId : undefined,
      cartaoId: tipo === "despesa" && cartaoId !== SEM ? cartaoId : undefined,
      centro: tipo !== "transferencia" && centro !== SEM ? centro : undefined,
    });
    toast.success(inicial ? "Transação atualizada" : tipo === "transferencia" ? "Transferência registrada" : "Transação criada", {
      description: descricao.trim(),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{inicial ? "Editar transação" : "Nova transação"}</DialogTitle>
          <DialogDescription>Os saldos das contas e os relatórios se atualizam na hora.</DialogDescription>
        </DialogHeader>
        <form onSubmit={salvar} className="space-y-5">
          <div className="grid grid-cols-3 gap-1 rounded-full border border-border bg-muted p-1">
            {TIPOS.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => {
                  setTipo(t.id);
                  setCategoria("");
                }}
                className={cn(
                  "cursor-pointer rounded-full py-2 text-[12.5px] font-semibold transition-all duration-300",
                  tipo === t.id ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Field label="Descrição">
            <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex.: Manutenção de empilhadeiras" autoFocus />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Valor (R$)">
              <Input inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" className="num" />
            </Field>
            <Field label="Data">
              <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label={tipo === "transferencia" ? "Conta de origem" : "Conta"}>
              <Select value={contaId} onValueChange={setContaId}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {fin.contas.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.nome} · {c.banco}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {tipo === "transferencia" ? (
              <Field label="Conta de destino">
                <Select value={contaDestinoId} onValueChange={setContaDestinoId}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {fin.contas.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.nome} · {c.banco}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            ) : (
              <Field label="Categoria">
                <Select value={categoria || categorias[0]} onValueChange={setCategoria}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {categorias.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </div>

          {tipo !== "transferencia" && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Centro de custo">
                <Select value={centro} onValueChange={setCentro}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SEM}>Nenhum</SelectItem>
                    {CENTROS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              {tipo === "despesa" && (
                <Field label="Pago com cartão?">
                  <Select value={cartaoId} onValueChange={setCartaoId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SEM}>Não, débito em conta</SelectItem>
                      {fin.cartoes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.nome} •••• {c.final}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">{inicial ? "Salvar alterações" : "Registrar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
