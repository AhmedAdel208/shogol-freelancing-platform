import { LucideIcon } from "lucide-react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
