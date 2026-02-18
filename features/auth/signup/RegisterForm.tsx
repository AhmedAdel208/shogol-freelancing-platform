"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SucessRegister from "./SucessRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import {
  FormInput,
  PasswordInput,
  RadioButton,
  SelectInput,
  Checkbox,
  Button,
  ProfileUpload,
} from "@/container/reusable/form";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validation/registerSchema";
import { authService } from "@/lib/api/auth";
import { NATIONALITY_OPTIONS } from "@/data/nationalityOptions";
import type { RegisterFormProps } from "@/types/registerForm";

export default function RegisterForm({
  initialAccountType,
}: RegisterFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<
    RegisterFormData | undefined
  >(undefined);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      accountType: initialAccountType as "freelancer" | "company",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authService.register(data, selectedImage);

      if (response.success) {
        setSubmittedData(data);
        setShowSuccess(true);
        return;
      }

      setError("root", {
        message: response.message || "فشل التسجيل",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError("root", {
        message: "حدث خطأ غير متوقع",
      });
    }
  };
  return (
    <section className="py-12 lg:py-20 bg-bg min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
          {/* Profile Upload - Now with handlers */}
          <ProfileUpload
            onImageSelect={(file) => setSelectedImage(file)}
            onImageRemove={() => setSelectedImage(undefined)}
            maxSizeMB={5}
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <FormInput
                  label="الاسم الأول"
                  type="text"
                  placeholder="الاسم الأول"
                  icon={<User className="w-5 h-5 text-primary" />}
                  registration={register("firstName")}
                  error={errors.firstName?.message}
                  className="transition-all duration-300 group-hover:border-primary/50 focus:border-primary"
                />
              </div>
              <div className="group">
                <FormInput
                  label="الاسم الأخير"
                  type="text"
                  placeholder="الاسم الأخير"
                  icon={<User className="w-5 h-5 text-primary" />}
                  registration={register("lastName")}
                  error={errors.lastName?.message}
                  className="transition-all duration-300 group-hover:border-primary/50 focus:border-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <FormInput
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@email.com"
                icon={<Mail className="w-5 h-5 text-primary" />}
                registration={register("email")}
                error={errors.email?.message}
                className="transition-all duration-300 group-hover:border-primary/50 focus:border-primary"
              />
            </div>

            {/* Phone */}
            <div className="group">
              <FormInput
                label="رقم الجوال"
                type="tel"
                placeholder="966501234567+"
                icon={<Phone className="w-5 h-5 text-primary" />}
                registration={register("phone")}
                error={errors.phone?.message}
                className="transition-all duration-300 group-hover:border-primary/50 focus:border-primary"
              />
            </div>

            {/* Password */}
            <PasswordInput
              label="كلمة المرور"
              placeholder="أدخل كلمة المرور"
              registration={register("password")}
              error={errors.password?.message}
            />

            {/* Account Type */}
            <div className="text-right">
              <label className="block text-dark font-medium mb-3 text-sm">
                نوع الحساب <span className="text-red-500">*</span>
              </label>
              {errors.accountType && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.accountType.message}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <RadioButton
                  name="accountType"
                  value="freelancer"
                  registration={register("accountType")}
                  label="حساب فرد"
                />
                <RadioButton
                  name="accountType"
                  value="company"
                  registration={register("accountType")}
                  label="حساب شركة"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="text-right">
              <label className="block text-dark font-medium mb-3 text-sm">
                النوع
              </label>
              <div className="grid grid-cols-2 gap-4">
                <RadioButton
                  name="gender"
                  value="male"
                  registration={register("gender")}
                  label="ذكر"
                />
                <RadioButton
                  name="gender"
                  value="female"
                  registration={register("gender")}
                  label="أنثى"
                />
              </div>
            </div>

            {/* Nationality */}
            <div className="text-right">
              <SelectInput
                label="الجنسية"
                registration={register("nationality")}
              >
                <option value="">اختر الدولة</option>
                {NATIONALITY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </SelectInput>
              {errors.nationality && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nationality.message}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <Checkbox
              registration={register("agreed")}
              error={errors.agreed?.message}
            />

            {/* Submit Error */}
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-lg text-center">
                  {errors.root.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري التسجيل..." : "إنشاء الحساب"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-medium">لديك حساب بالفعل؟ </span>
            <a
              href="#"
              className="text-primary font-semibold hover:text-accent transition-colors"
            >
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {
        <SucessRegister
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          userData={submittedData}
          userImage={selectedImage}
        />
      }
    </section>
  );
}
