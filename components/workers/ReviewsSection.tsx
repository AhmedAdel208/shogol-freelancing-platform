import { Review } from "@/types/workers";
import { Star, Quote, User } from "lucide-react";
import Image from "next/image";

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 group hover:border-primary/20 transition-colors duration-500">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-sm group-hover:scale-110 group-hover:text-primary/30 transition-all duration-500">
          <Star size={32} />
        </div>
        <p className="text-slate-400 font-black font-cairo text-base">لا توجد تقييمات لهذا المستقل حالياً</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {reviews.map((review, i) => (
        <div key={review.id || i} className="group p-6 bg-slate-50/50 rounded-[30px] border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden relative">
                {review.reviewerProfilePictureUrl ? (
                  <Image 
                    src={review.reviewerProfilePictureUrl} 
                    alt={review.reviewerName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <User size={24} />
                  </div>
                )}
              </div>
              <div className="text-right">
                <h4 className="text-slate-900 font-black font-cairo text-sm leading-tight">{review.reviewerName}</h4>
                <p className="text-slate-400 font-bold font-cairo text-[11px]">{new Date(review.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-amber-400">
               {[1, 2, 3, 4, 5].map((s) => (
                 <Star key={s} size={14} fill={s <= review.rating ? "currentColor" : "none"} className={s > review.rating ? "text-slate-200" : ""} />
               ))}
            </div>
          </div>

          <div className="relative">
            <Quote className="absolute -top-2 -right-2 w-8 h-8 text-primary/10 -scale-x-100" />
            <p className="text-slate-600 font-bold font-cairo text-[15px] leading-relaxed pr-6">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}