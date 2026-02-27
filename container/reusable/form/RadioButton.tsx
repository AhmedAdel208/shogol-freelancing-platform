import type { RadioButtonProps } from "@/types/form";

export default function RadioButton({
  label,
  name,
  value,
  registration,
  checked,
  onChange,
  className = "",
}: RadioButtonProps) {
  return (
    <label
      className={`relative flex items-center justify-between p-4 border-2 border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-checked:border-primary has-checked:bg-primary/5 ${className}`}
    >
      {label && <span className="text-dark font-medium">{label}</span>}
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked = {value === 'male'}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        {...registration}
        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
      />
    </label>
  );
}
