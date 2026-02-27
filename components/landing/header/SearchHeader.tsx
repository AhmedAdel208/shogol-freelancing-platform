import HeaderSearchBar from "@/components/ui/header/HeaderSearchBar";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function SearchHeader() {
  return (
    <div className="w-full max-w-8xl mx-auto p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 w-full relative">
          <HeaderSearchBar />
        </div>

        <span className="text-[#CECFCF] text-[21px] font-cairo">أو</span>

        <Link href="/projects/create">
          <button className="relative group cursor-pointer overflow-hidden px-10 py-4 rounded-[18px] font-bold font-cairo text-lg text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-95">
             <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-500 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover:bg-size-[100%_auto] transition-all" />
             <div className="relative flex items-center gap-2">
               <Plus size={22} className="text-white" />
               <span className="mb-0.5">نشر مشروع</span>
             </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
