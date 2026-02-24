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
    <ul className="flex gap-10  text-lg text-dark">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href))
                ? "font-bold text-primary"
                : "font-normal"
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
