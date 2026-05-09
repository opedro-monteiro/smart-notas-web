"use client";

import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Loader2 } from "lucide-react";

import { CreateDebtSchema, CreateDebtDTO } from "@/features/deb/schema";
import { useCreateDebt } from "@/features/deb/hooks/use-create-debt";
import { useUpdateDebt } from "@/features/deb/hooks/use-update-debt";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CHANNELS = [
  { value: "SMS", label: "SMS" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "EMAIL", label: "Email" },
  { value: "CALL", label: "Ligação" },
] as const;

type Channel = (typeof CHANNELS)[number]["value"];

type DebtFormProps = {
  clientId: string;
  onSuccess: () => void;
  /** Pass debt id + defaultValues for edit mode */
  editId?: string;
  defaultValues?: Partial<CreateDebtDTO>;
};

export function DebtForm({
  clientId,
  onSuccess,
  editId,
  defaultValues,
}: DebtFormProps) {
  const isEdit = !!editId;

  const { mutate: createDebt, isPending: isCreating } = useCreateDebt(
    clientId,
    onSuccess
  );
  const { mutate: updateDebt, isPending: isUpdating } = useUpdateDebt(
    clientId,
    onSuccess
  );

  const isPending = isCreating || isUpdating;

  const form = useForm<CreateDebtDTO>({
    resolver: standardSchemaResolver(CreateDebtSchema),
    defaultValues: {
      clientId,
      amount: defaultValues?.amount ?? (0 as unknown as number),
      dueDate: defaultValues?.dueDate ?? (undefined as unknown as Date),
      channels: defaultValues?.channels ?? [],
    },
  });

  function onSubmit(values: CreateDebtDTO) {
    if (isEdit && editId) {
      updateDebt({ id: editId, status: "PENDING" });
    } else {
      createDebt(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor (R$) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0,00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de vencimento *</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Channels */}
        <FormField
          control={form.control}
          name="channels"
          render={() => (
            <FormItem>
              <FormLabel>Canais de cobrança</FormLabel>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {CHANNELS.map((channel) => (
                  <FormField
                    key={channel.value}
                    control={form.control}
                    name="channels"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(
                              channel.value as Channel
                            )}
                            onCheckedChange={(checked) => {
                              const current = field.value ?? [];
                              field.onChange(
                                checked
                                  ? [...current, channel.value]
                                  : current.filter((v) => v !== channel.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {channel.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending
              ? "A guardar…"
              : isEdit
                ? "Salvar alterações"
                : "Adicionar débito"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
