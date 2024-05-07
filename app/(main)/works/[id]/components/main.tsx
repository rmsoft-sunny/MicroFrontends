"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WorkHeader from "./work-header";
import WorkQuestions from "./work-questions/main";
import WorkLog from "./work-log/main";
import WorkRequestButton from "./work-request-button";

import { useGetWorkDetail } from "../queries/get-work-detail";

import { cn } from "@/lib/utils";
import WorkDescription from "./work-description";

const Footer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-end gap-2 border-t p-4 text-sm text-foreground/90",
      className,
    )}
  >
    {children}
  </div>
);

const WorkDetailContents = () => {
  const { id: workIdx }: { id: string } = useParams();
  const params = useSearchParams();

  const {
    workInfo,
    description,
    projectQuestions,
    workQuestions,
    workStatus,
    isPending,
  } = useGetWorkDetail({
    projectCode: params.get("c"),
    workIdx: Number(workIdx),
  });

  return (
    <div className="my-4 overflow-hidden rounded-md border bg-background shadow-sm">
      <WorkHeader workInfo={workInfo} workStatus={workStatus} />
      <Tabs defaultValue="work-info">
        <TabsList className="mt-4 w-full items-end justify-start rounded-none bg-background p-0">
          <TabsTrigger value="work-info" asChild>
            <div className="h-10 cursor-pointer rounded-none border-b font-semibold transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
              상세정보
            </div>
          </TabsTrigger>
          <TabsTrigger value="work-log" asChild>
            <div className="h-10 cursor-pointer rounded-none border-b font-semibold transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
              작업내역
            </div>
          </TabsTrigger>
          <div className="w-full border-b"></div>
        </TabsList>
        <TabsContent value="work-info">
          <WorkDescription description={description} isPending={isPending} />
          {workStatus === "CONFIRM" ? (
            // 참여중인 작업
            <Footer>
              <WorkRequestButton />
            </Footer>
          ) : workStatus === "WAIT" ? (
            // 신청이 완료 된 작업 (승인 대기)
            <Footer className={"select-none"}>
              <Button
                className="cursor-default hover:bg-secondary"
                variant={"secondary"}
              >
                승인 대기
              </Button>
            </Footer>
          ) : workStatus === "SUPPORTED" ? (
            // 신청이 완료 된 프로젝트 (신청 불가)
            <Footer className={"select-none justify-center"}>
              이미 참여 신청이 완료 된 프로젝트입니다. 하나의 프로젝트 당 하나의
              작업에만 참여 가능합니다.
            </Footer>
          ) : workStatus === "CLOSED" ? (
            // 마감 된 작업
            <Footer className={"select-none justify-center"}>
              참여 신청이 마감 된 작업입니다.
            </Footer>
          ) : (
            // 참여 가능한 작업
            <WorkQuestions
              projectQuestions={projectQuestions}
              workQuestions={workQuestions}
            />
          )}
        </TabsContent>
        <TabsContent value="work-log">
          <WorkLog />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkDetailContents;
