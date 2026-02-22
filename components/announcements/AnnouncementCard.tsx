import Image from "next/image";
import Link from "next/link";
import {
  Star,
  User,
  Calendar,
  CreditCard,
  Heart,
  MapPin,
  Timer,
} from "lucide-react";
import { Service } from "@/types/services";

interface AnnouncementCardProps {
  service: Service;
}

export default function AnnouncementCard({ service }: AnnouncementCardProps) {
  return (
    <Link href={`/announcements/${service.id}`}>
      <div className="bg-white w-full rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row h-auto mb-6 cursor-pointer">
        {/* Image Container - Left Side */}
        <div className="relative w-full md:w-60 h-40 md:h-48 shrink-0 overflow-hidden group">
          <Image
            src={service.AnnouncementsImage}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 hidden group-hover:block transition-opacity">
            <Heart className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Content - Right Side */}
        <div className="flex-1 flex flex-col p-3 md:p-4 text-right w-full">
          {/* Header with Badge and Author */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 relative bg-linear-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Image src={service.personImage} alt={service.author} fill className="rounded-md object-cover" priority />
              </div>
              <span className="text-xs md:text-sm text-gray-dark font-medium">
                {service.author}
              </span>
            </div>
            {/* <div
              className={`${service.badgeColor} text-white text-xs px-3 py-1 rounded-full`}
            >
              {service.badge}
            </div> */}

            {/* Rating and Duration */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-light">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{service.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-medium text-gray-dark">
                  {service.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-base md:text-lg font-bold text-gray-dark mb-2 line-clamp-2">
            {service.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-medium mb-4 line-clamp-2 grow">
            {service.description}
          </p>

          {/* Footer with Price and Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-1 gap-3">
            <div className="flex items-center gap-2">
              <MapPin
                size={32}
                color="black"
                strokeWidth={4}
                className="w-4 h-4 md:w-5 md:h-5"
              />
              <p className="font-bold text-gray-dark text-xs md:text-sm">
                {service.location}
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-4 text-primary font-bold text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
                <span>{service.price}</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer size={16} className="w-3 h-3 md:w-5 md:h-5" />
                <div className="hidden sm:block">{service.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
