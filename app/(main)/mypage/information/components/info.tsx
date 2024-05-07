"use client";

import "../styles/mypage-styles.css";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { InfoFormSchema, InfoFormType } from "../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InfoResignModal } from "./modal/info-resign-modal";
import { useEffect, useRef, useState } from "react";
import { useGetInfomation } from "../queries/get-infomation";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import * as z from "zod";
import { nicknameRegex } from "@/constants/regex";
import { toast } from "sonner";
import { usePutNickname } from "../services/put-ninkname";

//내정보
export const Info = () => {
  //버튼 무한클릭 -> ref로 막기
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [nickName, setNickName] = useState<string>("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const debounced = useDebounceCallback(setNickName, 1500);

  const { itemList } = useGetInfomation(); //내정보 조회 api

  const [open, setOpen] = useState({
    modal: false,
  });

  const form = useForm<InfoFormType>({
    resolver: zodResolver(InfoFormSchema),
    defaultValues: { nickName: "" },
    mode: "onChange",
  });

  const { mutate, isPending } = usePutNickname({
    form,
    setNickName,
  }); //닉네임 수정

  const onNickNameSubmit = () => {
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;

    //닉네임 변경 api
    mutate({
      nickname: nickName,
    });
  };

  useEffect(() => {
    const nickNameCheck = z.string().trim().regex(nicknameRegex);
    const checkResult = nickNameCheck.safeParse(nickName).success;

    if (checkResult) {
      axios
        .get(`/api/client/auth/chk/nickname/duplicate?nickname=${nickName}`)
        .then((res) => {
          if (res.data.code === 100) {
            toast.success("사용 가능한 닉네임 입니다.", {
              id: "nickname",
              position: "top-center",
              duration: 1500,
            });
            setIsNicknameChecked(true);
            form.clearErrors("nickName");
          } else if (res.data.code === 1008) {
            form.setError("nickName", {
              message: "이미 존재하는 닉네임 입니다.",
            });
            toast.error("이미 존재하는 닉네임 입니다.", {
              id: "nickname",
              position: "top-center",
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
  }, [nickName, form]);

  return (
    <Form {...form}>
      <form className="myPageContainer w-[600px] space-y-2">
        <p className="text-lg font-bold text-gray-800">내 정보</p>

        <div className="pb-4">
          <FormLabel>아이디</FormLabel>
          <p className="h-9 w-full py-2 text-sm font-medium text-zinc-700">
            {itemList?.id}
          </p>
        </div>

        <div className="pb-4">
          <FormLabel>이메일</FormLabel>
          <p className="h-9 w-full py-2 text-sm font-medium text-zinc-700">
            {itemList?.email ? itemList.email : "-"}
          </p>
        </div>

        <FormField
          control={form.control}
          name="nickName"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel>닉네임</FormLabel>

              <FormControl>
                <Input
                  onChange={(e) => {
                    if (isNicknameChecked) {
                      setIsNicknameChecked(false);
                    }
                    field.onChange(e);
                    debounced(e.currentTarget.value.trim());
                  }}
                  value={field.value}
                  placeholder={itemList?.nickname}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-between">
          <Button
            ref={buttonRef}
            type="button"
            className="h-10"
            onClick={form.handleSubmit(onNickNameSubmit)}
            disabled={isNicknameChecked === false}
          >
            내 정보 변경
          </Button>

          <p
            className="cursor-pointer text-xs font-bold text-neutral-400 underline"
            onClick={() =>
              setOpen((prevState) => ({ ...prevState, modal: true }))
            }
          >
            회원 탈퇴
          </p>
          {open.modal && (
            <InfoResignModal
              isOpenModal={open.modal}
              setIsOpenModal={() => {
                setOpen((prevState) => ({ ...prevState, modal: true }));
              }}
              onClose={() =>
                setOpen((prevState) => ({ ...prevState, modal: false }))
              }
            />
          )}
        </div>
      </form>
    </Form>
  );
};
