import { CalendarCheck, Tag } from "lucide-react";
import Image from "next/image";
import videoThumb from "@/public/images/video-thumb.png";
import PriceRequestSectionForm from "@/components/ui/price-request-section/PriceRequestSectionForm";

export default function PriceRequestSection() {
  const steps = [
    "ستطلب ولن تبحث وستوفر عنا البحث",
    "ستكشف سعر السوق للخدمة التي تبحث عنها",
    "ستتصفح السيرة الذكية للمشتغلين الجاهزين لخدمتك",
    "ستختار السعر و المشتغل الانسب لك بكل ثقه وراحه بال",
  ];

  return (
    <section className="py-2 lg:py-4 mt-16 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-4">
            لماذا طلب عرض سعر افضل؟
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          dir="ltr"
        >
          <div className="space-y-7">
            <PriceRequestSectionForm />

            <div className="grid grid-cols-2 gap-6 py-10">
              <div className="  relative bg-white rounded-2xl p-6 text-center shadow-sm border  border-border hover:shadow-md transition-shadow">
                <div className="w-14 h-86  mx-auto mb-4 flex items-center justify-center">
                  <CalendarCheck
                    className="w-20 h-20 text-primary"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-dark absolute top-[62%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[24px]">
                  توفير الوقت
                </h3>
              </div>

              <div className="bg-white  relative rounded-2xl p-6 text-center shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-14 h-86 mx-auto mb-4 flex items-center justify-center">
                  <Tag className="w-20 h-20 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-dark absolute top-[64%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[24px]">
                  تكشف اسعار السوق
                </h3>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-primary  text-[40px] mb-4 block">
              معلومات
            </span>

            <h2 className="text-3xl lg:text-5xl font-bold text-gray-dark mb-2 leading-tight">
              لماذا طلب عرض السعر..؟
            </h2>

            <div className="w-16 h-1 bg-primary mb-2 rounded-full ml-auto" />
            <div className="w-16 h-1 bg-primary mb-6 rounded-full ml-auto mr-2" />

            <ul className="space-y-4 mb-12">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-end gap-3 text-gray-medium text-[24px] leading-relaxed"
                  dir="rtl"
                >
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            {/* Video Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <Image
                src={videoThumb}
                alt="Video thumbnail"
                width={600}
                height={340}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
