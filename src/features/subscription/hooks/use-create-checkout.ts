"use client";

import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api-client";
import type { PlanTier } from "@/features/subscription/schema";

export function useCreateCheckout() {
  const api = useApiClient();

  return useMutation({
    mutationFn: (planTier: PlanTier) =>
      api.fetch<{ checkoutUrl: string }>("/api/subscription/checkout", {
        method: "POST",
        body: JSON.stringify({ planTier }),
      }),
    onSuccess: ({ checkoutUrl }) => {
      window.location.href = checkoutUrl;
    },
  });
}
