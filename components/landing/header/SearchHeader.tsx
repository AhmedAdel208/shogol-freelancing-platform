import HeaderSearchBar from "@/components/ui/header/HeaderSearchBar";
import Link from "next/link";

export default function SearchHeader() {
  return (
    <div className="w-full max-w-8xl mx-auto p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 w-full relative">
          <HeaderSearchBar />
        </div>

        <span className="text-[#CECFCF] text-[21px]">او</span>

        <Link href="/request-quote">
          <button className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-[#FAFAFA] text-base  py-5 px-16 rounded-[10px] transition-colors duration-200 ">
            اطلب عرض سعر
          </button>
        </Link>
      </div>
    </div>
  );
}
