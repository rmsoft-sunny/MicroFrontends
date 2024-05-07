"use client";

import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk, AsteriskIcon, Loader2 } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { InputTypText } from "./form/input-type-text";
import { FormSelect } from "./form/form-select";
import { usePostAccountService } from "../services/post-account";
import { useGetInfomation } from "../queries/get-infomation";
import { InfoAccountFormSchema, InfoAccountFormType } from "../schema";
import "../styles/mypage-styles.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { BankTypeEnum } from "@/enums/enum-list";
import { useQueryClient } from "@tanstack/react-query";
import { CommonTooltip } from "@/components/common/tooltip";

//내계좌
export const InfoAccount = () => {
  //버튼 무한클릭 -> ref로 막기
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [isCheckbox, setIsCheckbox] = useState(false);

  const form = useForm<InfoAccountFormType>({
    resolver: zodResolver(InfoAccountFormSchema),
    defaultValues: {
      bank: "",
      accountNumber: "",
    },
  });

  const { itemList } = useGetInfomation(); //내정보 조회 api
  const { mutation, isPending } = usePostAccountService(); //계좌변경 api

  const stack = itemList.count;
  const queryClient = useQueryClient();

  const onSubmit = () => {
    if (buttonRef.current === null) return;
    setIsLoading(true);
    buttonRef.current.disabled = true;

    try {
      if (stack >= 5) {
        toast.error("일일 계좌 인증 횟수를 초과했습니다.");
      }

      // 계좌 변경 함수
      mutation.mutate(
        {
          account: form.getValues("accountNumber"),
          bankType: form.getValues("bank"),
        },
        {
          onSuccess(data) {
            if (data.code === 100) {
              form.reset();
              setIsCheckbox(false);
              setIsButtonClick(true);
              toast.success("계좌 변동되었습니다.");

              queryClient.removeQueries({
                queryKey: ["GET", "client", "user", "info"],
              });
              queryClient.refetchQueries({
                queryKey: ["GET", "client", "user", "info"],
              });

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
              }, 1500);
            } else if (
              data.code === 601 ||
              data.code === 607 ||
              data.code === 958
            ) {
              toast.error("계좌 확인해주세요.");
              setTimeout(() => {
                form.reset();
                setIsLoading(false);
              }, 1500);
            } else if (data.code === 1012) {
              toast.error("일일 인증 횟수 5회가 초과되었습니다.");

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
              }, 1500);
            } else if (data.code === 1013) {
              toast.error("기존에 등록된 은행과 일치합니다.");

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
              }, 1500);
            } else {
              toast.error("관리자에게 문의해주세요.");

              setTimeout(() => {
                form.reset();
                setIsLoading(false);
              }, 1500);
            }
          },
        },
      );
    } catch (error) {
      console.log("account error:", error);
    }
  };

  //입력된 은행 정보와 초기 은행정보와 같은지 판별
  const isAccountNumberValid =
    form.getValues("accountNumber") === itemList?.accountNum;

  // 은행 초기값 설정
  useEffect(() => {
    if (itemList !== undefined) {
      form.reset({ bank: itemList?.bankType });
    }
  }, [itemList, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="myPageContainer w-[600px] space-y-2"
      >
        <p className="text-lg font-bold text-gray-800">내 계좌</p>

        <div className="flex w-full gap-2">
          <div className="flex w-[80px] flex-col">
            <p className="text-sm font-medium leading-none text-slate-800">
              예금주
            </p>
            {itemList?.name?.length > 5 ? (
              <CommonTooltip label={itemList?.name}>
                <p className="mt-4 truncate text-sm text-zinc-700">
                  {itemList.name}
                </p>
              </CommonTooltip>
            ) : (
              <p className="mt-4 truncate text-sm text-zinc-700">
                {itemList.name}
              </p>
            )}
          </div>

          <FormSelect
            title={"은행명"}
            disabled={!isCheckbox && itemList?.bankType !== null}
            placeholder={
              itemList.bankType ? BankTypeEnum.get(itemList.bankType) : "은행명"
            }
          />

          <div className="relative flex flex-col">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => {
                return (
                  <FormItem
                    className={cn(
                      "flex w-full min-w-28 flex-col text-base font-semibold text-slate-800",
                    )}
                  >
                    <FormLabel
                      className={cn(
                        `${isAccountNumberValid && "text-destructive"}`,
                      )}
                    >
                      계좌번호
                    </FormLabel>
                    <Input
                      type="number"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        form.handleSubmit(onSubmit);
                      }}
                      min="0"
                      placeholder={
                        itemList?.accountNum ? itemList.accountNum : ""
                      }
                      disabled={!isCheckbox && itemList?.bankType !== null}
                    />
                    <div className={cn("h-5 text-xs")}>
                      <FormMessage />
                      {isAccountNumberValid && (
                        <p className="absolute top-[66px] w-[240px] text-xs font-medium text-destructive">
                          입력된 계좌번호가 기존 계좌번호와 일치합니다.
                        </p>
                      )}
                    </div>
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        {itemList?.bankType !== null && (
          <>
            <Alert>
              <AlertTitle className="flex gap-2">
                <AsteriskIcon size={"14"} color="#FF4F4F" />
                계좌 변경 이전
              </AlertTitle>
              <AlertDescription>
                계좌 등록 후 계좌번호 변경 시 진행했던 작업은 변경 전 등록했던
                계좌로 입금이 됩니다.
              </AlertDescription>
              <div className="text-xs font-medium leading-none text-red-500">
                <span>반드시 </span>
                <span className="underline">계약자 명의</span>
                <span>의 계좌를 입력해야 환불됩니다.</span>
              </div>
            </Alert>
            <div className="flex items-center space-x-2 py-3">
              <Checkbox
                id="terms"
                className="h-5 w-5"
                checked={isCheckbox}
                onClick={() => setIsCheckbox((prevCheckbox) => !prevCheckbox)}
              />
              <label
                htmlFor="terms"
                className="cursor-pointer text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                다음 안내사항을 숙지하였습니다.
              </label>
            </div>
          </>
        )}
        <div className="flex w-full items-start justify-start gap-3">
          <Button
            ref={buttonRef}
            className="h-10"
            disabled={
              isLoading ||
              isPending ||
              !form.formState.isDirty || //form 입력시
              form.formState.isValid === false || //form 입력시
              (!isButtonClick && // isButtonClick 값이 false일 때만 버튼이 비활성화됨
                (stack >= 5 || //요청 횟수 체크
                  isAccountNumberValid || //전 계좌의 내용과 일치할때
                  (itemList?.bankType && !isCheckbox)))
            }
            type="submit"
          >
            {(isPending || isLoading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            인증하기
          </Button>
          <div className="mt-2 flex items-center gap-1 text-xs font-normal">
            <Asterisk className="h-3 w-3 text-neutral-500" />
            <span className=" text-neutral-500">일일 계좌 인증 횟수가 </span>
            <span className=" text-red-500">{5 - stack}회</span>
            <span className=" text-neutral-500"> 남았습니다.</span>
          </div>
        </div>
      </form>
    </Form>
  );
};
