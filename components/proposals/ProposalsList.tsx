import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import ProposalCard from "./ProposalCard";

interface ProposalsListProps {
  proposals?: ProposalDisplay[];
  title?: string;
}

export default function ProposalsList({
  proposals = [], // Default to an empty array
  title = "العروض",
}: ProposalsListProps) {
  if (proposals.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">لا توجد عروض بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-right mt-4 p-4 text-gray-900">
        {title} ({proposals.length})
      </h2>
      <div className="space-y-3 w-full">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
