"use client";


import Link from "next/link";
import { MessageSquareMore, Bell } from "lucide-react";
import { useQuery} from "@tanstack/react-query";
import { notificationsApi } from "@/lib/api/notifications";
import { useAuthStore } from "@/stores/useAuthStore";


export default function Navicons() {
  const { isAuthenticated } = useAuthStore();



  const { data: unreadNotificationsCount = 0 } = useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: notificationsApi.getUnreadCount,
    enabled: isAuthenticated,
    refetchInterval: 10000,
  });



  return (
    <div className="flex items-center gap-10">
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
              {unreadNotificationsCount > 9 ? "+9" : unreadNotificationsCount}
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 bg-slate-900/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
      </Link>
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
        
   

        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
      </Link>


    </div>
  );
}
