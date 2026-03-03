"use client";
import { useState } from "react";
import RequestSidebar from "@/components/requests/RequestSidebar";
import RequestContent from "@/components/requests/RequestContent";
import RequestsLayout from "@/components/requests/RequestsLayout";
import UserProfileHeader from "@/components/requests/UserProfileHeader";
import StatsCards from "@/components/requests/StatsCards";
import ProposalList from "@/components/requests/ProposalList";
import { useRequestsData } from "@/hooks/requests/useRequestsData";
import LoadingPage from "../loading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PendingPage() {
  const [activeSection, setActiveSection] = useState("pending");
  const {
    data,
    proposals,
    isLoading,
    userProfile,
    currentUser,
    isAuthChecking,
    handleDeleteProposal,
    handleDeleteJobRequest,
    handleEditJobRequest,
    handleEvaluateFreelancer
  } = useRequestsData();


  // Show loading screen while checking authentication
  if (isAuthChecking) {
    return (
      <RequestsLayout>
        <LoadingPage />
      </RequestsLayout>
    );
  }


  const handleSidebarClick = (itemId: string) => {
    setActiveSection(itemId);
  };



  const getSectionContent = () => {
    const isClient = currentUser?.isClient;
    
    switch (activeSection) {

      case "pending":
        if (isClient) {
          return {
            title: "بانتظار الموافقة",
            subtitle: "طلبات العمل التي تنتظر موافقتك",
            data: data?.jobRequests?.filter((r: any) => r.status === 'Pending') || []
          };
        }
        return {
          title: "بانتظار الموافقة",
          subtitle: "العروض التي قدمتها وانتظر موافقة العملاء",
          data: proposals?.proposals?.filter((p: any) => p.status === 'Pending') || []
        };
      case "in-progress":
        if (isClient) {
          return {
            title: "قيد التنفيذ",
            subtitle: "المشاريع التي تم قبولها وقيد التنفيذ",
            data: data?.jobRequests?.filter((p: any) => p.status === "InProgress") || []
          };
        }
        return {
          title: "قيد التنفيذ",
          subtitle: "المشاريع التي تم قبولها وقيد التنفيذ",
          data: proposals?.proposals?.filter((p: any) => p.status === "Accepted") || []
        };
      case "completed":
        if (isClient) {
          return {
            title: "المكتملة",
            subtitle: "المشاريع التي تم إنجازها بنجاح",
            data: data?.jobRequests?.filter((p: any) => p.status === 'Completed') || []
          };
        }
        return {
          title: "المكتملة",
          subtitle: "المشاريع التي تم إنجازها بنجاح",
          data: proposals?.proposals?.filter((p: any) => p.status === 'Completed') || []
        };
      case "profile":
        return {
          title: "الحساب الشخصي",
          subtitle: "معلوماتك الشخصية والاحترافية",
          data: []
        };
      case "notifications":
        return {
          title: "الإشعارات",
          subtitle: "آخر الإشعارات والتحديثات",
          data: []
        };
      case "messages":
        return {
          title: "الرسائل",
          subtitle: "محادثاتك مع العملاء",
          data: []
        };
      default:
        if (isClient) {
          return {
            title: "بانتظار الموافقة",
            subtitle: "طلبات العمل التي تنتظر موافقتك",
            data: data?.jobRequests?.filter((r: any) => r.status === 'Pending') || []
          };
        }
        return {
          title: "بانتظار الموافقة",
          subtitle: "العروض التي قدمتها وانتظر موافقة العملاء",
          data: proposals?.proposals?.filter((p: any) => p.status === 'Pending') || []
        };
    }
  };

  const sectionContent = getSectionContent();

  return (
    <RequestsLayout>
      <div className="bg-linear-to-br from-primary to-primary-100">
        {/* Modern Header with User Profile */}
        <UserProfileHeader
          userProfile={userProfile}
          currentUser={currentUser}
        />

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <StatsCards 
              proposals={proposals} 
              data={data} 
              isClient={currentUser?.isClient} 
            />

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="">
              <RequestSidebar
                activeItem={activeSection}
                onItemClick={handleSidebarClick}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 rounded-2xl p-5 shadow-lg shadow-gray-200 bg-white border border-gray-100 overflow-hidden">
              <RequestContent
                title={sectionContent.title}
                subtitle={sectionContent.subtitle}
                isLoading={isLoading}
              >
                <ProposalList
                  sectionContent={sectionContent}
                  onDeleteProposal={handleDeleteProposal}
                  isClient={currentUser?.isClient}
                  onDeleteJobRequest={handleDeleteJobRequest}
                  onEditJobRequest={handleEditJobRequest}
                  onEvaluateFreelancer={handleEvaluateFreelancer}
                />
              </RequestContent>
            </div>
          </div>
        </div>
      </div>
    </RequestsLayout>
  );
}
