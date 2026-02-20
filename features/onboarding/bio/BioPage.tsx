"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Info, CheckCircle2 } from "lucide-react";

export default function BioPage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const MAX_CHARS = 500;
  const remainingChars = MAX_CHARS - bio.length;
  const progressPercentage = (bio.length / MAX_CHARS) * 100;

  const handleFinish = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Navigate to dashboard or home
    router.push("/"); 
    setIsLoading(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans" dir="rtl">
      {/* Header Section */}
      <div className="text-center mb-8 space-y-3">
        {/* We can reuse the header style or adjust based on provided screenshot if needed. 
            The screenshot doesn't show a big header, but consistency is key. 
            However, looking at the screenshot, the content is in a card, and there isn't a visible big header above it.
            Actually, let's keep it consistent with the previous page for better UX, or follow the screenshot which seems to have content inside a card directly.
        */}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden mb-8 border border-gray-100 p-8">
        
        {/* Text Area Container */}
        <div className="mb-6">
          <div className={`relative rounded-2xl border-2 transition-all duration-300 p-4 min-h-[250px]
            ${bio.length > 0 ? "border-[#5D5FEF] shadow-[0_4px_20px_-4px_rgba(93,95,239,0.15)]" : "border-gray-200 focus-within:border-[#5D5FEF] focus-within:ring-4 focus-within:ring-[#5D5FEF]/10"}
          `}>
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
               <span className={`${remainingChars < 50 ? "text-red-500" : "text-gray-500"}`}>
                {remainingChars} حرف متبقي
              </span>
               {/* Optional: Add clear button or hints */}
            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#5D5FEF] transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#F6F8FF] rounded-2xl p-6 border border-[#5D5FEF]/10">
          <div className="flex items-center gap-2 mb-4 text-[#5D5FEF]">
            <Info size={20} />
            <h3 className="font-bold text-lg">نصائح لكتابة نبذة مميزة:</h3>
          </div>
          
          <ul className="space-y-3 pr-2">
            {[
              "اذكر تخصصك الرئيسي وسنوات الخبرة",
              "أبرز مهاراتك وإنجازاتك الرئيسية",
              "اكتب بأسلوب احترافي وواضح",
              "تجنب المعلومات الشخصية الحساسة"
            ].map((tip, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium">
                <CheckCircle2 size={16} className="text-[#5D5FEF] shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-4">
         <button
          onClick={handleBack}
          disabled={isLoading}
          className="px-8 py-3 bg-white text-gray-600 rounded-xl font-bold text-lg border-2 border-gray-200
            hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] 
            transition-all duration-200 flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          رجوع
        </button>

        <button
          onClick={handleFinish}
          disabled={isLoading || bio.length < 10} // Min length validation
          className="flex-1 max-w-xs py-3 bg-[#5D5FEF] text-white rounded-xl font-bold text-lg shadow-xl shadow-[#5D5FEF]/25 
            hover:shadow-[#5D5FEF]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] 
            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "جاري الحفظ..." : "إنهاء التسجيل"}
        </button>
      </div>
    </div>
  );
}
