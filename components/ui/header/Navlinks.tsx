"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlinks() {
  const pathname = usePathname();

  const links = [
    { label: "الرئيسية", href: "/" },
    { label: "الاعلانات", href: "/announcements" },
    { label: "المشتغلين", href: "/workers" },
    { label: "الطلبات", href: "/requests" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  return (
    <ul className="flex gap-8 text-base">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`relative py-1 font-bold transition-colors duration-200 group
                ${isActive ? "text-primary" : "text-gray-600 hover:text-primary"}
              `}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
