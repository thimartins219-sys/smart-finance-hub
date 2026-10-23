// Demo data for The Econommy. Everything is local (no server); the store copies
// these seeds on first load and the user's edits are saved in the browser.

/** Fixed "today" for the demo so overdue / upcoming states stay consistent. */
export const HOJE = "2026-10-23";

export type TipoConta = "corrente" | "poupanca" | "investimento";
export interface Conta {
  id: string;
  nome: string;
  banco: string;
  tipo: TipoConta;
  agencia: string;
  numero: string;
  saldoInicial: number;
}

export type Bandeira = "Visa" | "Mastercard" | "Amex" | "Elo";
export type TemaCartao = "onix" | "laranja" | "champagne" | "grafite";
export interface Cartao {
  id: string;
  nome: string;
  bandeira: Bandeira;
  final: string;
  titular: string;
  limite: number;
  fechamento: number;
  vencimento: number;
  contaId: string;
  tema: TemaCartao;
}

export type TipoTransacao = "receita" | "despesa" | "transferencia";
export interface Transacao {
  id: string;
  data: string; // YYYY-MM-DD
  descricao: string;
  valor: number; // always positive
  tipo: TipoTransacao;
  categoria: string;
  contaId: string;
  contaDestinoId?: string;
  cartaoId?: string;
  centro?: string;
}

export type Recorrencia = "nenhuma" | "semanal" | "mensal" | "anual";
export interface Vencimento {
  id: string;
  descricao: string;
  valor: number;
  tipo: "pagar" | "receber";
  data: string;
  categoria: string;
  contaId: string;
  recorrencia: Recorrencia;
  pago: boolean;
  pagoEm?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  tipo: "receita" | "despesa";
}

export const CENTROS = ["Operações Portuárias", "Comercial", "Administrativo", "Tecnologia", "Logística"];

/** Categories that move money but are not revenue/expense (kept out of reports). */
export const CATEGORIA_FATURA = "Pagamento de fatura";
export const CATEGORIA_TRANSFERENCIA = "Transferência";

export const contasSeed: Conta[] = [
  { id: "c-itau", nome: "Conta Operacional", banco: "Itaú Empresas", tipo: "corrente", agencia: "0412", numero: "48210-7", saldoInicial: 1_180_000 },
  { id: "c-btg", nome: "Tesouraria", banco: "BTG Pactual", tipo: "investimento", agencia: "0001", numero: "772190-3", saldoInicial: 2_950_000 },
  { id: "c-bradesco", nome: "Folha e Fornecedores", banco: "Bradesco Empresas", tipo: "corrente", agencia: "2231", numero: "10984-2", saldoInicial: 420_000 },
  { id: "c-caixa", nome: "Reserva de Emergência", banco: "Caixa", tipo: "poupanca", agencia: "1648", numero: "00031-9", saldoInicial: 360_000 },
];

export const cartoesSeed: Cartao[] = [
  { id: "k-black", nome: "Corporate Black", bandeira: "Visa", final: "4821", titular: "RICARDO ALMEIDA", limite: 180_000, fechamento: 25, vencimento: 5, contaId: "c-itau", tema: "onix" },
  { id: "k-infinite", nome: "Infinite Business", bandeira: "Mastercard", final: "7310", titular: "PORTO MERIDIAN S/A", limite: 120_000, fechamento: 15, vencimento: 25, contaId: "c-bradesco", tema: "laranja" },
  { id: "k-centurion", nome: "Platinum Travel", bandeira: "Amex", final: "1007", titular: "RICARDO ALMEIDA", limite: 90_000, fechamento: 8, vencimento: 18, contaId: "c-itau", tema: "champagne" },
];

export const categoriasSeed: Categoria[] = [
  { id: "cat-servicos", nome: "Serviços portuários", tipo: "receita" },
  { id: "cat-armazenagem", nome: "Armazenagem", tipo: "receita" },
  { id: "cat-rendimentos", nome: "Rendimentos", tipo: "receita" },
  { id: "cat-pessoal", nome: "Pessoal", tipo: "despesa" },
  { id: "cat-operacoes", nome: "Operações", tipo: "despesa" },
  { id: "cat-logistica", nome: "Logística", tipo: "despesa" },
  { id: "cat-tecnologia", nome: "Tecnologia", tipo: "despesa" },
  { id: "cat-administrativo", nome: "Administrativo", tipo: "despesa" },
  { id: "cat-marketing", nome: "Marketing", tipo: "despesa" },
  { id: "cat-viagens", nome: "Viagens", tipo: "despesa" },
  { id: "cat-impostos", nome: "Impostos", tipo: "despesa" },
];

interface Modelo {
  dia: number;
  descricao: string;
  base: number;
  tipo: TipoTransacao;
  categoria: string;
  contaId: string;
  contaDestinoId?: string;
  cartaoId?: string;
  centro?: string;
}

const MODELOS: Modelo[] = [
  { dia: 2, descricao: "Contrato Maersk Line — operação de cais", base: 640_000, tipo: "receita", categoria: "Serviços portuários", contaId: "c-itau", centro: "Comercial" },
  { dia: 4, descricao: "Armazenagem alfandegada — lote mensal", base: 236_000, tipo: "receita", categoria: "Armazenagem", contaId: "c-itau", centro: "Comercial" },
  { dia: 6, descricao: "Folha de pagamento", base: 412_000, tipo: "despesa", categoria: "Pessoal", contaId: "c-bradesco", centro: "Administrativo" },
  { dia: 7, descricao: "Transferência para folha", base: 380_000, tipo: "transferencia", categoria: CATEGORIA_TRANSFERENCIA, contaId: "c-itau", contaDestinoId: "c-bradesco" },
  { dia: 8, descricao: "Petrobras Distribuidora — diesel marítimo", base: 86_400, tipo: "despesa", categoria: "Operações", contaId: "c-itau", centro: "Operações Portuárias" },
  { dia: 10, descricao: "AWS + Google Workspace", base: 18_900, tipo: "despesa", categoria: "Tecnologia", contaId: "c-itau", cartaoId: "k-black", centro: "Tecnologia" },
  { dia: 11, descricao: "Serviços de praticagem — Hapag-Lloyd", base: 164_000, tipo: "receita", categoria: "Serviços portuários", contaId: "c-itau", centro: "Comercial" },
  { dia: 12, descricao: "TransCargo Express — fretes", base: 54_700, tipo: "despesa", categoria: "Logística", contaId: "c-bradesco", centro: "Logística" },
  { dia: 13, descricao: "Manutenção de guindastes STS", base: 61_200, tipo: "despesa", categoria: "Operações", contaId: "c-bradesco", centro: "Operações Portuárias" },
  { dia: 14, descricao: "Passagens e hospedagem — diretoria", base: 12_600, tipo: "despesa", categoria: "Viagens", contaId: "c-itau", cartaoId: "k-centurion", centro: "Comercial" },
  { dia: 15, descricao: "Rendimento CDB 102% CDI", base: 27_800, tipo: "receita", categoria: "Rendimentos", contaId: "c-btg" },
  { dia: 16, descricao: "Energia Costa Sul", base: 41_900, tipo: "despesa", categoria: "Operações", contaId: "c-itau", centro: "Operações Portuárias" },
  { dia: 18, descricao: "Campanha LinkedIn + feiras", base: 22_300, tipo: "despesa", categoria: "Marketing", contaId: "c-itau", cartaoId: "k-infinite", centro: "Comercial" },
  { dia: 19, descricao: "Assessoria jurídica Andrade", base: 15_600, tipo: "despesa", categoria: "Administrativo", contaId: "c-bradesco", centro: "Administrativo" },
  { dia: 20, descricao: "ISS + PIS/COFINS", base: 96_500, tipo: "despesa", categoria: "Impostos", contaId: "c-itau", centro: "Administrativo" },
  { dia: 21, descricao: "Aplicação automática tesouraria", base: 150_000, tipo: "transferencia", categoria: CATEGORIA_TRANSFERENCIA, contaId: "c-itau", contaDestinoId: "c-btg" },
  { dia: 22, descricao: "Steel Corp — peças e insumos", base: 68_300, tipo: "despesa", categoria: "Operações", contaId: "c-bradesco", centro: "Operações Portuárias" },
  { dia: 24, descricao: "Licenças SAP Business One", base: 9_800, tipo: "despesa", categoria: "Tecnologia", contaId: "c-itau", cartaoId: "k-black", centro: "Tecnologia" },
  { dia: 26, descricao: "Armazenagem refrigerada — Cosco", base: 118_000, tipo: "receita", categoria: "Armazenagem", contaId: "c-itau", centro: "Comercial" },
  { dia: 27, descricao: "PortoLog — aluguel de pátio", base: 38_500, tipo: "despesa", categoria: "Logística", contaId: "c-bradesco", centro: "Logística" },
];

function variacao(i: number, m: number) {
  // Deterministic ±6% variation so every load shows the same demo numbers.
  const h = Math.abs(Math.sin((i + 1) * 12.9898 + m * 78.233) * 43758.5453) % 1;
  return 1 + (h - 0.5) * 0.12;
}

export function gerarTransacoesSeed(): Transacao[] {
  const out: Transacao[] = [];
  const meses = [5, 6, 7, 8, 9, 10];
  meses.forEach((m) => {
    MODELOS.forEach((mod, i) => {
      const data = `2026-${String(m).padStart(2, "0")}-${String(mod.dia).padStart(2, "0")}`;
      if (data > HOJE) return;
      const crescimento = 1 + (m - 5) * 0.012;
      const valor = Math.round((mod.base * variacao(i, m) * (mod.tipo === "receita" ? crescimento : 1)) / 10) * 10;
      out.push({
        id: `t-${m}-${i}`,
        data,
        descricao: mod.descricao,
        valor,
        tipo: mod.tipo,
        categoria: mod.categoria,
        contaId: mod.contaId,
        contaDestinoId: mod.contaDestinoId,
        cartaoId: mod.cartaoId,
        centro: mod.centro,
      });
    });
  });
  return out.sort((a, b) => b.data.localeCompare(a.data));
}

export const vencimentosSeed: Vencimento[] = [
  { id: "v-1", descricao: "Seguro de carga — Porto Seguro", valor: 34_800, tipo: "pagar", data: "2026-10-20", categoria: "Operações", contaId: "c-itau", recorrencia: "mensal", pago: false },
  { id: "v-2", descricao: "Fatura Hapag-Lloyd — sobre-estadia", valor: 72_400, tipo: "receber", data: "2026-10-18", categoria: "Serviços portuários", contaId: "c-itau", recorrencia: "nenhuma", pago: false },
  { id: "v-3", descricao: "Manutenção preventiva — RTGs", valor: 18_200, tipo: "pagar", data: "2026-10-23", categoria: "Operações", contaId: "c-bradesco", recorrencia: "semanal", pago: false },
  { id: "v-4", descricao: "Armazenagem refrigerada — Cosco", valor: 121_000, tipo: "receber", data: "2026-10-26", categoria: "Armazenagem", contaId: "c-itau", recorrencia: "mensal", pago: false },
  { id: "v-5", descricao: "PortoLog — aluguel de pátio", valor: 38_500, tipo: "pagar", data: "2026-10-27", categoria: "Logística", contaId: "c-bradesco", recorrencia: "mensal", pago: false },
  { id: "v-6", descricao: "Energia Costa Sul", valor: 42_300, tipo: "pagar", data: "2026-10-29", categoria: "Operações", contaId: "c-itau", recorrencia: "mensal", pago: false },
  { id: "v-7", descricao: "Contrato Maersk Line — operação de cais", valor: 668_000, tipo: "receber", data: "2026-11-02", categoria: "Serviços portuários", contaId: "c-itau", recorrencia: "mensal", pago: false },
  { id: "v-8", descricao: "Fatura Corporate Black", valor: 31_400, tipo: "pagar", data: "2026-11-05", categoria: CATEGORIA_FATURA, contaId: "c-itau", recorrencia: "nenhuma", pago: false },
  { id: "v-9", descricao: "Folha de pagamento", valor: 418_000, tipo: "pagar", data: "2026-11-06", categoria: "Pessoal", contaId: "c-bradesco", recorrencia: "mensal", pago: false },
  { id: "v-10", descricao: "Licença anual Oracle Cloud", valor: 86_000, tipo: "pagar", data: "2026-11-16", categoria: "Tecnologia", contaId: "c-itau", recorrencia: "anual", pago: false },
  { id: "v-11", descricao: "ISS + PIS/COFINS", valor: 98_000, tipo: "pagar", data: "2026-11-20", categoria: "Impostos", contaId: "c-itau", recorrencia: "mensal", pago: false },
  { id: "v-12", descricao: "Serviços de praticagem — Hapag-Lloyd", valor: 168_000, tipo: "receber", data: "2026-11-11", categoria: "Serviços portuários", contaId: "c-itau", recorrencia: "mensal", pago: false },
  { id: "v-13", descricao: "Assessoria jurídica Andrade", valor: 15_600, tipo: "pagar", data: "2026-10-19", categoria: "Administrativo", contaId: "c-bradesco", recorrencia: "mensal", pago: true, pagoEm: "2026-10-19" },
  { id: "v-14", descricao: "ISS + PIS/COFINS", valor: 96_500, tipo: "pagar", data: "2026-10-20", categoria: "Impostos", contaId: "c-itau", recorrencia: "nenhuma", pago: true, pagoEm: "2026-10-20" },
];

export const perfilSeed = { nome: "Ricardo Almeida", cargo: "CFO", email: "ricardo.almeida@portomeridian.com.br" };
export const empresaSeed = { nome: "Porto Meridian S/A", cnpj: "12.345.678/0001-90", setor: "Logística portuária" };
