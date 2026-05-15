export type PlanTier = "PERSONAL" | "COLLECTOR" | "BUSINESS" | "AGENCY";

export type PlanLimits = {
  /** cobranças p/ terceiros por mês (null = ilimitado) */
  thirdPartyMessages: number | null;
  whatsapp: boolean;
  sms: boolean;
  email: boolean;
  push: boolean;
  overagePerMessage: number | null; // centavos, null = sem excedente
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
  PERSONAL: {
    tier: "PERSONAL",
    name: "Pessoal",
    description: "Grátis para sempre.",
    priceMonthly: 0,
    highlighted: false,
    limits: {
      thirdPartyMessages: 5,
      whatsapp: false,
      sms: false,
      email: true,
      push: true,
      overagePerMessage: null,
    },
    features: [
      { text: "Lembretes próprios ilimitados", included: true },
      { text: "5 cobranças p/ terceiros/mês (e-mail)", included: true },
      { text: "Push + E-mail", included: true },
      { text: "Dashboard básico", included: true },
      { text: "WhatsApp", included: false },
      { text: "SMS", included: false },
    ],
  },
  COLLECTOR: {
    tier: "COLLECTOR",
    name: "Cobrador",
    description: "Para autônomos e freelancers.",
    priceMonthly: 2900,
    badge: "Mais popular",
    highlight: "1 cliente recuperado já paga o plano.",
    highlighted: true,
    limits: {
      thirdPartyMessages: 50,
      whatsapp: true,
      sms: false,
      email: true,
      push: true,
      overagePerMessage: null,
    },
    features: [
      { text: "Lembretes próprios ilimitados", included: true },
      { text: "50 cobranças p/ terceiros/mês", included: true },
      { text: "WhatsApp + E-mail", included: true },
      { text: "Templates personalizados", included: true },
      { text: "Dashboard completo", included: true },
      { text: "Reenvio automático", included: true },
      { text: "SMS", included: false },
    ],
  },
  BUSINESS: {
    tier: "BUSINESS",
    name: "Negócio",
    description: "Para pequenas empresas.",
    priceMonthly: 7900,
    highlighted: false,
    limits: {
      thirdPartyMessages: 300,
      whatsapp: true,
      sms: true,
      email: true,
      push: true,
      overagePerMessage: null,
    },
    features: [
      { text: "Lembretes próprios ilimitados", included: true },
      { text: "300 cobranças p/ terceiros/mês", included: true },
      { text: "WhatsApp + SMS + E-mail", included: true },
      { text: "Relatórios avançados", included: true },
      { text: "Suporte prioritário", included: true },
    ],
  },
  AGENCY: {
    tier: "AGENCY",
    name: "Agência",
    description: "Para quem gerencia múltiplos clientes.",
    priceMonthly: 19900,
    highlighted: false,
    limits: {
      thirdPartyMessages: 1000,
      whatsapp: true,
      sms: true,
      email: true,
      push: true,
      overagePerMessage: 20,
    },
    features: [
      { text: "Lembretes próprios ilimitados", included: true },
      { text: "1.000 cobranças p/ terceiros/mês", included: true },
      { text: "WhatsApp + SMS + E-mail", included: true },
      { text: "Múltiplos usuários", included: true },
      { text: "Gerente dedicado", included: true },
      { text: "SLA garantido", included: true },
    ],
  },
};

export function formatPlanPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function isAtThirdPartyLimit(tier: PlanTier, current: number): boolean {
  const limit = PLANS[tier].limits.thirdPartyMessages;
  if (limit === null) return false;
  return current >= limit;
}

export function getRemainingThirdPartyQuota(
  tier: PlanTier,
  current: number,
): number | null {
  const limit = PLANS[tier].limits.thirdPartyMessages;
  if (limit === null) return null;
  return Math.max(0, limit - current);
}
