"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import ProjectHeader from "@/components/announcements/detail/ProjectHeader";
import ClientInfo from "@/components/announcements/detail/ClientInfo";
import ProjectDetails from "@/components/announcements/detail/ProjectDetails";
import ProjectSkills from "@/components/announcements/detail/ProjectSkills";
import ProjectActions from "@/components/announcements/detail/ProjectActions";
import LoadingState from "@/components/announcements/detail/LoadingState";
import ErrorState from "@/components/announcements/detail/ErrorState";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !project) {
    return <ErrorState />;
  }

  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />

      <section className="px-4 md:px-6 lg:px-8 max-w-8xl mx-auto py-8 md:py-12 lg:py-16">
        {/* Main Card Detail */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border">
          {/* Content Section */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Project Header */}
            <ProjectHeader project={project} />

            {/* Description */}
            <p className="text-base md:text-lg text-gray-medium mb-8 text-right leading-relaxed">
              {project.description}
            </p>

            {/* Client Info */}
            <ClientInfo project={project} />

            {/* Project Details */}
            <ProjectDetails project={project} />

            {/* Skills */}
            <ProjectSkills project={project} />

            {/* Action Buttons */}
            <ProjectActions
              onProposalSubmit={() => console.log("Submit proposal")}
              onSaveProject={() => console.log("Save project")}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
