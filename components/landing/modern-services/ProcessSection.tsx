"use client";

import { CheckCircle2, Search, Send, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.15,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

import { useUiStore } from "@/stores/useUiStore";

export default function ProcessSection() {
  const { processAnimationPlayed, setProcessAnimationPlayed } = useUiStore();
  const steps = [
    {
      icon: <Send className="w-8 h-8" />,
      title: "اطرح مشروعك",
      desc: "صف احتياجاتك بدقة وسرعة في أقل من دقيقة لنصلك بأفضل المبدعين في وقت قياسي.",
      color: "bg-blue-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "تلقَ العروض",
      desc: "استعرض عروض الأسعار من نخبة المستقلين، وقارن بين السير الذاتية والأعمال السابقة.",
      color: "bg-primary",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "اختر الأنسب",
      desc: "بكل ثقة وراحة بال، اختر المستقل الذي يناسب ميزانيتك وتطلعاتك لبدء العمل فوراً.",
      color: "bg-teal-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "استلم مشروعك",
      desc: "تواصل مع المستقل مباشرة، وتابع سير العمل حتى تستلم مشروعك بجودة تفوق التوقعات.",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden select-none">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <motion.div
          className="space-y-4 mb-20"
          variants={sectionVariants}
          initial={processAnimationPlayed ? "visible" : "hidden"}
          whileInView="visible"
          onViewportEnter={() => setProcessAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-500 shadow-sm mb-12"
          >
            <Sparkles size={18} className="text-primary" />
            <span className="text-sm font-black font-cairo">
              سهولة، سرعة، وكفاءة غير مسبوقة
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-[36px] md:text-[50px] font-black text-slate-900 font-cairo leading-tight tracking-tight"
          >
            رحلة النجاح مع شُغل تبدأ{" "}
            <span className="text-primary italic">بأربع خطوات</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {/* Animated Connecting Path (Desktop) */}
          <motion.div
            className="hidden lg:block absolute top-[50px] right-[10%] left-[10%] h-0.5 bg-linear-to-r from-transparent via-slate-200 to-transparent -z-10 origin-right"
            variants={lineVariants}
            initial={processAnimationPlayed ? "visible" : "hidden"}
            whileInView="visible"
            onViewportEnter={() => setProcessAnimationPlayed(true)}
            viewport={{ once: true, amount: 0.5 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial={processAnimationPlayed ? "visible" : "hidden"}
              whileInView="visible"
              onViewportEnter={() => setProcessAnimationPlayed(true)}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col items-center group"
              dir="rtl"
            >
              {/* Step Number Dot */}
              <div className="absolute -top-4 -right-2 w-8 h-8 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center font-black text-slate-300 text-xs shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                0{i + 1}
              </div>

              {/* Icon Container */}
              <div
                className={`w-24 h-24 ${step.color} rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-primary/20 mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ring-8 ring-white/50 border border-white/20`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-800 font-cairo group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-base font-bold font-cairo text-slate-400 leading-relaxed max-w-[240px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>
              </div>

              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-linear-to-b from-white to-transparent opacity-0 group-hover:opacity-100 -z-10 rounded-[40px] blur-2xl transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
