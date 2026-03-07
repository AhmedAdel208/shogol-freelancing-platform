import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClientInfoProps } from "@/types/detailComponents";
import { MessageSquareMore } from "lucide-react";

export default function ClientInfo({
  project,
}: ClientInfoProps) {
  const router = useRouter();

  const handleContactClient = () => {
    if (project.clientId) {
      router.push(`/messages?user=${project.clientId}`);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col items-center p-8 text-center" dir="rtl">
      <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-8 font-cairo">
        صاحب المشروع
      </h3>

      {/* Avatar Container - Modern & Clean */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full p-1.5 bg-gray-50 border border-gray-100 ring-4 ring-gray-50/50 shadow-inner group/avatar relative">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-white border border-gray-100">
            {project.clientAvatar ? (
              <Image
                src={project.clientAvatar}
                alt={project.clientName}
                width={96}
                height={96}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                <span className="text-gray-300 font-black text-3xl font-cairo">
                  {project.clientName?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Online status indicator - Simpler */}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm z-20" />
        </div>
      </div>

      <h4 className="text-xl font-black text-gray-900 font-cairo mb-8 leading-tight">
        {project.clientName}
      </h4>

      {/* Action Button - Sleek and Modern */}
      <button
        onClick={handleContactClient}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-primary/5 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary rounded-xl font-bold font-cairo transition-all duration-300 active:scale-95 group/btn cursor-pointer"
      >
        <MessageSquareMore
          size={18}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-12"
        />
        <span className="text-[15px]">التواصل مع العميل</span>
      </button>
    </div>
  );
}
