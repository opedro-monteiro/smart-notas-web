import { z } from "zod";

export const SubscriptionStatusSchema = z.enum([
  "TRIALING",
  "ACTIVE",
  "CANCELED",
  "EXPIRED",
]);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

export const PlanTierSchema = z.enum(["PERSONAL", "COLLECTOR", "BUSINESS", "AGENCY"]);
export type PlanTier = z.infer<typeof PlanTierSchema>;

const PLAN_TIER_LABELS: Record<PlanTier, string> = {
  PERSONAL: "Pessoal",
  COLLECTOR: "Cobrador",
  BUSINESS: "Negócio",
  AGENCY: "Agência",
};

export function getPlanTierLabel(tier: PlanTier): string {
  return PLAN_TIER_LABELS[tier];
}

export const MessageUsageSchema = z.object({
  channel: z.enum(["SMS", "WHATSAPP", "EMAIL", "CALL"]),
  count: z.number(),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
});

export const SubscriptionSchema = z.object({
  id: z.string(),
  status: SubscriptionStatusSchema,
  planTier: PlanTierSchema,
  trialEndsAt: z.coerce.date(),
  currentPeriodStart: z.coerce.date(),
  currentPeriodEnd: z.coerce.date(),
  canceledAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  usage: z.array(MessageUsageSchema),
});

export type SubscriptionDTO = z.infer<typeof SubscriptionSchema>;

export function isSubscriptionActive(sub: SubscriptionDTO | null): boolean {
  if (!sub) return false;
  const now = new Date();
  if (sub.status === "TRIALING") return sub.trialEndsAt > now;
  if (sub.status === "ACTIVE") return sub.currentPeriodEnd > now;
  return false;
}

export function getTrialDaysRemaining(sub: SubscriptionDTO | null): number {
  if (!sub || sub.status !== "TRIALING") return 0;
  const now = new Date();
  const diff = sub.trialEndsAt.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
