"use client";

import { useRouter } from "next/navigation";
import { MessageCircle, Link } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "@/common/toast";
import { Worker } from "@/types/workers";

interface ProfileActionsProps {
  user: Worker;
}

export default function ProfileActions({ user }: ProfileActionsProps) {
  const router = useRouter();
  const { isAuthenticated, user: loggedInUser } = useAuth();

  const handleContact = () => {
    if (!isAuthenticated) {
      router.push("/signup");
      return;
    }
    // Handle authenticated contact logic here
    toast.info("سيتم تفعيل الدردشة قريباً");
  };

  const handleCopyLink = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        toast.success("تم نسخ رابط الملف الشخصي بنجاح");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="space-y-3">
      {(!isAuthenticated || loggedInUser?.id !== user.id) && (
        <button 
          onClick={handleContact}
          className="w-full bg-primary text-white py-4.5 rounded-[20px] font-black font-cairo text-base hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group/btn cursor-pointer"
        >
          <MessageCircle size={20} className="group-hover/btn:rotate-12 transition-transform" />
          تواصل معي
        </button>
      )}
       
       <button 
         onClick={handleCopyLink}
         className="w-full bg-white border-2 border-slate-100 text-slate-600 py-4.5 rounded-[20px] font-black font-cairo text-base hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer group/copy"
       >
          <Link size={18} className="group-hover/copy:rotate-45 transition-transform" />
          نسخ الرابط
       </button>
    </div>
  );
}
