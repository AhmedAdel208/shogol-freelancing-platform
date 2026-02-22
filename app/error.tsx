'use client'

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 animate-bounce transition-all duration-700">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      
      <h1 className="text-4xl font-bold text-dark mb-4 font-el-missiri">
        عذراً، حدث خطأ ما!
      </h1>
      
      <p className="text-gray-medium text-lg max-w-md mb-10 leading-relaxed">
        يبدو أننا واجهنا مشكلة تقنية. لا تقلق، يمكنك المحاولة مرة أخرى أو العودة للرئيسية.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={reset}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-4 px-6 rounded-2xl font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          <RefreshCw className="w-5 h-5" />
          حاول مرة أخرى
        </button>
        
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary py-4 px-6 rounded-2xl font-bold hover:bg-primary/5 transition-all"
        >
          <Home className="w-5 h-5" />
          الرئيسية
        </Link>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-12 p-4 bg-gray-100 rounded-xl text-left w-full max-w-2xl overflow-auto text-xs font-mono text-gray-500">
          <p className="font-bold mb-2">Error Details:</p>
          {error.message}
          {error.digest && <p className="mt-1">Digest: {error.digest}</p>}
        </div>
      )}
    </div>
  );
}
