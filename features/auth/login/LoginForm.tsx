"use client";
import shogol from "@/public/images/shogol.png";
import { Mail } from "lucide-react";
import { FormInput, PasswordInput, Button } from "@/container/reusable/form";
import Link from "next/link";
import Image from "next/image";

import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <section className="py-12 lg:py-16 bg-bg min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {/* Logo Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full  flex items-center justify-center text-white text-3xl font-bold animate-bounce duration-2000">
            <Image
              src={shogol}
              alt="logo"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 space-y-2 animate-in fade-in slide-in-from-top-4 delay-300 duration-700 fill-mode-both">
          <h1 className="text-3xl font-extrabold text-dark tracking-tight">
            تسجيل الدخول
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 lg:p-10 border border-gray-100 relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500">
          {/* Decorative background pulse */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <FormInput
              label="البريد الإلكتروني أو رقم الجوال"
              type="text"
              placeholder="أدخل البريد الإلكتروني أو رقم الجوال"
              icon={<Mail className="w-5 h-5 text-primary/70" />}
              registration={register("EmailOrPhone")}
              error={errors.EmailOrPhone?.message}
            />

            <div className="space-y-1">
              <PasswordInput
                label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                registration={register("password")}
                error={errors.password?.message}
              />
              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-primary text-sm font-bold hover:text-dark transition-colors "
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري الدخول...</span>
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative my-8 text-center animate-in fade-in delay-500 duration-1000 fill-mode-both">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 bg-white text-gray-400 text-sm font-medium">
              أو
            </span>
          </div>

          {/* Register Link */}
          <div className="text-center animate-in fade-in delay-700 duration-1000 fill-mode-both">
            <span className="text-gray-medium font-medium">
              ليس لديك حساب؟{" "}
            </span>
            <Link
              href="/signup"
              className="text-primary font-extrabold hover:text-dark transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-dark hover:after:w-full after:transition-all pointer-events-auto"
            >
              سجل الآن
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
