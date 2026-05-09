"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import { ClientDTO } from "@/features/client/schema";

export function useClients() {
  const api = useApiClient();

  return useQuery({
    queryKey: ["clients"],
    queryFn: () => api.fetch<ClientDTO[]>("/api/clients"),
  });
}
