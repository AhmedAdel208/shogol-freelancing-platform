"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PortfolioSection from "@/components/workers/profileSection";
import ReviewsSection from "@/components/workers/ReviewsSection";
import { userService } from "@/lib/api/user";
import { Worker } from "@/types/workers";
import ProfileCard from "@/components/workers/ProfileCard";
import WorkersLayout from "@/components/layout/WorkersLayout";


export default function ProfilePage() {
  //   const params = useParams();
  const { id } = useParams();

  const [data, setData] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProfile() {
    setLoading(true);
    setError(null);

    try {
      const response : Worker = await userService.getAccountDetails({ id: String(id) });
      setData(response); // ✅ store the API response
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-10 text-center">No profile found</div>;

  return (
    <WorkersLayout>
    <div className="min-h-screen">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={data.coverImageUrl || "/cover.jpg"}
          className="w-full h-full object-cover  scale-110"
          alt="cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PortfolioSection portfolio={data.portfolios || []} />
            <ReviewsSection reviews={data.reviews || []} />
          </div>

          <ProfileCard user={data} />
        </div>
      </div>
    </div>
    </WorkersLayout>
  );
}
