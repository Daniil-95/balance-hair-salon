import { z } from "zod";

export const emailSchema = z.string().email("Zadejte platnou e-mailovou adresu.");
export const passwordSchema = z.string().min(8, "Heslo musí mít alespoň 8 znaků.");
export const contactFormSchema = z.object({
  name: z.string().min(1, "Jméno je povinné."),
  email: emailSchema,
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků."),
  phone: z.string().optional()
});
