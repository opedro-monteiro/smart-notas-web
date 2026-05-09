"use client";

import { DebtDTO } from "@/features/deb/schema";
import { DebtForm } from "@/features/deb/components/debt-form";
import { DebtStatusBadge } from "@/features/deb/components/debt-status-badge";
import { dateFormat } from "@/utils/date-format";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const CHANNEL_LABELS: Record<string, string> = {
  SMS: "SMS",
  WHATSAPP: "WhatsApp",
  EMAIL: "Email",
  CALL: "Ligação",
};

type DebtSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  clientId: string;
  debt?: DebtDTO;
};

const TITLES = {
  create: "Adicionar débito",
  edit: "Editar débito",
  view: "Detalhes do débito",
};

export function DebtSheet({
  open,
  onOpenChange,
  mode,
  clientId,
  debt,
}: Readonly<DebtSheetProps>) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto px-2">
        <SheetHeader className="pb-4">
          <SheetTitle>{TITLES[mode]}</SheetTitle>
          {mode === "create" && (
            <SheetDescription>
              Preencha os dados do débito para este cliente.
            </SheetDescription>
          )}
        </SheetHeader>

        <Separator className="mb-6" />

        {(mode === "create" || mode === "edit") && (
          <DebtForm
            clientId={clientId}
            onSuccess={() => onOpenChange(false)}
            editId={mode === "edit" ? debt?.id : undefined}
            defaultValues={
              debt
                ? {
                    amount: debt.amount,
                    dueDate: debt.dueDate,
                    channels: debt.channels,
                    clientId,
                  }
                : undefined
            }
          />
        )}

        {mode === "view" && debt && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <DebtStatusBadge status={debt.status} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Valor</span>
              <span className="font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(debt.amount)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Vencimento</span>
              <span>{dateFormat(debt.dueDate)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Criado em</span>
              <span>{dateFormat(debt.createdAt)}</span>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Canais</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {debt.channels.length > 0 ? (
                  debt.channels.map((ch) => (
                    <span
                      key={ch}
                      className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {CHANNEL_LABELS[ch] ?? ch}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">Nenhum</span>
                )}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
