import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
  retryText?: string;
}

export default function ErrorState({ 
  message = "حدث خطأ في تحميل البيانات",
  onRetry,
  className = "",
  retryText = "إعادة المحاولة"
}: ErrorStateProps) {
  return (
    <div className={`bg-red-50/50 border border-red-100 p-8 rounded-4xl text-red-500 font-black font-cairo text-center animate-in zoom-in duration-500 ${className}`}>
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 block mx-auto bg-white border border-red-200 px-6 py-2 rounded-full text-sm hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
