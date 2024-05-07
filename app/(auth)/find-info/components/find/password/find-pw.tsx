"use client";

import * as z from "zod";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { userIdRegex } from "@/app/(auth)/sign-up/components/phase/schema";
import { fetchNiceAuthentication } from "@/app/(auth)/sign-up/queries/nice-auth";

const FormSchema = z.object({
  userId: z
    .string()
    .trim()
    .min(1, { message: "필수값입니다." })
    .regex(userIdRegex, {
      message: "아이디는 영문+숫자 조합 2~15자리를 입력해주세요.",
    }),
});

export const FindPassword = ({
  setAuthValue,
}: {
  setAuthValue: Dispatch<
    SetStateAction<{
      key: string;
      iv: string;
      userId: string;
    }>
  >;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
    },
  });

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
        userId: form.watch("userId")!,
      });
      formRef.current.target = "nicePopup";
      formRef.current.enc_data.value = encData;
      formRef.current.token_version_id.value = tokenVersionId;
      formRef.current.integrity_value.value = integrityValue;
      formRef.current.submit();
    }
  };

  return (
    <>
      <header className="my-4 flex w-full flex-col justify-center p-2">
        <h2 className="flex justify-center text-lg font-bold">비밀번호 찾기</h2>
        <p className="flex justify-center text-center text-sm text-slate-500">
          아이디와 본인 인증을 통해 가입 시 사용한 비밀번호를 변경할 수
          있습니다.
        </p>
      </header>
      <Separator className="mb-7" />
      <Form {...form}>
        <FormField
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="아이디를 입력하세요."
                  className="py-5 text-sm ring-1"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
      <Button
        disabled={form.formState.isValid === false}
        onClick={form.handleSubmit(onClick)}
        className="mb-4 mt-7 bg-blue-500 text-base font-bold hover:bg-blue-400"
        size="lg"
      >
        <CheckCircle className="mr-2 h-5 w-5" />
        인증하기
      </Button>
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
