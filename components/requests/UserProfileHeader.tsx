import { User, Briefcase } from "lucide-react";

interface UserProfileHeaderProps {
  userProfile: any;
  currentUser: any;
}

export default function UserProfileHeader({ userProfile, currentUser }: UserProfileHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 bg-linear-to-br from-primary to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-35">
          {userProfile && (
            <div className="flex items-center hover:scale-105 transition-all duration-300  gap-4 space-x-3 space-x-reverse bg-linear-to-l shadow-lg from-primary to-primary-200 rounded-2xl px-4 py-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  {userProfile.profileImage ? (
                    <img
                      src={userProfile.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-start">
                <p className="text-2xl font-semibol font-bold  text-gray-900">
                  {userProfile.firstName && userProfile.lastName
                    ? `${userProfile.firstName} ${userProfile.lastName}`
                    : userProfile.username || 'المستخدم'}
                </p>
                <p className="text-sm text-gray-700">
                  {currentUser?.isFreelancer ? 'مستقل' : currentUser?.isClient ? 'عميل' : 'مستخدم'}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4 space-x-reverse gap-4 shadow-2xl bg-linear-to-l from-primary to-primary-200 rounded-2xl p-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-xl font-bold text-gray-900">طلباتي</h1>
              <p className="text-sm text-gray-600">إدارة عروضك ومشاريعك</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
