import { z } from "zod";

export const MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH = 1600;

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  createdAt: z.coerce.date(),
  userId: z.string(),
});

export const CreateClientSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    phone: z.string().optional(),
    email: z.email("Email inválido").optional().or(z.literal("")),
    reminderMessageTemplate: z
      .string()
      .max(
        MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH,
        `Máximo de ${MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH} caracteres`,
      )
      .optional(),
  })
  .refine((data) => !!data.phone?.trim() || !!data.email?.trim(), {
    message: "Preencha pelo menos telefone ou email",
    path: ["phone"],
  });

export type ClientDTO = z.infer<typeof ClientSchema>;
export type CreateClientDTO = z.infer<typeof CreateClientSchema>;
