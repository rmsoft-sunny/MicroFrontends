import React, { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/table";
import { PageSizeSelect } from "@/components/common/table/page-size-select";
import { PageCount } from "@/components/common/table/page-count";
import { TablePagination } from "@/components/common/table/pagination";
import { DialogHeader } from "@/components/ui/dialog";

import { useTable } from "@/hooks/useTable";
import { useGetNoticeList } from "../../queries/get-notice-list";
import { noticeListColumns } from "./notice-list-columns";

const NoticeListTable = ({
  selectNotice,
  projectCode,
}: {
  projectCode: string | undefined;
  selectNotice: (noticeIdx: number) => void;
}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const { noticeList, itemCnt } = useGetNoticeList({
    projectCode,
    data: {
      pageNum: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });

  const table = useTable({
    columns: noticeListColumns,
    data: noticeList,
    pagination,
    setPagination,
    pageCount: Math.ceil(itemCnt / pagination.pageSize) || 1,
  });

  return (
    <div>
      <DialogHeader className="mb-4">
        <h3 className={"text-lg font-bold"}>공지사항 목록</h3>
      </DialogHeader>
      <DataTable
        table={table}
        columns={noticeListColumns}
        placeholder={"등록 된 공지사항이 없습니다."}
        className="h-[calc(100vh-250px)] max-h-[800px]"
        onRowClick={(row) => selectNotice(row.original.noticeIdx)}
      />
      <div className="my-2 flex items-center justify-end gap-8">
        <PageSizeSelect table={table} />
        <PageCount table={table} />
        <div className="flex gap-2">
          <TablePagination table={table} />
        </div>
      </div>
    </div>
  );
};

export default NoticeListTable;
