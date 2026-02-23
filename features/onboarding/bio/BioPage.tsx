"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Info, CheckCircle2, Loader2 } from "lucide-react";
import { useBio } from "@/hooks/onboarding/useBio";
import { BIO_TIPS } from "@/data/bioTips";

export default function BioPage() {
  const router = useRouter();
  const {
    bio,
    setBio,
    MAX_CHARS,
    isSubmitting,
    handleFinish,
    remainingChars,
    progressPercentage,
  } = useBio();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans"
      dir="rtl"
    >
      <div className="text-center mb-8 space-y-3 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-wide">
          أخبرنا عنك أكثر
        </h1>
        <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
          اكتب نبذة تعريفية تجذب العملاء وتوضح خبراتك ومهاراتك بشكل احترافي
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden mb-8 border border-gray-100 p-8 animate-fadeIn delay-100 fill-mode-both">
        {/* Text Area Container */}
        <div className="mb-6">
          <div
            className={`relative rounded-2xl border-2 transition-all duration-300 p-4 min-h-[250px]
            ${bio.length > 0 ? "border-primary shadow-[0_4px_20px_-4px_rgba(30,170,173,0.15)]" : "border-gray-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"}
          `}
          >
            <textarea
              className="w-full h-full min-h-[220px] resize-none outline-none text-gray-700 text-lg placeholder:text-gray-400 leading-relaxed bg-transparent"
              placeholder="مطور ويب محترف مع خبرة كبيرة في عديد من التقنيات مثل مكتبة رياكت..."
              value={bio}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setBio(e.target.value);
                }
              }}
              dir="rtl"
            />
          </div>

          {/* Counter & Progress */}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span
                className={`${remainingChars < 50 ? "text-red-500" : "text-gray-500"}`}
              >
                {remainingChars} حرف متبقي
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className={`h-full bg-primary transition-all duration-700 ease-out rounded-full ${bio.length > 0 ? "shadow-[0_0_8px_rgba(30,170,173,0.5)]" : ""}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-dark">
            <Info size={20} />
            <h3 className="font-bold text-lg">نصائح لكتابة نبذة مميزة:</h3>
          </div>

          <ul className="space-y-3 pr-2">
            {BIO_TIPS.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-gray-600 font-medium animate-fadeIn fill-mode-both"
                style={{ animationDelay: `${300 + idx * 100}ms` }}
              >
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-4 animate-fadeIn delay-200 fill-mode-both">
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="px-8 py-3 bg-white text-gray-600 rounded-xl font-bold text-lg border-2 border-gray-200
            hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] 
            transition-all duration-200 flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          رجوع
        </button>

        <button
          onClick={handleFinish}
          disabled={isSubmitting || bio.length < 10}
          className="flex-1 max-w-xs py-3 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/25 
            hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] 
            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? "جاري الحفظ..." : "إنهاء التسجيل"}
        </button>
      </div>
    </div>
  );
}
