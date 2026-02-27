import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import LoginForm from "@/features/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>

      <main className="grow">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}
