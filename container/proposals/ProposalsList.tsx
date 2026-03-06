import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import ProposalCard from "./ProposalCard";

interface ProposalsListProps {
  proposals?: ProposalDisplay[];
  title?: string;
  isProjectOwner?: boolean;
}

export default function ProposalsList({
  proposals = [], // Default to an empty array
  title = "العروض",
  isProjectOwner = false,
}: ProposalsListProps) {
  if (proposals.length === 0) {
    return (
      <div className="bg-[#ffffff] rounded-[24px] border border-gray-100/80 p-12 text-center shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 ring-8 ring-slate-50/50">
           <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
           </svg>
        </div>
        <h3 className="text-xl font-bold font-cairo text-gray-900 mb-2">لا توجد عروض مقدمة بعد</h3>
        <p className="text-[15px] font-cairo text-gray-500 max-w-sm">كن أول من يقدم عرضاً وتنافس على هذا المشروع المميز.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mt-4 px-2" dir="rtl">
        <h2 className="text-[1.4rem] font-black tracking-tight text-gray-900 font-cairo">
          {title}
        </h2>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-bold shadow-xs">
          {proposals.length}
        </div>
      </div>
      
      <div className="space-y-4 w-full">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            isProjectOwner={isProjectOwner}
          />
        ))}
      </div>
    </div>
  );
}
