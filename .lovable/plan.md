# The Econommy: app completo de controle financeiro

## Objetivo
Trocar a página única por um aplicativo com várias telas. Cada área fica em uma página própria e, ao trocar de página, uma animação de transição leva o usuário à próxima. A animação de abertura sai: o app abre direto no Painel.

## Direção visual: "Luxo equilibrado"
- Moldura escura em grafite profundo (menu lateral e topo), com detalhes em laranja.
- Área de trabalho em superfícies claras premium (off-white quente, tipo papel), com cartões em vidro suave e sombras macias.
- Laranja como única cor de destaque. Sem roxo.
- Títulos com uma fonte de exibição elegante, números em fonte de tabela alinhada e muito espaço livre.
- Um botão permite ver a área de trabalho também em modo escuro.

## Telas (cada uma é uma página)
1. **Painel**: patrimônio total, entradas e saídas do mês, próximos vencimentos e gráfico de evolução, sem repetir os detalhes das outras telas.
2. **Contas e Cartões**: contas bancárias com saldo e cartões visuais em 3D que giram ao passar o mouse, com limite usado, fatura atual, data de fechamento e cadastro/edição de contas e cartões.
3. **Transações**: lista completa com busca, filtros (conta, categoria, período, tipo), criação, edição e exclusão, além de uma transferência entre contas.
4. **A Pagar / A Receber**: calendário e lista de vencimentos, recorrências, botão de dar baixa e alertas de atraso.
5. **Fluxo de Caixa**: saldo diário e mensal, saldo acumulado e projeção dos próximos 90 dias.
6. **Relatórios**: DRE simplificada, comparativo mês a mês, gastos por categoria e por centro de custo, e exportação em CSV/PDF.
7. **Copiloto IA**: o chat atual, com respostas baseadas nos dados do app.
8. **Configurações**: perfil, empresa, categorias, preferências e aparência.

## Animações
- **Transição entre páginas**: uma cortina laranja e grafite varre a tela; a página atual sai com leve desfoque e escala, e a nova entra em camadas: título, depois cartões e depois tabelas.
- Os números dos valores sobem até o total, os gráficos se desenham, o indicador do menu desliza entre os itens e os cartões reagem ao mouse com inclinação e brilho.
- Pequenos retornos visuais ao salvar, excluir ou dar baixa: confirmação animada e linhas que entram e saem.
- O efeito de luz que segue o cursor e o fundo de auroras ficam mais discretos.
- Respeita a preferência do sistema de reduzir movimento.

## O que sai
- A animação de abertura.
- O menu flutuante de pontos e a rolagem única.

## Seção técnica
- Rotas: `/` (painel), `/contas`, `/transacoes`, `/agenda`, `/fluxo`, `/relatorios`, `/copiloto`, `/configuracoes`. Os endereços antigos (/gastos e /centros-custo) passam a redirecionar para as novas páginas.
- O layout fica em `__root.tsx`: menu lateral, barra no topo e `<Outlet />` dentro de `AnimatePresence` (framer-motion), usando o pathname como chave e um overlay de cortina.
- Estado de demonstração compartilhado: um store com contas, cartões, transações e vencimentos (React context + localStorage), para que as alterações apareçam em todas as telas. Os dados iniciais ficam em `mock-data.ts`. Continua sem servidor.
- Os módulos são divididos por tela em `src/components/app/*`; o `modules.tsx` de 1.700 linhas é removido. `CinematicIntro`, `FloatingNav` e `Section` são excluídos.
- Tokens: as superfícies claras e escuras viram tokens semânticos em `styles.css`, como `--surface-paper` e `--shell`, e as cores fixas são removidas dos componentes.
- Os PDFs são gerados no navegador com `jspdf`; o CSV é gerado sem biblioteca.
- Cada rota recebe seu próprio head() com título e descrição. O AGENTS.md é atualizado para a nova arquitetura com várias rotas.
