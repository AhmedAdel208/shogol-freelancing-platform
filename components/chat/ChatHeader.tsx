"use client";

import { MoreVertical, ArrowRight } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { getImageUrl } from "@/utils/image";

interface Props {
  name: string;
  image?: string;
  isOnline: boolean;
  lastSeen?: string;
  onBack: () => void;
}

export default function ChatHeader({
  name,
  image,
  isOnline,
  lastSeen,
  onBack,
}: Props) {
  return (
    <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowRight size={24} />
        </button>

        <UserAvatar name={name} image={getImageUrl(image)} isOnline={isOnline} size="sm" />

        <div>
          <h2 className="text-xs sm:text-sm font-black text-gray-900 font-cairo leading-tight">
            {name}
          </h2>
          <p
            className={`text-[9px] sm:text-[10px] font-bold font-cairo ${
              isOnline ? "text-emerald-500" : "text-gray-400"
            }`}
          >
            {isOnline ? "متصل الآن" : lastSeen || "غير متصل"}
          </p>
        </div>
      </div>

      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-50 rounded-xl">
        <MoreVertical size={20} />
      </button>
    </div>
  );
}
