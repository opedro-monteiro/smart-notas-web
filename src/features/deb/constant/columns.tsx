"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

import type { DebtDTO } from "@/features/deb/schema";
import { useDeleteDebt } from "@/features/deb/hooks/use-delete-debt";
import { DebtStatusBadge } from "@/features/deb/components/debt-status-badge";
import { DebtSheet } from "@/features/deb/components/debt-sheet";
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { dateFormat } from "@/utils/date-format";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CHANNEL_LABELS: Record<string, string> = {
  SMS: "SMS",
  WHATSAPP: "WhatsApp",
  EMAIL: "Email",
  CALL: "Ligação",
};

function DebtActions({
  debt,
  clientId,
}: {
  debt: DebtDTO;
  clientId: string;
}) {
  const [sheetMode, setSheetMode] = useState<"edit" | "view" | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: deleteDebt, isPending } = useDeleteDebt(clientId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setSheetMode("view")}>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSheetMode("edit")}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {sheetMode && (
        <DebtSheet
          open={!!sheetMode}
          onOpenChange={(open) => !open && setSheetMode(null)}
          mode={sheetMode}
          clientId={clientId}
          debt={debt}
        />
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir débito</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este débito de{" "}
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(debt.amount)}
              </strong>
              ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isPending}
              onClick={() => deleteDebt(debt.id)}
            >
              {isPending ? "Excluindo…" : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function getDebtColumns(clientId: string): ColumnDef<DebtDTO>[] {
  return [
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Valor" />
      ),
      cell: ({ row }) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(row.original.amount),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vencimento" />
      ),
      cell: ({ row }) => dateFormat(row.original.dueDate),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <DebtStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "channels",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Canais" />
      ),
      cell: ({ row }) =>
        row.original.channels.length > 0
          ? row.original.channels
              .map((ch) => CHANNEL_LABELS[ch] ?? ch)
              .join(", ")
          : "—",
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => (
        <DebtActions debt={row.original} clientId={clientId} />
      ),
    },
  ];
}
