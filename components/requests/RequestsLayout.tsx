import Footer from "../landing/footer/Footer";
import LinksHeader from "../landing/header/LinksHeader";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto -mt-16 px-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow p-8 min-h-100">
          <LinksHeader />
          {children}
          <Footer />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
