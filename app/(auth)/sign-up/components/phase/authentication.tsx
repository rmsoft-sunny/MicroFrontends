"use client";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useRef } from "react";

import { fetchNiceAuthentication } from "../../queries/nice-auth";
import { CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AuthCheckProps } from "./main";

export const UserAuthentication = ({
  setIsAuthCheck,
}: {
  setIsAuthCheck: Dispatch<SetStateAction<AuthCheckProps>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const onClick = async () => {
    const left = screen.width / 2 - 500 / 2;
    const top = screen.height / 2 - 800 / 2;
    const option = `status=no, menubar=no, toolbar=no, resizable=no, width=500, height=600, left=${left}, top=${top}`;
    const returnUrl = `${window.location.protocol}//${window.location.host}/nice`; // 본인인증 결과를 전달받을 api url
    const response = await fetchNiceAuthentication({ returnUrl });

    if (formRef.current !== null && response.data.code === 100) {
      const { encData, integrityValue, tokenVersionId, key, iv } =
        response.data.data;
      setIsAuthCheck(() => ({ key, iv }));
      window.open("", "nicePopup", option);
      formRef.current.target = "nicePopup";
      formRef.current.enc_data.value = encData;
      formRef.current.token_version_id.value = tokenVersionId;
      formRef.current.integrity_value.value = integrityValue;
      formRef.current.submit();
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center rounded-md p-2">
        <header className="my-4 flex w-full flex-col justify-center p-2">
          <h2 className="flex justify-center text-lg font-bold">
            본인 인증을 진행해주세요.
          </h2>
          <p className="flex justify-center text-sm text-slate-500">
            휴대폰 번호를 이용한 본인 정보 인증을 진행해주세요.
          </p>
        </header>
        <Separator className="mb-7" />
        <Button
          onClick={onClick}
          className="bg-blue-500 text-base font-bold hover:bg-blue-400"
          size="lg"
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          인증하기
        </Button>
      </div>
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
