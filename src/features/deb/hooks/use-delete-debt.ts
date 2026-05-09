"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApiClient } from "@/lib/api-client";

export function useDeleteDebt(clientId: string) {
  const queryClient = useQueryClient();
  const api = useApiClient();

  return useMutation({
    mutationKey: ["debts", "delete"],
    mutationFn: (id: string) =>
      api.fetch<void>(`/api/debts/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts", clientId] });
      toast.success("Débito excluído com sucesso!");
    },
    onError: (err: unknown) => {
      const apiErr = err as { status?: number; error?: string };
      if (apiErr?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
      } else if (apiErr?.error) {
        toast.error(apiErr.error);
      } else {
        toast.error("Erro ao excluir débito. Tente novamente.");
      }
    },
  });
}
