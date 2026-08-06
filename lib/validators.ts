import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email address.");
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters.");
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: emailSchema,
  message: z.string().min(10, "Message must be at least 10 characters."),
  phone: z.string().optional()
});
