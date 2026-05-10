"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import type { SubscriptionDTO } from "@/features/subscription/schema";

export function useSubscription() {
  const api = useApiClient();

  return useQuery({
    queryKey: ["subscription", "me"],
    queryFn: () => api.fetch<SubscriptionDTO | null>("/api/subscription/me"),
  });
}
