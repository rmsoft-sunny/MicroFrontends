import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <>
      <Link href="/login" prefetch>
        <Button variant="ghost" className="text-slate-600">
          <UserRound className="mr-2 h-6 w-6" />
          <span className="text-lg font-bold">로그인</span>
        </Button>
      </Link>
    </>
  );
};
