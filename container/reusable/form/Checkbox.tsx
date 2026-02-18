import { Check } from "lucide-react";
import type { CheckboxProps } from "@/types/form";

export default function Checkbox({
  registration,
  error,
  className = "",
  label,
}: CheckboxProps) {
  const defaultLabel = (
    <>
      أوافق على{" "}
      <a href="#" className="text-primary hover:underline">
        الشروط والأحكام
      </a>
    </>
  );

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="flex items-center justify-start gap-3 cursor-pointer select-none">
        <input
          id={registration?.name || undefined}
          type="checkbox"
          {...registration}
          className="sr-only peer"
        />
        <div className="w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-colors peer-checked:bg-primary peer-checked:border-primary border-gray-300 hover:border-primary">
          <Check className="w-3 h-3 text-white opacity-100 " />
        </div>
        <span className="text-base text-gray-medium">
          {label ?? defaultLabel}
        </span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
