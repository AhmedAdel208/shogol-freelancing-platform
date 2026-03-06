"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proposalSchema,
  type ProposalFormData,
  type ProposalFormInput,
} from "@/lib/validation/proposalSchema";
import { Send, Clock, Banknote, FileText, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { useProposal } from "@/hooks/useProposal";
import { ProposalSubmitData } from "@/lib/validation/proposalSchema";
import { useState } from "react";

interface CreateProposalFormProps {
  jobRequestId: string;
  onSuccess?: (proposalId: number) => void;
}

export default function CreateProposalForm({
  jobRequestId,
  onSuccess,
}: CreateProposalFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const proposalMutation = useProposal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProposalFormInput>({
    resolver: zodResolver(proposalSchema),
    mode: "onChange",
    defaultValues: {
      jobRequestId: Number(jobRequestId),
      description: "",
      proposedPrice: "",
      proposedDurationInDays: "",
    },
  });

  const handleFormSubmit = (data: ProposalFormData) => {
    const submitData: ProposalSubmitData = {
      jobRequestId: Number(data.jobRequestId),
      description: data.description,
      proposedPrice: data.proposedPrice,
      proposedDurationInDays: data.proposedDurationInDays,
    };

    proposalMutation.mutate(submitData, {
      onSuccess: (response) => {
        setIsSuccess(true);
        onSuccess?.(response.proposalId);
        reset();
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-[32px] p-12 text-center animate-in fade-in zoom-in duration-700 mt-12 mb-8">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-200 animate-bounce">
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-black text-emerald-900 font-cairo mb-2">تم إرسال عرضك بنجاح!</h3>
        <p className="text-emerald-600 font-bold font-cairo">شكراً لك، سيتم إشعار صاحب المشروع بعرضك فوراً.</p>
      </div>
    );
  }

  return (
    <div id="proposal-form-section" className="bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group">
             <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-right" dir="rtl">
            <h3 className="text-xl font-black text-slate-900 font-cairo tracking-tight">أضف عرضك الآن</h3>
            <p className="text-slate-500 text-sm font-bold font-cairo">ابدأ رحلتك مع هذا العميل بتقديم عرض احترافي</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-7" dir="rtl">
        {/* Description Section */}
        <div className="space-y-3">
          <label className="flex items-center gap-2.5 text-slate-800 font-black font-cairo text-base">
            <FileText size={20} className="text-primary/60" />
            تفاصيل العرض <span className="text-rose-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={6}
            placeholder="اشرح خطة العمل، والمهارات التي تؤهلك لإنجاز المشروع بأفضل صورة..."
            className={`w-full resize-none rounded-2xl border-2 ${errors.description ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50'} p-5 text-[15px] font-bold font-cairo text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 focus:bg-white transition-all duration-300 placeholder:text-slate-300 shadow-inner`}
          />
          {errors.description && (
            <p className="text-rose-500 text-xs font-black font-cairo flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Pricing & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Price Input */}
           <div className="space-y-3">
              <label className="flex items-center gap-2.5 text-slate-700 font-black font-cairo text-sm">
                <Banknote size={18} className="text-primary/60" />
                الميزانية المقترحة
              </label>
              <div className="relative group/field">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register("proposedPrice")}
                  placeholder="0.00"
                  className={`w-full rounded-2xl border-2 ${errors.proposedPrice ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50'} pr-5 pl-12 py-4 text-lg font-black font-cairo text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 focus:bg-white transition-all duration-300 shadow-sm`}
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs font-cairo pointer-events-none group-focus-within/field:text-primary transition-colors">ريـال</div>
              </div>
              {errors.proposedPrice && <p className="text-rose-500 text-[11px] font-black font-cairo">{errors.proposedPrice.message}</p>}
           </div>

           {/* Duration Input */}
           <div className="space-y-3">
              <label className="flex items-center gap-2.5 text-slate-700 font-black font-cairo text-sm">
                <Clock size={18} className="text-primary/60" />
                مدة التنفيذ
              </label>
              <div className="relative group/field">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register("proposedDurationInDays")}
                  placeholder="0"
                  className={`w-full rounded-2xl border-2 ${errors.proposedDurationInDays ? 'border-rose-200 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50'} pr-5 pl-12 py-4 text-lg font-black font-cairo text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 focus:bg-white transition-all duration-300 shadow-sm`}
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs font-cairo pointer-events-none group-focus-within/field:text-primary transition-colors">يـوم</div>
              </div>
              {errors.proposedDurationInDays && <p className="text-rose-500 text-[11px] font-black font-cairo">{errors.proposedDurationInDays.message}</p>}
           </div>
        </div>

        {/* Submit Button Section */}
        <div className="pt-4 flex items-center justify-between gap-6 border-t border-slate-50 mt-4">
           <div className="hidden lg:block">
              <p className="text-slate-400 text-sm font-bold font-cairo">تأكد من مراجعة عرضك جيداً قبل الإرسال.</p>
           </div>
           
           <button
              type="submit"
              disabled={proposalMutation.isPending || !isValid}
              className="w-full lg:w-fit min-w-[240px] relative overflow-hidden bg-primary text-white py-4 px-10 rounded-[20px] font-black font-cairo text-[16px] shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none group/btn cursor-pointer"
           >
              <div className="relative z-10 flex items-center justify-center gap-2.5">
                {proposalMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="rotate-180" />
                    <span>إرسال العرض للعميل</span>
                  </>
                )}
              </div>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
           </button>
        </div>
      </form>
    </div>
  );
}
