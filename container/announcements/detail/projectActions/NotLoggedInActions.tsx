import Link from "next/link";
import { LogIn, UserRoundPlus } from "lucide-react";

export default function NotLoggedInActions() {
  return (
    <div className="bg-[#ffffff] rounded-[24px] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100/80 p-8 sticky top-6 overflow-hidden  group">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] -z-10 translate-x-1/2 -translate-y-1/2 transition-all duration-700 group-hover:bg-primary/20" />

      <div className="flex flex-col items-center mb-7">
        <div className="w-16 h-16 rounded-full bg-slate-50 border-[3px] border-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-primary/70 mb-4 ring-1 ring-slate-100 relative group-hover:scale-110 transition-transform duration-500">
          <UserRoundPlus size={28} strokeWidth={2} className="group-hover:text-primary transition-colors duration-500 ml-1" />
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white animate-pulse" />
        </div>
        <h3 className="text-[1.15rem] font-bold text-gray-900 font-cairo mb-2 text-center leading-tight">
          هذا المشروع مطلوب جداً!
        </h3>
        <p className="text-[14px] text-gray-500 text-center font-cairo leading-relaxed max-w-[90%]">
          سجل دخولك الآن لتتمكن من مناقشة العميل   .
        </p>
      </div>

      <Link
        href="/login"
        className="relative w-full overflow-hidden rounded-[16px] font-bold font-cairo text-base group/btn shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 active:scale-[0.98] block"
      >
        <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-400 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover/btn:bg-size-100%_auto] transition-all duration-500" />
        
        <div className="relative flex items-center justify-center gap-2.5 py-4 px-6 text-white bg-black/5 hover:bg-black/10 transition-colors">
          <LogIn size={20} strokeWidth={2.5} className="group-hover/btn:-translate-x-1 transition-transform" />
          <span className="mb-px tracking-wide font-bold">بدء تسجيل الدخول</span>
        </div>
      </Link>
    </div>
  );
}
