

import Image from "next/image";
import { Edit2, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
}

interface ProfilePortfolioSectionProps {
  portfolios: PortfolioItem[];
}

export default function ProfilePortfolioSection({ portfolios }: ProfilePortfolioSectionProps) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
            <ImageIcon size={20} />
          </div>
          معرض الأعمال
        </h2>
        <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
          <Plus size={16} />
          إضافة عمل
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolios && portfolios.length > 0 ? (
          portfolios.map((portfolio, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video relative bg-slate-100">
                {portfolio.imageUrl && (
                  <Image
                    src={portfolio.imageUrl}
                    fill
                    className="object-cover"
                    alt="Portfolio"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform">
                    <Edit2 size={18} />
                  </button>
                  <button className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-black text-slate-800 text-sm">
                  {portfolio.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-200 border-dashed gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center">
              <ImageIcon className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 text-sm font-bold text-center">
              لم تقم بإضافة أي أعمال بعد.
              <br />
              أضف أعمالك لتجذب المزيد من العملاء!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
