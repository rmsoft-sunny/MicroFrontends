"use client";

import { DataTable } from "@/components/common/table/table";
import { columns } from "./notice-columns";
import { Row, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useGetNoticeQuery } from "../queries/get-notice";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { z } from "zod";
import { noticeListSchema } from "../schema";
import { useMemo, useRef } from "react";

export default function NoticeTable() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending } =
    useGetNoticeQuery();

  const pages = useMemo(() => {
    const itemCnt = data?.pages[0]?.itemCnt || 0;
    return data?.pages
      ?.map((li) => li?.itemList || [])
      .flat()
      .map((notice, i) => {
        const customIndex = itemCnt - i;
        return {
          ...notice,
          customIndex,
        };
      });
  }, [data]);

  const table = useReactTable({
    columns,
    data: pages || [],
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowClick = (row: Row<z.infer<typeof noticeListSchema.element>>) => {
    router.push(`/customer-center/${row.original.noticeIdx}`);
  };

  const onClick = () => {
    if (!hasNextPage) return;
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;

    fetchNextPage();
    if (buttonRef.current === null) return;
    if (hasNextPage === true) {
      buttonRef.current.disabled = false;
    }
  };

  const disabled = !hasNextPage || isFetchingNextPage;

  return (
    <>
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2"></div>
        <span className="text-sm font-bold">
          총 {data?.pages[0]?.itemCnt?.toLocaleString() ?? 0} 건
        </span>
      </div>
      <DataTable
        table={table}
        columns={columns}
        className="min-h-[410px] rounded-none border-none"
        onRowClick={onRowClick}
        placeholder={
          isPending ? "데이터를 불러오는 중입니다." : "데이터가 없습니다."
        }
      />

      <div className="h-12 border-t p-1 text-center">
        {hasNextPage && (
          <Button
            variant="ghost"
            className="flex h-full w-full items-center justify-center text-base font-bold"
            onClick={onClick}
            ref={buttonRef}
            disabled={disabled}
          >
            <Plus className="h-6 w-6" />
            더보기
            {isFetchingNextPage && (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            )}
          </Button>
        )}
      </div>
    </>
  );
}
