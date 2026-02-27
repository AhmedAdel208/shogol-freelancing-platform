import { toast as sonnerToast } from "sonner";
import { Check, X, Sparkles, ShieldAlert } from "lucide-react";

export const toast = {
  success: (message: string) => {
    sonnerToast.custom((t) => (
      <div 
        dir="rtl"
        className="group relative flex w-[380px] overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-2xl p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_50px_-12px_rgba(20,184,166,0.3)]"
      >
        {/* Animated Background Glow */}
        <div className="absolute -inset-2 bg-linear-to-r from-teal-400 to-emerald-500 opacity-10 blur-xl transition-opacity duration-500 group-hover:opacity-30 pointer-events-none" />
        
        {/* Content Container */}
        <div className="relative flex w-full items-start gap-4 pointer-events-auto">
          
          {/* Stunning Animated Icon Box */}
          <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[1rem] bg-linear-to-br from-[#2dd4bf] to-[#10b981] shadow-inner mb-auto mt-auto">
             <div className="absolute inset-0 rounded-[1rem] bg-white opacity-20 animate-pulse" />
             <Check className="h-7 w-7 text-white drop-shadow-md relative z-10" strokeWidth={3.5} />
             <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-yellow-300 animate-[bounce_2s_infinite]" />
          </div>

          {/* Text Area */}
          <div className="flex flex-1 flex-col pt-1.5 pb-1">
            <h3 className="font-cairo text-lg font-extrabold tracking-tight text-gray-900 leading-none mb-1.5 pr-1">
              عملية ناجحة
            </h3>
            <p className="font-cairo text-[15px] font-semibold leading-snug text-gray-600 pr-1">
              {message}
            </p>
          </div>

          <button
            onClick={() => sonnerToast.dismiss(t)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-500/5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 mt-1 cursor-pointer"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    ));
  },

  error: (message: string) => {
    sonnerToast.custom((t) => (
      <div 
        dir="rtl"
        className="group relative flex w-[380px] overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-2xl p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_50px_-12px_rgba(244,63,94,0.3)]"
      >
        <div className="absolute -inset-2 bg-linear-to-r from-rose-400 to-red-500 opacity-10 blur-xl transition-opacity duration-500 group-hover:opacity-30 pointer-events-none" />
        
        <div className="relative flex w-full items-start gap-4 pointer-events-auto">
          
          <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[1rem] bg-linear-to-br from-[#fb7185] to-[#ef4444] shadow-inner mb-auto mt-auto">
             <div className="absolute inset-0 rounded-[1rem] bg-white opacity-20 animate-pulse" />
             <ShieldAlert className="h-6 w-6 text-white drop-shadow-md relative z-10 animate-[bounce_1.5s_infinite]" strokeWidth={2.5} />
          </div>

          <div className="flex flex-1 flex-col pt-1.5 pb-1">
            <h3 className="font-cairo text-lg font-extrabold tracking-tight text-gray-900 leading-none mb-1.5 pr-1">
              تنبيه هام!
            </h3>
            <p className="font-cairo text-[15px] font-semibold leading-snug text-gray-600 pr-1">
              {message}
            </p>
          </div>

          <button
            onClick={() => sonnerToast.dismiss(t)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-500/5 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-500 mt-1 cursor-pointer"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    ));
  },
  
  info: sonnerToast.info,
  warning: sonnerToast.warning,
  loading: sonnerToast.loading,
  dismiss: sonnerToast.dismiss,
};
