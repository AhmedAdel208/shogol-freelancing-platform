"use client";

import type { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

interface Props {
  messages: ChatMessage[];
  currentUserId: string | null;
  isLoading: boolean;
}

export default function MessageList({ messages, currentUserId, isLoading }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll within the container only (not the page)
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages.length]);

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 bg-slate-50/5 animate-pulse" />
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm font-bold text-gray-400 font-cairo">
          لا توجد رسائل بعد. ابدأ المحادثة!
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/10">
      <div className="max-w-4xl mx-auto space-y-1.5 flex flex-col">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.senderId === currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
