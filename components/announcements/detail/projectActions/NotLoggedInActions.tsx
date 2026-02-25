import Link from "next/link";

export default function NotLoggedInActions() {
  return (
    <div className="bg-white rounded-xl  p-6 sticky top-6">
      <div className="text-center mb-4">
        <p className="text-gray-medium ">سجل الدخول لإرسال عرضك</p>
      </div>
      <Link
        href="/login"
        className="block w-full bg-primary text-white py-3 rounded-lg font-bold text-base hover:bg-primary/90 transition-colors text-center"
      >
        تسجيل الدخول
      </Link>
    </div>
  );
}
