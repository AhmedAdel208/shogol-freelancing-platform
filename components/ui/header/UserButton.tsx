"use client";

import { Loader2 } from "lucide-react";
import { useProfile } from "@/hooks/auth/useProfile";
import Image from "next/image";
import { getCurrentUser } from "@/utils/auth";

export const UserButton = () => {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-xl cursor-default transition-colors text-right" dir="rtl">
        <Loader2 className="w-5 h-5 animate-spin text-primary/60" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 border border-red-200 bg-red-50 rounded-lg">
        <span className="text-red-500 text-sm">حدث خطأ</span>
      </div>
    );
  }

  const userName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : profile.firstName || profile.email?.split("@")[0] || "مستخدم";

  const getInitials = () => {
    if (profile.firstName && profile.lastName) {
      return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
    }
    return userName.charAt(0).toUpperCase();
  };

  const currentUser = getCurrentUser();
  const isClientRole = currentUser?.isClient;
  const isFreelancerRole = currentUser?.isFreelancer;

  return (
    <button className="group flex cursor-pointer items-center gap-2.5 pl-3.5 pr-2 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-500 active:scale-[0.98]">
      {/* Profile Picture / Initials */}
      <div className="relative shrink-0">
        <div className="w-[38px] h-[38px] rounded-full overflow-hidden transition-all duration-500 group-hover:scale-110 ring-2 ring-white shadow-sm bg-linear-to-br from-slate-50 to-white flex items-center justify-center border border-gray-100">
          {profile.profilePictureUrl || profile.profilePicture ? (
            <Image
              src={profile.profilePictureUrl || profile.profilePicture}
              alt={userName}
              width={38}
              height={38}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-primary font-bold text-sm font-cairo tracking-tight">
              {getInitials()}
            </span>
          )}
        </div>
      </div>

      {/* Role Badge - Calm & Premium */}
      <div className="flex items-center">
        {isClientRole && (
          <div className="bg-primary/10 text-primary px-3.5 py-1.5 rounded-full transition-colors group-hover:bg-primary/15 whitespace-nowrap">
             <span className="text-[12px] font-bold font-cairo leading-none">عميل</span>
          </div>
        )}
        {isFreelancerRole && (
          <div className="bg-emerald-50 text-emerald-600 px-3.5 py-1.5 rounded-full transition-colors group-hover:bg-emerald-100 whitespace-nowrap">
             <span className="text-[12px] font-bold font-cairo leading-none">مستقل</span>
          </div>
        )}
      </div>
    </button>
  );
};
