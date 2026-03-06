import { FileText, Download, Paperclip, ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Attachment {
  id: string;
  fileUrl: string;  
  fileName: string;
  type?: string;
}

interface ProjectAttachmentsProps {
  attachments?: Attachment[];
}

export default function ProjectAttachments({ attachments }: ProjectAttachmentsProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="pt-10 relative">
      <div className="flex items-center gap-3 mb-8" dir="rtl">
        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
           <Paperclip size={20} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-black text-gray-900 font-cairo text-right">
          الملفات المرفقة
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
        {attachments.map((file) => {
          const isImage = file.fileName && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.fileName);
          const fileUrl = file.fileUrl;
          
          return (
            <div 
              key={file.id} 
              className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div className="aspect-video relative w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                {isImage && fileUrl ? (
                  <>
                    <Image
                      src={fileUrl}
                      alt={file.fileName || "attachment"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer"
                        className="bg-white/90 p-3 rounded-full text-gray-900 hover:bg-white hover:scale-110 transition-all shadow-lg active:scale-95">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <FileText size={24} />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    {isImage ? <ImageIcon className="text-gray-400" size={16} /> : <FileText className="text-gray-400" size={16} />}
                  </div>
                  <span className="text-sm font-bold font-cairo text-gray-700 truncate">
                    {file.fileName || "ملف مرفق"}
                  </span>
                </div>
                
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2.5 flex items-center justify-center gap-2 bg-gray-50 hover:bg-primary/5 text-gray-500 hover:text-primary rounded-xl text-xs font-black font-cairo transition-all duration-300"
                >
                  <span>عرض {isImage ? "الصورة" : "الملف كاملة"}</span>
                  <ExternalLink size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
