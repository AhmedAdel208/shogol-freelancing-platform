import { FileText, Download, Paperclip, ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Attachment {
  id: string;
  fileUrl: string;  // ✅ was "url"
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
    <div className="pt-8 relative mt-4">
      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-l from-transparent via-gray-200 to-transparent" />
      
      <div className="flex items-center justify-end gap-3 mb-6 text-right font-cairo">
        <h3 className="text-[1.3rem] font-black text-gray-900 tracking-tight">
          المرفقات
        </h3>
        <div className="w-10 h-10 rounded-[14px] bg-primary/10 flex items-center justify-center text-primary/80 border border-primary/20 shadow-inner">
           <Paperclip size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
        {attachments.map((file) => {
          const isImage = file.fileName && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.fileName);
              const fileUrl = file.fileUrl; // ✅ was file.url
          
          return (
            <div 
              key={file.id} 
              className="group relative flex flex-col bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
            >
       {isImage && fileUrl ? (
  <div className="aspect-video relative w-full overflow-hidden bg-slate-100">
    <Image
      src={fileUrl}  // ✅
      alt={file.fileName || "attachment"}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
      <a href={fileUrl} target="_blank" rel="noopener noreferrer"  // ✅
        className="bg-white/90 p-3 rounded-full text-primary hover:bg-white hover:scale-110 transition-all shadow-lg">
        <ExternalLink size={20} />
      </a>
    </div>
  </div>
) : (
  <div className="aspect-video flex items-center justify-center bg-slate-100">
    <FileText size={48} className="text-slate-300" />
  </div>
)}
              
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                    {isImage ? <ImageIcon className="text-primary/60" size={18} /> : <FileText className="text-primary/60" size={18} />}
                  </div>
                  <span className="text-[15px] font-bold font-cairo text-slate-700 truncate">
                    {file.fileName || "ملف مرفق"}
                  </span>
                </div>
                
                {file.url && (
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:text-primary/80 text-[14px] font-black font-cairo transition-colors"
                  >
                    <span className="mb-px underline underline-offset-4 decoration-primary/30 group-hover:decoration-primary transition-all">فتح {isImage ? "الصورة" : "الملف"}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
