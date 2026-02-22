import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Calendar,
  CreditCard,
  MapPin,
  Timer,
  Heart,
} from "lucide-react";
import { services } from "@/data/mockDataServiceSection";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

interface AnnouncementDetailPageProps {
  params: {
    id: string;
  };
}

export default function AnnouncementDetailPage({
  params,
}: AnnouncementDetailPageProps) {
  const service = services.find((s) => s.id === parseInt(params.id));

  if (!service) {
    return (
      <div className="bg-white min-h-screen w-full">
        <Gradientline />
        <LinksHeader />
        <div className="px-4 md:px-6 lg:px-8 max-w-8xl mx-auto min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
              الخدمة غير موجودة
            </h1>
            <p className="text-gray-medium mb-6">
              للأسف، لم نتمكن من العثور على الخدمة المطلوبة.
            </p>
            <Link
              href="/announcements"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للإعلانات
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />

      <section className="px-4 md:px-6 lg:px-8 max-w-8xl mx-auto py-8 md:py-12 lg:py-16">
        {/* Back Button */}
        <Link
          href="/announcements"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          العودة للإعلانات
        </Link>

        {/* Main Card Detail */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border">
          {/* Image Section */}
          <div className="relative w-full h-64 md:h-96 lg:h-125 overflow-hidden group">
            <Image
              src={service.AnnouncementsImage}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button className="absolute top-4 right-4 bg-white rounded-full p-3 hover:bg-gray-100 transition-colors shadow-md">
              <Heart className="w-6 h-6 text-primary" />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Header with Author */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="w-14 h-14 md:w-16 md:h-16 relative bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Image
                  src={service.personImage}
                  alt={service.author}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg md:text-xl font-bold text-gray-dark">
                  {service.author}
                </h3>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-gray-dark">
                    {service.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark mb-4 text-right">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-medium mb-8 text-right leading-relaxed">
              {service.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
              <div className="bg-bg rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-medium">الموقع</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
                  {service.location}
                </p>
              </div>

              <div className="bg-bg rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-medium">المدة</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
                  {service.duration}
                </p>
              </div>

              <div className="bg-bg rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-medium">السعر</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-primary text-right">
                  {service.price}
                </p>
              </div>

              <div className="bg-bg rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Timer className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-medium">الفئة</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
                  {service.badge}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 bg-primary text-white py-3 md:py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors">
                تواصل مع المشتغل
              </button>
              <button className="flex-1 border-2 border-primary text-primary py-3 md:py-4 rounded-lg font-bold text-lg hover:bg-primary/5 transition-colors">
                حفظ الخدمة
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
