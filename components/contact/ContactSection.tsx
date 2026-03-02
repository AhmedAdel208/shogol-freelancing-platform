

import ContactForm from "./ContactForm";


import { Sparkles } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="relative pb-24 select-none">
      {/* Premium Header Section */}
      <div className="relative bg-slate-900 overflow-hidden py-24 mb-16">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />
        
        <div className="relative container mx-auto px-6 text-center" dir="rtl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-primary text-xs font-black font-cairo tracking-widest mb-6">
            <Sparkles size={14} className="animate-pulse" />
            فريقنا في خدمتك
          </div>
          
          <h1 className="text-[40px] md:text-[56px] font-black text-white font-cairo leading-tight mb-6">
            تواصل <span className="text-primary italic">معنا</span>
          </h1>
          
          <p className="text-slate-400 font-bold font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك والإجابة على استفساراتك. تواصل معنا عبر أي من الوسائل التالية وسنرد عليك في أقرب وقت ممكن.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto max-w-5xl px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1  gap-8 items-stretch">
      
         
            <ContactForm />
          
        </div>
      </div>
    </div>
  );
}
