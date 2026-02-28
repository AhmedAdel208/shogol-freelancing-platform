import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface MenuLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function MenuLink({ href, icon, label, onClick }: MenuLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-2xl text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <span className="p-2 bg-white/3 rounded-xl group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
          {icon}
        </span>
        <span className="font-black font-cairo text-[15px]">{label}</span>
      </div>
      <ChevronLeft size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
    </Link>
  );
}
