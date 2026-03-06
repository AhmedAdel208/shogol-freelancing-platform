"use client";

import Link from "next/link";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

import { useUiStore } from "@/stores/useUiStore";

export default function ContactCTA() {
  const { contactAnimationPlayed, setContactAnimationPlayed } = useUiStore();

  return (
    <section className="py-16 md:py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="relative overflow-hidden bg-primary/3 rounded-[48px] p-8 md:p-16 text-center group border border-primary/10 shadow-[0_30px_60px_rgba(30,170,173,0.05)]"
          initial={contactAnimationPlayed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setContactAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.4, 0.25, 1] as const,
          }}
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-60" />

          <motion.div
            className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-8"
            variants={containerVariants}
            initial={contactAnimationPlayed ? "visible" : "hidden"}
            whileInView="visible"
            onViewportEnter={() => setContactAnimationPlayed(true)}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={bounceIn}
              className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6 ring-1 ring-primary/20 shadow-sm"
            >
              <MessageSquare size={40} />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black text-slate-900 font-cairo leading-tight"
            >
              لديك <span className="text-primary italic">استفسار</span> أو
              تحتاج لمساعدة؟
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 font-bold font-cairo text-lg md:text-xl leading-relaxed"
            >
              فريقنا متواجد دائماً للرد على أسئلتك وتقديم الدعم اللازم لك. لا
              تتردد في التواصل معنا في أي وقت.
            </motion.p>

            <motion.div variants={scaleIn}>
              <Link href="/contact" className="w-full md:w-auto">
                <button className="group cursor-pointer relative px-12 py-5 bg-primary text-white rounded-[24px] font-black font-cairo text-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 w-full md:w-auto">
                  تواصل معنا الآن
                  <ArrowLeft
                    size={24}
                    className="group-hover:-translate-x-2 transition-transform"
                  />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Subtle Border Glow */}
          <div className="absolute inset-0 ring-1 ring-primary/10 rounded-[48px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
