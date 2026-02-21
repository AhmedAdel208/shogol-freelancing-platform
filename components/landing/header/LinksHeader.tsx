"use client";

import Logo from "@/components/ui/header/Logo";
import Navbuttons from "@/components/ui/header/Navbuttons";
import Navicons from "@/components/ui/header/Navicons";
import Navlinks from "@/components/ui/header/Navlinks";
import { useAuth } from "@/hooks/useAuth";

export default function LinksHeader() {
  const { isAuthenticated, isMounted } = useAuth();

  return (
    <header className="border-b-[0.5px] border-[#707070]/25">
      <div className="flex items-center  justify-between max-w-8xl mx-auto  py-4">
        <div className="flex items-center gap-10 ">
          <Logo />
          <Navlinks />
        </div>
        <div className="flex items-center gap-10">
          {isMounted && isAuthenticated && <Navicons />}
          <Navbuttons />
        </div>
      </div>
    </header>
  );
}
