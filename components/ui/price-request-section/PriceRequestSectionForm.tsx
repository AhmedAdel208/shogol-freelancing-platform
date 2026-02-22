import Link from "next/link";

export default function PriceRequestSectionForm() {
  return (
    <div className="bg-bg rounded-2xl p-8 ">
      <div className="space-y-6">
        <div>
          <label className="block text-right text-dark font-bold mb-2 text-base">
            عنوان الطلب
          </label>
          <input
            type="text"
            className="w-full bg-white  rounded-xl px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-right text-dark font-bold mb-2 text-base">
            اكتب تفاصيل الطلب
          </label>
          <textarea
            rows={4}
            className="w-full bg-white  rounded-xl px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="صف مشروعك هنا"
          />
        </div>

        <Link href="/next-price-request-form">
          <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors duration-200">
            التالي
          </button>
        </Link>
      </div>
    </div>
  );
}
