import Link from "next/link";

export default function Navbuttons() {
  return (
    <div className="flex gap-6 text-[17px]">
      <Link href="/signup">
        <button className="px-12 py-3 rounded-lg bg-primary text-light-white cursor-pointer  transition transform duration-200 ease-in-out hover:scale-105 active:scale-95 ">
          كن مشتغل
        </button>
      </Link>

      <Link href="/login">
        <button className=" px-4 py-3 rounded-lg   text-primary  transition transform duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
          تسجيل الدخول
        </button>
      </Link>
    </div>
  );
}
