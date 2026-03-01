import React from "react";
import { ButtonProps } from "@/types/button";

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
    "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "border-2 border-primary text-primary hover:bg-primary/10",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
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
