"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiClient } from "@/lib/api-client";
import { CreateClientDTO, ClientDTO } from "@/features/client/schema";

export function useCreateClient() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const api = useApiClient();

  return useMutation({
    mutationKey: ["clients", "create"],
    mutationFn: (data: CreateClientDTO) =>
      api.fetch<ClientDTO>("/api/clients", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente criado com sucesso!");
      router.push("/dashboard/clients");
    },
    onError: (err: unknown) => {
      const apiErr = err as { status?: number; error?: string };
      if (apiErr?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
      } else if (apiErr?.error) {
        toast.error(apiErr.error);
      } else {
        toast.error("Erro de servidor. Tente novamente.");
      }
    },
  });
}
