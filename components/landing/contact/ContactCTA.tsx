"use client";

import Link from "next/link";
import { MessageSquare, ArrowLeft } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-16 md:py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-primary/3 rounded-[48px] p-8 md:p-16 text-center group border border-primary/10 shadow-[0_30px_60px_rgba(30,170,173,0.05)]">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-60" />
          
          <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6 ring-1 ring-primary/20 animate-bounce-slow shadow-sm">
              <MessageSquare size={40} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-cairo leading-tight">
              لديك <span className="text-primary italic">استفسار</span> أو تحتاج لمساعدة؟
            </h2>
            
            <p className="text-slate-600 font-bold font-cairo text-lg md:text-xl leading-relaxed">
              فريقنا متواجد دائماً للرد على أسئلتك وتقديم الدعم اللازم لك. لا تتردد في التواصل معنا في أي وقت.
            </p>
            
            <Link href="/contact" className="w-full md:w-auto">
              <button className="group cursor-pointer relative px-12 py-5 bg-primary text-white rounded-[24px] font-black font-cairo text-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 w-full md:w-auto">
                تواصل معنا الآن
                <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
          
          {/* Subtle Border Glow */}
          <div className="absolute inset-0 ring-1 ring-primary/10 rounded-[48px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
