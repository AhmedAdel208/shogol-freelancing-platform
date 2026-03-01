import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import shogolbg from "@/public/images/shogolbg.png";
import Image from "next/image";
import { HERO_STATS } from "@/data/heroStats";

export default function NewHero() {
  return (
    <section
      dir="rtl"
      className="relative min-h-[95vh] flex flex-col overflow-hidden font-cairo"
    >
      {/* Background Image */}
      <Image
        src={shogolbg}
        alt="منصة شغل - خلفية"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/60" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/80" />
      <div className="absolute inset-0 bg-linear-to-l from-primary/10 via-transparent to-teal-900/30" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/3 w-125 h-125 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-100 h-100 bg-teal-400/10 rounded-full blur-[130px] animate-pulse" />

      {/* Content */}
      <div className="relative flex-1 flex tex  items-center">
        <div className="w-full max-w-7xl mx-auto text-center px-6 md:px-16 py-28 md:py-36">
          <div className="max-w-3xl mx-auto space-y-9">
            {/* Badge */}
            <div className="inline-flex items-center  gap-2.5 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-bold animate-fadeInUp">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping shrink-0" />
              الجيل القادم من منصات العمل الحر
            </div>

            {/* Headline */}
            <div className="animate-fadeInUp animation-delay-100">
              <h1 className="font-black leading-[1.05] tracking-tight text-[32px] md:text-[44px] lg:text-[56px]">
                <span className="text-white block">منصة شغل</span>
              </h1>
              <p className="text-white mx-auto text-lg font-medium leading-relaxed mt-6 max-w-xl">
                منصة شُغل تجمع بين نُخبة المستقلين وأصحاب المشاريع الطموحة في
                بيئة عمل ذكية، آمنة، ومحفزة للنجاح.
              </p>
            </div>

            {/* Search */}
            <div className="animate-fadeInUp animation-delay-200">
              <div className="relative group">
                <div className="absolute -inset-px bg-linear-to-l from-primary to-teal-400 rounded-[18px] blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-2 pr-5 gap-2">
                  <input
                    type="text"
                    placeholder={`ابحث عن:...`}
                    dir="rtl"
                    className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder:text-slate-400 text-right min-w-0 font-medium"
                  />
                  <Link href="/workers">
                    <button className="bg-primary text-white w-11 h-11 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 shrink-0 active:scale-95">
                      <Search size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 ">
              <Link href="/announcements" className="flex-1 sm:flex-none">
                <button className="relative w-full sm:w-auto group overflow-hidden px-9 py-4 rounded-[14px] font-black text-base text-white cursor-pointer shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                  <div className="absolute inset-0 bg-linear-to-l from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradientShift_3s_linear_infinite]" />
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
