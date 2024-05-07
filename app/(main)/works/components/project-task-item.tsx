import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NotepadText } from "lucide-react";
import { WorkListType } from "@/enums/enum-list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  work: any;
  status: keyof typeof WorkListType;
  children?: React.ReactNode;
}

const ProjectTaskItem = ({ work, status, children }: Props) => {
  return (
    <div className="border-t">
      <div
        className={
          "grid max-w-full grid-cols-[700px_120px_140px_140px_auto] items-center gap-2 px-4 py-2"
        }
      >
        <TooltipProvider>
          <Tooltip>
            <div className="flex items-center gap-2">
              <div
                className={`${buttonVariants({ variant: "default", size: "icon" })} shrink-0`}
              >
                <NotepadText className="h-5 w-5" />
              </div>
              <TooltipTrigger asChild>
                <div className="truncate">
                  <h3 className="truncate font-semibold">{work.workName}</h3>
                  <p className="truncate text-sm text-slate-600">
                    {work.summary}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-[700px] break-words border-black bg-black/80 text-white"
                align="start"
              >
                <>
                  <h3 className="text-base font-semibold">{work.workName}</h3>
                  <p className="break-words text-sm">{work.summary}</p>
                </>
              </TooltipContent>
            </div>
          </Tooltip>
        </TooltipProvider>

        <div className="text-center">
          {Number(work.joinWorkerCnt).toLocaleString()}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Progress value={work.progress} className="w-[80px]" />
          <div className="w-8">{work.progress}%</div>
        </div>

        <div className="text-center">
          {Number(work.minUnitPrice).toLocaleString()}~
          {Number(work.maxUnitPrice).toLocaleString()}
        </div>
        {status === "JOIN" && <Button className="mx-auto">시작하기</Button>}
      </div>
      {children}
    </div>
  );
};

export default ProjectTaskItem;
