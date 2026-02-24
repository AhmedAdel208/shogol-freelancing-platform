import { Worker } from "@/types/workers";
import { SkillCategory } from "@/types/skills";
import { Calendar, MapPin } from "lucide-react";
import image from "@/public/images/male-face.jpg";

export default function ProfileCard({ user }: { user: Worker }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={user.coverImageUrl || image.src}
            className="w-24 h-24 rounded-full border-4 border-cyan-500"
            alt="avatar"
          />
          {user.lastOnlineAt && (
            <span className="absolute bottom-1 left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>

        <h2 className="mt-3 font-semibold text-lg">{user.fullName}</h2>

        <p className="text-cyan-600 text-sm">
          {user.skillCategories?.[0]?.nameEn}
        </p>

        <div className="flex items-center gap-1 text-yellow-400 mt-1">
          {"★".repeat(Math.round(user.averageRating || 0))}
          <span className="text-gray-500 text-sm">
            {user.averageRating ? user.averageRating.toFixed(1) : "No ratings"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <p className="font-semibold text-black">{user.averageRating}%</p>
          <p>نسبة الإنجاز</p>
        </div>
        <div>
          <p className="font-semibold text-black">{user.completedJobsCount}</p>
          <p>مشروع مكتمل</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* Location */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="text-cyan-500 w-5 h-5" />
            <p className="font-semibold text-black">الموقع</p>
          </div>
          <div>
            <p className="text-gray-600">
              {user.address ? `${user.address} ر.س/ساعة` : "غير محدد"}
            </p>
          </div>
        </div>

        {/* Joined date */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="text-cyan-500 w-5 h-5" />
            <p className="font-semibold text-black">انضم منذ</p>
          </div>
          <div>
            <p className="text-gray-600">
              {user.lastOnlineAt
                ? new Date(user.lastOnlineAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "غير محدد"}
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold mb-2">المهارات</h3>
        <div className="flex flex-wrap gap-2">
          {user.skillCategories?.map(
            (skillCategory: SkillCategory, i: number) => (
              <div key={i} className="mb-2">
                {/* Optional: Category title */}
                {skillCategory.nameEn && (
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    {skillCategory.nameEn}
                  </h4>
                )}

                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-medium shadow-sm"
                    >
                      {skill.nameEn}
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
