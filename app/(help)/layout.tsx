"use client";

import { ReactNode, useEffect, useState } from "react";
import { MainNavigation } from "@/components/common/nav/main";
import { Nav } from "./customer-center/components/nav";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading === true) return;

  return (
    <div className="min-h-screen bg-slate-100">
      <MainNavigation />
      <Nav />
      <div className="mx-auto mt-10 w-full max-w-[1400px] rounded-t-lg border bg-background">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
