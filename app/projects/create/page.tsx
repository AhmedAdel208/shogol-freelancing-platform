import CreateProjectForm from "@/features/projects/create/CreateProjectForm";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import Gradientline from "@/components/ui/header/Gradientline";

export const metadata = {
  title: "طلب عرض سعر | شغل",
  description: "اطلب عرض سعر لمشروعك الجديد واحصل على أفضل العروض من المستقلين المحترفين",
};

export default function CreateProjectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <Gradientline />
        <LinksHeader />
      </header>

      <main className="grow py-12">
        <CreateProjectForm />
      </main>

      <Footer />
    </div>
  );
}
