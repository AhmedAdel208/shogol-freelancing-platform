"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlinks() {
  const pathname = usePathname();

  const links = [
    { label: "الرئيسية", href: "/" },
    { label: "الاعلانات", href: "/announcements" },
    { label: "الطلبات", href: "/requests" },
    { label: "المشتغلين", href: "/workers" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  return (
    <ul className="flex gap-10  text-lg text-dark">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={pathname === link.href ? "font-bold" : "font-normal"}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
