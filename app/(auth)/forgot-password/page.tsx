"use client";

import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import ForgotPasswordForm from "@/features/auth/forgot-password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>

      <main className="grow">
        <ForgotPasswordForm />
      </main>

      <Footer />
    </div>
  );
}
