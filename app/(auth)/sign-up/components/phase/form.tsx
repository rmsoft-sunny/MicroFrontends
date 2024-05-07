import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";

import {
  ProfileFormValues,
  profileFormSchema,
  defaultValues,
  nicknameRegex,
  userIdRegex,
} from "./schema";
import { AuthCheckProps } from "./main";
import { useSignupMutation } from "../../services/sign-up";

export const UserInfoForm = ({
  isAgreeCheck,
  isAuthCheck,
  setIsSignup,
}: {
  isAgreeCheck: string[];
  isAuthCheck: AuthCheckProps;
  setIsSignup: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [encData] = useLocalStorage("enc_data", "");
  const { mutate } = useSignupMutation();
  const router = useRouter();
  const [pwEyeOpen, setPwEyeOpen] = useState(false);
  const [conrfirmPwEyeOpen, setConfirmPwEyeOpen] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    if (buttonRef.current === null) return;
    setIsLoading(true);
    buttonRef.current.disabled = true;

    const submitData = {
      email: data.email,
      id: data.userId,
      pwd: data.password,
      nickname: data.nickname,
      privacyUsageAgreementYn: isAgreeCheck.includes("privacyUsageAgreement")
        ? "Y"
        : "N",
      providePersonalInformationYn: isAgreeCheck.includes(
        "providePersonalInformation",
      )
        ? "Y"
        : "N",
      niceRequestIdentity: {
        encData,
        iv: isAuthCheck.iv,
        key: isAuthCheck.key,
      },
    };

    mutate(submitData, {
      onSuccess: (data) => {
        const resCode = data.data.code;
        switch (resCode) {
          case 1004:
            toast.error("이미 가입된 이메일 입니다.", {
              position: "top-center",
              id: "signup-error",
              duration: 2000,
            });
            setTimeout(() => {
              setIsLoading(false);
              buttonRef.current!.disabled = false;
            }, 1500);
            break;
          case 1003:
            toast.error("아이디가 중복되었습니다.", {
              position: "top-center",
              id: "signup-error",
            });
            setTimeout(() => {
              setIsLoading(false);
              buttonRef.current!.disabled = false;
            }, 1500);
            break;
          case 1008:
            toast.error("닉네임이 중복되었습니다.", {
              position: "top-center",
              id: "signup-error",
            });
            setTimeout(() => {
              setIsLoading(false);
              buttonRef.current!.disabled = false;
            }, 1500);
            break;
          case 1009:
            toast.error("이미 가입된 사용자입니다.", {
              position: "top-center",
              id: "signup-error",
            });
            setTimeout(() => {
              setIsLoading(false);
              buttonRef.current!.disabled = false;
              router.replace("/login");
            }, 1500);
            break;
          case 100:
            toast.success("회원가입에 성공했습니다.", {
              position: "top-center",
              id: "signup-error",
            });
            setTimeout(() => {
              setIsLoading(false);
              setIsSignup(true);
              buttonRef.current!.disabled = false;
            }, 1500);
            break;
          default:
            toast.error("서버와 통신중 오류가 발생했습니다.", {
              position: "top-center",
              id: "signup-error",
              duration: 1500,
            });
            router.replace("/login");
        }
      },
      onError: () => {
        toast.error("서버와 통신중 오류가 발생했습니다.", {
          position: "top-center",
          duration: 1500,
        });
        router.replace("/login");
      },
    });
  }

  // 디바운스로 중복 검사
  const [nickname, setNickname] = useDebounceValue("", 1000);
  const [userId, setUserId] = useDebounceValue("", 1000);
  const [email, setEmail] = useDebounceValue("", 1000);

  useEffect(() => {
    const nicknameCheck = z.string().trim().regex(nicknameRegex);
    const checkResult = nicknameCheck.safeParse(nickname).success;

    if (checkResult) {
      axios
        .get(`/api/client/auth/chk/nickname/duplicate?nickname=${nickname}`)
        .then((res) => {
          if (res.data.code === 100) {
            toast.success("사용 가능한 닉네임 입니다.", {
              id: "nickname",
              position: "top-center",
              duration: 1500,
            });
            form.clearErrors("nickname");
          } else if (res.data.code === 1008) {
            form.setError("nickname", {
              message: "이미 존재하는 닉네임 입니다.",
            });
            toast.error("이미 존재하는 닉네임 입니다.", {
              id: "nickname",
              position: "top-center",
              duration: 1500,
            });
          } else {
            toast.error(
              "닉네임은 공백을 제외한 한글+영문+숫자 조합 2~15 자리를 입력해주세요.",
              {
                id: "nickname",
                position: "top-center",
              },
            );
          }
        });
    }
  }, [nickname, form]);

  useEffect(() => {
    const idCheck = z.string().trim().regex(userIdRegex);
    const checkResult = idCheck.safeParse(userId).success;

    if (checkResult) {
      axios
        .get(`/api/client/auth/chk/id/duplicate?id=${userId}`)
        .then((res) => {
          if (res.data.code === 100) {
            toast.success("사용 가능한 아이디 입니다.", {
              id: "user-id",
              position: "top-center",
              duration: 1500,
            });
            form.clearErrors("userId");
          } else if (res.data.code === 1003) {
            toast.error("이미 존재하는 아이디 입니다.", {
              id: "user-id",
              position: "top-center",
              duration: 1500,
            });
            form.setError("userId", {
              message: "이미 존재하는 아이디 입니다.",
            });
          } else {
            toast.error("아이디는 영문+숫자 조합 2~15자리를 입력해주세요.", {
              id: "user-id",
              position: "top-center",
            });
          }
        });
    }
  }, [userId, form]);

  useEffect(() => {
    const emailCheck = z.string().trim().email().max(100);
    const checkResult = emailCheck.safeParse(email).success;

    if (checkResult) {
      axios
        .get(`/api/client/auth/chk/email/duplicate?email=${email}`)
        .then((res) => {
          if (res.data.code === 100) {
            toast.success("사용 가능한 이메일 입니다.", {
              id: "email",
              position: "top-center",
              duration: 1500,
            });
            form.clearErrors("email");
          } else if (res.data.code === 1004) {
            toast.error("이미 존재하는 이메일 입니다.", {
              id: "email",
              position: "top-center",
              duration: 1500,
            });
            form.setError("email", {
              message: "이미 존재하는 이메일 입니다.",
            });
          } else {
            toast.error("이메일 형식이 올바르지 않습니다.", {
              id: "email",
              position: "top-center",
              duration: 1500,
            });
          }
        });
    }
  }, [email, form]);

  const watchNewPassword = useWatch({
    control: form.control,
    name: "password",
  });
  const watchNewPasswordCheck = useWatch({
    control: form.control,
    name: "confirmPassword",
  });

  useEffect(() => {
    if (watchNewPassword === watchNewPasswordCheck) {
      form.clearErrors("password");
      form.clearErrors("confirmPassword");
    }
  }, [watchNewPassword, watchNewPasswordCheck, form]);

  return (
    <>
      <div className="flex flex-col justify-center rounded-md p-2">
        <header className="my-4 flex w-full flex-col justify-center p-2">
          <h2 className="flex justify-center text-lg font-bold">
            정보를 입력해주세요.
          </h2>
          <p className="flex justify-center text-sm text-slate-500">
            사용자의 정보를 입력해주세요.
          </p>
        </header>
        <Separator className="mb-7" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => {
                          setUserId(e.currentTarget.value.trim());
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
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
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => {
                          setNickname(e.currentTarget.value.trim());
                          field.onChange(e);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => {
                          setEmail(e.currentTarget.value.trim());
                          field.onChange(e);
                        }}
                        type="email"
                        autoComplete="off"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="mb-2 mt-9" />
            <Button
              ref={buttonRef}
              type="submit"
              className="mt-6 w-full bg-blue-500 text-base font-bold hover:bg-blue-400"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-5 w-5" />
              )}
              가입하기
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
