
import { CheckCircle2, Search, Send, Rocket, Sparkles } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      icon: <Send className="w-8 h-8" />,
      title: "اطرح مشروعك",
      desc: "صف احتياجاتك بدقة وسرعة في أقل من دقيقة لنصلك بأفضل المبدعين في وقت قياسي.",
      color: "bg-blue-500",
      delay: "duration-300"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "تلقَ العروض",
      desc: "استعرض عروض الأسعار من نخبة المستقلين، وقارن بين السير الذاتية والأعمال السابقة.",
      color: "bg-primary",
      delay: "duration-500"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "اختر الأنسب",
      desc: "بكل ثقة وراحة بال، اختر المستقل الذي يناسب ميزانيتك وتطلعاتك لبدء العمل فوراً.",
      color: "bg-teal-500",
      delay: "duration-700"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "استلم مشروعك",
      desc: "تواصل مع المستقل مباشرة، وتابع سير العمل حتى تستلم مشروعك بجودة تفوق التوقعات.",
      color: "bg-indigo-500",
      delay: "duration-1000"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden select-none">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-8xl mx-auto px-6 md:px-12 text-center">
        <div className="space-y-4 mb-20 animate-in fade-in slide-in-from-bottom-6">
           <div className="inline-flex items-center gap-2.5 px-6 py-2  bg-white border border-slate-200 rounded-full text-slate-500 shadow-sm mb-12">
              <Sparkles size={18} className="text-primary" />
              <span className="text-sm font-black font-cairo">سهولة، سرعة، وكفاءة غير مسبوقة</span>
           </div>
           <h2 className="text-[36px] md:text-[50px] font-black text-slate-900 font-cairo leading-tight tracking-tight">
             رحلة النجاح مع شُغل تبدأ <span className="text-primary italic">بأربع خطوات</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {/* Animated Connecting Path (Desktop) */}
          <div className="hidden lg:block absolute top-[50px] right-[10%] left-[10%] h-0.5 bg-linear-to-r from-transparent via-slate-200 to-transparent -z-10" />

          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col items-center group animate-in fade-in fade-in zoom-in-95 ${step.delay}`}
              dir="rtl"
            >
              {/* Step Number Dot */}
              <div className="absolute -top-4 -right-2 w-8 h-8 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center font-black text-slate-300 text-xs shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                 0{i + 1}
              </div>

              {/* Icon Container */}
              <div className={`w-24 h-24 ${step.color} rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-primary/20 mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ring-8 ring-white/50 border border-white/20`}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-800 font-cairo group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-base font-bold font-cairo text-slate-400 leading-relaxed max-w-[240px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>
              </div>

              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-linear-to-b from-white to-transparent opacity-0 group-hover:opacity-100 -z-10 rounded-[40px] blur-2xl transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
