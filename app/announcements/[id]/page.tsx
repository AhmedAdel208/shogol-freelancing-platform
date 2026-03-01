"use client";

import { useParams, useRouter } from "next/navigation";
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
import ProjectProposals from "@/components/proposals/ProjectProposals";
import CreateProposalForm from "@/components/proposals/CreateProposalForm";
import ErrorState from "@/container/announcements/detail/ErrorState";
import ClientInfo from "@/container/announcements/detail/ClientInfo";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/common/Loading";

export default function AnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { isAuthenticated, user } = useAuth();

  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });
  console.log(project);

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
        className="px-4 md:px-6  lg:px-8 min-h-[90vh] w-full max-w-8xl mx-auto py-4 md:py-6 flex-1"
        dir="ltr"
      >
        <div className="flex flex-col lg:flex-row gap-8 flex-1">
          {/* Sidebar - Actions (Left side in RTL) */}
          <aside className="w-full lg:w-100 shrink-0 order-2 lg:order-1 flex flex-col gap-6 lg:sticky lg:top-24 h-fit z-50">
            {!isOwner && (
              <ClientInfo
                project={project}
                onSendMessage={() => console.log("Send message")}
              />
            )}
            {isOwner || isFreelancer || !isAuthenticated ? (
              <div className="bg-[#ffffff] rounded-3xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100/80 p-8">
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
                />
              </div>
            ) : null}
          </aside>

          {/* Main Content (Right side in RTL) */}
          <main className="flex-1 order-1 lg:order-2 bg-[#ffffff] p-6 md:p-10 shadow-[0_2px_40px_rgba(0,0,0,0.04)] rounded-4xl border border-white flex flex-col relative overflow-hidden z-0">
            {/* Soft decorative background blur */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />

            {/* Project Header: Title, Status, Meta */}
            <ProjectHeader project={project} />

            {/* Info Cards: Budget, Duration, Deadline */}
            <ProjectDetails project={project} />

            {/* Description Section */}
            <div className="mb-6 font-cairo" dir="rtl">
              <h3 className="text-[1.15rem] font-bold text-gray-900 mb-3 text-right">
                التفاصيل
              </h3>
              <p className="text-[16px] text-gray-600 leading-8 text-right bg-slate-50/50 p-5 rounded-[20px] border border-slate-100/60 shadow-inner">
                {project.description}
              </p>
            </div>

            {/* Skills Section */}
            <ProjectSkills project={project} />

            {/* Attachments Section */}
            <ProjectAttachments attachments={project.attachments} />

            {/* Proposal Submission (Inline) */}
            {isFreelancer && !isOwner && !hasSubmittedProposal && (
              <div className="mt-12 mb-8">
                <CreateProposalForm jobRequestId={projectId} />
              </div>
            )}
          </main>
        </div>

        <div className="w-full lg:w-[calc(100%-440px)] ml-auto mt-8 mb-16">
          <ProjectProposals jobRequestId={project.id} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
