import { useState } from "react";
import MailIcon from "@/public/icons/MailIcon";
import ProposalModal from "@/components/ui/modal/ProposalModal";

interface FreelancerActionsProps {
  onSendMessage: () => void;
}

export default function FreelancerActions({ onSendMessage }: FreelancerActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
        >
          أرسل عرضك
        </button>
        <button
          onClick={onSendMessage}
          className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-primary/5 transition-colors"
        >
          <MailIcon className="w-5 h-5" />
          إرسال رسالة
        </button>
      </div>
      
      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log(data); // send to your API here
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
