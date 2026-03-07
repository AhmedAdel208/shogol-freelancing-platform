"use client";

import { ArrowRight, Trash2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { getImageUrl } from "@/utils/image";

interface Props {
  name: string;
  image?: string;
  isOnline: boolean;
  lastSeen?: string;
  onBack: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export default function ChatHeader({
  name,
  image,
  isOnline,
  lastSeen,
  onBack,
  onDelete,
  isDeleting,
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

      {onDelete && (
        <button
          onClick={() => {
            if (confirm("هل أنت متأكد من حذف هذه المحادثة بالكامل؟ لا يمكن التراجع عن هذا الإجراء.")) {
              onDelete();
            }
          }}
          disabled={isDeleting}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-xl disabled:opacity-50 flex shrink-0"
          title="حذف المحادثة"
        >
          {isDeleting ? (
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 size={20} />
          )}
        </button>
      )}
    </div>
  );
}
