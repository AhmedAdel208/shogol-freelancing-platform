"use client";

import { ProposalDisplay } from "@/lib/validation/proposalSchema";
import Image from "next/image";
import { proposalApi } from "@/lib/api/proposal";
import { useState } from "react";
import { Star, Clock, Wallet, CheckCircle2, Briefcase, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";

interface ProposalCardProps {
  proposal: ProposalDisplay;
  isProjectOwner?: boolean;
}

const statusConfig = {
  Pending: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    icon: <Clock size={14} className="text-amber-500" />,
    label: "قيد الانتظار"
  },
  Accepted: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200 shadow-sm shadow-emerald-100",
    icon: <CheckCircle2 size={14} className="text-emerald-500" />,
    label: "مقبول"
  },
  Rejected: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    icon: <XCircle size={14} className="text-rose-500" />,
    label: "مرفوض"
  },
};

export default function ProposalCard({
  proposal,
  isProjectOwner = false,
}: ProposalCardProps) {
  const [accepting, setAccepting] = useState(false);
  const queryClient = useQueryClient();

  const handleAcceptProposal = async () => {
    if (!confirm("هل أنت متأكد من قبول هذا العرض؟")) return;

    setAccepting(true);
    try {
      await proposalApi.acceptProposal(proposal.id);
      toast.success("تم قبول العرض بنجاح وبدء العمل!");
      
      // Update Cache Immediately Without Refreshing the Page!
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["proposals", proposal.jobRequestId] }),
        queryClient.invalidateQueries({ queryKey: ["project", proposal.jobRequestId] }),
        queryClient.invalidateQueries({ queryKey: ["my-proposals"] }),
      ]);
    } catch (error) {
      console.error("Failed to accept proposal:", error);
      toast.error("فشل قبول العرض، يرجى المحاولة مرة أخرى");
    } finally {
      setAccepting(false);
    }
  };

  // Safe fallback to Pending if API returns something unexpected
  const status = statusConfig[proposal.status as keyof typeof statusConfig] || statusConfig.Pending;

  return (
    <div
      className="group relative bg-[#ffffff] w-full text-right rounded-[24px] transition-all duration-400 ease-out hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100/80 overflow-hidden mb-4"
      dir="rtl"
    >
      {/* Decorative Top Line Based on Status */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 w-full ${
          proposal.status === 'Accepted' ? 'bg-linear-to-r from-emerald-400 to-teal-500' : 
          proposal.status === 'Rejected' ? 'bg-linear-to-r from-rose-400 to-red-500' : 
          'bg-linear-to-r from-amber-300 to-orange-400'
        }`} 
      />

      <div className="p-6 sm:p-7">
        {/* Header: Avatar, Info, Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          
          <div className="flex items-center gap-4">
            {/* Elite Avatar Design */}
            <div className="relative w-14 h-14 bg-slate-50 rounded-[18px] flex items-center justify-center shrink-0 ring-4 ring-white shadow-md shadow-gray-200/50">
              {proposal.freelancerAvatar ? (
                <Image
                  src={proposal.freelancerAvatar}
                  alt={proposal.freelancerName}
                  width={56}
                  height={56}
                  className="w-full h-full rounded-[14px] object-cover"
                />
              ) : (
                <span className="text-slate-400 text-2xl font-black font-cairo">
                  {proposal.freelancerName?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
              {/* Online Indicator Dot */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm z-10" />
            </div>

            {/* Named & Stats */}
            <div className="flex flex-col justify-center">
              <h3 className="font-extrabold text-gray-900 text-[1.15rem] leading-tight font-cairo mb-1.5">
                {proposal.freelancerName}
              </h3>
              
              <div className="flex flex-wrap items-center gap-2.5 text-sm font-medium">
                {/* Stunning Premium Star Box */}
                <div className="flex items-center gap-1.5 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/50">
                  <Star className="text-amber-500 fill-amber-400" size={14} />
                  <span className="text-amber-700 font-bold mb-px">
                    {proposal.freelancerRating?.toFixed(1) || "0.0"}
                  </span>
                </div>

                <span className="w-1 h-1 rounded-full bg-gray-300" /> {/* Divider */}

                {/* Completed Jobs */}
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Briefcase size={14} className="text-gray-400" />
                  <span className="mb-px">{proposal.freelancerCompletedJobs || 0} مكتمل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border ${status.bg} ${status.text} ${status.border} shrink-0 self-start sm:self-auto shadow-xs`}>
            {status.icon}
            <span className="text-[13px] font-bold font-cairo mb-[2px]">{status.label}</span>
          </div>
        </div>

        {/* Beautiful Text Presentation */}
        <div className="relative mb-6">
          <p className="text-gray-600 text-[15px] leading-8 font-cairo line-clamp-3 bg-slate-50 p-5 rounded-[16px] border border-slate-100 shadow-inner shadow-slate-200/20">
            {proposal.description}
          </p>
        </div>

        {/* Pricing & Duration (Elegant Metric Cards) */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-dashed border-gray-200">
          
          <div className="flex-1 flex items-center p-4 rounded-[16px] bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors duration-300 shadow-xs shadow-slate-200/50">
            <div className="w-11 h-11 rounded-[12px] bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0 ml-4 border border-gray-100">
              <Wallet size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-400 font-cairo mb-0.5">العرض المالي</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black text-gray-900">{proposal.proposedPrice}</span>
                 <span className="text-sm font-bold text-gray-500">ريال</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center p-4 rounded-[16px] bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors duration-300 shadow-xs shadow-slate-200/50">
            <div className="w-11 h-11 rounded-[12px] bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0 ml-4 border border-gray-100">
              <Clock size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-400 font-cairo mb-0.5">الوقت المتوقع</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black text-gray-900">{proposal.proposedDurationInDays}</span>
                 <span className="text-sm font-bold text-gray-500">يوم</span>
              </div>
            </div>
          </div>

        </div>

        {/* Accept Button - Elegant & Smooth */}
        {isProjectOwner && proposal.status === "Pending" && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <button
              className="relative w-full cursor-pointer overflow-hidden rounded-[14px] font-bold font-cairo text-base group/btn shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
              onClick={handleAcceptProposal}
              disabled={accepting}
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-teal-500 transition-transform duration-500 group-hover/btn:scale-[1.05]" />
              
              <div className="relative flex items-center justify-center gap-2.5 py-4 px-6 text-white transition-all bg-black/5 hover:bg-black/10">
                {accepting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span className="mb-px">جاري التأكيد...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                    <span className="mb-px tracking-wide">قبول العرض وبدء العمل</span>
                  </>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
