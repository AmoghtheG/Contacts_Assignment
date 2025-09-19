import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(7, "Phone is too short")
    .max(20, "Phone is too long")
    .regex(/^[0-9+\-()\s]+$/, "Invalid phone"),
  address: z.string().optional(),
});

export const contactUpdateSchema = contactCreateSchema.partial();
export type ContactCreateInput = z.infer<typeof contactCreateSchema>;
export type ContactUpdateInput = z.infer<typeof contactUpdateSchema>;