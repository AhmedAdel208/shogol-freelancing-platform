import Footer from "../landing/footer/Footer";
import LinksHeader from "../landing/header/LinksHeader";

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className=" bg-gray-100">
      <LinksHeader />
      <div className=" mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
