"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface TermSection {
  id: string;
  title: string;
  content: string[];
}

const termsData: TermSection[] = [
  {
    id: "introduction",
    title: "مقدمة",
    content: [
      "مرحباً بك في منصة شوغول للعمل الحر",
      "هذه الشروط والأحكام تحكم استخدامك لمنصتنا وخدماتنا",
      "باستخدامك للمنصة، فإنك توافق على هذه الشروط بالكامل",
      "يجب قراءة هذه الشروط بعناية قبل استخدام المنصة"
    ]
  },
  {
    id: "registration",
    title: "شروط التسجيل",
    content: [
      "يجب أن تكون قد بلغت السن القانونية للتسجيل في المنصة",
      "يجب تقديم معلومات دقيقة وحقيقية عند التسجيل",
      "أنت مسؤول عن سرية حسابك وكلمة المرور الخاصة بك",
      "يحظر إنشاء أكثر من حساب واحد لنفس المستخدم"
    ]
  },
  {
    id: "platform-usage",
    title: "شروط استخدام المنصة",
    content: [
      "يجب استخدام المنصة للأغراض المشروعة فقط",
      "يحظر نشر محتوى غير لائق أو مخالف للقوانين",
      "يجب احترام المستخدمين الآخرين والتعامل بأدب",
      "يحظر استخدام المنصة للأنشطة الاحتيالية أو المضللة"
    ]
  },
    {
    id: "payment-commission",
    title: "شروط الدفع والعمولة",
    content: [
      "تتقاضى شوغول عمولة على كل معاملة تتم عبر المنصة",
      "نسبة العمولة محددة في سياسة العمولة الخاصة بالمنصة",
      "يجب الدفع عبر الطرق المعتمدة في المنصة فقط",
      "يتم تحرير الأموال بعد إكمال المشروع وتقييم الطرفين"
    ]
  },
  {
    id: "intellectual-property",
    title: "محتوى الملكية الفكرية",
    content: [
      "يحتفظ أصحاب المشاريع بحقوق الملكية الفكرية لأعمالهم",
      "يجب الحصول على إذن قبل استخدام محتوى الآخرين",
      "المنصة ليست مسؤولة عن انتهاك حقوق الملكية الفكرية",
      "يمكن للمنصة إزالة المحتوى المنتهك للحقوق"
    ]
  },
  {
    id: "usage-policy",
    title: "سياسة حد الاستخدام",
    content: [
      "يوجد حد أقصى لعدد المشاريع التي يمكن نشرها شهرياً",
      "يوجد حد أقصى لحجم الملفات التي يمكن رفعها",
      "يتم مراقبة الاستخدام المفرط الذي قد يؤثر على أداء المنصة",
      "يمكن تعديل حدود الاستخدام وفقاً لخطة المستخدم"
    ]
  },
  {
    id: "service-termination",
    title: "إنهاء الخدمة",
    content: [
      "يمكنك إغلاق حسابك في أي وقت من إعدادات الملف الشخصي",
      "تحتفظ المنصة بحق إيقاف الحسابات المخالفة للشروط",
      "يتم إشعار المستخدم قبل إيقاف الحساب (في معظم الحالات)",
      "يمكن استئناف قرار إيقاف الحساب عبر التواصل مع الدعم"
    ]
  }
];

export default function TermsOfUseContent() {
  const [expanded, setExpanded] = useState<string>("introduction");
  const router = useRouter();

  const toggle = (id: string) => {
    setExpanded(prev => (prev === id ? "" : id));
  };

  const handleContactSupport = () => {
    router.push("/contact");
  };

  return (
    <div className="relative max-w-5xl mx-auto px-6 py-20">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          شروط الاستخدام
        </h1>
        <p className="text-gray-400 text-lg">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6">
        {termsData.map((section, index) => {
          const isOpen = expanded === section.id;

          return (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl"
            >
              {/* Header Button */}
              <motion.button
                onClick={() => toggle(section.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-right group"
              >
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {section.title}
                </h3>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                >
                  <ChevronDown />
                </motion.div>
              </motion.button>

              {/* Animated Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                      className="px-8 pb-8 space-y-4 text-gray-300"
                    >
                      {section.content.map((item, i) => (
                        <motion.li
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="flex items-start"
                        >
                          <span className="text-blue-400 ml-3 mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 text-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">
          هل لديك أسئلة؟
        </h2>
        <p className="text-gray-400 mb-8">
          إذا كان لديك أي استفسارات حول شروط الاستخدام، لا تتردد في التواصل معنا
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleContactSupport}
          className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-xl transition-all duration-300"
        >
          تواصل مع الدعم
        </motion.button>
      </motion.div>
    </div>
  );
}