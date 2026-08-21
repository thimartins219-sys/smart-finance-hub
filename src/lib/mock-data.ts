export const empresa = {
  nome: "Porto Meridian S/A",
  periodo: "Setembro 2026",
  usuario: { nome: "Ricardo Almeida", cargo: "CFO", iniciais: "RA" },
};

export const kpisDashboard = {
  receita: 2_450_000,
  despesas: 487_320,
  economia: 82_450,
  operacionais: 312_800,
};

export const gastosCategoria = [
  { categoria: "Operações", valor: 148_200, cor: "hsl(24 95% 60%)" },
  { categoria: "Compras", valor: 112_400, cor: "hsl(38 92% 62%)" },
  { categoria: "Logística", valor: 89_600, cor: "hsl(200 90% 60%)" },
  { categoria: "Administrativo", valor: 68_120, cor: "hsl(280 70% 65%)" },
  { categoria: "Tecnologia", valor: 69_000, cor: "hsl(160 70% 55%)" },
];

export const evolucaoMensal = [
  { mes: "Jan", despesas: 412_000, receita: 2_180_000 },
  { mes: "Fev", despesas: 428_500, receita: 2_240_000 },
  { mes: "Mar", despesas: 445_200, receita: 2_290_000 },
  { mes: "Abr", despesas: 462_100, receita: 2_310_000 },
  { mes: "Mai", despesas: 451_800, receita: 2_360_000 },
  { mes: "Jun", despesas: 470_300, receita: 2_380_000 },
  { mes: "Jul", despesas: 481_600, receita: 2_400_000 },
  { mes: "Ago", despesas: 476_900, receita: 2_425_000 },
  { mes: "Set", despesas: 487_320, receita: 2_450_000 },
];

export const centrosCusto = [
  { nome: "Operações Portuárias", gestor: "Marina Costa", orcamento: 180_000, utilizado: 148_200, savings: 18_400, status: "Saudável" },
  { nome: "Compras", gestor: "Eduardo Lima", orcamento: 140_000, utilizado: 112_400, savings: 22_800, status: "Otimizado" },
  { nome: "Logística", gestor: "Camila Duarte", orcamento: 100_000, utilizado: 89_600, savings: 9_200, status: "Atenção" },
  { nome: "Administrativo", gestor: "Rafael Souza", orcamento: 80_000, utilizado: 68_120, savings: 6_400, status: "Saudável" },
  { nome: "Comercial", gestor: "Beatriz Alves", orcamento: 90_000, utilizado: 69_000, savings: 4_100, status: "Atenção" },
  { nome: "Tecnologia", gestor: "Lucas Mendes", orcamento: 75_000, utilizado: 58_400, savings: 7_800, status: "Saudável" },
];

export const gastos = [
  { data: "12/09/2026", categoria: "Operações", fornecedor: "Petrobras Distribuidora", cc: "Operações Portuárias", valor: 42_800, status: "Pago" },
  { data: "11/09/2026", categoria: "Compras", fornecedor: "Steel Corp Brasil", cc: "Compras", valor: 28_450, status: "Aprovado" },
  { data: "10/09/2026", categoria: "Logística", fornecedor: "TransCargo Express", cc: "Logística", valor: 18_900, status: "Pago" },
  { data: "09/09/2026", categoria: "Tecnologia", fornecedor: "CloudEdge Systems", cc: "Administrativo", valor: 12_400, status: "Pago" },
  { data: "08/09/2026", categoria: "Administrativo", fornecedor: "Assessoria Legal Andrade", cc: "Administrativo", valor: 15_600, status: "Pendente" },
  { data: "07/09/2026", categoria: "Operações", fornecedor: "Máritima Serviços LTDA", cc: "Operações Portuárias", valor: 34_200, status: "Aprovado" },
  { data: "06/09/2026", categoria: "Compras", fornecedor: "Global Parts Import", cc: "Compras", valor: 21_780, status: "Pago" },
  { data: "05/09/2026", categoria: "Logística", fornecedor: "PortoLog Armazéns", cc: "Logística", valor: 24_500, status: "Pago" },
  { data: "04/09/2026", categoria: "Tecnologia", fornecedor: "DataSec Cibernética", cc: "Administrativo", valor: 18_200, status: "Aprovado" },
  { data: "03/09/2026", categoria: "Operações", fornecedor: "Energia Costa Sul", cc: "Operações Portuárias", valor: 27_100, status: "Pago" },
  { data: "02/09/2026", categoria: "Administrativo", fornecedor: "Prime Office Supply", cc: "Administrativo", valor: 4_320, status: "Pago" },
  { data: "01/09/2026", categoria: "Compras", fornecedor: "Industrial Bearings Co", cc: "Compras", valor: 32_600, status: "Pendente" },
];

export const kpiSerie = [
  { mes: "Abr", eficiencia: 79, economia: 32 },
  { mes: "Mai", eficiencia: 81, economia: 41 },
  { mes: "Jun", eficiencia: 82, economia: 48 },
  { mes: "Jul", eficiencia: 84, economia: 58 },
  { mes: "Ago", eficiencia: 86, economia: 71 },
  { mes: "Set", eficiencia: 88, economia: 82 },
];

export function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
