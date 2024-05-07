"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { UserAuthentication } from "./authentication";
import { PhaseNavigation } from "./navigation";
import { LogOut } from "lucide-react";
import { UserAgreement } from "./agreements";
import { UserInfoForm } from "./form";
import { SignupSuccess } from "./success";

import { Button } from "@/components/ui/button";

export interface AuthCheckProps {
  key: string;
  iv: string;
}

export const PhaseMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    localStorage.removeItem("enc_data");
    setIsLoading(false);
    return () => localStorage.removeItem("enc_data");
  }, []);

  const [isAgreeCheck, setIsAgreeCheck] = useState<string[]>([]);
  const [isAuthCheck, setIsAuthCheck] = useState<AuthCheckProps>({
    key: "",
    iv: "",
  });

  // NICE 인증 성공 여부 판단
  const [encData] = useLocalStorage("enc_data", "");

  // 회원가입 성공 여부 판단
  const [isSignup, setIsSignup] = useState(false);

  if (isLoading) return;

  // 회원가입 성공 시 보여질 컴포넌트
  if (isSignup) return <SignupSuccess />;

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <header className="flex justify-center p-2 pb-3 font-varela text-3xl font-bold text-blue-500">
          CLIVE WORKS
        </header>
        <nav className="flex w-full items-center justify-around px-4">
          <PhaseNavigation encData={encData} isAgreeCheck={isAgreeCheck} />
        </nav>

        <main className="h-full w-full rounded-lg p-2 pb-1">
          {encData === "" && isAgreeCheck.length === 0 && (
            <UserAuthentication setIsAuthCheck={setIsAuthCheck} />
          )}
          {encData !== "" && isAgreeCheck.length === 0 && (
            <UserAgreement setIsAgreeCheck={setIsAgreeCheck} />
          )}
          {encData !== "" && isAgreeCheck.length > 0 && (
            <UserInfoForm
              isAgreeCheck={isAgreeCheck}
              isAuthCheck={isAuthCheck}
              setIsSignup={setIsSignup}
            />
          )}
        </main>

        <footer className="mb-4 flex w-full px-4">
          <Button
            className="w-full text-base font-bold text-slate-600"
            variant="outline"
            asChild
            size="lg"
          >
            <Link href="/login" replace>
              <LogOut className="mr-2 h-5 w-5" />
              돌아가기
            </Link>
          </Button>
        </footer>
      </div>
    </>
  );
};
