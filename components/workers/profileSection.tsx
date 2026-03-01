import { Portfolio } from "@/types/workers";
import { Briefcase, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function PortfolioSection({ portfolio }: { portfolio: Portfolio[] }) {
  if (!portfolio?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 group hover:border-primary/20 transition-colors duration-500">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-sm group-hover:scale-110 group-hover:text-primary/30 transition-all duration-500">
          <ImageIcon size={32} />
        </div>
        <p className="text-slate-400 font-black font-cairo text-base">لم يتم إضافة أعمال لهذا المستقل بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portfolio.map((item, i) => (
          <div
            key={i}
            className="aspect-video relative rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100"
          >
            <Image
              src={item.imageUrl}
              alt="Work Sample"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}