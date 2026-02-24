"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Sidebar() {
  const pathname = usePathname();

  const { data } = useSWR(
    "https://shogol.runasp.net/api/Offers/my-offers",
    fetcher
  );

  const pending = data?.filter((o: any) => o.status === "Pending").length || 0;
  const running = data?.filter((o: any) => o.status === "Running").length || 0;
  const completed = data?.filter((o: any) => o.status === "Completed").length || 0;

  const linkStyle = (path: string) =>
    `flex justify-between items-center px-4 py-3 rounded-xl transition
     ${pathname === path
       ? "bg-cyan-100 text-cyan-700"
       : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <div className="w-full lg:w-80 bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold text-lg mb-6">عروضي</h3>

      <div className="space-y-3">
        <Link href="/dashboard/pending" className={linkStyle("/dashboard/pending")}>
          <span>بانتظار الموافقة</span>
          <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
            {pending}
          </span>
        </Link>

        <Link href="/dashboard/running" className={linkStyle("/dashboard/running")}>
          <span>قيد التنفيذ</span>
          <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
            {running}
          </span>
        </Link>

        <Link href="/dashboard/completed" className={linkStyle("/dashboard/completed")}>
          <span>المكتملة</span>
          <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">
            {completed}
          </span>
        </Link>
      </div>
    </div>
  );
}