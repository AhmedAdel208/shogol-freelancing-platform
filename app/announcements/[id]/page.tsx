"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteProject } from "@/hooks/project/useDeleteProject";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { useProjectDetail } from "@/hooks/project/useProjectDetail";
import ProjectHeader from "@/container/announcements/detail/ProjectHeader";
import ProjectDetails from "@/container/announcements/detail/ProjectDetails";
import ProjectSkills from "@/container/announcements/detail/ProjectSkills";
import ProjectAttachments from "@/container/announcements/detail/ProjectAttachments";
import ProjectActions from "@/container/announcements/detail/ProjectActions";
import ProjectProposals from "@/container/proposals/ProjectProposals";
import CreateProposalForm from "@/container/proposals/CreateProposalForm";
import ErrorState from "@/container/announcements/detail/ErrorState";
import ClientInfo from "@/container/announcements/detail/ClientInfo";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/common/Loading";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { isAuthenticated, user } = useAuth();
  const [showProposalForm, setShowProposalForm] = useState(false);

  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });


  // Check if current user is the owner of this project
  const isOwner = user?.id === project?.clientId;
  const isClient = user?.isClient;
  const isFreelancer = user?.isFreelancer;

  const hasSubmittedProposal = project?.proposals?.some(
    (proposal) => proposal.freelancerId === user?.id,
  );

  const { deleteProject } = useDeleteProject();

  const handleDeleteProject = () => {
    deleteProject(projectId);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !project) {
    return <ErrorState />;
  }

  return (
    <div className="bg-bg  w-full flex flex-col ">
      <header className="bg-white sticky top-0 z-100 shadow-sm">
        <Gradientline />
        <LinksHeader />
      </header>

      <section
        className="px-4 md:px-6 lg:px-8 min-h-screen w-full max-w-8xl mx-auto py-6 md:py-8"
        dir="ltr"
      >
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - Actions (Left side in RTL) */}
          <aside className="w-full lg:w-96 shrink-0 order-2 lg:order-1 flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
            {!isOwner && (
              <ClientInfo
                project={project}
                onSendMessage={() => console.log("Send message")}
              />
            )}
            {(isOwner || isFreelancer || !isAuthenticated) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <ProjectActions
                  projectOwnerId={project.clientId}
                  jobRequestId={project.id}
                  projectStatus={project.status}
                  hasSubmittedProposal={hasSubmittedProposal}
                  onSendMessage={() => console.log("Send message")}
                  onEditProject={() =>
                    router.push(`/announcements/edit/${projectId}`)
                  }
                  onDeleteProject={handleDeleteProject}
                  onShowProposalForm={() => setShowProposalForm(true)}
                />
              </div>
            )}
          </aside>

          {/* Main Content (Right side in RTL) */}
          <main className="flex-1 order-1 lg:order-2 bg-white p-6   shadow-sm rounded-4xl border border-gray-100 flex flex-col relative">
            {/* Project Header: Title, Status, Meta */}
            <ProjectHeader project={project} />

            {/* Info Cards: Budget, Duration, Deadline */}
            <ProjectDetails project={project} />

            {/* Description Section */}
            <div className="mb-8 font-cairo" dir="rtl">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                وصف المشروع
              </h3>
              <div className="text-[16px] text-gray-600 leading-relaxed text-right bg-gray-50/50 p-4 rounded-2xl border border-gray-100 transition-colors hover:bg-white hover:shadow-sm">
                {project.description}
              </div>
            </div>

            {/* Skills Section */}
            <ProjectSkills project={project} />

            {/* Attachments Section */}
            <div className="mt-6">
              <ProjectAttachments attachments={project.attachments} />
            </div>

            {/* Proposal Submission (Inline) */}
            {isFreelancer && !isOwner && !hasSubmittedProposal && showProposalForm && (
              <div id="proposal-form-section" className="mt-12 pt-12 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                <CreateProposalForm jobRequestId={projectId} />
              </div>
            )}
          </main>
        </div>

        <div className="w-full lg:w-[calc(100%-400px)] ml-auto mt-6 mb-20 animate-in fade-in duration-1000">
          <ProjectProposals jobRequestId={project.id.toString()} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
