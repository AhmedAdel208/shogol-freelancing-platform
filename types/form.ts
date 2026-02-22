import type { UseFormRegisterReturn } from "react-hook-form";
import type React from "react";

export interface FormInputProps {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  registration?: UseFormRegisterReturn;
  className?: string;
}

export interface PasswordInputProps {
  label: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
}

export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  registration?: UseFormRegisterReturn;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export interface SelectInputProps {
  label: string;
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
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}
