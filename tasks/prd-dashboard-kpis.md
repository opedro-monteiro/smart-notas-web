# PRD: Dashboard KPIs Financeiros

## Introduction

Transformar o dashboard atual (apenas saudação) em uma tela de visão financeira com KPIs de cobrança. O usuário precisa ver rapidamente o total a receber, o que já recebeu, e o que está em atraso — filtrado por período.

**Stack relevante:**
- Backend: Fastify + Prisma + PostgreSQL
- Frontend: Next.js + React Query + shadcn/ui + Recharts (já instalado)
- Auth: Clerk (Bearer token em todas as chamadas)

---

## Goals

- Exibir KPIs financeiros consolidados na tela de dashboard
- Permitir filtro de período: Últimos 7 dias / 30 dias / 90 dias / Mês atual
- Criar endpoint de analytics no backend que agrega dados reais do banco
- Dashboard completo e funcional em uma entrega

---

## User Stories

### US-001: Endpoint de analytics no backend

**Description:** As a developer, I need a dedicated analytics endpoint so the frontend can fetch aggregated financial KPIs without computing them client-side.

**Acceptance Criteria:**
- [ ] `GET /api/analytics/summary?period=7d|30d|90d|current-month` implementado
- [ ] Endpoint protegido por autenticação Clerk (mesmo middleware dos outros endpoints)
- [ ] Retorna somente dados do usuário autenticado
- [ ] Response shape:
  ```json
  {
    "totalReceivable": 15000.00,
    "totalCollected": 8500.00,
    "totalOverdue": 3200.00,
    "collectionRate": 56.67,
    "defaultRate": 21.33,
    "totalClients": 12,
    "totalDelinquentClients": 4,
    "debtsByStatus": {
      "PENDING": 8,
      "PAID": 15,
      "OVERDUE": 5
    },
    "period": "30d",
    "periodStart": "2026-04-09T00:00:00.000Z",
    "periodEnd": "2026-05-09T23:59:59.999Z"
  }
  ```
- [ ] Filtro de período aplicado sobre `debt.createdAt`
- [ ] Typecheck passa

**Cálculos esperados:**
- `totalReceivable` = soma de `amount` onde `status IN (PENDING, OVERDUE)` no período
- `totalCollected` = soma de `amount` onde `status = PAID` no período
- `totalOverdue` = soma de `amount` onde `status = OVERDUE` no período
- `collectionRate` = `(totalCollected / (totalCollected + totalReceivable)) * 100`
- `defaultRate` = `(totalOverdue / (totalCollected + totalReceivable)) * 100`
- `totalDelinquentClients` = clientes distintos que possuem ao menos 1 dívida OVERDUE no período

---

### US-002: Hook React Query para analytics

**Description:** As a developer, I need a typed React Query hook to fetch analytics data so dashboard components can consume it consistently.

**Acceptance Criteria:**
- [ ] Hook `useAnalyticsSummary(period)` em `/src/features/analytics/hooks/use-analytics-summary.ts`
- [ ] `period` tipado como `"7d" | "30d" | "90d" | "current-month"`
- [ ] Response tipado via Zod schema em `/src/features/analytics/schema/index.ts`
- [ ] Cache key: `["analytics", "summary", period]`
- [ ] Typecheck passa

---

### US-003: Seletor de período no dashboard

**Description:** As a user, I want to choose a time period so I can see KPIs relevant to the range I care about.

**Acceptance Criteria:**
- [ ] Seletor de período visível no topo do dashboard com 4 opções: "7 dias", "30 dias", "90 dias", "Mês atual"
- [ ] Opção padrão: "30 dias"
- [ ] Ao trocar período, KPIs atualizam automaticamente (sem reload)
- [ ] Estado do período salvo em `useState` local (não precisa persistir em URL nesta versão)
- [ ] Usar componente `Tabs` do shadcn/ui
- [ ] Typecheck passa
- [ ] Verificar no browser

---

### US-004: Cards de KPIs financeiros

**Description:** As a user, I want to see my key financial numbers at a glance so I can understand my collection health without clicking anywhere.

**Acceptance Criteria:**
- [ ] 4 cards exibidos em grid responsivo (2 cols mobile, 4 cols desktop):
  1. **Total a Receber** — `totalReceivable` formatado em BRL
  2. **Total Recebido** — `totalCollected` em BRL (verde)
  3. **Em Atraso** — `totalOverdue` em BRL (vermelho)
  4. **Taxa de Recebimento** — `collectionRate` em % (com indicador visual)
- [ ] Cada card usa componente `Card` do shadcn/ui
- [ ] Cards mostram skeleton loader enquanto dados carregam
- [ ] Se erro na API, exibir mensagem de erro com botão retry
- [ ] Valores zero exibidos como "R$ 0,00" (não esconder card)
- [ ] Typecheck passa
- [ ] Verificar no browser

---

### US-005: Cards de KPIs operacionais

**Description:** As a user, I want to see client and debt counts so I know the scale of my operation.

**Acceptance Criteria:**
- [ ] 2 cards adicionais abaixo dos financeiros:
  1. **Clientes Ativos** — `totalClients` com subtexto "clientes cadastrados"
  2. **Clientes Inadimplentes** — `totalDelinquentClients` com subtexto "com dívidas em atraso" (badge vermelho se > 0)
- [ ] Mesmo padrão visual dos cards de US-004
- [ ] Skeleton e error state iguais
- [ ] Typecheck passa
- [ ] Verificar no browser

---

### US-006: Distribuição de dívidas por status

**Description:** As a user, I want to see how my debts are distributed by status so I can quickly assess my portfolio health.

**Acceptance Criteria:**
- [ ] 1 card com breakdown de débitos por status usando `debtsByStatus`
- [ ] Exibição: 3 badges/pills coloridos mostrando contagem por status:
  - PENDING → amarelo — "X pendentes"
  - PAID → verde — "X pagas"  
  - OVERDUE → vermelho — "X em atraso"
- [ ] Usar cores consistentes com `DebtStatusBadge` existente
- [ ] Typecheck passa
- [ ] Verificar no browser

---

## Functional Requirements

- **FR-1:** `GET /api/analytics/summary` aceita query param `period` com valores `7d`, `30d`, `90d`, `current-month`. Default: `30d`
- **FR-2:** Endpoint filtra todos os dados pelo `userId` do token Clerk
- **FR-3:** Período `current-month` considera do dia 1 do mês atual até hoje
- **FR-4:** Períodos `7d`, `30d`, `90d` contam dias retroativos a partir de hoje (inclusive)
- **FR-5:** Frontend exibe skeleton durante loading (usar `animate-pulse` ou skeleton do shadcn)
- **FR-6:** Valores monetários formatados em `pt-BR` com `Intl.NumberFormat` ou `date-fns` equivalente
- **FR-7:** Percentuais exibidos com 1 casa decimal (ex: "56.7%")
- **FR-8:** Layout dashboard mantém sidebar e header existentes — KPIs ficam no `<main>`

---

## Non-Goals

- Nenhum gráfico de série temporal (evolução ao longo do tempo)
- Nenhum ranking de clientes ou detalhamento por cliente no dashboard
- Nenhuma exportação de relatório (PDF, CSV)
- Filtro de período não persiste em URL
- Nenhuma notificação ou alerta baseado em threshold de KPI
- Nenhuma mudança nos endpoints existentes de clients/debts

---

## Design Considerations

**Layout dashboard:**
```
┌─────────────────────────────────────────────────────────┐
│ Bem-vindo, Pedro                                        │
│                                                         │
│ [7 dias] [30 dias] [90 dias] [Mês atual]  ← Tabs       │
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │A Receber │ │Recebido  │ │Em Atraso │ │Taxa Rec. │   │
│ │R$ 15.000 │ │R$ 8.500  │ │R$ 3.200  │ │  56,7%   │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│ ┌──────────────────┐ ┌──────────────────────────────┐  │
│ │ Clientes Ativos  │ │ Clientes Inadimplentes        │  │
│ │       12         │ │          4                    │  │
│ └──────────────────┘ └──────────────────────────────┘  │
│                                                         │
│ ┌──────────────────────────────────────────────────┐   │
│ │ Débitos: [8 pendentes] [15 pagos] [5 em atraso]  │   │
│ └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Componentes a reutilizar:**
- `Card`, `CardHeader`, `CardTitle`, `CardContent` — já existem
- `Tabs` — já existe em `/src/components/ui/tabs.tsx`
- `Badge` — já existe, reutilizar cores por status
- `DebtStatusBadge` — já existe em `/src/features/deb/`
- Skeleton: usar classes Tailwind `animate-pulse` ou componente skeleton do shadcn

---

## Technical Considerations

**Backend — novo arquivo sugerido:**
- `/src/modules/analytics/analytics.route.ts` — define a rota
- `/src/modules/analytics/analytics.service.ts` — lógica de agregação com Prisma
- Registrar rota no `app.ts` com prefixo `/api`

**Frontend — nova estrutura:**
```
/src/features/analytics/
  hooks/use-analytics-summary.ts
  schema/index.ts
  components/
    kpi-cards.tsx
    period-selector.tsx
    debt-distribution-card.tsx
```

**Query Prisma para agregação (referência):**
```typescript
// totalReceivable
await prisma.debt.aggregate({
  where: { client: { userId }, status: { in: ["PENDING", "OVERDUE"] }, createdAt: { gte: start, lte: end } },
  _sum: { amount: true }
})
```

**Performance:** Todas as queries de analytics usam índice em `userId` via relação `client.userId`. Para volume atual, queries diretas no Prisma são suficientes (sem views ou materialized queries).

---

## Success Metrics

- Usuário vê KPIs financeiros em menos de 2 segundos após abrir o dashboard
- Troca de período reflete dados corretos sem reload de página
- Zero regressão nas telas de Clientes e Débitos existentes

---

## Open Questions

- Dívidas sem data dentro do período (criadas antes) mas com status mudado no período — filtrar por `createdAt` ou por data de atualização de status? (PRD assume `createdAt` por ora)
- `collectionRate` deve incluir dívidas OVERDUE no denominador? (PRD assume sim: denominator = PAID + PENDING + OVERDUE)
- Adicionar `totalDebtAmount` (soma absoluta de todas as dívidas do período) como KPI futuro?
