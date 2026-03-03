import { Briefcase, Calendar, Eye, Trash, Edit, Users, Star } from "lucide-react";

interface ProposalCardProps {
  offer: any;
  onDeleteProposal: (proposalId: number) => void;
  isClient?: boolean;
  onDeleteJobRequest?: (jobRequestId: number) => void;
  onEditJobRequest?: (jobRequestId: number) => void;
  onEvaluateFreelancer?: (jobRequestId: number, freelancerId: string) => void;
}

export default function ProposalCard({ offer, onDeleteProposal, isClient = false, onDeleteJobRequest, onEditJobRequest, onEvaluateFreelancer }: ProposalCardProps) {
  const handleViewDetails = () => {
    if (isClient) {
      // For clients: navigate to job request page
      window.location.href = `/announcements/${offer.id}`;
    } else {
      // For freelancers: navigate to job request page (viewing the request they applied to)
      window.location.href = `/announcements/${offer.jobRequestId}`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-white rounded-2xl to-gray-50 border border-gray-200 p-6 hover:shadow-lg transition-all duration-400 hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 space-x-reverse mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">
              {isClient ? offer.title || "طلب عمل" : "عرضك علي الطلب"}
            </h3>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {isClient ? offer.description : offer.description}
          </p>

          {/* Enhanced details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center space-x-2 space-x-reverse bg-blue-50 rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-blue-900">
                {isClient 
                  ? `الميزانية: $${offer.budget || "غير محدد"}`
                  : `قيمه العرض :  ${offer.proposedPrice || "غير محدد"}`
                }
              </span>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse bg-purple-50 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                {isClient 
                  ? `تاريخ النشر: ${offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('ar-SA') : 'غير محدد'}`
                  : `مدة التنفيذ: ${offer.proposedDurationInDays + "يوم" || 'غير محدد'}`
                }
              </span>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${offer.status === 'Accepted'
                ? 'bg-green-100 text-green-800'
                : offer.status === 'Rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${offer.status === 'Accepted'
                  ? 'bg-green-400'
                  : offer.status === 'Rejected'
                    ? 'bg-red-400'
                    : 'bg-yellow-400'
                  }`}></span>
                {offer.status === 'Accepted' ? 'مقبول' : offer.status === 'Rejected' ? 'مرفوض' : 'قيد الانتظار'}
              </span>
            </div>
          </div>

          {/* Skills section for clients */}
          {isClient && offer.skills && offer.skills.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                <Users className="w-5 h-5 text-gray-600" />
                <h4 className="text-lg font-semibold text-gray-900">المهارات المطلوبة</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {offer.skills.map((skill: any, index: number) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
                    {typeof skill === 'string' ? skill : skill.nameAr || skill.nameEn || skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Action buttons */}
        <div className="flex flex-col space-y-2 mr-4">
          <button 
            onClick={handleViewDetails}
            className="bg-blue-600 gap-2 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center"
          >
            عرض التفاصيل الطلب
            <Eye className="w-4 h-4 ml-2" />
          </button>
          
          {isClient && (offer.status === 'Pending' || offer.status === 'Accepted') && (
            <>
              <button 
                onClick={() => onEditJobRequest?.(offer.id)}
                className="bg-green-600 gap-2 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center"
              >
                تعديل
                <Edit className="w-4 h-4 ml-2" />
              </button>
              <button 
                onClick={() => onDeleteJobRequest?.(offer.id)}
                className="bg-red-600 gap-2 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center"
              >
                حذف
                <Trash className="w-4 h-4 ml-2" />
              </button>
            </>
          )}
          
          {isClient && (offer.status === 'Completed') && (
            <button 
              onClick={() => onEvaluateFreelancer?.(offer.id, offer.freelancerId)}
              className="bg-yellow-600 gap-2 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center"
            >
              تقييم المستقل
              <Star className="w-4 h-4 ml-2" />
            </button>
          )}
          
          {!isClient && offer.status !== 'Completed' && (
            <button 
              onClick={() => onDeleteProposal(offer.id)}
              className="bg-gray-100 gap-2 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center"
            >
              سحب العرض
              <Trash className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
