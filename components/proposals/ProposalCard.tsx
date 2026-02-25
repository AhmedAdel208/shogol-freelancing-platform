import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import Image from "next/image";

interface ProposalCardProps {
  proposal: ProposalDisplay;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const statusText = {
  Pending: "قيد الانتظار",
  Accepted: "مقبول",
  Rejected: "مرفوض",
};

export default function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <div
      className="bg-white w-full  text-right  rounded-xl border border-border p-5"
      dir="rtl"
    >
      {/* Top Row: Avatar + Name + Status */}
      <div className="flex items-center  justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
            {proposal.freelancerAvatar ? (
              <Image
                src={proposal.freelancerAvatar}
                alt={proposal.freelancerName}
                width={50}
                height={50}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg font-semibold">
                {proposal.freelancerName?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>

          {/* Name + Rating */}
          <div>
            <h3 className="font-bold text-gray-dark text-base">
              {proposal.freelancerName}
            </h3>
            <div className="flex items-center gap-2  text-gray-medium">
              {/* Dynamic Stars */}
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= Math.round(proposal.freelancerRating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="mr-2">
                  {proposal.freelancerRating?.toFixed(1) || "0.0"}
                </span>
              </div>

              <span>{proposal.freelancerCompletedJobs || 0} مشروع مكتمل</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full  ${
            statusColors[proposal.status as keyof typeof statusColors] ||
            statusColors.Pending
          }`}
        >
          {statusText[proposal.status as keyof typeof statusText] ||
            statusText.Pending}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-medium  leading-relaxed mb-5 line-clamp-3">
        {proposal.description}
      </p>

      {/* Price & Duration */}
      <div className="flex gap-16 items-center pt-4 border-t border-border">
        <div>
          <p className=" text-gray-medium mb-1">السعر المقترح</p>
          <p className="font-bold text-primary">
            {proposal.proposedPrice} ريال
          </p>
        </div>
        <div className=" p-4">
          <p className=" text-gray-medium mb-1">المدة المقترحة</p>
          <p className="font-bold text-primary">
            {proposal.proposedDurationInDays} يوم
          </p>
        </div>
      </div>
    </div>
  );
}
