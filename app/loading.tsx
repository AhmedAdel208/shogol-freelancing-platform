export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      {/* Premium Loader */}
      <div className="relative w-24 h-24 mb-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        {/* Spinning Gradient Ring */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        
        {/* Inner Pulse Circle */}
        <div className="absolute inset-6 bg-linear-to-tr from-primary to-[#6B79B9] rounded-full animate-pulse blur-[1px]"></div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-dark font-el-missiri animate-pulse">
          جاري التحميل...
        </h2>
        <p className="text-gray-medium text-lg max-w-xs leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-1000">
          يرجى الانتظار قليلاً، نحن نجهز لك تجربة رائعة
        </p>
      </div>

      {/* Decorative Dots */}
      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-150"></div>
        <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}
