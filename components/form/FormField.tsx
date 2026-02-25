import React from "react";
import { UseFormRegister } from "react-hook-form";
import { EditProjectFormData } from "@/lib/validation/editProjectSchema";

interface FormFieldProps {
  label: string;
  name: keyof EditProjectFormData;
  type?: "text" | "email" | "number" | "date" | "textarea";
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<EditProjectFormData>;
  error?: string;
  className?: string;
  rows?: number;
  min?: number;
  max?: number;
}

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  register,
  error,
  className = "",
  rows,
  min,
  max,
}: FormFieldProps) {
  const baseInputClasses =
    "w-full bg-white rounded-xl px-4 py-3 text-right text-dark outline-none focus:ring-2 focus:ring-primary transition-colors";
  const errorClasses = error ? "ring-2 ring-red-500" : "";

  const inputElement =
    type === "textarea" ? (
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows || 5}
        className={`${baseInputClasses} ${errorClasses} ${className} resize-none`}
      />
    ) : (
      <input
        type={type}
        {...register(name, {
          valueAsNumber: type === "number",
          min,
          max,
        })}
        placeholder={placeholder}
        className={`${baseInputClasses} ${errorClasses} ${className}`}
      />
    );

  return (
    <div className="text-right">
      <label className="block text-primary text-sm mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {inputElement}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
