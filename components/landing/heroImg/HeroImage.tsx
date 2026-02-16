import Image from "next/image";
import Link from "next/link";
import heroImg from "@/public/images/hero.png";
import { Settings2, Clock, Briefcase, Award } from "lucide-react";

export default function HeroImage() {
  const features = [
    { icon: Award, label: "مفهوم جديد" },
    { icon: Briefcase, label: "حرية في التعامل" },
    { icon: Clock, label: "تنمين للوقت" },
    { icon: Settings2, label: "شمولية في الخدمات" },
  ];

  return (
    <section className="relative w-full h-167.5 overflow-hidden bg-dark p-4 mt-8 rounded-br-[210px] ">
      <Image src={heroImg} alt="Hero" fill className="object-cover " priority />
      <div className="absolute inset-0  bg-dark/40 " />

      <div className="relative z-10 max-w-8xl mx-auto h-full flex flex-col justify-center items-start text-right">
        <h1 className="text-white text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 leading-tight">
          منصة شغل
        </h1>

        <p className="text-white/95 text-lg xl:text-xl 2xl:text-2xl leading-relaxed max-w-2xl mb-10 font-light">
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
          القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة
          التي يقرأها
        </p>

        <Link href="about">
          <button className="bg-white text-dark px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 mb-16 shadow-lg cursor-pointer">
            عن المنصة
          </button>
        </Link>

        {/* Bottom Features */}
        <div className="absolute bottom-12 right-0 left-0 ">
          <div className="flex items-center justify-start gap-12 xl:gap-16">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-white">
                <span className="text-base xl:text-lg font-medium">
                  {feature.label}
                </span>
                <feature.icon
                  className="w-6 h-6 xl:w-7 xl:h-7 text-white"
                  strokeWidth={2.5}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
