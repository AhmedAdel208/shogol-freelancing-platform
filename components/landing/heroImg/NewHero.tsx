import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import shogolbg from "@/public/images/shogolbg.webp";
import Image from "next/image";
import { HERO_STATS } from "@/data/heroStats";

export default function NewHero() {
  return (
    <section
      dir="rtl"
      className="relative min-h-[90vh] flex flex-col overflow-hidden font-cairo bg-slate-900"
    >
      {/* Background Image */}
      <Image
        src={shogolbg}
        alt="منصة شغل - خلفية"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        priority
        quality={60}
        sizes="100vw"
        placeholder="blur"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-linear-to-l from-primary/10 via-transparent to-teal-900/60" />

 

      {/* Content */}
      <div className="relative flex-1 flex tex  items-center">
        <div className="w-full max-w-7xl mx-auto text-center px-6 md:px-16 py-28 md:py-36">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center  gap-2.5 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-bold ">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping shrink-0" />
              الجيل القادم من منصات العمل الحر
            </div>

            {/* Headline */}
            <div>
              <h1 className=" leading-[1.05] font-extrabold tracking-tight text-[32px] md:text-[48px] lg:text-[62px]">
                <span className="text-white block">منصة شغل</span>
              </h1>
              <p className="text-white mx-auto text-xl font-bold leading-relaxed mt-6 max-w-xl">
                منصة شُغل تجمع بين نخبة المستقلين وأصحاب المشاريع الطموحة في
                بيئة عمل ذكية، آمنة، ومحفزة للنجاح.
              </p>
            </div>

            {/* Search */}
            <div>
              <div className="relative group">
                <div className="absolute -inset-px bg-linear-to-l from-primary to-teal-400 rounded-[18px] blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-2 pr-5 gap-2">
                  <input
                    type="text"
                    placeholder={`ابحث عن خدمة... تصميم - برمجة - ترجمة`}
                    dir="rtl"
                    className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder:text-slate-400 text-right min-w-0 font-medium"
                  />
                  <Link href="/workers">
                    <button className="bg-primary cursor-pointer text-white w-14 h-14 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 shrink-0 active:scale-95">
                      <Search size={24} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 ">
              <Link href="/announcements" className="flex-1 sm:flex-none">
                <button className="relative w-full sm:w-auto group overflow-hidden px-9 py-4 rounded-[14px] font-black text-base text-white cursor-pointer shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                  <div className="absolute  backdrop-blur-sm inset-0 bg-linear-to-l from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradientShift_3s_linear_infinite]" />
                  <div className="relative flex items-center justify-center gap-2">
                    استكشف المشاريع
                  </div>
                </button>
              </Link>

              <Link href="/workers" className="flex-1 sm:flex-none">
                <button className="w-full   cursor-pointer sm:w-auto px-9 py-4 rounded-[14px] font-black text-base text-white bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft
                      size={18}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    استكشف المستقلين
                  </div>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center pt-6 border-t border-white/10 animate-fadeIn animation-delay-400">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1 relative"
                >
                  {i !== 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
                  )}
                  <span className="text-xl md:text-2xl font-black text-white">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
