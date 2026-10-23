// Pure finance calculations shared by every screen. No React here.
import {
  CATEGORIA_FATURA,
  HOJE,
  type Cartao,
  type Conta,
  type Recorrencia,
  type Transacao,
  type Vencimento,
} from "./mock-data";

/* ─────────────── formatting ─────────────── */

export function brl(n: number, cents = false) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

export function brlCompacto(n: number) {
  const abs = Math.abs(n);
  const sinal = n < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sinal}R$ ${(abs / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} mi`;
  if (abs >= 1_000) return `${sinal}R$ ${(abs / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} mil`;
  return brl(n);
}

export function pct(n: number, digits = 1) {
  return `${n.toLocaleString("pt-BR", { maximumFractionDigits: digits, minimumFractionDigits: digits })}%`;
}

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

/* ─────────────── dates (UTC strings, no timezone surprises) ─────────────── */

export function toDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
export function toKey(d: Date) {
  return d.toISOString().slice(0, 10);
}
export function addDays(s: string, n: number) {
  const d = toDate(s);
  d.setUTCDate(d.getUTCDate() + n);
  return toKey(d);
}
export function addMonths(s: string, n: number) {
  const d = toDate(s);
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + n);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return toKey(d);
}
export function diffDays(a: string, b: string) {
  return Math.round((toDate(a).getTime() - toDate(b).getTime()) / 86_400_000);
}
export function mesKey(s: string) {
  return s.slice(0, 7);
}
export function mesLabel(key: string, longo = false) {
  const [y, m] = key.split("-").map(Number);
  return longo ? `${MESES_LONGOS[m - 1]} ${y}` : MESES[m - 1];
}
export function dataCurta(s: string) {
  const d = toDate(s);
  return `${String(d.getUTCDate()).padStart(2, "0")} ${MESES[d.getUTCMonth()]}`;
}
export function dataBR(s: string) {
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y}`;
}
export function dataExtenso(s: string) {
  const d = toDate(s);
  return `${DIAS[d.getUTCDay()]}, ${d.getUTCDate()} de ${MESES_LONGOS[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}
export function mesesAte(key: string, n: number) {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(mesKey(addMonths(`${key}-01`, -i)));
  return out;
}
export const MES_ATUAL = mesKey(HOJE);

/* ─────────────── balances ─────────────── */

/** Effect of one transaction on one account's balance. Card purchases hit the card, not the account. */
export function efeitoNaConta(t: Transacao, contaId: string) {
  if (t.tipo === "transferencia") {
    if (t.contaId === contaId) return -t.valor;
    if (t.contaDestinoId === contaId) return t.valor;
    return 0;
  }
  if (t.contaId !== contaId || t.cartaoId) return 0;
  return t.tipo === "receita" ? t.valor : -t.valor;
}

export function saldoConta(conta: Conta, txs: Transacao[], ate = HOJE) {
  return txs.reduce((s, t) => (t.data <= ate ? s + efeitoNaConta(t, conta.id) : s), conta.saldoInicial);
}

export function saldoTotal(contas: Conta[], txs: Transacao[], ate = HOJE) {
  return contas.reduce((s, c) => s + saldoConta(c, txs, ate), 0);
}

/** Start of the open billing cycle: the day after the most recent closing date. */
export function inicioCiclo(cartao: Cartao, hoje = HOJE) {
  const d = toDate(hoje);
  const fech = toKey(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), cartao.fechamento)));
  const ultimoFechamento = hoje > fech ? fech : addMonths(fech, -1);
  return addDays(ultimoFechamento, 1);
}

export function faturaAtual(cartao: Cartao, txs: Transacao[], hoje = HOJE) {
  const inicio = inicioCiclo(cartao, hoje);
  return txs
    .filter((t) => t.cartaoId === cartao.id && t.tipo === "despesa" && t.data >= inicio && t.data <= hoje)
    .reduce((s, t) => s + t.valor, 0);
}

export function proximoFechamento(cartao: Cartao, hoje = HOJE) {
  return addMonths(addDays(inicioCiclo(cartao, hoje), -1), 1);
}

/* ─────────────── income statement style aggregates ─────────────── */

/** Revenue/expense rows that count in reports (no transfers, no card-invoice payments). */
export function ehOperacional(t: Transacao) {
  return t.tipo !== "transferencia" && t.categoria !== CATEGORIA_FATURA;
}

export function resumoMes(txs: Transacao[], key: string) {
  let entradas = 0;
  let saidas = 0;
  for (const t of txs) {
    if (mesKey(t.data) !== key || !ehOperacional(t)) continue;
    if (t.tipo === "receita") entradas += t.valor;
    else saidas += t.valor;
  }
  return { entradas, saidas, resultado: entradas - saidas };
}

export function serieMensal(txs: Transacao[], meses: string[]) {
  return meses.map((k) => ({ key: k, mes: mesLabel(k), ...resumoMes(txs, k) }));
}

export function evolucaoPatrimonio(contas: Conta[], txs: Transacao[], meses: string[]) {
  return meses.map((k) => {
    const fim = addDays(addMonths(`${k}-01`, 1), -1);
    const ate = fim > HOJE ? HOJE : fim;
    return { key: k, mes: mesLabel(k), saldo: saldoTotal(contas, txs, ate) };
  });
}

export function agruparPor(txs: Transacao[], key: string, campo: "categoria" | "centro") {
  const mapa = new Map<string, number>();
  for (const t of txs) {
    if (t.tipo !== "despesa" || !ehOperacional(t) || mesKey(t.data) !== key) continue;
    const k = (campo === "centro" ? t.centro : t.categoria) || "Sem centro";
    mapa.set(k, (mapa.get(k) ?? 0) + t.valor);
  }
  return [...mapa.entries()].map(([nome, valor]) => ({ nome, valor })).sort((a, b) => b.valor - a.valor);
}

export const GRUPOS_DRE = {
  custos: ["Operações", "Logística"],
  impostos: ["Impostos"],
};

export function dre(txs: Transacao[], key: string) {
  let receita = 0;
  let custos = 0;
  let despesas = 0;
  let impostos = 0;
  for (const t of txs) {
    if (mesKey(t.data) !== key || !ehOperacional(t)) continue;
    if (t.tipo === "receita") receita += t.valor;
    else if (GRUPOS_DRE.impostos.includes(t.categoria)) impostos += t.valor;
    else if (GRUPOS_DRE.custos.includes(t.categoria)) custos += t.valor;
    else despesas += t.valor;
  }
  const lucroBruto = receita - custos;
  const operacional = lucroBruto - despesas;
  const liquido = operacional - impostos;
  return { receita, custos, lucroBruto, despesas, operacional, impostos, liquido, margem: receita ? (liquido / receita) * 100 : 0 };
}

/* ─────────────── bills & projection ─────────────── */

export type StatusVenc = "pago" | "atrasado" | "hoje" | "proximo" | "futuro";

export function statusVencimento(v: Vencimento, hoje = HOJE): StatusVenc {
  if (v.pago) return "pago";
  const d = diffDays(v.data, hoje);
  if (d < 0) return "atrasado";
  if (d === 0) return "hoje";
  if (d <= 7) return "proximo";
  return "futuro";
}

export function proximaData(data: string, r: Recorrencia) {
  if (r === "semanal") return addDays(data, 7);
  if (r === "mensal") return addMonths(data, 1);
  if (r === "anual") return addMonths(data, 12);
  return null;
}

/** Expands open bills (and their repetitions) inside [hoje, hoje + dias]. Overdue bills land on today. */
export function ocorrencias(vencs: Vencimento[], dias: number, hoje = HOJE) {
  const limite = addDays(hoje, dias);
  const out: { data: string; valor: number; tipo: "pagar" | "receber"; descricao: string }[] = [];
  for (const v of vencs) {
    if (v.pago) continue;
    let data: string | null = v.data;
    let guard = 0;
    while (data && data <= limite && guard++ < 120) {
      out.push({ data: data < hoje ? hoje : data, valor: v.valor, tipo: v.tipo, descricao: v.descricao });
      data = proximaData(data, v.recorrencia);
    }
  }
  return out.sort((a, b) => a.data.localeCompare(b.data));
}

export function projecao(saldoAtual: number, vencs: Vencimento[], dias = 90, hoje = HOJE) {
  const occ = ocorrencias(vencs, dias, hoje);
  const pontos: { data: string; saldo: number; entradas: number; saidas: number }[] = [];
  let saldo = saldoAtual;
  for (let i = 0; i <= dias; i++) {
    const d = addDays(hoje, i);
    let entradas = 0;
    let saidas = 0;
    for (const o of occ) {
      if (o.data !== d) continue;
      if (o.tipo === "receber") entradas += o.valor;
      else saidas += o.valor;
    }
    saldo += entradas - saidas;
    pontos.push({ data: d, saldo, entradas, saidas });
  }
  return pontos;
}

export function fluxoDiario(contas: Conta[], txs: Transacao[], key: string) {
  const inicio = `${key}-01`;
  const fim = addDays(addMonths(inicio, 1), -1);
  const ultimo = fim > HOJE ? HOJE : fim;
  let saldo = saldoTotal(contas, txs, addDays(inicio, -1));
  const pontos: { data: string; dia: number; entradas: number; saidas: number; saldo: number }[] = [];
  for (let d = inicio; d <= ultimo; d = addDays(d, 1)) {
    let entradas = 0;
    let saidas = 0;
    for (const t of txs) {
      if (t.data !== d || t.tipo === "transferencia" || t.cartaoId) continue;
      if (t.tipo === "receita") entradas += t.valor;
      else saidas += t.valor;
    }
    saldo += entradas - saidas;
    pontos.push({ data: d, dia: toDate(d).getUTCDate(), entradas, saidas, saldo });
  }
  return pontos;
}
