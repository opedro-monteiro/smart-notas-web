"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import { ClientDTO } from "@/features/client/schema";

export function useClient(id: string) {
  const api = useApiClient();

  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => api.fetch<ClientDTO>(`/api/clients/${id}`),
    enabled: !!id,
  });
}
