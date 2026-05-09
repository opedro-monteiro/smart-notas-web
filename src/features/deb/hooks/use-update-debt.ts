"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiClient } from "@/lib/api-client";
import { DebtDTO, UpdateDebtStatusDTO } from "@/features/deb/schema";

type UpdateDebtPayload = UpdateDebtStatusDTO & { id: string };

export function useUpdateDebt(clientId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const api = useApiClient();

  return useMutation({
    mutationKey: ["debts", "update"],
    mutationFn: ({ id, ...data }: UpdateDebtPayload) =>
      api.fetch<DebtDTO>(`/api/debts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts", clientId] });
      toast.success("Débito atualizado com sucesso!");
      onSuccess?.();
    },
    onError: (err: unknown) => {
      const apiErr = err as { status?: number; error?: string };
      if (apiErr?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
      } else if (apiErr?.error) {
        toast.error(apiErr.error);
      } else {
        toast.error("Erro ao atualizar débito. Tente novamente.");
      }
    },
  });
}
