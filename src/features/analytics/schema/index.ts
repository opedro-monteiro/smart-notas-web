import { z } from "zod";

export const PeriodSchema = z.enum(["7d", "30d", "90d", "current-month"]);
export type Period = z.infer<typeof PeriodSchema>;

export const PERIOD_LABELS: Record<Period, string> = {
  "7d": "7 dias",
  "30d": "30 dias",
  "90d": "90 dias",
  "current-month": "Mês atual",
};

export const AnalyticsSummarySchema = z.object({
  totalReceivable: z.number(),
  totalCollected: z.number(),
  totalOverdue: z.number(),
  collectionRate: z.number(),
  defaultRate: z.number(),
  totalClients: z.number(),
  totalDelinquentClients: z.number(),
  debtsByStatus: z.object({
    PENDING: z.number(),
    PAID: z.number(),
    OVERDUE: z.number(),
  }),
  period: PeriodSchema,
  periodStart: z.string(),
  periodEnd: z.string(),
});

export type AnalyticsSummaryDTO = z.infer<typeof AnalyticsSummarySchema>;
