import type { ChatMessage } from "@/types/chat";
import { motion } from "framer-motion";
import { Check, CheckCheck, FileIcon } from "lucide-react";
import { getImageUrl } from "@/utils/image";

interface Props {
  message: ChatMessage;
  isMine: boolean;
}

export default function MessageBubble({ message, isMine }: Props) {
  const formatTime = (dateStr: string): string => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const time = formatTime(message.sentAt);

  const isImage = (url?: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?\s*$/i.test(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-end gap-2 ${
        isMine ? "flex-row self-start" : "flex-row-reverse self-end"
      }`}
    >
      <div className={`max-w-[90%] flex flex-col ${isMine ? "items-start" : "items-end"}`}>
        <div
          className={`relative px-3.5 py-2 rounded-2xl shadow-sm text-sm font-cairo ${
            isMine
              ? "bg-[#2d3748] text-white rounded-tr-none"
              : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
          }`}
        >
          {/* Attachment */}
          {message.fileUrl && (
            <div className="mb-2">
              {isImage(message.fileName || message.fileUrl) ? (
                <div className="relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={getImageUrl(message.fileUrl)}
                    alt={message.fileName || "مرفق"}
                    className="max-w-full h-auto max-h-[350px] object-contain cursor-pointer transition-transform hover:scale-[1.01]"
                    loading="lazy"
                    onClick={() => window.open(getImageUrl(message.fileUrl!), "_blank")}
                  />
                </div>
              ) : (
                <a
                  href={getImageUrl(message.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    isMine ? "bg-white/10 border-white/20 hover:bg-white/20" : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isMine ? "bg-white/20" : "bg-primary/10"}`}>
                    <FileIcon size={20} className={isMine ? "text-white" : "text-primary"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-black truncate ${isMine ? "text-white" : "text-gray-900"}`}>
                      {message.fileName || "ملف مرفق"}
                    </p>
                  </div>
                </a>
              )}
            </div>
          )}

          {/* Text content */}
          {message.content && (
            <p className="font-bold leading-relaxed break-all overflow-wrap-anywhere whitespace-pre-wrap">
              {message.content}
            </p>
          )}

          {/* Footer info (Time & Status) */}
          <div className={`flex items-center gap-1.5 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
            <span className={`text-[9px] font-black ${isMine ? "text-white/60" : "text-gray-400"}`}>
              {time}
            </span>
            {isMine && (
              <div className="flex">
                {message.isRead ? (
                  <CheckCheck size={12} className="text-emerald-400" />
                ) : (
                  <Check size={12} className="text-white/40" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
