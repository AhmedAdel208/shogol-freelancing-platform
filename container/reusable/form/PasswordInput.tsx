"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type { PasswordInputProps } from "@/types/form";

export default function PasswordInput({
  label,
  placeholder,
  registration,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-right">
      {label && (
        <label className="block text-dark mb-2 text-base">
          {label} {<span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...registration}
          className="w-full bg-white border border-border rounded-xl px-4 py-3 pr-10 pl-12 text-right text-dark placeholder-gray-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-medium" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-primary transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-base mt-1">{error}</p>}
    </div>
  );
}
