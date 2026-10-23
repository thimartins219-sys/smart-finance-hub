import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  CATEGORIA_FATURA,
  HOJE,
  cartoesSeed,
  categoriasSeed,
  contasSeed,
  empresaSeed,
  gerarTransacoesSeed,
  perfilSeed,
  vencimentosSeed,
  type Cartao,
  type Categoria,
  type Conta,
  type Transacao,
  type Vencimento,
} from "./mock-data";
import { proximaData } from "./finance";

export interface Preferencias {
  tema: "claro" | "escuro";
  ocultarValores: boolean;
  alertasVencimento: boolean;
  resumoSemanal: boolean;
  diasAlerta: number;
}

export interface FinanceState {
  contas: Conta[];
  cartoes: Cartao[];
  transacoes: Transacao[];
  vencimentos: Vencimento[];
  categorias: Categoria[];
  perfil: typeof perfilSeed;
  empresa: typeof empresaSeed;
  prefs: Preferencias;
}

const STORAGE_KEY = "econommy-app-v2";

function estadoInicial(): FinanceState {
  return {
    contas: contasSeed,
    cartoes: cartoesSeed,
    transacoes: gerarTransacoesSeed(),
    vencimentos: vencimentosSeed,
    categorias: categoriasSeed,
    perfil: perfilSeed,
    empresa: empresaSeed,
    prefs: { tema: "claro", ocultarValores: false, alertasVencimento: true, resumoSemanal: true, diasAlerta: 7 },
  };
}

function novoId(prefixo: string) {
  return `${prefixo}-${crypto.randomUUID().slice(0, 8)}`;
}

function upsert<T extends { id: string }>(lista: T[], item: T) {
  return lista.some((x) => x.id === item.id) ? lista.map((x) => (x.id === item.id ? item : x)) : [item, ...lista];
}

function useFinanceValue() {
  const [state, setState] = useState<FinanceState>(estadoInicial);
  const carregado = useRef(false);

  // Restore saved edits after hydration (server and first client render use the seed).
  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(STORAGE_KEY);
      if (salvo) setState({ ...estadoInicial(), ...JSON.parse(salvo) });
    } catch {
      /* corrupted storage: keep the seed */
    }
    carregado.current = true;
  }, []);

  useEffect(() => {
    if (!carregado.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.prefs.tema === "escuro");
  }, [state.prefs.tema]);

  const salvarTransacao = useCallback((t: Omit<Transacao, "id"> & { id?: string }) => {
    const item = { ...t, id: t.id ?? novoId("t") } as Transacao;
    setState((s) => ({ ...s, transacoes: upsert(s.transacoes, item).sort((a, b) => b.data.localeCompare(a.data)) }));
    return item;
  }, []);

  const removerTransacao = useCallback((id: string) => {
    let removida: Transacao | undefined;
    setState((s) => {
      removida = s.transacoes.find((t) => t.id === id);
      return { ...s, transacoes: s.transacoes.filter((t) => t.id !== id) };
    });
    return () => removida && salvarTransacao(removida);
  }, [salvarTransacao]);

  const salvarConta = useCallback((c: Omit<Conta, "id"> & { id?: string }) => {
    setState((s) => ({ ...s, contas: upsert(s.contas, { ...c, id: c.id ?? novoId("c") } as Conta) }));
  }, []);
  const removerConta = useCallback((id: string) => {
    setState((s) => ({ ...s, contas: s.contas.filter((c) => c.id !== id) }));
  }, []);

  const salvarCartao = useCallback((c: Omit<Cartao, "id"> & { id?: string }) => {
    setState((s) => ({ ...s, cartoes: upsert(s.cartoes, { ...c, id: c.id ?? novoId("k") } as Cartao) }));
  }, []);
  const removerCartao = useCallback((id: string) => {
    setState((s) => ({ ...s, cartoes: s.cartoes.filter((c) => c.id !== id) }));
  }, []);

  const salvarVencimento = useCallback((v: Omit<Vencimento, "id"> & { id?: string }) => {
    setState((s) => ({ ...s, vencimentos: upsert(s.vencimentos, { ...v, id: v.id ?? novoId("v") } as Vencimento) }));
  }, []);
  const removerVencimento = useCallback((id: string) => {
    setState((s) => ({ ...s, vencimentos: s.vencimentos.filter((v) => v.id !== id) }));
  }, []);

  /** Marks a bill as settled, books the matching transaction and schedules the next repetition. */
  const darBaixa = useCallback((id: string) => {
    setState((s) => {
      const v = s.vencimentos.find((x) => x.id === id);
      if (!v || v.pago) return s;
      const transacao: Transacao = {
        id: novoId("t"),
        data: HOJE,
        descricao: v.descricao,
        valor: v.valor,
        tipo: v.tipo === "receber" ? "receita" : "despesa",
        categoria: v.categoria,
        contaId: v.contaId,
      };
      let vencimentos = s.vencimentos.map((x) => (x.id === id ? { ...x, pago: true, pagoEm: HOJE } : x));
      const prox = proximaData(v.data, v.recorrencia);
      if (prox) vencimentos = [{ ...v, id: novoId("v"), data: prox, pago: false, pagoEm: undefined }, ...vencimentos];
      return { ...s, vencimentos, transacoes: [transacao, ...s.transacoes] };
    });
  }, []);

  const salvarCategoria = useCallback((c: Omit<Categoria, "id">) => {
    setState((s) => ({ ...s, categorias: [...s.categorias, { ...c, id: novoId("cat") }] }));
  }, []);
  const removerCategoria = useCallback((id: string) => {
    setState((s) => ({ ...s, categorias: s.categorias.filter((c) => c.id !== id) }));
  }, []);

  const setPerfil = useCallback((p: FinanceState["perfil"]) => setState((s) => ({ ...s, perfil: p })), []);
  const setEmpresa = useCallback((e: FinanceState["empresa"]) => setState((s) => ({ ...s, empresa: e })), []);
  const setPrefs = useCallback(
    (p: Partial<Preferencias>) => setState((s) => ({ ...s, prefs: { ...s.prefs, ...p } })),
    [],
  );
  const restaurar = useCallback(() => setState((s) => ({ ...estadoInicial(), prefs: s.prefs })), []);

  return useMemo(
    () => ({
      ...state,
      categoriasDe: (tipo: Categoria["tipo"]) => state.categorias.filter((c) => c.tipo === tipo).map((c) => c.nome),
      todasCategorias: [...state.categorias.map((c) => c.nome), CATEGORIA_FATURA],
      salvarTransacao,
      removerTransacao,
      salvarConta,
      removerConta,
      salvarCartao,
      removerCartao,
      salvarVencimento,
      removerVencimento,
      darBaixa,
      salvarCategoria,
      removerCategoria,
      setPerfil,
      setEmpresa,
      setPrefs,
      restaurar,
    }),
    [state, salvarTransacao, removerTransacao, salvarConta, removerConta, salvarCartao, removerCartao, salvarVencimento, removerVencimento, darBaixa, salvarCategoria, removerCategoria, setPerfil, setEmpresa, setPrefs, restaurar],
  );
}

export type Finance = ReturnType<typeof useFinanceValue>;
const FinanceContext = createContext<Finance | null>(null);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const value = useFinanceValue();
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used inside FinanceProvider");
  return ctx;
}
