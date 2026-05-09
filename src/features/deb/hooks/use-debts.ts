"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import { DebtDTO } from "@/features/deb/schema";

export function useDebts(clientId: string) {
  const api = useApiClient();

  return useQuery({
    queryKey: ["debts", clientId],
    queryFn: () => api.fetch<DebtDTO[]>(`/api/clients/${clientId}/debts`),
    enabled: !!clientId,
  });
}
