"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  Wallet,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/data/mockDataServiceSection";
import { motion } from "framer-motion";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// ── Animation Variants ──────────────────────────────────────
const sectionHeader = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const whyBoxVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2 + i * 0.12,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

import { useUiStore } from "@/stores/useUiStore";

export default function ModernServices() {
  const { servicesAnimationPlayed, setServicesAnimationPlayed } = useUiStore();

  return (
    <section className="py-24 bg-white select-none overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16"
          dir="rtl"
          variants={sectionHeader}
          initial={servicesAnimationPlayed ? "visible" : "hidden"}
          whileInView="visible"
          onViewportEnter={() => setServicesAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp} className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-black font-cairo tracking-widest">
              <Sparkles size={14} className="animate-pulse" />
              الخدمات الأكثر طلباً
            </div>
            <h2 className="text-[38px] md:text-[48px] font-black text-slate-900 font-cairo leading-tight">
              استكشف أفضل <span className="text-primary">الخدمات</span>
              <br />
              التي تقدمها منصة شُغل
            </h2>
            <p className="text-slate-500 font-bold font-cairo text-lg leading-relaxed">
              نخبة من المستقلين المبدعين جاهزون لتحويل أفكارك إلى واقع ملموس
              بدقة عالية وميزانية تناسب تطلعاتك.
            </p>
          </motion.div>

          <motion.div variants={slideInRight}>
            <Link href="/workers">
              <button className="hidden md:flex cursor-pointer items-center gap-3 px-8 py-4 bg-slate-50 border border-slate-200 rounded-[20px] text-slate-700 font-black font-cairo text-base hover:bg-white hover:border-primary/20 hover:text-primary transition-all duration-300 group">
                استكشف كافة الخدمات
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Services Slider */}
        <motion.div
          className="relative mb-16"
          dir="rtl"
          variants={scaleUp}
          initial={servicesAnimationPlayed ? "visible" : "hidden"}
          whileInView="visible"
          onViewportEnter={() => setServicesAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-16"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <Link
                  href="/workers"
                  className="group block relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 h-full cursor-pointer"
                >
                  {/* Image Area */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Float Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-black/5 border border-white/20">
                        <Star
                          size={14}
                          className="text-amber-400 fill-amber-400"
                        />
                        <span className="text-[12px] font-black font-cairo text-slate-800">
                          {service.rating}
                        </span>
                        <div className="bg-emerald-500 text-white rounded-full p-px ml-0.5 shadow-sm">
                          <CheckCircle2 size={10} strokeWidth={4} />
                        </div>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[11px] font-black font-cairo shadow-lg shadow-primary/20">
                        {service.badge}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-[12px] bg-slate-50 border border-slate-100 overflow-hidden relative shadow-sm">
                        {service.personImage ? (
                          <Image
                            src={service.personImage}
                            alt={service.author}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <User
                            size={20}
                            className="text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-black font-cairo text-slate-900 leading-tight">
                          {service.author}
                        </h4>
                        <p className="text-[10px] font-bold font-cairo text-slate-400">
                          مستقل معتمد
                        </p>
                      </div>
                    </div>

                    <h3 className="text-[19px] font-black font-cairo text-slate-800 mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm font-bold font-cairo text-slate-500 leading-relaxed line-clamp-2 mb-6 h-10">
                      {service.description}
                    </p>

                    {/* Footer Metrics */}
                    <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary font-black font-cairo">
                        <Wallet size={16} />
                        <span className="text-lg">{service.price}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400 font-bold font-cairo text-xs">
                        <Clock size={14} />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/40 rounded-[32px] transition-all duration-500 pointer-events-none" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-sm z-10">
              <ArrowLeft size={20} />
            </button>
            <div className="swiper-pagination-custom w-fit! static! flex gap-2"></div>
            <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer shadow-sm z-10">
              <ArrowLeft size={20} className="rotate-180" />
            </button>
          </div>
        </motion.div>

        {/* Mobile View CTA */}
        <motion.div
          className="flex md:hidden justify-center"
          dir="rtl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/services" className="w-full">
            <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black font-cairo text-lg shadow-xl active:scale-95 transition-all">
              استكشف كافة الخدمات
            </button>
          </Link>
        </motion.div>

        {/* Why Shogol Info Box (Premium Light Design) */}
        <motion.div
          className="mt-24 p-16 bg-slate-50 rounded-[50px] relative overflow-hidden group border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
          dir="rtl"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.7, 
                ease: [0.25, 0.4, 0.25, 1] as const 
              }
            }
          }}
          initial={servicesAnimationPlayed ? "visible" : "hidden"}
          whileInView="visible"
          onViewportEnter={() => setServicesAnimationPlayed(true)}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-50" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              className="lg:col-span-4 space-y-4"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: 0.2, 
                    ease: [0.25, 0.4, 0.25, 1] as const 
                  }
                }
              }}
              initial={servicesAnimationPlayed ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary mb-6 ring-1 ring-primary/20 shadow-sm">
                <UserCheck size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 font-cairo leading-tight">
                لماذا تختار{" "}
                <span className="text-primary italic">شُغل؟</span>
              </h3>
              <p className="text-slate-500 font-bold font-cairo text-lg leading-relaxed">
                نحن لا نوفر منصة عمل فقط، بل نبني علاقات مهنية ناجحة بين
                المبدعين وأصحاب الأعمال.
              </p>
            </motion.div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <ShieldCheck size={24} />,
                  title: "أمان كامل لبياناتك",
                  desc: "نستخدم أحدث تقنيات التشفير لضمان سرية معلوماتك المالية والشخصية.",
                },
                {
                  icon: <Sparkles size={24} />,
                  title: "جودة احترافية",
                  desc: "نخبة من المستقلين الذين تم اختيارهم بعناية لضمان أعلى جودة في التنفيذ.",
                },
                {
                  icon: <Wallet size={24} />,
                  title: "دفعات آمنة",
                  desc: "نظام حماية الدفعات يضمن حقوق الطرفين حتى إتمام العمل بنجاح.",
                },
                {
                  icon: <ArrowUpRight size={24} />,
                  title: "دعم فني 24/7",
                  desc: "فريق دعم متخصص متواجد دائماً لمساعدتك في أي وقت وبكل احترافية.",
                },
              ].map((box, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={whyBoxVariants}
                  initial={servicesAnimationPlayed ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-4 ring-1 ring-primary/10">
                    {box.icon}
                  </div>
                  <h4 className="text-slate-900 font-black font-cairo text-lg mb-2">
                    {box.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-bold font-cairo leading-relaxed">
                    {box.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
