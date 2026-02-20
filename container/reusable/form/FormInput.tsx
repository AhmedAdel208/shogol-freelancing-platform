import type { FormInputProps } from "@/types/form";
import { useId } from "react";

export default function FormInput({
  label,
  type,
  placeholder,
  icon,
  error,
  registration,
  className = "",
}: FormInputProps) {
  const errorId = useId();

  return (
    <div className={`text-right ${className}`}>
      <label className="block text-dark mb-2 text-base font-medium">
        {label} <span className="text-red-500" aria-hidden="true">*</span>
      </label>
      <div className="relative group">
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 pr-10 text-right text-dark placeholder-gray-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all group-hover:border-primary/50"
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium transition-colors group-focus-within:text-primary">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
