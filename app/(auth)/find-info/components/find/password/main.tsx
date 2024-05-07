"use client";

import axios from "axios";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ResetPassword } from "./reset-pw";
import { FindPassword } from "./find-pw";

export const FindPasswordForm = ({
  setIsFindId,
}: {
  setIsFindId: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [userIdx, setUserIdx] = useState("");
  const [authValue, setAuthValue] = useState({
    userId: "",
    key: "",
    iv: "",
  });

  const [encData] = useLocalStorage("enc_data", "");

  useEffect(() => {
    if (encData) {
      try {
        axios
          .post(`/api/client/auth/chk/id`, {
            id: authValue.userId,
            niceRequestIdentity: {
              encData,
              key: authValue.key,
              iv: authValue.iv,
            },
          })
          .then((res) => {
            localStorage.removeItem("enc_data");
            const code = res.data.code;
            switch (code) {
              case 100:
                setUserIdx(res.data.data);
                break;
              case 820:
                toast.error("가입되지 않은 아이디 입니다.", {
                  position: "top-center",
                  duration: 2000,
                });
                break;
              case 954:
                toast.error("아이디 확인에 실패했습니다.", {
                  position: "top-center",
                  duration: 2000,
                });
                break;
              default:
                toast.error(
                  "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
                  {
                    position: "top-center",
                    duration: 2000,
                  },
                );
                break;
            }
          })
          .catch(() => {
            localStorage.removeItem("enc_data");
            toast.error("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", {
              position: "top-center",
              duration: 2000,
            });
          });
      } catch (error) {
        localStorage.removeItem("enc_data");
        toast.error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.", {
          position: "top-center",
          duration: 2000,
        });
        router.replace("/");
      }
    }
  }, [encData, authValue, router]);

  return (
    <>
      <div className="flex flex-col justify-center rounded-md px-4 ">
        {userIdx === "" ? (
          <FindPassword setAuthValue={setAuthValue} />
        ) : (
          <ResetPassword userIdx={userIdx} />
        )}
      </div>
      <footer className="mb-4 flex w-full flex-col px-4">
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
        <div className="mt-3 flex items-center justify-end">
          <Button
            className="m-0 h-auto px-2 py-0 text-sm"
            variant="link"
            onClick={() => setIsFindId(true)}
          >
            아이디 찾기
          </Button>
        </div>
      </footer>
    </>
  );
};
