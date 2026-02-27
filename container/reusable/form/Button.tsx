import type { ButtonProps } from "@/types/form";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "font-bold py-4 cursor-pointer rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-gray-200 text-dark hover:bg-gray-300",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
