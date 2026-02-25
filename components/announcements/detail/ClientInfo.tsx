import Image from "next/image";
import { ClientInfoProps } from "@/types/detailComponents";
import MailIcon from "@/public/icons/MailIcon";

export default function ClientInfo({
  project,
  onSendMessage,
}: ClientInfoProps) {
  console.log(project);
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-dark text-right mb-4">
        صاحب المشروع
      </h3>

      {/* Avatar + Name centered */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-25 h-25 relative bg-gray-100 rounded-full flex items-center justify-center shrink-0">
          {project.clientAvatar ? (
            <Image
              src={project.clientAvatar}
              alt={project.clientName}
              width={80}
              height={80}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-400 font-bold text-2xl">
              {project.clientName?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="text-center">
          <h4 className="text-base font-bold text-gray-dark">
            {project.clientName}
          </h4>
          <p className="text-sm text-gray-medium">{project.clientCompany}</p>
        </div>
      </div>

      {/* Send Message Button */}
      <button
        onClick={onSendMessage}
        className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-base hover:bg-primary/5 transition-colors"
      >
        <MailIcon className="w-5 h-5" />
        إرسال رسالة
      </button>
    </div>
  );
}
