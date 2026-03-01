import Image from "next/image";
import { ClientInfoProps } from "@/types/detailComponents";
import { MessageSquareMore } from "lucide-react";

export default function ClientInfo({
  project,
  onSendMessage,
}: ClientInfoProps) {
  return (
    <div className="bg-[#ffffff] rounded-[24px] transition-all duration-400 ease-out shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100/80 overflow-hidden relative group">
      {/* Decorative Blur Background inside the card */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-slate-100 to-transparent -z-10" />

      <div className="p-7">
        <h3 className="text-sm tracking-wide font-black text-slate-400 uppercase text-center mb-6 font-cairo">
          صاحب المشروع
        </h3>

        {/* Avatar + Name centered */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {/* Avatar with Elite Styling */}
          <div className="relative group/avatar">
            {/* Outer Decorative Rings */}
            <div className="absolute -inset-2 bg-linear-to-tr from-primary/20 via-primary/5 to-transparent rounded-full animate-pulse blur-sm" />
            
            <div className="w-[102px] h-[102px] relative bg-white rounded-full flex items-center justify-center shrink-0 ring-[5px] ring-primary/10 shadow-2xl shadow-primary/10 group-hover/avatar:shadow-primary/30 transition-all duration-500 z-10 overflow-hidden">
               <div className="absolute inset-0 border-[3px] border-white rounded-full z-20 pointer-events-none" />
               <div className="absolute inset-0 border border-primary/20 rounded-full z-20 pointer-events-none" />
               
               {project.clientAvatar ? (
                 <Image
                   src={project.clientAvatar}
                   alt={project.clientName}
                   width={100}
                   height={100}
                   className="w-full h-full rounded-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                 />
               ) : (
                 <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                   <span className="text-primary/40 font-black text-4xl font-cairo">
                     {project.clientName?.charAt(0).toUpperCase()}
                   </span>
                 </div>
               )}
            </div>
            
            {/* Online Indicator with Pulse */}
            <div className="absolute bottom-1 right-1 w-6 h-6 z-30">
               <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
               <div className="relative w-full h-full bg-emerald-500 border-[3px] border-white rounded-full shadow-sm" />
            </div>
          </div>

          <div className="text-center mt-2">
            <h4 className="text-[1.3rem] font-bold text-gray-900 font-cairo tracking-tight leading-none mb-1">
              {project.clientName}
            </h4>
          </div>
        </div>

        {/* Send Message Button (Sophisticated Interactive Style) */}
        <button
          onClick={onSendMessage}
          className="group/btn relative w-full overflow-hidden rounded-[16px] font-bold font-cairo text-base transition-all duration-400 active:scale-[0.98] shadow-md shadow-slate-200/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
        >
          {/* Base Layer */}
          <div className="absolute inset-0 bg-slate-50 border border-slate-200 transition-all duration-500 group-hover/btn:bg-primary group-hover/btn:border-primary" />
          
          {/* Content Layer */}
          <div className="relative flex items-center justify-center gap-3 py-3.5 px-6 transition-colors duration-500 text-slate-600 group-hover/btn:text-white">
            <MessageSquareMore size={20} strokeWidth={2.5} className="group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-6 transition-transform duration-300" />
            <span className="mb-px tracking-tight">التواصل مع العميل</span>
          </div>
          
          {/* Subtle Shine Overlay */}
          <div className="absolute inset-x-0 inset-y-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
        </button>
      </div>
    </div>
  );
}
