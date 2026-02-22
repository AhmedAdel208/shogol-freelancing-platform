"use client";

import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import ResetPasswordForm from "@/features/auth/reset-password/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>

      <main className="grow">
        <ResetPasswordForm />
      </main>

      <Footer />
    </div>
  );
}
