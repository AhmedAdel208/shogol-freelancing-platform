// app/verify/page.tsx or pages/verify.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const email = "user@example.com"; // Get from URL params or context

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");

    // Auto-focus next
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newCode = [...code];
    pasted.split("").forEach((digit, i) => {
      if (i < 6) newCode[i] = digit;
    });
    setCode(newCode);

    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("يرجى إدخال الرمز كاملاً");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    // router.push("/dashboard");
    setIsLoading(false);
  };

  const handleResend = () => {
    // Resend API call
    console.log("Resend to", email);
  };

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl font-bold">ش</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-dark mb-3">رمز التحقق</h1>
        <p className="text-gray-medium mb-2">
          تم إرسال رمز التحقق إلى بريدك الإلكتروني
        </p>
        <p className="text-primary text-sm mb-8">{email}</p>

        {/* OTP Inputs */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg outline-none transition-all
                  ${digit ? "border-primary text-primary" : "border-gray-200 text-dark"}
                  ${error ? "border-red-400" : ""}
                  focus:border-primary
                `}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || code.join("").length !== 6}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "جاري التحقق..." : "تحقق"}
          </button>

          {/* Resend */}
          <div className="mt-4 space-y-2">
            <p className="text-gray-medium text-sm">
              لم تستلم الرمز؟{" "}
              <button
                onClick={handleResend}
                className="text-primary hover:underline"
              >
                إعادة الإرسال
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
