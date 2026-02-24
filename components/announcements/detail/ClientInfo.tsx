import Image from "next/image";
import { ClientInfoProps } from "@/types/detailComponents";

export default function ClientInfo({ project }: ClientInfoProps) {
  return (
    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
      <div className="w-14 h-14 md:w-16 md:h-16 relative bg-gray-100 rounded-full flex items-center justify-center shrink-0">
        {project.clientAvatar ? (
          <Image
            src={project.clientAvatar}
            alt={project.clientName}
            width={64}
            height={64}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400 font-bold text-xl">
            {project.clientName?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 text-right">
        <h3 className="text-lg md:text-xl font-bold text-gray-dark">
          {project.clientName}
        </h3>
        <p className="text-sm text-gray-medium">صاحب المشروع</p>
      </div>
    </div>
  );
}
