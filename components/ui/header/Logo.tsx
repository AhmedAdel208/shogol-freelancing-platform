import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative group flex items-center shrink-0"
      aria-label="الرئيسية"
    >
      <Image
        src={logo}
        alt="شغل - منصة العمل الحر"
        priority
        height={55}
        className="relative z-10 transition-transform duration-300 "
      />
    </Link>
  );
}
