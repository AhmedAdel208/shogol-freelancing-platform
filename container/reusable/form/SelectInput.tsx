
import type { SelectInputProps } from "@/types/form";

export default function SelectInput({
  label,
  children,
  registration,
  value,
  onChange,
  className = "",
}: SelectInputProps) {
  return (
    <div className="text-right">
      <label className="block text-dark font-medium mb-2 text-sm">
        {label}
      </label>
      <div className="relative">
        <select
          {...registration}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full bg-white border border-border rounded-xl px-4 py-3 text-right text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer ${className}`}
        >
          {children}
        </select>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
