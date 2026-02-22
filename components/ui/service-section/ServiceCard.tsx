import Image from "next/image";
import { Star, User, Calendar, CreditCard } from "lucide-react";
import { services } from "@/data/mockDataServiceSection";

export default function ServiceCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow duration-300"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
          <div
            className={`${service.badgeColor} text-white text-sm px-2 py-1 text-center rounded`}
          >
            {service.badge}
          </div>

          {/* Meta Info Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-border">
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium text-gray-dark">
                {service.rating}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-dark font-medium">
                  {service.author}
                </span>
                <div className="w-6 h-6 bg-gray-medium rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 text-right">
            <h3 className="text-gray-dark font-bold text-lg mb-3 leading-snug">
              {service.title}
            </h3>
            <p className="text-gray-medium text-sm leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>

            {/* Footer Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="w-4 h-4" />
                <span className=" font-bold text-sm">{service.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <CreditCard className="w-4 h-4" />
                <span className="font-bold text-sm">{service.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
