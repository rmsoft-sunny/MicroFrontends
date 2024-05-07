"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { InputTypePassword } from "./form/input-type-password";
import { usePostPasswordService } from "../services/post-password";
import { InfoPasswordFormSchema, InfoPasswordFormType } from "../schema";

//비밀번호 변경
export const InfoPassword = () => {
  //버튼 무한클릭 -> ref로 막기
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false); //버튼 로딩 상태

  const [open, setOpen] = useState({
    password: false,
    newPassword: false,
    newPasswordCheck: false,

    //modal: false, //비밀번호 성공 모달
  });

  const { mutate } = usePostPasswordService(); //비밀번호 변경 api

  const form = useForm<InfoPasswordFormType>({
    resolver: zodResolver(InfoPasswordFormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      newPasswordCheck: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: InfoPasswordFormType) => {
    setIsLoading(true);
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;
    try {
      mutate(
        {
          prePwd: data.password,
          pwd: data.newPassword,
        },
        {
          onSuccess(data) {
            if (data.data.code === 100) {
              toast.success("비밀번호를 변경했습니다.", {
                position: "top-center",
                duration: 1500,
                id: "password",
              });

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (buttonRef.current === null) return;
                buttonRef.current.disabled = false;
              }, 1500);
            } else if (data.data.code === 1007) {
              toast.error("기존 비밀번호가 올바르지 않습니다.", {
                position: "top-center",
                duration: 1500,
                id: "password",
              });

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (buttonRef.current === null) return;
                buttonRef.current.disabled = false;
              }, 1500);
            } else if (data.data.code === 1014) {
              toast.error("이전과 같은 비밀번호로 변경할 수 없습니다.", {
                position: "top-center",
                duration: 1500,
                id: "password",
              });

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (buttonRef.current === null) return;
                buttonRef.current.disabled = false;
              }, 1500);
            } else if (data.data.code === 304) {
              toast.error("비밀번호 형식이 올바르지 않습니다.", {
                position: "top-center",
                duration: 1500,
                id: "password",
              });

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (buttonRef.current === null) return;
                buttonRef.current.disabled = false;
              }, 1500);
            } else {
              toast.error("비밀번호 변경에 실패했습니다.", {
                position: "top-center",
                duration: 1500,
                id: "password",
              });

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
                if (buttonRef.current === null) return;
                buttonRef.current.disabled = false;
              }, 1500);
            }
          },
          onError() {
            toast.error("비밀번호 변경에 실패했습니다.", {
              position: "top-center",
              duration: 1500,
              id: "password",
            });

            setTimeout(() => {
              form.reset();
              setIsLoading(false);
              if (buttonRef.current === null) return;
              buttonRef.current.disabled = false;
            }, 1500);
          },
        },
      );
    } catch (error) {
      toast.error("비밀번호 변경에 실패했습니다.", {
        position: "top-center",
        duration: 1500,
        id: "password",
      });

      setTimeout(() => {
        form.reset();
        setIsLoading(false);
        if (buttonRef.current === null) return;
        buttonRef.current.disabled = false;
      }, 1500);
    }
  };

  const watchNewPassword = useWatch({
    control: form.control,
    name: "newPassword",
  });
  const watchNewPasswordCheck = useWatch({
    control: form.control,
    name: "newPasswordCheck",
  });

  useEffect(() => {
    if (watchNewPassword === watchNewPasswordCheck) {
      form.clearErrors("newPassword");
      form.clearErrors("newPasswordCheck");
    }
  }, [watchNewPassword, watchNewPasswordCheck, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="myPageContainer w-[600px] space-y-2"
      >
        <p className="text-lg font-bold text-gray-800">비밀번호</p>

        <InputTypePassword
          name="password"
          title="기존 비밀번호"
          open={open.password}
          onOpenClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              password: false,
            }))
          }
          onCloseClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              password: true,
            }))
          }
          className={"top-[22px]"}
          disabled={isLoading}
        />
        <InputTypePassword
          name="newPassword"
          title="새로운 비밀번호"
          open={open.newPassword}
          onOpenClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              newPassword: false,
            }))
          }
          onCloseClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              newPassword: true,
            }))
          }
          className={"top-[22px]"}
          disabled={isLoading}
        />
        <InputTypePassword
          name="newPasswordCheck"
          title="새로운 비밀번호 확인"
          open={open.newPasswordCheck}
          onOpenClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              newPasswordCheck: false,
            }))
          }
          onCloseClick={() =>
            setOpen((prevState) => ({
              ...prevState,
              newPasswordCheck: true,
            }))
          }
          className={"top-[22px]"}
          disabled={isLoading}
        />
        <div className="flex w-full justify-start">
          <Button
            ref={buttonRef}
            type="submit"
            className="h-10"
            disabled={isLoading || form.formState.isValid === false}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}내
            비밀번호 변경
          </Button>
        </div>
      </form>
    </Form>
  );
};
