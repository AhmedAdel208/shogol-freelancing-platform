import logoFooter from "@/public/images/logo-footer.png";
import Image from "next/image";
import Link from "next/link";

export default function LinksFooter() {
  return (
    <div className="lg:col-span-1 text-right mt-5">
      <Link href="/">
        <Image
          src={logoFooter}
          alt="شغل"
          width={130}
          height={50}
          className="object-contain -mt-8 mb-4 "
        />
      </Link>

      <p className="text-gray-300 text-base font-bold font-cairo leading-relaxed max-w-[200px]">
        منصة احترافية للعمل الحر تربط بين أصحاب المشاريع والمستقلين المحترفين في الوطن العربي.
      </p>
    </div>
  );
}
