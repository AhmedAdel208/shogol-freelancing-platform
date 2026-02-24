import{Portfolio} from "@/types/workers";
export default function PortfolioSection({ portfolio }: { portfolio: Portfolio[] }) {
  if (!portfolio?.length) return null

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4">معرض الأعمال</h3>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={portfolio[0].imageUrl}
          className="w-full h-64 object-cover"
          alt="work"
        />
      </div>

      <div className="flex gap-3 mt-4">
        {portfolio.map((item, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-lg overflow-hidden"
          >
            <img
              src={item.imageUrl}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}