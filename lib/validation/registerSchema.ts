import { z } from "zod";

const PHONE_REGEX = /^(\+201|\+9665|9665)\d{8,9}$/;

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
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل")
    .regex(/[@$!%*?&#]/, "يجب أن تحتوي على رمز خاص واحد على الأقل"),
  userRole: z.enum(["freelancer", "client"]),
  accountType: z.enum(["individual", "company"], {
    message: "اختر نوع الحساب",
  }),
  companyName: z.string().optional(),
  gender: z.enum(["male", "female"], {
    message: "يرجى اختيار الجنس",
  }),
  nationality: z.string().optional(),
  agreed: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
}).superRefine((data, ctx) => {
  if (data.accountType === "company" && !data.companyName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "اسم الشركة مطلوب",
      path: ["companyName"],
    });
  }
});

export type RegisterFormData = z.infer<typeof registerSchema>;
