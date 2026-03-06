import { Eye, Trash, Edit, Clock, Banknote, Calendar, Briefcase, Star } from "lucide-react";
import React, { useState } from "react";
import EvaluationModal from "./EvaluationModal";
import { formatTimeAgo } from "@/utils/date";

interface ProposalCardProps {
  offer: any;
  onDeleteProposal: (proposalId: number) => void;
  isClient?: boolean;
  onDeleteJobRequest?: (jobRequestId: number) => void;
  onEditJobRequest?: (jobRequestId: number) => void;
  onEvaluateFreelancer?: (jobRequestId: number, freelancerId: string, rating: number, comment: string) => void;
  onDeliverRequest?: (jobRequestId: number) => void;
  isEvaluating?: boolean;
}

export default function ProposalCard({ 
  offer, 
  onDeleteProposal, 
  isClient = false, 
  onDeleteJobRequest, 
  onEditJobRequest, 
  onDeliverRequest,
  onEvaluateFreelancer,
  isEvaluating = false
}: ProposalCardProps) {
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);

  const handleViewDetails = () => {
    if (isClient) {
      window.location.href = `/announcements/${offer.id}`;
    } else {
      window.location.href = `/announcements/${offer.jobRequestId}`;
    }
  };

  const statusMap = {
    'Accepted': { label: 'مقبول', color: 'bg-[#ccdcda] text-[#00b5bc] border-[#ccdcda]' },
    'Rejected': { label: 'مرفوض', color: 'bg-red-50 text-red-500 border-red-100' },
    'Pending': { label: 'قيد الانتظار', color: 'bg-amber-50 text-amber-500 border-amber-100' },
    'InProgress': { label: 'قيد التنفيذ', color: 'bg-blue-50 text-blue-500 border-blue-100' },
    'Completed': { label: 'مكتمل', color: 'bg-emerald-50 text-emerald-500 border-emerald-100' },
  };

  const currentStatus = statusMap[offer.status as keyof typeof statusMap] || statusMap['Pending'];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClient) {
      onDeleteJobRequest?.(offer.id);
    } else {
      onDeleteProposal(offer.id);
    }
  };

  const handleDeliver = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isClient && (offer.status === 'Accepted' || offer.status === 'InProgress' || offer.status === 'Pending')) {
      const idToDeliver = offer.jobRequestId || offer.id;
      onDeliverRequest?.(idToDeliver);
    }
  };

  const handleOpenEval = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEvalModalOpen(true);
  };

  const handleEvalSubmit = (rating: number, comment: string) => {
    onEvaluateFreelancer?.(offer.id, offer.freelancerId || "", rating, comment);
    // Modal will be closed by state in parent often, but we can close it here if mutation is handled
    setIsEvalModalOpen(false);
  };

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 relative text-right flex flex-col gap-6" dir="rtl">
        {/* Status Badge Top Right */}
        <div className="flex justify-start">
          <span className={`px-5 py-2 rounded-full text-[10px] font-black border ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-black text-gray-800">
            {offer.title || offer.jobRequestTitle || "طلب عمل"}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-full overflow-hidden text-ellipsis opacity-80">
            {offer.description || "لا يوجد وصف متاح"}
          </p>

          {/* Info Row - Aligned Right in RTL */}
          <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-4 mt-2" dir="rtl">
            {/* Price */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg" dir="ltr">
              <Banknote className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-700 font-black text-sm">{isClient ? (offer.budget ?? 0) : (offer.proposedPrice ?? 0)}</span>
              <span className="text-gray-500 text-xs font-bold">ريال</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg" dir="ltr">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700 font-black text-sm">{offer.durationInDays || offer.proposedDurationInDays || offer.duration || 0}</span>
              <span className="text-gray-500 text-xs font-bold">يوم</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg" dir="ltr">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 text-xs font-bold">
                {offer.timeAgo || (offer.createdAt ? formatTimeAgo(offer.createdAt) : "غير محدد")}
              </span>
            </div>

            {/* Proposals Count (Client only) */}
            {isClient && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg" dir="ltr">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-gray-700 font-black text-sm">{offer.proposalsCount ?? 0}</span>
                <span className="text-gray-500 text-xs font-bold">عرض</span>
              </div>
            )}
          </div>

          {/* Category Tag */}
          {(offer.category || offer.skills?.length > 0) && (
            <div className="flex flex-wrap justify-end gap-2 mt-2">
              {offer.skills?.map((skill: any) => (
                <span key={skill.id} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-xl text-[10px] font-black">
                  {skill.nameAr}
                </span>
              )) || (
                <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-2xl text-[11px] font-black tracking-wide">
                  {offer.category || "هوية بصرية"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 w-full" />

        {/* Action Buttons Area */}
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Icons Area */}
          <div className="flex gap-2 items-center">
            {offer.status === 'Pending' && (
              <>
                {isClient ? (
                  <>
                    <button 
                      onClick={handleDelete}
                      className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition-all hover:bg-red-50"
                      title="حذف"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEditJobRequest?.(offer.id); }}
                      className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-primary transition-all hover:bg-primary/5"
                      title="تعديل"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-bold font-cairo text-sm transition-all"
                  >
                    سحب العرض
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Main Buttons */}
          <div className="flex gap-4 items-center">
            <button 
              onClick={handleViewDetails}
              className="flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-black text-sm hover:bg-primary/5 transition-all active:scale-95"
            >
              <Eye className="w-4 h-4" />
              عرض التفاصيل
            </button>

            {isClient && offer.status === 'Completed' && (
              <button 
                onClick={handleOpenEval}
                disabled={isEvaluating}
                className="flex items-center gap-2 bg-yellow-500 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-yellow-600 transition-all  active:scale-95"
              >
                <Star className="w-4 h-4 fill-white" />
                تقييم المستقل
              </button>
            )}

            {!isClient && (offer.status === 'InProgress' || offer.status === 'Accepted') && (
              <button 
                onClick={handleDeliver}
                className="flex items-center gap-2 bg-primary text-white px-10 py-3 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                تسليم الطلب
              </button>
            )}
          </div>
        </div>
      </div>

      <EvaluationModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
        onSubmit={handleEvalSubmit}
        isSubmitting={isEvaluating}
      />
    </>
  );
}
