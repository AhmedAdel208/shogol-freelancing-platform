"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userService } from "@/lib/api/user";
import { Freelancer } from "@/types/freelancers";
import { Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import WorkersLayout from "@/components/layout/WorkersLayout";
import RequestsToolbar from "@/components/workers/RequestsToolbar";
import image from "@/public/images/male-face.jpg";


export default function WorkersPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  async function loadFreelancers() {
    setLoading(true);
    setError(null);
    const data = await userService.searchFreelancers({});
    setFreelancers(data.freelancers);
    setLoading(false);
  }

  useEffect(() => {
    loadFreelancers();
  }, []);

  return (
    <WorkersLayout>
      <div className="px-4 py-8 max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">تصفح المشتغلين </h1>
                <RequestsToolbar />

        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-gray-500" size={48} />
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && freelancers.length === 0 && (
          <p>لا يوجد مشتغلين لعرضهم حالياً.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freelancers.map((f) => {
            const imgSrc = f.profilePictureUrl || image;
            return (
              <Link
                key={f.id}
                href={`/workers/${f.id}`}
                className="flex hover:border-blue-700 duration-300 hover:scale-102 flex-col gap-2 p-4 bg-white rounded-lg shadow border hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={imgSrc}
                      alt={f.fullName || "profile"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="font-semibold text-lg">
                      {f.fullName || "مستخدم"}
                    </div>
                    {f.nationality && (
                      <div className="text-xs text-gray-500">
                        {f.nationality}
                      </div>
                    )}
                  </div>
                </div>
                {f.bio && (
                  <div className="wrap-break-word text-sm text-gray-700 mb-1">
                    {f.bio}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 items-center text-xs text-gray-600 mb-1">
                  {typeof f.rating !== "undefined" && (
                    <span>⭐ {f.rating}</span>
                  )}
                  {typeof f.completedJobsCount !== "undefined" && (
                    <span>الوظائف المكتملة: {f.completedJobsCount}</span>
                  )}
                </div>
                {f.skills && f.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {f.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs"
                      >
                        {skill.nameAr}
                      </span>
                    ))}
                  </div>
                )}
              
              </Link>
            );
          })}
        </div>
      </div>
    </WorkersLayout>
  );
}
