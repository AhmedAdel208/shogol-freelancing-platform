export default function ContactForm() {
  return (
    <form className="space-y-6">
      {/* Row 1 - Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="text-right">
          <label className="block text-dark font-medium mb-2 text-base">
            الاسم
          </label>
          <input
            type="text"
            placeholder="الاسم"
            className="w-full bg-white border border-border rounded-lg px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-right">
          <label className="block text-dark font-medium mb-2 text-base">
            الايميل
          </label>
          <input
            type="email"
            placeholder="mm:mm@gmail.com"
            className="w-full bg-white border border-border rounded-lg px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Row 2 - Phone & Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="text-right">
          <label className="block text-dark font-medium mb-2 text-base">
            رقم الجوال
          </label>
          <input
            type="tel"
            placeholder="00000000"
            className="w-full bg-white border border-border rounded-lg px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-right">
          <label className="block text-dark font-medium mb-2 text-base">
            المجال
          </label>
          <input
            type="text"
            placeholder="المجال"
            className="w-full bg-white border border-border rounded-lg px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Row 3 - Message */}
      <div className="text-right">
        <label className="block text-dark font-medium mb-2 text-base">
          اكتب تعليقك
        </label>
        <textarea
          rows={5}
          placeholder="اكتب تعليقك"
          className="w-full bg-white border border-border rounded-lg px-4 py-3 text-right text-gray-dark placeholder-gray-medium focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      <div className="text-left">
        <button
          type="submit"
          className="bg-primary text-white font-semibold px-16 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 w-full md:w-auto cursor-pointer"
        >
          ارسال
        </button>
      </div>
    </form>
  );
}
