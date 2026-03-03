"use client";

import { useProfile } from "@/hooks/profile/useProfile";
import { useUserSkills } from "@/hooks/profile/useUserSkills";
import Loading from "@/common/Loading";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import { useAuth } from "@/hooks/auth/useAuth";
import ProfileIdentityCard from "@/components/profile/ProfileIdentityCard";
import ProfileCoverSection from "@/components/profile/ProfileCoverSection";
import ProfileSkillsSection from "@/components/profile/ProfileSkillsSection";
import ProfileBioSection from "@/components/profile/ProfileBioSection";
import ProfilePortfolioSection from "@/components/profile/ProfilePortfolioSection";

export default function ProfileSettingsPage() {
  const { data: safeProfile, isLoading, error } = useProfile();
  const { data: userSkills, isLoading: skillsLoading } = useUserSkills();
  console.log(userSkills)
  console.log(safeProfile)
  const { user } = useAuth(); // Auth user

  if (isLoading) return <Loading />;


  return (
    <div className="bg-slate-50/50 min-h-screen w-full font-cairo" dir="rtl">
      <Gradientline />
      <LinksHeader />

      <main className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        
        {/* Profile Identity Card Component */}
        <ProfileIdentityCard profile={safeProfile} />

        {/* Cover Image Section Component */}
        <ProfileCoverSection coverImageUrl={safeProfile.coverImageUrl} />

        {/* Skills Section */}
        <ProfileSkillsSection 
          skills={userSkills || []} 
          isLoading={skillsLoading} 
        />

        {/* Bio Section */}
        <ProfileBioSection bio={safeProfile.bio} />

        {/* Portfolio Section */}
        <ProfilePortfolioSection portfolios={safeProfile.portfolios || []} />

      </main>

      <Footer />
    </div>
  );
}
