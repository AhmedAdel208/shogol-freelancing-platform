"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface HelpFAQProps {
  selectedCategory?: string;
}

export default function HelpFAQ({ selectedCategory }: HelpFAQProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "كيف أبدأ استخدام شوغول؟",
      answer: "أنشئ حسابًا ثم أكمل ملفك وابدأ البحث عن المشاريع.",
    },
    {
      id: "2",
      question: "كيف يتم الدفع؟",
      answer: "ندعم البطاقات الائتمانية والتحويل البنكي.",
    },
    { id: "3", question: "كيف يتم الدفع؟", answer: "نحن ندعم طرق دفع متعددة including البطاقات الائتمانية، التحويل البنكي، والمحافظ الإلكترونية.",  },
    { id: "4", question: "هل يمكنني تعديل عرضي بعد إرساله؟", answer: "نعم، يمكنك تعديل عرضك قبل قبوله من العميل. بعد القبول، ستحتاج إلى موافقة العميل لأي تغييرات.",},
    { id: "5", question: "كيف أتواصل مع المستقلين؟", answer: "يمكنك التواصل مع المستقلين من خلال نظام الرسائل المدمج في المنصة بعد قبول عرضهم.",  },
    { id: "6", question: "كيف أحمي حسابي؟", answer: "استخدم كلمة مرور قوية وفعّل المصادقة الثنائية. لا تشارك معلومات حسابك مع أي شخص.",  },
    { id: "7", question: "كيف أغير معلومات ملفي الشخصي؟", answer: "من إعدادات الملف الشخصي، يمكنك تحديث معلوماتك، المهارات، والخبرات في أي وقت.",  }, 
    { id: "8", question: "هل بياناتي آمنة؟", answer: "نعم، نحن نستخدم تشفير SSL لحماية جميع البيانات والمعاملات المالية.",  }, 
    { id: "9", question: "ماذا أفعل إذا واجهت مشكلة فنية؟", answer: "تواصل مع فريق الدعم الفني من خلال مركز المساعدة أو الدردشة الحية.",  }
  ];

  const filtered = useMemo(() => {
    return faqs.filter(
      (f) =>
        f.question.includes(query) ||
        f.answer.includes(query)
    );
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          الأسئلة الشائعة
        </h2>
        <p className="text-gray-400">
          إجابات سريعة للأسئلة الأكثر شيوعاً
        </p>
      </motion.div>

      <div className="space-y-6">
        {filtered.map((faq, index) => {
          const isOpen = expanded === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-sm hover:shadow-xl transition"
            >
              <button
                onClick={() =>
                  setExpanded(isOpen ? null : faq.id)
                }
                className="w-full flex items-center justify-between px-6 py-6 text-right"
              >
                <h3 className="text-lg font-semibold text-white">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-gray-400"
                >
                  <ChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-gray-700"
                  >
                    <div className="px-6 py-6 text-gray-300 bg-gray-800/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}