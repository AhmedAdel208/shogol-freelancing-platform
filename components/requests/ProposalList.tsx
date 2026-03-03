import { User, Bell, MessageSquare } from "lucide-react";
import ProposalCard from "./ProposalCard";
import EmptyState from "./EmptyState";
import ClientEmptyState from "./ClientEmptyState";

interface ProposalListProps {
  sectionContent: any;
  onDeleteProposal: (proposalId: number) => void;
  isClient?: boolean;
  onDeleteJobRequest?: (jobRequestId: number) => void;
  onEditJobRequest?: (jobRequestId: number) => void;
  onEvaluateFreelancer?: (jobRequestId: number, freelancerId: string) => void;
}

export default function ProposalList({ sectionContent, onDeleteProposal, isClient = false, onDeleteJobRequest, onEditJobRequest, onEvaluateFreelancer }: ProposalListProps) {
  // Check if there's no data to show
  if (!sectionContent.data || sectionContent.data.length === 0) {
    // For clients, show ClientEmptyState; for others, show EmptyState
    if (isClient) {
      return <ClientEmptyState />;
    }
    return <EmptyState />;
  }
  if (sectionContent.title === "الحساب الشخصي") {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">الحساب الشخصي</h3>
        <p className="text-gray-600 mb-4">صفحة الملف الشخصي قيد التطوير</p>
        <button 
          onClick={() => window.location.href = '/profile'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          الذهاب إلى الملف الشخصي
        </button>
      </div>
    );
  }

  if (sectionContent.title === "الإشعارات") {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">الإشعارات</h3>
        <p className="text-gray-600 mb-4">صفحة الإشعارات قيد التطوير</p>
        <button 
          onClick={() => window.location.href = '/notifications'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          الذهاب إلى الإشعارات
        </button>
      </div>
    );
  }

  if (sectionContent.title === "الرسائل") {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">الرسائل</h3>
        <p className="text-gray-600 mb-4">صفحة الرسائل قيد التطوير</p>
        <button 
          onClick={() => window.location.href = '/messages'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          الذهاب إلى الرسائل
        </button>
      </div>
    );
  }

  if (sectionContent.title === "الإشعارات") {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">الإشعارات</h3>
        <p className="text-gray-600 mb-4">صفحة الإشعارات قيد التطوير</p>
      </div>
    );
  }

  if (sectionContent.title === "الرسائل") {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">الرسائل</h3>
        <p className="text-gray-600 mb-4">صفحة الرسائل قيد التطوير</p>
      </div>
    );
  }

  if (sectionContent.data.length === 0) {
    return (
      <EmptyState
        title="لا توجد عروض في هذه الفئة"
        description="لم يتم العثور على عروض مطابقة للمعايير المحددة"
        buttonText="تصفح المشاريع"
        onButtonClick={() => window.location.href = "/announcements"}
      />
    );
  }

  return (
    <div className="space-y-4">
      {sectionContent.data.map((offer: any) => (
        <ProposalCard
          key={offer.id}
          offer={offer}
          onDeleteProposal={onDeleteProposal}
          isClient={isClient}
          onDeleteJobRequest={onDeleteJobRequest}
          onEditJobRequest={onEditJobRequest}
          onEvaluateFreelancer={onEvaluateFreelancer}
        />
      ))}
    </div>
  );
}
