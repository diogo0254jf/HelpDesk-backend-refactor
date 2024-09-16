const { z } = require("zod");

exports.TechnicalCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  }),
});

exports.TechnicalUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 6 caracteres"),
  }),
  params: z.object({
    id: z.string().min(1, "ID inválido"),
  }),
});
