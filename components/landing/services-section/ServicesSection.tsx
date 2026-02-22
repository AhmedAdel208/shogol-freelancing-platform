import Link from "next/link";
import ServiceCard from "@/components/ui/service-section/ServiceCard";

export default function ServicesSection() {
  return (
    <section
      className="py-12 lg:py-16 px-12  max-w-8xl mx-auto bg-bg"
      dir="ltr"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-primary text-[40px] font-el-missiri mb-3 block">
          بعض الخدمات وظائف شغل
        </span>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-dark leading-tight">
          اهم الخدمات الاحترافية لتطوير وتنمية اعمالك
        </h2>
      </div>

      {/* Services Grid */}
      <ServiceCard />

      {/* CTA Button */}
      <div className="text-center ">
        <Link href="/announcements">
          <button className="bg-primary text-[18px] text-white  px-16 py-4 rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
            عرض الكل
          </button>
        </Link>
      </div>
    </section>
  );
}
