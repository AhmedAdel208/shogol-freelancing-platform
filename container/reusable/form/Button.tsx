import type { ButtonProps } from "@/types/form";

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon: Icon,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40",
    secondary: "bg-gray-200 text-dark hover:bg-gray-300 shadow-lg",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-4 text-base",
    lg: "px-8 py-5 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} cursor-pointer ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        Icon && <Icon className="w-5 h-5" />
      )}
      {children}
    </button>
  );
}
