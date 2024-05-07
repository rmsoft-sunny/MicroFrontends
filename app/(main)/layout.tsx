"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import Nav from "../(main)/mypage/components/nav";

import { MainNavigation } from "@/components/common/nav/main";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [token] = useLocalStorage("access", "");
  const [isLoading, setIsLoading] = useState(true);

  // 마이 페이지 링크
  const myPagePath = pathName.startsWith("/mypage");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading === true) return;
  if (token === "") return <></>;

  return (
    <>
      <div className="bg-slate-100">
        <MainNavigation />
        {myPagePath && <Nav />}
        <div className="container grid min-h-screen max-w-[1400px] items-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
