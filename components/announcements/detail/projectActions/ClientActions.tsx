import MailIcon from "@/public/icons/MailIcon";

interface ClientActionsProps {
  onSendMessage: () => void;
}

export default function ClientActions({ onSendMessage }: ClientActionsProps) {
  return (
    <button
      onClick={onSendMessage}
      className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-primary/5 transition-colors"
    >
      <MailIcon className="w-5 h-5" />
      إرسال رسالة
    </button>
  );
}
