import { RadioButton, SelectInput, Checkbox, Button } from "@/container/reusable/form";
import { NATIONALITY_OPTIONS } from "@/data/nationalityOptions";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterFormData } from "@/lib/validation/registerSchema";

interface StepTwoProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  isSubmitting: boolean;
  prevStep: () => void;
}

export default function StepTwo({
  register,
  errors,
  isSubmitting,
  prevStep,
}: StepTwoProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-right">
        <label className="block text-dark font-medium mb-3 text-sm">
          نوع الحساب <span className="text-red-500">*</span>
        </label>
        {errors.accountType && (
          <p className="text-red-500 text-sm mb-2">{errors.accountType.message}</p>
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

      <div className="text-right">
        <label className="block text-dark font-medium mb-3 text-sm">النوع</label>
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
