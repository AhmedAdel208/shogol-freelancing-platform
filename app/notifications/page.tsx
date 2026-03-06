import NotificationsContent from "@/components/notifications/NotificationsContent";
import HelpCenterLayout from "@/components/help-center/HelpCenterLayout";

const NotificationsPage = () => {
  return (
    <HelpCenterLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        <NotificationsContent />
      </div>
    </HelpCenterLayout>
  );
};

export default NotificationsPage;
