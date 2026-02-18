import { z } from "zod";

const PHONE_REGEX = /^(\+201|9665)\d{8,9}$/;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "الاسم الأول مطلوب")
    .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
  lastName: z
    .string()
    .min(1, "الاسم الأخير مطلوب")
    .min(2, "الاسم الأخير يجب أن يكون حرفين على الأقل"),
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("بريد إلكتروني غير صالح"),
  phone: z
    .string()
    .min(1, "رقم الجوال مطلوب")
    .regex(PHONE_REGEX, "رقم جوال غير صالح (يجب أن يبدأ بـ +201 أو 9665)"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  accountType: z.enum(["freelancer", "company"], {
    message: "اختر نوع الحساب",
  }),
  gender: z.enum(["male", "female"]).optional(),
  nationality: z.string().optional(),
  agreed: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
