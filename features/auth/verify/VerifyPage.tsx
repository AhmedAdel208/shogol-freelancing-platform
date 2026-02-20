"use client"
import { useVerify } from "@/hooks/useVerify";
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

  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-5 leading-relaxed">
            رمز التحقق
          </h1>
          <p className="text-gray-500 mb-1">
            تم إرسال رمز التحقق إلى {email ? "بريدك الإلكتروني" : "هاتفك"}
          </p>
          <p className="text-primary font-bold mb-6">
            {email || phoneNumber}
          </p>

          <div 
            className="flex justify-center gap-2 mb-4" 
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
                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg outline-none transition-all
                  ${digit ? "border-primary text-primary" : "border-gray-200"}
                  ${error ? "border-red-400 animate-shake" : ""}
                  focus:border-primary focus:ring-2 focus:ring-primary/20`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={isLoading || fullCode.length !== 6}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isPending ? "جاري التحقق..." : "تحقق"}
          </button>

          <div className="mt-6">
            <p className="text-gray-500 text-sm font-medium">
              لم تستلم الرمز؟{" "}
              {timer > 0 ? (
                <span className="text-primary font-bold">{timer}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-primary hover:underline font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? "جاري الإرسال..." : "إعادة الإرسال"}
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

