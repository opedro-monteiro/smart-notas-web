"use client";

import React, { useState } from "react";
import { HandCoins, Plus } from "lucide-react";

import { GetBreadcrumb } from "@/components/shared/breadcumbs";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { useDebts } from "@/features/deb/hooks/use-debts";
import { useClient } from "@/features/client/hooks/use-client";
import { getDebtColumns } from "@/features/deb/constant/columns";
import { DebtsTableSkeleton } from "@/features/deb/components/debts-table-skeleton";
import { DebtSheet } from "@/features/deb/components/debt-sheet";

function DebtsEmptyState({ onAdd }: Readonly<{ onAdd: () => void }>) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <HandCoins className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">Nenhum débito cadastrado</p>
        <p className="text-sm text-muted-foreground">
          Adicione o primeiro débito para este cliente.
        </p>
      </div>
      <Button size="sm" onClick={onAdd}>
        Adicionar débito
      </Button>
    </div>
  );
}

export default function DebtsPage({
  params,
}: Readonly<{
  params: Promise<{ clientId: string }>;
}>) {
  const { clientId } = React.use(params);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: client } = useClient(clientId);
  const { data: debts, isLoading, isError } = useDebts(clientId);

  const columns = getDebtColumns(clientId);

  return (
    <div className="container mx-auto space-y-3">
      <section className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">
            Débitos{client ? ` de ${client.name}` : ""}
          </h1>
          <GetBreadcrumb />
        </div>
        <Button onClick={() => setSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar débito
        </Button>
      </section>

      {isLoading && <DebtsTableSkeleton />}

      {isError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Erro ao carregar débitos. Tente recarregar a página.
        </div>
      )}

      {!isLoading && !isError && debts?.length === 0 && (
        <DebtsEmptyState onAdd={() => setSheetOpen(true)} />
      )}

      {!isLoading && !isError && debts && debts.length > 0 && (
        <DataTable
          columns={columns}
          data={debts}
          filterColumn="amount"
          filterPlaceholder="Buscar por valor"
        />
      )}

      <DebtSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        mode="create"
        clientId={clientId}
      />
    </div>
  );
}
