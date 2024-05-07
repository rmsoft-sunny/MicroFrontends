"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import { CheckCircle, LogIn, LogOut } from "lucide-react";

import { fetchNiceAuthentication } from "@/app/(auth)/sign-up/queries/nice-auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const FindIdForm = ({
  setIsFindId,
}: {
  setIsFindId: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [authValue, setAuthValue] = useState({ key: "", iv: "" });
  const [encData] = useLocalStorage("enc_data", "");
  const [userId, setUserId] = useState("");

  const onClick = async () => {
    const left = screen.width / 2 - 500 / 2;
    const top = screen.height / 2 - 800 / 2;
    const option = `status=no, menubar=no, toolbar=no, resizable=no, width=500, height=600, left=${left}, top=${top}`;
    const returnUrl = `${window.location.protocol}//${window.location.host}/nice`; // 본인인증 결과를 전달받을 api url
    const response = await fetchNiceAuthentication({ returnUrl });

    if (formRef.current !== null && response.data.code === 100) {
      const { encData, integrityValue, tokenVersionId, key, iv } =
        response.data.data;
      window.open("", "nicePopup", option);
      setAuthValue({
        key,
        iv,
      });
      formRef.current.target = "nicePopup";
      formRef.current.enc_data.value = encData;
      formRef.current.token_version_id.value = tokenVersionId;
      formRef.current.integrity_value.value = integrityValue;
      formRef.current.submit();
    }
  };

  useEffect(() => {
    if (encData) {
      try {
        axios
          .post(`/api/client/auth/find/id`, {
            encData,
            key: authValue.key,
            iv: authValue.iv,
          })
          .then((res) => {
            if (res.data.code === 100) {
              setUserId(res.data.data);
              localStorage.removeItem("enc_data");
            } else if (res.data.code === 820) {
              toast.error("가입된 정보가 없습니다.", {
                position: "top-center",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            localStorage.removeItem("enc_data");
            toast.error("아이디 찾기에 실패했습니다.", {
              position: "top-center",
              duration: 1500,
            });
          });
      } catch (error) {
        toast.error("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", {
          position: "top-center",
          duration: 1500,
        });
        router.replace("/login");
      }
    }
  }, [encData, authValue, router]);

  return (
    <>
      <div className="flex flex-col justify-center rounded-md px-4 ">
        {userId === "" ? (
          <header className="mb-2 mt-4 flex w-full flex-col justify-center p-2">
            <h2 className="flex justify-center text-lg font-bold">
              아이디 찾기
            </h2>
            <p className="flex justify-center text-center text-sm text-slate-500">
              본인 인증을 통해 가입 시 사용한 아이디를 <br /> 확인할 수
              있습니다.
            </p>
          </header>
        ) : (
          <header className="mb-2 mt-4 flex w-full flex-col justify-center p-2">
            <p className="mb-3 flex justify-center text-center text-sm text-slate-500">
              가입하신 아이디를 확인해주세요.
            </p>
            <Separator className="mb-4" />
            <h2 className="flex justify-center text-lg font-bold">{userId}</h2>
          </header>
        )}

        <Separator className="mb-7" />

        {userId === "" && (
          <Button
            onClick={onClick}
            className="mb-4 bg-blue-500 text-base font-bold hover:bg-blue-400"
            size="lg"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            인증하기
          </Button>
        )}
      </div>
      <footer className="mb-4 flex w-full flex-col px-4">
        {userId === "" ? (
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
        ) : (
          <Button
            className="w-full bg-blue-500 text-base font-bold text-white hover:bg-blue-400"
            asChild
            size="lg"
          >
            <Link href="/login" replace>
              <LogIn className="mr-2 h-5 w-5" />
              로그인
            </Link>
          </Button>
        )}

        <div className="mt-3 flex items-center justify-end">
          <Button
            className="m-0 h-auto px-2 py-0 text-sm"
            variant="link"
            onClick={() => setIsFindId(false)}
          >
            비밀번호 찾기
          </Button>
        </div>
      </footer>
      <form
        name="form"
        id="form"
        action="https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb"
        ref={formRef}
      >
        <input type="hidden" id="m" name="m" value="service" />
        <input
          type="hidden"
          id="token_version_id"
          name="token_version_id"
          value="service"
        />
        <input type="hidden" id="enc_data" name="enc_data" />
        <input type="hidden" id="integrity_vlaue" name="integrity_value" />
      </form>
    </>
  );
};
