import logoFooter from "@/public/images/logo-footer.png";
import Image from "next/image";
import Link from "next/link";

export default function LinksFooter() {
  return (
    <div className="lg:col-span-1 text-right">
      <Link href="/">
        <Image
          src={logoFooter}
          alt="شغل"
          width={150}
          height={50}
          className="object-contain -mt-8 mb-4 "
        />
      </Link>

      <div className="space-y-3  text-right">
        <h4 className=" font-bold text-light-white text-lg mb-3">
          معلومات عن شغل
        </h4>
        <ul className="space-y-2 text-gray-300 text-sm">
          <Link href="/common-questions">
            <li className="hover:text-primary font-bold text-light-white text-lg transition-colors">
              الأسئلة الشائعة
            </li>
          </Link>

          <li className=" font-bold text-light-white text-lg transition-colors">
            ضمان حقوقك
          </li>
          <Link href="/terms">
            <li className="hover:text-primary font-bold text-light-white text-lg transition-colors">
              شروط الاستخدام
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
