"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KpiCards } from "@/features/analytics/components/kpi-cards";
import { useAnalyticsSummary } from "@/features/analytics/hooks/use-analytics-summary";
import { PERIOD_LABELS, type Period } from "@/features/analytics/schema";

const PERIODS: Period[] = ["7d", "30d", "90d", "current-month"];

export function DashboardKpis() {
  const [period, setPeriod] = useState<Period>("30d");
  const { data, isLoading, isError, refetch } = useAnalyticsSummary(period);

  return (
    <div className="space-y-4">
      <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
        <TabsList>
          {PERIODS.map((p) => (
            <TabsTrigger key={p} value={p}>
              {PERIOD_LABELS[p]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <KpiCards
        data={data}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />
    </div>
  );
}
