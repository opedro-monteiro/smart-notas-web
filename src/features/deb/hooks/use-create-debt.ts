"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiClient } from "@/lib/api-client";
import { CreateDebtDTO, DebtDTO } from "@/features/deb/schema";

export function useCreateDebt(clientId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const api = useApiClient();

  return useMutation({
    mutationKey: ["debts", "create"],
    mutationFn: (data: CreateDebtDTO) =>
      api.fetch<DebtDTO>("/api/debts", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts", clientId] });
      toast.success("Débito criado com sucesso!");
      onSuccess?.();
    },
    onError: (err: unknown) => {
      const apiErr = err as { status?: number; error?: string };
      if (apiErr?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
      } else if (apiErr?.error) {
        toast.error(apiErr.error);
      } else {
        toast.error("Erro ao criar débito. Tente novamente.");
      }
    },
  });
}
