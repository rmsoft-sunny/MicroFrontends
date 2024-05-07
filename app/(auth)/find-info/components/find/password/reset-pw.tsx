"use client";

import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { validatePassword } from "@/types/type";

const FormSchema = z
  .object({
    password: validatePassword,
    passwordConfirm: validatePassword,
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호 확인과 일치해야 합니다.",
        path: ["password"], //검증 실패 시 오류를 발생시킬 경로를 지정
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호와 일치해야 합니다.",
        path: ["passwordConfirm"],
      });
    }
  });

export const ResetPassword = ({ userIdx }: { userIdx: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pwEyeOpen, setPwEyeOpen] = useState(false);
  const [conrfirmPwEyeOpen, setConfirmPwEyeOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;
    setIsLoading(true);
    const response = await axios
      .put(`/api/client/auth/find/pwd`, {
        userIdx: Number(userIdx),
        prePwd: data.passwordConfirm,
        pwd: data.password,
      })
      .catch((error) => {
        console.log(error);
        toast.error("비밀번호 변경에 실패했습니다.", {
          position: "top-center",
          duration: 1500,
        });
        setTimeout(() => {
          setIsLoading(false);
          buttonRef.current!.disabled = false;
        }, 1000);
      });

    if (response?.data.code === 100) {
      toast.success("비밀번호가 변경되었습니다.", {
        position: "top-center",
        duration: 2000,
      });
      setTimeout(() => {
        buttonRef.current!.disabled = false;
        setIsLoading(false);
        router.replace("/login");
      }, 1000);
    } else {
      toast.error("비밀번호 변경에 실패했습니다.", {
        position: "top-center",
        duration: 2000,
      });
      setTimeout(() => {
        setIsLoading(false);
        buttonRef.current!.disabled = false;
      }, 1000);
    }
  };

  const watchNewPassword = useWatch({
    control: form.control,
    name: "password",
  });
  const watchNewPasswordCheck = useWatch({
    control: form.control,
    name: "passwordConfirm",
  });

  useEffect(() => {
    if (watchNewPassword === watchNewPasswordCheck) {
      form.clearErrors("password");
      form.clearErrors("passwordConfirm");
    }
  }, [watchNewPassword, watchNewPasswordCheck, form]);

  return (
    <>
      <header className="my-4 flex w-full flex-col justify-center p-2">
        <h2 className="flex justify-center text-lg font-bold">
          비밀번호 재설정
        </h2>
        <p className="flex justify-center text-center text-sm text-slate-500">
          입력한 아이디와 본인 인증을 통해 비밀번호를 재설정 할 수 있습니다.
        </p>
      </header>
      <Separator className="mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>재설정 비밀번호</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="pr-9"
                        type={pwEyeOpen ? "text" : "password"}
                      />
                      {pwEyeOpen ? (
                        <Eye
                          className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-500"
                          onClick={() => setPwEyeOpen(false)}
                        />
                      ) : (
                        <EyeOff
                          className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-500"
                          onClick={() => setPwEyeOpen(true)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>재설정 비밀번호 확인</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="pr-9"
                        type={conrfirmPwEyeOpen ? "text" : "password"}
                      />
                      {conrfirmPwEyeOpen ? (
                        <Eye
                          className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-500"
                          onClick={() => setConfirmPwEyeOpen(false)}
                        />
                      ) : (
                        <EyeOff
                          className="absolute bottom-2 right-3 h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-500"
                          onClick={() => setConfirmPwEyeOpen(true)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={!!form.formState.errors.password || isLoading}
            ref={buttonRef}
            className="mb-4 mt-6 w-full bg-blue-500 text-base font-bold hover:bg-blue-400"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-5 w-5" />
            )}
            변경하기
          </Button>
        </form>
      </Form>
    </>
  );
};
