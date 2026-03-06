import { User, Plus } from "lucide-react";
import Link from "next/link";
import { getUserName } from "@/utils/user";
import { UserProfile } from "@/types/user";

interface UserProfileHeaderProps {
  userProfile?: UserProfile;
}

export default function UserProfileHeader({ userProfile }: UserProfileHeaderProps) {
  return (
    <header className="relative bg-linear-to-r from-primary/60 to-primary/90 overflow-hidden">


      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
          <div className="flex items-center gap-6" dir="rtl">
            <div className="relative group">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center overflow-hidden border border-white/30 shadow-xl">
                {userProfile?.profilePictureUrl ? (
                  <img
                    src={userProfile.profilePictureUrl  }
                    alt="Profile image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white/50" />
                )}
              </div>
            
            </div>
            
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                {getUserName(userProfile)}
              </h1>
              <div className="flex items-center justify-start gap-2">
                <span className="text-teal-50 font-black bg-white/10 px-4 mt-2 rounded-2xl text-[10px] uppercase tracking-widest border border-white/10">
                  {userProfile?.isClient ? 'صاحب مشاريع' : userProfile?.isFreelancer ? 'مستقل' : 'مستخدم'}
                </span>
              </div>
            </div>
          </div>

          {/* Left side: Action Button */}
          {userProfile?.isClient && (
            <Link 
              href="/projects/create" 
              className="group flex items-center gap-4 bg-white text-primary px-10 py-3 rounded-4xl font-black shadow-2xl shadow-black/10 hover:bg-teal-50 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="bg-primary/10 p-2 rounded-xl transition-transform duration-500 group-hover:rotate-90">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-base">إضافة طلب جديد</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
