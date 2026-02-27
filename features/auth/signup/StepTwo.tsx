import { RadioButton, SelectInput, Checkbox, Button, FormInput } from "@/container/reusable/form";
import { NATIONALITY_OPTIONS } from "@/data/nationalityOptions";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { RegisterFormData } from "@/lib/validation/registerSchema";
import { Building2 } from "lucide-react";

interface StepTwoProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  isSubmitting: boolean;
  prevStep: () => void;
  watch: UseFormWatch<RegisterFormData>;
}

export default function StepTwo({
  register,
  errors,
  isSubmitting,
  prevStep,
  watch,
}: StepTwoProps) {
  const accountType = watch("accountType");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-right">
        <label className="block text-dark font-black font-cairo mb-4 text-sm">
          تصنيف الحساب <span className="text-red-500">*</span>
        </label>
        {errors.accountType && (
          <p className="text-red-500 text-sm mb-2 font-bold font-cairo">{errors.accountType.message}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <RadioButton
            name="accountType"
            value="individual"
            registration={register("accountType")}
            label="فرد"
          />
          <RadioButton
            name="accountType"
            value="company"
            registration={register("accountType")}
            label="شركة"
          />
        </div>
      </div>

      {accountType === "company" && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <FormInput
            label="اسم الشركة"
            type="text"
            placeholder="أدخل اسم الشركة"
            registration={register("companyName")}
            error={errors.companyName?.message}
            icon={<Building2 className="w-5 h-5 text-primary/70" />}
          />
        </div>
      )}

      <div className="text-right">
        <label className="block text-dark font-medium mb-3 text-sm">
          النوع <span className="text-red-500">*</span>
        </label>
        {errors.gender && (
          <p className="text-red-500 text-sm mb-2">{errors.gender.message}</p>
        )}
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

      <div className="text-right">
        <SelectInput label="الجنسية" registration={register("nationality")}>
          <option value="">اختر الدولة</option>
          {NATIONALITY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectInput>
        {errors.nationality && (
          <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
        )}
      </div>

      <Checkbox registration={register("agreed")} error={errors.agreed?.message} />

      {errors.root && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-lg text-center">{errors.root.message}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={isSubmitting}
        >
          السابق
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري التسجيل..." : "إنشاء الحساب"}
        </Button>
      </div>
    </div>
  );
}
