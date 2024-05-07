"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const navStyle = "text-lg font-semibold text-slate-700";

export const PhaseNavigation = ({
  encData,
  isAgreeCheck,
}: {
  encData: string;
  isAgreeCheck: string[];
}) => {
  return (
    <>
      <span
        className={cn(
          navStyle,
          encData === "" && "font-bold underline underline-offset-4",
        )}
      >
        본인인증
      </span>
      <ChevronRight className="h-6 w-6 text-slate-700" />
      <span
        className={cn(
          navStyle,
          encData !== "" &&
            isAgreeCheck.length === 0 &&
            "font-bold underline underline-offset-4",
        )}
      >
        약관동의
      </span>
      <ChevronRight className="h-6 w-6 text-slate-700" />
      <span
        className={cn(
          navStyle,
          encData !== "" &&
            isAgreeCheck.length > 1 &&
            "font-bold underline underline-offset-4",
        )}
      >
        정보입력
      </span>
    </>
  );
};
