"use client";

import shogol from "@/public/images/shogol.png";
import { Mail, LogIn, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { FormInput, PasswordInput, Button } from "@/container/reusable/form";
import Link from "next/link";
import Image from "next/image";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <section className="relative py-12 lg:py-24 bg-slate-50/50 min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-teal-400/5 rounded-full blur-[100px] animate-pulse delay-700" />
      
      <div className="w-full max-w-[480px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group mb-6">
            <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-2xl shadow-primary/10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <Image
                src={shogol}
                alt="logo"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            {/* Animated Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse scale-75" />
            <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={20} />
          </div>
          
          <h1 className="text-4xl font-black font-cairo text-gray-900 tracking-tight">
            مرحباً <span className="text-primary">بعودتك!</span>
          </h1>
          <p className="text-slate-500 font-medium font-cairo mt-2 text-lg">سجل دخولك لمتابعة أعمالك</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.08)] border border-white/60 p-8 lg:p-12 relative overflow-hidden group hover:shadow-[0_45px_100px_-30px_rgba(0,0,0,0.1)] transition-all duration-700">
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <FormInput
              label="البريد الإلكتروني أو رقم الجوال"
              type="text"
              placeholder="أدخل البريد أو الرقم"
              icon={<Mail className="w-5 h-5 text-primary/70" />}
              registration={register("EmailOrPhone")}
              error={errors.EmailOrPhone?.message}
            />

            <div className="space-y-4">
              <PasswordInput
                label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                registration={register("password")}
                error={errors.password?.message}
              />
              <div className="text-left">
                <Link
                  href="/forgot-password"
                  className="text-slate-400 text-sm font-bold font-cairo hover:text-primary transition-colors flex items-center justify-end gap-1"
                >
                  <span>نسيت كلمة المرور؟</span>
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-[22px] font-black font-cairo text-lg shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover:bg-size-[100%_auto] transition-all" />
              
              <div className="relative py-5 px-8 text-white flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري التحقق...</span>
                  </>
                ) : (
                  <>
                    <span>تسجيل الدخول</span>
                    <LogIn size={20} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
     
          </div>

          {/* Social / Alternative Links - Placeholder for now but styled */}
          <div className="text-center">
            <p className="text-slate-500 font-medium font-cairo mb-4">ليس لديك حساب؟</p>
            <Link
              href="/signup"
              className="group relative inline-flex items-center gap-2 bg-slate-50 hover:bg-primary/5 px-8 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="text-primary font-black font-cairo text-lg">سجل الآن</span>
              <ArrowRight size={18} className="text-primary transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
