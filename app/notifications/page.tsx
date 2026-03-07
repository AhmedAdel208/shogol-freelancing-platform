import NotificationsContent from "@/components/notifications/NotificationsContent";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-bg" dir="rtl">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <NotificationsContent />
      </main>
    </div>
  );
};

export default NotificationsPage;
