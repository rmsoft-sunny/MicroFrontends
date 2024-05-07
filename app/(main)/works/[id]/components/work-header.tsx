"use client";
import React, { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WorkRequestButton from "./work-request-button";

import { WorkInfoType, WorkStatusType } from "../type";
import { Megaphone, NotepadText } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectNoticeModal from "../../components/notice-modal/main";

const WorkHeader = ({
  workInfo,
  workStatus,
}: {
  workInfo?: WorkInfoType;
  workStatus: WorkStatusType;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <p className="bg-primary px-6 py-4 text-primary-foreground">
        {workInfo?.projectName}
      </p>
      <div
        className={cn(
          "flex border-b px-6 py-4 text-sm",
          workInfo?.noticeTitle
            ? " cursor-pointer hover:underline"
            : "cursor-default",
        )}
        onClick={() => {
          workInfo?.noticeTitle && setModalOpen(true);
        }}
      >
        <Megaphone className="mr-2 h-5 w-4 shrink-0 text-primary" />
        <p className="max-w-full truncate">
          {workInfo?.noticeTitle || "공지사항이 없습니다."}
        </p>
      </div>
      <ProjectNoticeModal
        open={modalOpen}
        setOpen={setModalOpen}
        noticeIdx={workInfo?.noticeIdx ?? 1}
        projectCode={workInfo?.projectCode}
      />
      <div
        className={
          "grid grid-cols-[700px_auto_auto_auto_auto] items-center gap-6 p-4"
        }
      >
        <div className="flex items-start gap-2">
          <div
            className={`${buttonVariants({ variant: "default", size: "icon" })} my-1 shrink-0`}
          >
            <NotepadText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="truncate font-semibold">{workInfo?.workName}</h3>
            <h3 className="text-sm text-slate-600">{workInfo?.summary}</h3>
          </div>
        </div>

        <div className="text-center text-sm">
          <p>참여자</p>
          <p>{workInfo && Number(workInfo.joinWorkerCnt).toLocaleString()}</p>
        </div>

        <div className="text-sm">
          <p className="text-right">진행률</p>
          {workInfo && (
            <div className="flex items-center justify-end gap-2">
              <Progress value={workInfo.progress} className="w-[80px]" />
              <div className="shrink-0">{workInfo.progress}%</div>
            </div>
          )}
        </div>

        <div className="text-right text-sm">
          <p>포인트</p>
          {workInfo && (
            <p>
              {Number(workInfo.minUnitPrice).toLocaleString()}~
              {Number(workInfo.maxUnitPrice).toLocaleString()}
            </p>
          )}
        </div>
        {workStatus === "CONFIRM" && <WorkRequestButton className="mx-auto" />}
      </div>
    </>
  );
};

export default WorkHeader;
