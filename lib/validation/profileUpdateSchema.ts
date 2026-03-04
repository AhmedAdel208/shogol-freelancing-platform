import { z } from "zod";

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(1, "الاسم الأول مطلوب")
    .min(2, "الاسم الأول قصير جداً")
    .max(50, "الاسم الأول طويل جداً"),
  lastName: z
    .string()
    .min(1, "الاسم الأخير مطلوب")
    .min(2, "الاسم الأخير قصير جداً")
    .max(50, "الاسم الأخير طويل جداً"),
  bio: z
    .string()
    .max(500, "يجب ألا تتجاوز النبذة 500 حرف")
    .optional()
    .or(z.literal("")),
  gender: z.string().min(1, "النوع مطلوب"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
  companyName: z.string().optional().nullable().or(z.literal("")),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
