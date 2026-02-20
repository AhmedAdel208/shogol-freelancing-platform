"use client";

import { useState } from "react";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import RegisterForm from "@/features/auth/signup/RegisterForm";
import AccountType from "@/features/auth/signup/AccountType";
import Gradientline from "@/components/ui/header/Gradientline";

export default function SignupPage() {
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(
    null,
  );

  const handleAccountTypeSelect = (typeId: string) => {
    setSelectedAccountType(typeId);
  };

  return (
    <div className="flex flex-col min-h-screen">
       <header className="bg-white">
            <Gradientline/>
            <LinksHeader/>
          </header>

      <div className="grow">
        {!selectedAccountType ? (
          <AccountType onSelectType={handleAccountTypeSelect} />
        ) : (
          <RegisterForm initialAccountType={selectedAccountType} />
        )}
      </div>

      <Footer />
    </div>
  );
}
