import { useState, useRef, useEffect } from "react";
import { User, LayoutGrid, LogOut, ChevronLeft } from "lucide-react";
import { useProfile } from "@/hooks/profile/useProfile";
import Image from "next/image";
import { useAuth } from "@/hooks/auth/useAuth";
import MenuLink from "@/components/ui/MenuLink";
import { getUserName, getUserInitials } from "@/utils";
import Spinner from "@/common/Spinner";

export const UserButton = () => {
  const { data: profile, isLoading, error } = useProfile();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="w-11 h-11 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
        <Spinner size={5} className="text-primary/40" inline />
      </div>
    );
  }

  if (error || !profile) return null;

  const isClientRole = user?.isClient;
  const userName = getUserName(profile);
  const getInitials = () => getUserInitials(profile);

  return (
    <div className="relative" ref={dropdownRef} dir="rtl">
      {/* Profile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative cursor-pointer transition-all duration-500 active:scale-90 group ${
          isOpen ? "scale-110" : ""
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full overflow-hidden border  transition-all duration-500 flex  items-center justify-center 
            ${isClientRole ? "border-[#1CB2B9] bg-[#1CB2B9]/5" : "border-emerald-500 bg-emerald-50"}
           `}
        >
          {profile.profilePictureUrl || profile.profilePicture ? (
            <Image
              src={profile.profilePictureUrl || profile.profilePicture}
              alt={userName}
              width={50}
              height={50}
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <span
              className={`font-black text-sm font-cairo ${isClientRole ? "text-[#1CB2B9]" : "text-emerald-600"}`}
            >
              {getInitials()}
            </span>
          )}
        </div>
      </button>

      {/* Modern Calm Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-72 bg-[#1C252E] rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 p-3 z-50 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
          {/* Header Area (Information Box) */}
          <div className="bg-white/3 p-5 rounded-3xl mb-3 flex flex-col items-center gap-3">
            <div className="space-y-1 text-center">
              <p className="text-white font-black font-cairo text-lg leading-tight tracking-tight">
                {userName}
              </p>
              <div
                className={`inline-flex px-4 py-1 rounded-full text-[12px] font-black font-cairo 
                  ${isClientRole ? "bg-[#1CB2B9]/20 text-[#1CB2B9]" : "bg-emerald-500/20 text-emerald-400"}`}
              >
                {isClientRole ? "عـميل" : "مستقـل"}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <MenuLink
              href="/profile"
              icon={<User size={18} />}
              label="الملف الشخصي"
              onClick={() => setIsOpen(false)}
            />
            <MenuLink
              href="/requests"
              icon={<LayoutGrid size={18} />}
              label="طلباتي"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 my-3 mx-2" />

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 cursor-pointer group/logout"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-rose-500/10 rounded-xl group-hover/logout:bg-rose-500/20 transition-colors">
                <LogOut size={18} />
              </span>
              <span className="font-black font-cairo text-[15px]">
                تسجيل الخروج
              </span>
            </div>
            <ChevronLeft
              size={16}
              className="opacity-30 group-hover/logout:opacity-100 transition-opacity"
            />
          </button>
        </div>
      )}
    </div>
  );
};
