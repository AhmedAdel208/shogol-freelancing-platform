import { User, Mail, Phone, CheckCircle2 } from "lucide-react";
import { FormInput, PasswordInput, ProfileUpload } from "@/container/reusable/form";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { RegisterFormData } from "@/lib/validation/registerSchema";
import { Button } from "@/container/reusable/form";

interface StepOneProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  setSelectedImage: (file: File | undefined) => void;
  nextStep: () => void;
  watch: UseFormWatch<RegisterFormData>;
}

export default function StepOne({
  register,
  errors,
  setSelectedImage,
  nextStep,
  watch,
}: StepOneProps) {
  const password = watch("password") || "";
  
  // Strong password criteria matches registerSchema.ts
  const isStrong = 
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&#]/.test(password);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <ProfileUpload
        onImageSelect={(file) => setSelectedImage(file)}
        onImageRemove={() => setSelectedImage(undefined)}
        maxSizeMB={5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="الاسم الأول"
          type="text"
          placeholder="الاسم الأول"
          icon={<User className="w-5 h-5 text-primary" />}
          registration={register("firstName")}
          error={errors.firstName?.message}
        />
        <FormInput
          label="الاسم الأخير"
          type="text"
          placeholder="الاسم الأخير"
          icon={<User className="w-5 h-5 text-primary" />}
          registration={register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <FormInput
        label="البريد الإلكتروني"
        type="email"
        placeholder="example@email.com"
        icon={<Mail className="w-5 h-5 text-primary" />}
        registration={register("email")}
        error={errors.email?.message}
      />

      <FormInput
        label="رقم الجوال"
        type="tel"
        placeholder="+201012345678 or +966501234567 "
        icon={<Phone className="w-5 h-5 text-primary" />}
        registration={register("phone")}
        error={errors.phone?.message}
      />

      <div className="relative">
        <PasswordInput
          label="كلمة المرور"
          placeholder="أدخل كلمة المرور"
          registration={register("password")}
          error={errors.password?.message}
        />
        {isStrong && !errors.password && (
          <div className="flex items-center gap-1.5 mt-2 text-emerald-600 animate-in fade-in slide-in-from-top-1 duration-300">
            <CheckCircle2 size={14} strokeWidth={3} />
            <span className="text-[13px] font-bold font-cairo">كلمة مرور قوية</span>
          </div>
        )}
      </div>

      <Button type="button" onClick={nextStep}>
        التالي
      </Button>
    </div>
  );
}
