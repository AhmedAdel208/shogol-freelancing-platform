import type { FormInputProps } from "@/types/form";

export default function FormInput({
  label,
  type,
  placeholder,
  icon,
  error,
  registration,
}: FormInputProps) {
  return (
    <div className="text-right">
      <label className="block text-dark mb-2 text-base">
        {label} {<span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 pr-10 text-right text-dark placeholder-gray-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-base mt-1">{error}</p>}
    </div>
  );
}
