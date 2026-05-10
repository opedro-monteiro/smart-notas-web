export type PlanTier = "STARTER" | "GROWTH" | "SCALE";

export type PlanLimits = {
  clients: number | null;
  whatsapp: number | null;
  sms: number | null;
  email: number | null;
  calls: number | null;
};

export type PlanConfig = {
  tier: PlanTier;
  name: string;
  description: string;
  priceMonthly: number; // em centavos
  badge?: string;
  highlight?: string;
  highlighted: boolean;
  limits: PlanLimits;
  features: { text: string; included: boolean }[];
};

export const PLANS: Record<PlanTier, PlanConfig> = {
  STARTER: {
    tier: "STARTER",
    name: "Starter",
    description: "Para microempresas que querem parar de cobrar manualmente.",
    priceMonthly: 2700,
    highlighted: false,
    limits: {
      clients: 50,
      whatsapp: 50,
      sms: 50,
      email: null,
      calls: 0,
    },
    features: [
      { text: "Até 50 clientes", included: true },
      { text: "50 WhatsApp + 50 SMS por mês", included: true },
      { text: "E-mails ilimitados", included: true },
      { text: "Templates básicos", included: true },
      { text: "Dashboard simples", included: true },
      { text: "Ligações automáticas", included: false },
      { text: "Templates personalizados", included: false },
      { text: "Reenvio automático", included: false },
    ],
  },
  GROWTH: {
    tier: "GROWTH",
    name: "Growth",
    description: "Para empresas que querem recuperar dinheiro de verdade.",
    priceMonthly: 8700,
    badge: "Mais popular",
    highlight: "1 cliente recuperado já paga o plano.",
    highlighted: true,
    limits: {
      clients: 500,
      whatsapp: 150,
      sms: 150,
      email: 150,
      calls: 0,
    },
    features: [
      { text: "Até 500 clientes", included: true },
      { text: "150 WhatsApp + 150 SMS por mês", included: true },
      { text: "150 E-mails", included: true },
      { text: "Templates personalizados", included: true },
      { text: "Dashboard avançado", included: true },
      { text: "Reenvio automático", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Ligações automáticas", included: false },
      { text: "Relatórios de desempenho", included: false },
    ],
  },
  SCALE: {
    tier: "SCALE",
    name: "Scale",
    description: "Para operações maiores que não toleram inadimplência.",
    priceMonthly: 29900,
    highlighted: false,
    limits: {
      clients: null,
      whatsapp: 2000,
      sms: 1500,
      email: null,
      calls: 500,
    },
    features: [
      { text: "Clientes ilimitados", included: true },
      { text: "2.000 WhatsApp + 1.500 SMS/mês", included: true },
      { text: "500 ligações automáticas/mês", included: true },
      { text: "E-mails ilimitados", included: true },
      { text: "Multiusuários", included: true },
      { text: "Métricas avançadas", included: true },
      { text: "IA para sugestões de mensagem (em breve)", included: true },
      { text: "API (em breve)", included: true },
      { text: "Atendimento dedicado", included: true },
    ],
  },
};

export function formatPlanPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function isAtLimit(
  tier: PlanTier,
  resource: keyof PlanLimits,
  current: number,
): boolean {
  const limit = PLANS[tier].limits[resource];
  if (limit === null) return false;
  return current >= limit;
}

export function getRemainingQuota(
  tier: PlanTier,
  resource: keyof PlanLimits,
  current: number,
): number | null {
  const limit = PLANS[tier].limits[resource];
  if (limit === null) return null;
  return Math.max(0, limit - current);
}
