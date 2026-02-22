import { useState, useRef } from "react";
import { UseOtpInputProps } from "@/types/otp";

export function useOtpInput({ length = 6, onComplete }: UseOtpInputProps = {}) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
   
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
   
    const char = value.slice(-1);
    newCode[index] = char;
    setCode(newCode);

    // Auto-focus next input
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Check if complete
    const fullCode = newCode.join("");
    if (fullCode.length === length && onComplete) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pastedData) {
      const newCode = pastedData
        .split("")
        .concat(Array(length - pastedData.length).fill(""));
      setCode(newCode);
      
      const lastIndex = Math.min(pastedData.length, length - 1);
      inputsRef.current[lastIndex]?.focus();

      if (pastedData.length === length && onComplete) {
        onComplete(pastedData);
      }
    }
  };

  const clearCode = () => {
    setCode(Array(length).fill(""));
    inputsRef.current[0]?.focus();
  };

  return {
    code,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    clearCode,
    fullCode: code.join("")
  };
}
