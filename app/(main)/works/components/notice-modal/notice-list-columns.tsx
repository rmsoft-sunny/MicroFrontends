import { ColumnDef } from "@tanstack/react-table";
import { NoticeListType } from "../../type";
import { Badge } from "@/components/ui/badge";
import { formatKST } from "@/utils/date-format";

export const noticeListColumns: ColumnDef<NoticeListType>[] = [
  {
    accessorKey: "noticeIdx",
    header: () => <div className="text-center">순번</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.mainYn === "Y" ? (
          <Badge variant="default">중요</Badge>
        ) : (
          row.original.noticeIdx
        )}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="w-[550px]">제목</div>,
    cell: ({ row }) => (
      <div className="w-[550px] truncate">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div className="w-26 text-center">등록일</div>,
    cell: ({ row }) => (
      <div className="w-26 text-center">
        {formatKST(new Date(row.original.regDate))}
      </div>
    ),
  },
];
