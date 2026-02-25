import { z } from "zod";

export const editProjectSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان المشروع مطلوب")
    .min(3, "عنوان المشروع يجب أن يكون 3 أحرف على الأقل")
    .max(100, "عنوان المشروع يجب ألا يتجاوز 100 حرف"),
  description: z
    .string()
    .min(1, "وصف المشروع مطلوب")
    .min(10, "وصف المشروع يجب أن يكون 10 أحرف على الأقل")
    .max(2000, "وصف المشروع يجب ألا يتجاوز 2000 حرف"),
  budget: z
    .number()
    .min(1, "الميزانية يجب أن تكون أكبر من 0")
    .max(1000000, "الميزانية يجب ألا تتجاوز 1,000,000 ريال"),
  durationInDays: z
    .number()
    .min(1, "مدة المشروع يجب أن تكون يوم واحد على الأقل")
    .max(365, "مدة المشروع يجب ألا تتجاوز 365 يوم"),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "تاريخ نهائي غير صالح")
    .optional()
    .or(z.literal("")),
});

export type EditProjectFormData = z.infer<typeof editProjectSchema>;
