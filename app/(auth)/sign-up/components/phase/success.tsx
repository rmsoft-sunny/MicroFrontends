"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";

export const SignupSuccess = () => {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const onClick = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <>
      <Confetti width={width} height={height} />
      <div className="flex h-full w-full flex-col">
        <header className="flex justify-center p-2 font-varela text-3xl font-bold text-blue-500">
          CLIVE WORKS
        </header>
        <header className="my-4 flex w-full flex-col justify-center p-2">
          <h2 className="flex justify-center text-lg font-bold">
            회원 가입 완료
          </h2>
          <p className="flex justify-center text-center text-sm text-slate-500">
            회원 가입이 완료되었습니다.
            <br />
            로그인을 진행해주세요.
          </p>
        </header>
        <div className="flex flex-col justify-center rounded-md p-2">
          <Button
            onClick={onClick}
            size="lg"
            className="bg-blue-500 text-base font-bold hover:bg-blue-400"
          >
            로그인
          </Button>
        </div>
      </div>
    </>
  );
};
