"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import ProjectHeader from "@/components/announcements/detail/ProjectHeader";
import ProjectDetails from "@/components/announcements/detail/ProjectDetails";
import ProjectSkills from "@/components/announcements/detail/ProjectSkills";
import ProjectActions from "@/components/announcements/detail/ProjectActions";
import ProjectProposals from "@/components/proposals/ProjectProposals";
import LoadingState from "@/components/announcements/detail/LoadingState";
import ErrorState from "@/components/announcements/detail/ErrorState";
import { useAuth } from "@/hooks/auth/useAuth";
import { getCurrentUser } from "@/utils/auth";
import ClientInfo from "@/components/announcements/detail/ClientInfo";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const currentUser = getCurrentUser();
  const isFreelancer = currentUser?.isFreelancer;
  const { isAuthenticated } = useAuth();
  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });

  // Check if current user is the owner of this project
  const isOwner = currentUser?.id === project?.clientId;

  const [submittedProposalId, setSubmittedProposalId] = useState<number | null>(
    null,
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !project) {
    return <ErrorState />;
  }

  return (
    <div className="bg-bg  w-full flex flex-col">
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>

      <section
        className="px-4 md:px-6 lg:px-8 min-h-[90vh]  w-full max-w-8xl mx-auto py-8 md:py-12 flex-1 "
        dir="ltr"
      >
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Sidebar - Actions (Left side in RTL) */}
          <aside className="w-full lg:w-90 shrink-0 order-2 lg:order-1 flex flex-col gap-4">
            {!isOwner && <ClientInfo project={project} />}
            <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
              <ProjectActions
                project={project}
                projectOwnerId={project.clientId}
                jobRequestId={project.id}
                onProposalSuccess={(id) => setSubmittedProposalId(id)}
                onSendMessage={() => console.log("Send message")}
                onEditProject={() =>
                  router.push(`/announcements/edit/${projectId}`)
                }
                onDeleteProject={() => console.log("Delete project")}
              />
            </div>
          </aside>

          {/* Main Content (Right side in RTL) */}
          <main className="flex-1 order-1 lg:order-2 bg-white py-4 px-8 shadow-lg rounded-2xl flex flex-col">
            {/* Project Header: Title, Status, Meta */}
            <ProjectHeader project={project} />

            {/* Info Cards: Budget, Duration, Deadline */}
            <ProjectDetails project={project} />

            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-dark mb-3 text-right">
                التفاصيل
              </h3>
              <p className="text-base text-gray-medium leading-relaxed text-right">
                {project.description}
              </p>
            </div>

            {/* Skills Section */}
            <ProjectSkills project={project} />

            {/* Proposals Section */}
          </main>
        </div>
        {isAuthenticated && (
          <div className="w-[50%] ml-auto mt-8 ">
            <ProjectProposals jobRequestId={project.id} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
