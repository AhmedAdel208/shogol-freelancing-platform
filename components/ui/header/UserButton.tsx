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
    <button className="flex  cursor-pointer items-center gap-3 px-3.5 py-2 rounded-full bg-white border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 group active:scale-[0.98]">
      {/* User Details (RTL optimized) */}
      <div className="flex flex-col items-end px-1">
      
        
        {/* Role Badge (Modern Solid Pill) */}
        {isClientRole && (
          <div className="bg-[#1a3d82] text-[#5cb9ff] px-3 py-2 rounded-full shadow-sm flex items-center justify-center">
             <span className="text-[11px] font-black font-cairo tracking-wider uppercase leading-[1.2]">عميل</span>
          </div>
        )}
        {isFreelancerRole && (
          <div className="bg-[#059669] text-emerald-50 px-3 py-2 rounded-full shadow-sm flex items-center justify-center">
             <span className="text-[11px] font-black font-cairo tracking-wider uppercase leading-[1.2]">مستقل</span>
          </div>
        )}
      </div>

      {/* Profile Picture / Initials */}
      <div className="relative shrink-0">
        <div className="w-[42px] h-[42px] rounded-full overflow-hidden transition-all duration-500 group-hover:scale-110 ring-2 ring-white shadow-md bg-linear-to-br from-gray-50 to-white flex items-center justify-center border border-gray-100">
          {profile.profilePictureUrl || profile.profilePicture ? (
            <Image
              src={profile.profilePictureUrl || profile.profilePicture}
              alt={userName}
              width={42}
              height={42}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-primary font-black text-[15px] font-cairo">
              {getInitials()}
            </span>
          )}
        </div>

  
      </div>
    </button>
  );
};
