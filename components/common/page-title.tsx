"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  routerBtn?: boolean; // 라우터(뒤로가기) 버튼 사용 여부
  path?: string; // 뒤로가기 대신 원하는 path로 이동 가능. routerBtn 비활성화시 사용불가
  replace?: boolean; // custom path 사용 시 replace 여부, false 시 push로 이동
  classes?: {
    container?: string;
    title?: string;
  };
}

const PageTitle = ({
  title,
  description,
  routerBtn,
  path,
  replace,
  classes,
}: Props) => {
  const router = useRouter();
  const onClickBackBtn = () => {
    if (path) {
      replace ? router.replace(path) : router.push(path);
    } else {
      router.back();
    }
  };
  return (
    <div className="mb-4 flex flex-col py-4">
      <div className={cn("flex items-center", classes?.container)}>
        {routerBtn && (
          <Button variant={"ghost"} size={"icon"} className="mr-2 rounded-full">
            <ArrowLeft
              size={24}
              className="cursor-pointer"
              onClick={onClickBackBtn}
            />
          </Button>
        )}
        <h1 className={cn("titleFont cursor-default", classes?.title)}>
          {title}
        </h1>
      </div>
      <h5 className={cn("cursor-default text-sm font-normal text-neutral-500")}>
        {description}
      </h5>
    </div>
  );
};

export default PageTitle;
