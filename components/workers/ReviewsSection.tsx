import { Review } from "@/types/workers";


export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) return null

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-6">التقييمات والآراء</h3>

      {reviews.map((review, i) => (
        <div key={i} className="mb-6 text-center">
          <p className="font-semibold">{review.reviewerName}</p>

          <div className="text-yellow-400">
            {"★".repeat(review.rating)}
          </div>

          <p className="text-gray-500 text-sm mt-2">
            "{review.comment}"
          </p>
        </div>
      ))}
    </div>
  )
}