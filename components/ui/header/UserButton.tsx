"use client";

import { Loader2 } from "lucide-react";
import { useProfile } from "@/hooks/auth/useProfile";
import Image from "next/image";

export const UserButton = () => {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-xl cursor-default transition-colors">
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

  // Determine user display name
  const userName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : profile.firstName || profile.email?.split("@")[0] || "مستخدم";

  // Create highly premium initials placeholder
  const getInitials = () => {
    if (profile.firstName && profile.lastName) {
      return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
    }
    return userName.charAt(0).toUpperCase();
  };

  return (
    <button className="flex items-center gap-3 px-2 py-1.5 rounded-full hover:bg-gray-50/80 transition-all duration-200 border border-transparent hover:border-gray-100 group shadow-sm hover:shadow">
      {/* Premium Avatar Container */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 ring-2 ring-transparent group-hover:ring-primary/20 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          {profile.profilePictureUrl || profile.profilePicture ? (
            <Image
              src={profile.profilePictureUrl || profile.profilePicture}
              alt={userName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-primary font-bold text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
              {getInitials()}
            </span>
          )}
        </div>

        {/* Active Status Badge */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
      </div>

      {/* User Details */}
      <div className="flex flex-col items-start sm:flex px-1 pb-0.5">
        <span className="text-gray-800  font-semibold whitespace-nowrap group-hover:text-primary transition-colors">
          {userName}
        </span>
      </div>
    </button>
  );
};
