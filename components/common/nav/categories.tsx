"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export const Categories = () => {
  const path = usePathname();
  const [token] = useLocalStorage("access", "");

  // 참여하기 링크
  const workPath = path.startsWith("/works");

  // 고객센터 링크
  const customerCenterPath = path.startsWith("/customer-center");

  return (
    <div className={cn(token === "" && "hidden", "flex h-full gap-4")}>
      <Link href={token === "" ? "/login" : "/works"} prefetch>
        <div
          className={cn(
            workPath && "border-b-2 border-blue-400",
            "p-1.5 text-lg font-bold text-slate-600 transition-colors hover:text-blue-400",
          )}
        >
          참여 하기
        </div>
      </Link>

      <Link href="/customer-center" prefetch>
        <div
          className={cn(
            customerCenterPath && "border-b-2 border-blue-400",
            "p-1.5 text-lg font-bold text-slate-600 transition-colors hover:text-blue-400",
          )}
        >
          고객센터
        </div>
      </Link>
    </div>
  );
};
