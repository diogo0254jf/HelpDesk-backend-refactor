const { z } = require("zod");

exports.authLoginSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

exports.authRegisterSchema = z.object({
  body: z.object({
    name: z.string(),
    
    email: z.string().email(),
    password: z.string(),
  }),
});
