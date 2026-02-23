import { Search, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-bg">
      {/* 404 Illustration/Icon */}
      <div className="relative mb-8">
        <h1 className="text-[150px] font-black text-primary/5 select-none leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce duration-2000">
            <Search className="w-16 h-16 text-primary" />
          </div>
        </div>
      </div>

      <h2 className="text-4xl font-bold text-dark mb-4 font-el-missiri">
        الصفحة غير موجودة!
      </h2>

      <p className="text-gray-medium text-lg max-w-md mb-12 leading-relaxed">
        عذراً، يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان
        آخر.
      </p>

      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md">
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 px-8 rounded-2xl font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          <Home className="w-5 h-5" />
          العودة للرئيسية
        </Link>

        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary py-4 px-8 rounded-2xl font-bold hover:bg-primary/5 transition-all group"
        >
          تواصل معنا
          <ArrowRight className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
        </Link>
      </div>

      {/* Subtle background decoration */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6B79B9] rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
