"use client";

import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  CreateClientSchema,
  CreateClientDTO,
  MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH,
} from "@/features/client/schema";
import { useCreateClient } from "@/features/client/hooks/use-create-client";
import { PlaceholderHelp } from "@/features/client/components/placeholder-help";
import {
  templatePtToEn,
  templateEnToPt,
} from "@/features/client/utils/placeholder-converter";
import { formatBrazilPhoneNumber } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ClientFormProps = {
  defaultValues?: Partial<CreateClientDTO>;
};

export function ClientForm({ defaultValues }: Readonly<ClientFormProps>) {
  const router = useRouter();
  const { mutate, isPending } = useCreateClient();

  const form = useForm<CreateClientDTO>({
    resolver: standardSchemaResolver(CreateClientSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      phone: formatBrazilPhoneNumber(defaultValues?.phone ?? ""),
      email: defaultValues?.email ?? "",
      // Convert EN → PT so user sees PT-BR placeholders when editing
      reminderMessageTemplate: defaultValues?.reminderMessageTemplate
        ? templateEnToPt(defaultValues.reminderMessageTemplate)
        : "",
    },
  });

  const templateValue = form.watch("reminderMessageTemplate") ?? "";

  function onSubmit(values: CreateClientDTO) {
    const rawTemplate = values.reminderMessageTemplate?.trim();

    const payload: CreateClientDTO = {
      name: values.name,
      ...(values.phone?.trim() ? { phone: values.phone.trim() } : {}),
      ...(values.email?.trim() ? { email: values.email.trim() } : {}),
      ...(rawTemplate
        ? { reminderMessageTemplate: templatePtToEn(rawTemplate) }
        : {}),
    };
    mutate(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
              <FormControl>
                <Input placeholder="Nome do cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(11) 91234-5678"
                  inputMode="numeric"
                  value={field.value ?? ""}
                  onChange={(event) =>
                    field.onChange(formatBrazilPhoneNumber(event.target.value))
                  }
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="cliente@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Accordion multiple={false}>
          <AccordionItem value="reminder">
            <AccordionTrigger className="text-sm font-medium">
              Mensagem de lembrete personalizada
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              <FormField
                control={form.control}
                name="reminderMessageTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo de mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Olá {{nomeCliente}}, você tem uma dívida de {{valor}}..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <span
                        className={`text-xs ${
                          templateValue.length >
                          MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {templateValue.length} /{" "}
                        {MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PlaceholderHelp />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "A guardar…" : "Cadastrar cliente"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
