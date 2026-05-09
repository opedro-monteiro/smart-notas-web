"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import type { AnalyticsSummaryDTO, Period } from "@/features/analytics/schema";

export function useAnalyticsSummary(period: Period) {
  const api = useApiClient();

  return useQuery({
    queryKey: ["analytics", "summary", period],
    queryFn: () =>
      api.fetch<AnalyticsSummaryDTO>(`/api/analytics/summary?period=${period}`),
  });
}
