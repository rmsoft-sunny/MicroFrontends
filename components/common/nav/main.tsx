"use client";
import Link from "next/link";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { AvatarMain } from "./avatar/main";
import { Categories } from "./categories";
import { useWorkTabActions } from "@/store/use-work-tab-store";
import { cn } from "@/lib/utils";

export const MainNavigation = ({ className }: { className?: string }) => {
  const pathName = usePathname();
  const { setWorkTab } = useWorkTabActions();

  useEffect(() => {
    // "/works" 경로 이탈 시 workTab 위치 초기화
    if (!pathName.startsWith("/works")) {
      setWorkTab("in-progress");
    }
  }, [pathName, setWorkTab]);
  return (
    <div className="flex h-14 justify-center bg-white shadow">
      <div
        className={cn(
          "flex h-full w-[1400px] items-center justify-between px-4",
          className,
        )}
      >
        <Link href="/">
          <div className="w-[200px] cursor-pointer font-varela text-2xl font-bold text-blue-500 transition hover:text-blue-400">
            CLIVE WORKS
          </div>
        </Link>

        <div>
          <Categories />
        </div>

        <div className="flex w-[200px] items-center justify-end">
          {/* 유저 아바타 */}
          <AvatarMain />
        </div>
      </div>
    </div>
  );
};
