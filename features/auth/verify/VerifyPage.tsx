"use client";

import { useVerify } from "@/hooks/auth/useVerify";
import { ShieldCheck, Smartphone, Mail, ArrowRight, Loader2, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
  const {
    phoneNumber,
    email,
    code,
    timer,
    fullCode,
    error,
    isLoading,
    isPending,
    isResending,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    handleResend,
  } = useVerify();

  const isFormComplete = fullCode.length === 6;

  return (
    <main className="relative min-h-[90vh] flex items-center justify-center p-6 overflow-hidden bg-slate-50/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="w-full max-w-[480px] relative z-10 transition-all duration-500">
        <div className="bg-white/90 backdrop-blur-xl p-10 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/60 flex flex-col items-center">
          
          {/* Top Icon Block */}
          <div className="w-20 h-20 bg-linear-to-tr from-primary to-teal-400 rounded-3xl flex items-center justify-center shadow-lg shadow-primary/20 mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
             <ShieldCheck size={38} className="text-white drop-shadow-md" strokeWidth={2.5} />
          </div>

          {/* Typography */}
          <h1 className="text-[32px] font-black font-cairo text-gray-900 mb-3 tracking-tight">
            رمز التحقق
          </h1>
          
          <div className="flex flex-col items-center gap-2 mb-10">
            <p className="text-gray-500 font-medium font-cairo flex items-center gap-2">
              {email ? (
                <>
                  <Mail size={16} className="text-primary" />
                  تم إرسال الرمز لبريدك الإلكتروني
                </>
              ) : (
                <>
                  <Smartphone size={16} className="text-primary" />
                  تم إرسال الرمز لهاتفك
                </>
              )}
            </p>
            <span className="text-primary font-black font-cairo bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 shadow-sm">
              {email || phoneNumber}
            </span>
          </div>

          {/* OTP Input Grid */}
          <div 
            className="flex justify-center gap-3 md:gap-4 mb-8" 
            onPaste={handlePaste} 
            dir="ltr"
          >
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
                aria-label={`Digit ${i + 1}`}
                className={`w-12 h-16 md:w-14 md:h-20 text-center text-3xl font-black rounded-2xl outline-none transition-all duration-300
                  ${digit 
                    ? "bg-primary/5 border-primary text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] scale-105" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white"
                  }
                  ${error ? "border-red-400 bg-red-50 text-red-600 animate-shake" : "border-2"}
                  focus:border-primary focus:ring-4 focus:ring-primary/10 focus:scale-105`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold font-cairo animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || !isFormComplete}
            className="group relative w-full overflow-hidden rounded-[22px] font-black font-cairo text-lg shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover:bg-size-[100%_auto] transition-all" />
            
            <div className="relative py-5 px-8 text-white flex items-center justify-center gap-3">
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <>
                  <span className="cursor-pointer">تحقق الآن</span>
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </div>
          </button>

          {/* Resend Action */}
          <div className="mt-10 pt-8 border-t border-slate-100 w-full">
            <p className="flex items-center justify-center gap-2 text-slate-500 font-medium font-cairo">
              لم تصلك الرسالة؟
              {timer > 0 ? (
                <span className="text-primary font-black bg-primary/10 px-3 py-1 rounded-lg">
                  {timer}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-primary font-black hover:text-teal-600 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isResending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="w-4 h-4" />
                  )}
                  {isResending ? "جاري الإرسال..." : "إعادة الإرسال"}
                </button>
              )}
            </p>
          </div>
          
          {/* Back Action */}
          <Link 
            href="/signup" 
            className="mt-6 text-slate-400 hover:text-primary transition-colors font-bold font-cairo text-sm flex items-center gap-1"
          >
             رجوع 
          </Link>
        </div>
      </div>
    </main>
  );
}
