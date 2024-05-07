"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useGetNoticeDetailQuery } from "./queries/get-notice-detail";
import Link from "next/link";
import Viewer from "@/components/common/editor/viewer";
import { formatKST } from "@/utils/date-format";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

export default function NoticeDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { data } = useGetNoticeDetailQuery(id as string);

  const { title, content, noticeFileDTOS, regDate } = data?.data || {};

  if (data && data.code !== 100) return notFound();

  return (
    <div className="space-y-4 p-6">
      <Button
        variant="ghost"
        className="flex items-center px-2"
        onClick={() => {
          router.push("/customer-center");
        }}
      >
        <ArrowLeft className="mr-1 h-4 w-4 shrink-0" />
        목록
      </Button>
      <>
        <h3 className="text-lg font-bold">
          {title}
          <time className="mt-1 block text-sm font-medium text-gray-400">
            {formatKST(regDate)}
          </time>
        </h3>
        <Separator />
        <div className="flex items-start gap-4">
          <span className="shrink-0 text-sm leading-[34px]">첨부파일</span>
          <ol className="flex flex-wrap gap-2">
            {noticeFileDTOS &&
              noticeFileDTOS.map((file) => {
                return (
                  <li key={file.noticeFileIdx + file.originalFilename}>
                    <Link
                      key={file.fileUrl}
                      href={file.fileUrl}
                      download={file.originalFilename}
                      target="_blank"
                      className={cn(
                        badgeVariants({ variant: "secondary" }) +
                          "cursor-pointer rounded-lg py-2 hover:underline",
                      )}
                    >
                      <FileIcon className="mr-1 h-4 w-4 shrink-0" />
                      {file.originalFilename}
                    </Link>
                  </li>
                );
              })}
          </ol>
        </div>
        {content && <Viewer content={content} className="border" />}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto block"
          onClick={() => {
            router.push("/customer-center");
          }}
        >
          목록
        </Button>
      </>
    </div>
  );
}
