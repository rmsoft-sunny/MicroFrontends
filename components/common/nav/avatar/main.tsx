"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CircleDollarSign,
  CircleUserRound,
  ClipboardPen,
  ScrollText,
  User2,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { LogoutButton } from "./logout";
import { LoginButton } from "./login-button";
import { cn } from "@/lib/utils";

const itemStyle =
  "flex w-full cursor-pointer font-bold text-slate-500 items-center";

export const AvatarMain = () => {
  const [token] = useLocalStorage("access", "");
  const [isMounted, setIsMounted] = useState(false);
  const userInfo = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted === false) return;
  if (token === "") return <LoginButton />;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-400">
          <User2 className="h-5 w-5 text-slate-100" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex justify-center text-slate-600">
            {userInfo?.id}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className={itemStyle}>
            <Link href="/mypage/information" replace prefetch>
              <CircleUserRound className="mr-2 h-5 w-5" />내 정보
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={cn(
              itemStyle,
              userInfo?.roleType !== "WORKER" && "hidden",
            )}
          >
            <Link href="/mypage/work-support" replace prefetch>
              <ClipboardPen className="mr-2 h-5 w-5" />
              작업지원내역
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className={itemStyle}>
            <Link
              href={
                userInfo?.roleType === "PROJECT_VALIDATOR"
                  ? "/mypage/inspection"
                  : "/mypage/work"
              }
              replace
              prefetch
            >
              <ScrollText className="mr-2 h-5 w-5" />
              {userInfo?.roleType === "PROJECT_VALIDATOR"
                ? "검수 내역"
                : "작업 내역"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className={cn(
              itemStyle,
              userInfo?.roleType !== "WORKER" && "hidden",
            )}
          >
            <Link href="/mypage/count" replace prefetch>
              <CircleDollarSign className="mr-2 h-5 w-5" />
              정산 내역
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* 로그아웃 버튼 */}
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
