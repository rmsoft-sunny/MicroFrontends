"use client";
import { buttonVariants } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const INFO_URL = "/mypage/information"; // 내 정보
const WORK_SUPPORT = "/mypage/work-support"; // 작업 지원 내역
const WORK_HISTORY = "/mypage/work"; // 내 작업 내역
const INSPECTION_HISTORY = "/mypage/inspection"; // 검수 내역
const COUNT_HISTORY = "/mypage/count"; // 정산 내역

const PROJECT_VALIDATOR = "PROJECT_VALIDATOR"; // 역할:검수자

// 마이 페이지 네비게이션
const Nav = () => {
  const pathName = usePathname();
  const userInfo = useUser();

  return (
    <div className="group flex h-11 w-full items-center justify-center gap-4 border-b border-t border-black border-opacity-5 bg-white px-[392px] py-2  data-[collapsed=true]:py-2">
      <nav className="px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <Link
          href={INFO_URL}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            pathName === INFO_URL && "rounded-none border-b-2 border-blue-400 ",
            "justify-start text-sm hover:bg-white",
          )}
        >
          내 정보
        </Link>

        <Link
          href={WORK_SUPPORT}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            pathName === WORK_SUPPORT &&
              "rounded-none border-b-2 border-blue-400 ",
            "justify-start text-sm hover:bg-white",
            userInfo?.roleType !== "WORKER" && "hidden",
          )}
        >
          작업 지원 내역
        </Link>

        <Link
          href={
            userInfo?.roleType === PROJECT_VALIDATOR
              ? INSPECTION_HISTORY
              : WORK_HISTORY
          }
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            pathName === WORK_HISTORY &&
              "rounded-none border-b-2 border-blue-400 ",
            pathName === INSPECTION_HISTORY &&
              "rounded-none border-b-2 border-blue-400 ",
            "justify-start text-sm hover:bg-white",
          )}
        >
          {userInfo?.roleType === PROJECT_VALIDATOR ? "검수 내역" : "작업 내역"}
        </Link>

        <Link
          href={COUNT_HISTORY}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            pathName === COUNT_HISTORY &&
              "rounded-none border-b-2 border-blue-400 ",
            "justify-start text-sm hover:bg-white",
            userInfo?.roleType !== "WORKER" && "hidden",
          )}
        >
          정산 내역
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
