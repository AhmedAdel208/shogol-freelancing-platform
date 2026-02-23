"use client";

import Link from "next/link";
import { UserButton } from "./UserButton";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Navbuttons() {
  const { isAuthenticated, isMounted } = useAuth();

  if (!isMounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="flex gap-6 text-[17px]">
      {isAuthenticated ? (
        <UserButton />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
