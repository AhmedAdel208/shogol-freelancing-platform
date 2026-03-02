import { toast as sonnerToast } from "sonner";
import { Check, X, Bell, ShieldAlert, BadgeCheck } from "lucide-react";

export const toast = {
  success: (message: string) => {
    sonnerToast.custom((t) => (
      <div 
        dir="rtl"
        className="group relative flex min-w-[320px] max-w-[420px] overflow-hidden rounded-[20px] bg-emerald-500 p-1 shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)] transition-all animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <div className="flex w-full items-center gap-4 bg-emerald-500 px-5 py-4 rounded-[19px]">
          {/* Icon Section */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
             <Check className="h-6 w-6 text-white" strokeWidth={3} />
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <BadgeCheck size={16} className="text-emerald-100" />
              <h3 className="font-cairo text-[17px] font-black text-white leading-tight">
                تمت العملية بنجاح
              </h3>
            </div>
            <p className="font-cairo text-[14px] font-bold text-emerald-50 text-opacity-90 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => sonnerToast.dismiss(t)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    ));
  },

  error: (message: string) => {
    sonnerToast.custom((t) => (
      <div 
        dir="rtl"
        className="group relative flex min-w-[320px] max-w-[420px] overflow-hidden rounded-[20px] bg-rose-500 p-1 shadow-[0_20px_40px_-12px_rgba(244,63,94,0.3)] transition-all animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <div className="flex w-full items-center gap-4 bg-rose-500 px-5 py-4 rounded-[19px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
             <ShieldAlert className="h-6 w-6 text-white" strokeWidth={3} />
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <Bell size={16} className="text-rose-100" />
              <h3 className="font-cairo text-[17px] font-black text-white leading-tight">
                حدث خطأ ما
              </h3>
            </div>
            <p className="font-cairo text-[14px] font-bold text-rose-50 text-opacity-90 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={() => sonnerToast.dismiss(t)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
          >
            <X className="h-4 w-4" strokeWidth={3} />
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
