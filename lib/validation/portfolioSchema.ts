import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const portfolioSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان المشروع مطلوب")
    .min(3, "يجب أن يكون العنوان 3 أحرف على الأقل"),
  description: z.string().optional(),
  projectUrl: z
    .string()
    .url("يرجى إدخال رابط صحيح")
    .optional()
    .or(z.literal("")),
  image: z
    .custom<File>((file) => file instanceof File, "صورة المشروع مطلوبة")
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "حجم الصورة يجب أن يكون أقل من 5 ميجابايت")
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "يجب أن تكون الصورة بصيغة PNG, JPG, JPEG أو WebP"
    ),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
