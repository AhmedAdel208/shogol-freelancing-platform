"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageSquareMore, Bell } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api/chat";
import { notificationsApi } from "@/lib/api/notifications";
import { useAuthStore } from "@/stores/useAuthStore";
import { startChatHub, onReceiveMessage, onMessageRead } from "@/lib/signalr/chatHub";

export default function Navicons() {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  
  const { data: conversations = [] } = useQuery({
    queryKey: ["chat-conversations"],
    queryFn: chatApi.getConversations,
    enabled: isAuthenticated,
    refetchInterval: 5000,
    staleTime: 0,
  });

  const { data: unreadNotificationsCount = 0 } = useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: notificationsApi.getUnreadCount,
    enabled: isAuthenticated,
    refetchInterval: 10000,
  });

  // Listen for real-time events to update badge globally
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const cleanups: (() => void)[] = [];
    
    startChatHub().then(() => {
      cleanups.push(onReceiveMessage(() => {
        // Small delay to let useChat's markAsRead complete first if user is viewing the chat
        setTimeout(() => {
          queryClient.refetchQueries({ queryKey: ["chat-conversations"] });
        }, 1500);
      }));
      cleanups.push(onMessageRead(() => {
        queryClient.refetchQueries({ queryKey: ["chat-conversations"] });
      }));
    }).catch(console.error);

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, [isAuthenticated, queryClient]);

  const totalUnread = conversations.reduce((acc: number, c: any) => acc + (c.unreadCount || 0), 0);

  return (
    <div className="flex items-center gap-10">
      {/* Chat Icon */}
      <Link 
        href="/messages" 
        className="group relative w-12 h-12 flex items-center justify-center rounded-[18px] bg-slate-100 hover:bg-primary transition-all duration-400 active:scale-95 shadow-[0_4px_10px_rgb(0,0,0,0.03)]"
      >
        <MessageSquareMore 
          size={25} 
          className="text-[#209fa9] group-hover:text-white transition-colors duration-300"
          strokeWidth={2.2}
        />
        
        {totalUnread > 0 && (
          <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-red-500/20 z-10 transition-transform animate-in zoom-in">
            {totalUnread > 99 ? "+99" : totalUnread}
          </div>
        )}

        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
      </Link>

      {/* Notifications Icon */}
      <Link 
        href="/notifications" 
        className="group relative w-12 h-12 flex items-center justify-center rounded-[18px] bg-slate-100 hover:bg-[#ebf5f6] transition-all duration-400 active:scale-95 shadow-[0_4px_10px_rgb(0,0,0,0.03)]"
      >
        <div className="relative">
          <Bell 
            size={22} 
            className="text-[#209fa9] group-hover:rotate-12 transition-transform duration-300" 
            strokeWidth={2.2}
          />
          {unreadNotificationsCount > 0 && (
            <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-[9px] font-black rounded-full shadow-lg shadow-red-500/20 z-10 transition-transform animate-in zoom-in">
              {unreadNotificationsCount > 99 ? "+99" : unreadNotificationsCount}
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-slate-900/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
      </Link>
    </div>
  );
}
