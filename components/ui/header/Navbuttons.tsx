"use client";

import Link from "next/link";
import { UserButton } from "./UserButton";
import { useAuth } from "@/hooks/auth/useAuth";
import { LogIn, Sparkles } from "lucide-react";
import { getCurrentUser } from "@/utils/auth";

// Tailwind Class Variables for cleaner JSX
const CONTAINER_CLASSES = "flex gap-4 items-center";

const PRIMARY_BTN_CLASSES = 
  "relative group cursor-pointer overflow-hidden px-8 py-2.5 rounded-xl font-bold font-cairo text-[16px] text-white " +
  "transition-all duration-300 active:scale-[0.97] shadow-lg shadow-primary/20 hover:shadow-primary/30";

const GRADIENT_BG_CLASSES = 
  "absolute inset-0 bg-linear-to-r from-primary via-teal-500 to-primary bg-size-[200%_auto] " +
  "animate-[gradient_3s_linear_infinite] group-hover:bg-size-[100%_auto] transition-all";

const SECONDARY_BTN_CLASSES = 
  "group flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-xl font-bold font-cairo text-[16px] text-primary " +
  "hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/10";

export default function Navbuttons() {
  const { isAuthenticated, isMounted } = useAuth();
  const currentUser = getCurrentUser();
  const isClient = currentUser?.isClient;

  if (!isMounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className={CONTAINER_CLASSES}>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          {isClient && (
            <Link href="/projects/create">
              <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-xl font-bold font-cairo text-[15px] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer">
                اطلب عرض سعر
              </button>
            </Link>
          )}
          <UserButton />
        </div>
      ) : (
        <>
          {/* Become a Worker / Sign Up - Primary Action */}
          <Link href="/signup">
            <button className={PRIMARY_BTN_CLASSES}>
               {/* Animated Gradient Background */}
               <div className={GRADIENT_BG_CLASSES} />
               
               <div className="relative flex items-center gap-2">
                 <Sparkles size={18} className="text-white animate-pulse" />
                 <span className="mb-px tracking-wide">كن مشتغل</span>
               </div>
               
               {/* Hover Shine Layer */}
               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>

          {/* Login - Secondary Action */}
          <Link href="/login">
            <button className={SECONDARY_BTN_CLASSES}>
              <LogIn size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="mb-px">تسجيل الدخول</span>
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
