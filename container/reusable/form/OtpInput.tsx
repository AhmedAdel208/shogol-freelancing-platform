"use client";

import { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export default function OtpInput({ length = 6, value, onChange, error }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Sync external value to internal state if needed (e.g. on clear)
    if (value === "") {
      setDigits(new Array(length).fill(""));
    }
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    const newVal = val.replace(/[^0-9]/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = newVal;
    setDigits(newDigits);
    
    const combined = newDigits.join("");
    onChange(combined);

    // Focus next input
    if (newVal && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    const newDigits = pastedData.split("").concat(new Array(length - pastedData.length).fill("")).slice(0, length);
    setDigits(newDigits);
    onChange(newDigits.join(""));
    
    // Focus last filled or next empty
    const nextIndex = pastedData.length < length ? pastedData.length : length - 1;
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 md:gap-3" dir="ltr" onPaste={handlePaste}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          className={`w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold bg-white border-2 rounded-xl transition-all outline-none
            ${digit ? "border-primary text-primary shadow-sm shadow-primary/10" : "border-primary text-dark"}
            ${error ? "border-red-500 animate-shake" : "focus:border-primary focus:ring-4 focus:ring-primary/5"}
          `}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}
