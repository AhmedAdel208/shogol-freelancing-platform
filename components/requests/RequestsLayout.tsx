import Footer from "../landing/footer/Footer";
import LinksHeader from "../landing/header/LinksHeader";

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col">
      <LinksHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
