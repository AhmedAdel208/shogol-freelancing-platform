"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "@/common/toast";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import { submitContactForm } from "./contactAction";

const initialState = {
  success: false,
  message: "",
  timestamp: Date.now(),
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <MessageSquare size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-cairo mb-2">أرسل لنا رسالة</h2>
          <p className="text-slate-500 font-bold text-sm font-cairo">نسعد دائماً بالاستماع إليكم والإجابة على استفساراتكم</p>
        </div>
      </div>
      
      <form action={formAction} ref={formRef} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-black text-slate-700 font-cairo mr-1">
              <User size={14} className="text-slate-400" />
              الاسم الكامل
            </label>
            <div className="relative group">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold font-cairo text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-slate-300"
                placeholder="مثال: أحمد محمد"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-black text-slate-700 font-cairo mr-1">
              <Mail size={14} className="text-slate-400" />
              البريد الإلكتروني
            </label>
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold font-cairo text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-slate-300"
                placeholder="example@mail.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="flex items-center gap-2 text-sm font-black text-slate-700 font-cairo mr-1">
             <MessageSquare size={14} className="text-slate-400" />
            الموضوع
          </label>
          <div className="relative group">
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold font-cairo text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-slate-300"
              placeholder="عما تريد الاستفسار؟"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="flex items-center gap-2 text-sm font-black text-slate-700 font-cairo mr-1">
            <MessageSquare size={14} className="text-slate-400" />
            الرسالة
          </label>
          <div className="relative group">
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold font-cairo text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 hover:border-slate-300 resize-none"
              placeholder="اكتب تفاصيل رسالتك هنا..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-14 bg-primary text-white rounded-2xl font-black font-cairo flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>جاري الإرسال...</span>
            </div>
          ) : (
            <>
              <Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              <span>إرسال الرسالة</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
