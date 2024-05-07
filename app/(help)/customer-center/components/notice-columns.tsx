import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { noticeListSchema } from "../schema";
import { z } from "zod";
import { formatKST } from "@/utils/date-format";

export const columns: ColumnDef<
  z.infer<typeof noticeListSchema.element> & { customIndex: number }
>[] = [
  {
    accessorKey: "customIndex",
    header: () => <div className="text-center">순번</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.mainYn === "Y" ? (
          <Badge variant="default">중요</Badge>
        ) : (
          row.original.customIndex
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
    header: () => <div className="text-center">등록일</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {formatKST(row.original.regDate)?.split(" ")[0]}
      </div>
    ),
  },
];
