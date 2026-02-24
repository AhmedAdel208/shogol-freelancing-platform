import Link from "next/link";
import MailIcon from "@/public/icons/MailIcon";

export default function NotLoggedInActions() {
  return (
    <div className="rounded-lg bg-dark-2 p-4 text-center">
      <div className="mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
          <MailIcon className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">سجل الدخول لإرسال عرضك</p>
      </div>
      <Link
        href="/login"
        className="block w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
      >
        تسجيل الدخول
      </Link>
    </div>
  );
}
