import React, { useEffect } from "react";

import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { badgeVariants } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Viewer from "@/components/common/editor/viewer";

import { cn } from "@/lib/utils";
import { formatKST } from "@/utils/date-format";
import { useGetNoticeDetail } from "../../queries/get-notice-detail";

import { ArrowLeft, FileIcon } from "lucide-react";
import { toast } from "sonner";

const emptyContent =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

const NoticeDetail = ({
  noticeIdx,
  projectCode,
  backToList,
}: {
  noticeIdx: number | undefined;
  projectCode: string | undefined;
  backToList: () => void;
}) => {
  const { data } = useGetNoticeDetail({
    noticeIdx,
    projectCode,
  });
  const notice = data?.data;

  useEffect(() => {
    if (data?.code === 820) {
      toast.error("존재하지 않는 공지사항입니다.");
      backToList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <>
      {notice ? (
        <>
          <div
            onClick={backToList}
            className={"flex w-fit cursor-pointer items-center"}
          >
            <ArrowLeft className="mr-2 h-4 w-4 px-0" />
            목록
          </div>
          <DialogHeader>
            <div className="flex items-center justify-between gap-8">
              <div className="grow">
                <h3 className={"text-lg font-bold"}>{notice?.title}</h3>
                <DialogDescription>
                  {notice?.regDate ? formatKST(new Date(notice?.regDate)) : "-"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div>
            {!!notice?.noticeFileDTOS.length && (
              <>
                <Separator />
                <div className="flex gap-4">
                  <span className="my-3 shrink-0 leading-[44px]">첨부파일</span>
                  <div className="flex flex-wrap gap-2 py-4">
                    {notice?.noticeFileDTOS.map((file) => (
                      <a
                        key={file.fileUrl}
                        href={file.fileUrl}
                        className={cn(
                          badgeVariants({ variant: "secondary" }) +
                            "block max-w-[350px] shrink-0 cursor-pointer truncate rounded-lg py-2 focus:ring-0",
                        )}
                      >
                        <FileIcon className="mr-1 h-4 w-4 shrink-0" />
                        <div className={"truncate"}>
                          {file.originalFilename.substring(
                            0,
                            file.originalFilename.lastIndexOf("."),
                          )}
                        </div>
                        <div>
                          {file.originalFilename.slice(
                            file.originalFilename.lastIndexOf("."),
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
            <ScrollArea
              className={
                "flex h-[calc(100vh-250px)] max-h-[800px] w-[1080px] items-center justify-center overflow-y-auto border"
              }
            >
              {!data?.data?.content || data?.data?.content === emptyContent ? (
                <div className="flex items-center justify-center p-10">
                  공지 내용이 없습니다.
                </div>
              ) : (
                <Viewer content={data?.data?.content || null} />
              )}
            </ScrollArea>
          </div>
        </>
      ) : (
        <div>공지 내용이 없습니다.</div>
      )}
    </>
  );
};

export default NoticeDetail;
