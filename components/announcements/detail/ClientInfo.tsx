import Image from "next/image";
import { ClientInfoProps } from "@/types/detailComponents";
import MailIcon from "@/public/icons/MailIcon";

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
          <div className="w-[100px] h-[100px] relative bg-slate-50 rounded-full flex items-center justify-center shrink-0 ring-[6px] ring-white shadow-xl shadow-slate-200/50 group-hover:shadow-primary/20 transition-shadow duration-500 z-10">
            {project.clientAvatar ? (
              <Image
                src={project.clientAvatar}
                alt={project.clientName}
                width={100}
                height={100}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-slate-400 font-black text-4xl font-cairo">
                {project.clientName?.charAt(0).toUpperCase()}
              </span>
            )}
            
            {/* Online Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-[3px] border-white rounded-full shadow-sm z-20" />
          </div>

          <div className="text-center mt-2">
            <h4 className="text-[1.3rem] font-bold text-gray-900 font-cairo tracking-tight leading-none mb-1">
              {project.clientName}
            </h4>
          </div>
        </div>

        {/* Send Message Button */}
        <button
          onClick={onSendMessage}
          className="relative w-full overflow-hidden rounded-[14px] font-bold font-cairo text-base group/btn shadow-md shadow-gray-200"
        >
          <div className="absolute inset-0 bg-slate-50 border-2 border-slate-200 text-slate-700 transition-all duration-300 group-hover/btn:bg-primary group-hover/btn:border-primary" />
          
          <div className="relative flex items-center justify-center gap-2.5 py-3.5 px-6 transition-colors duration-300 text-slate-600 group-hover/btn:text-white">
            <MailIcon className="w-[22px] h-[22px]" />
            <span className="mb-[1px]">التواصل مع العميل</span>
          </div>
        </button>
      </div>
    </div>
  );
}
