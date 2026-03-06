import type { UseFormRegisterReturn } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

export interface FormInputProps {
  label?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  registration?: UseFormRegisterReturn;
  className?: string;
  rows?: number;
}

export interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
}

export interface RadioButtonProps {
  label?: string;
  name: string;
  value: string;
  registration?: UseFormRegisterReturn;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export interface SelectInputProps {
  label?: string;
  children: React.ReactNode;
  registration?: UseFormRegisterReturn;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface CheckboxProps {
  label?: React.ReactNode;
  registration?: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
}
