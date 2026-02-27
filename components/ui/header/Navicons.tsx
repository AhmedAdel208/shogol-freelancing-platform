

import Link from "next/link";
import { MessageSquareMore, Bell } from "lucide-react";

export default function Navicons() {
  return (
    <div className="flex items-center gap-10">
      {/* Chat Icon - Sophisticated Rounded Style */}
      <Link 
        href="/chat" 
        className="group relative w-12 h-12 flex items-center justify-center rounded-[18px] bg-slate-100 hover:bg-primary transition-all duration-400 active:scale-95 shadow-[0_4px_10px_rgb(0,0,0,0.03)]"
      >
        <MessageSquareMore 
          size={25} 
          className="text-[#209fa9] group-hover:text-white transition-colors duration-300"
          strokeWidth={2.2}
        />
        
   

        {/* Hover Shine Layer */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
      </Link>

      {/* Notifications Icon - Match Screenshot with Light Gray Rounded Block */}
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

        </div>
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-[18px] pointer-events-none" />
      </Link>
    </div>
  );
}
