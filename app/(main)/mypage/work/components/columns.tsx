import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { TaskStatusTypeEnum } from "@/enums/enum-list";
import { formatKST } from "@/utils/date-format";

type Type = {
  projectIdx: number;
  workIdx: number;
  taskIdx: number;
  taskStatus: string;
  workName: string;
  startDate: Date | null;
  endDate: Date | null;
};

export const columns: ColumnDef<Type, unknown>[] = [
  {
    accessorKey: "taskStatus",
    header: () => (
      <span className="flex w-36 justify-center text-center">상태</span>
    ),
    cell: ({ row }) => {
      const getStatus = TaskStatusTypeEnum.get(row.original?.taskStatus);
      const status = getStatus.substring(getStatus.length - 2);

      return (
        <div className="w-36 overflow-hidden truncate text-center">
          {row.original?.taskStatus ? (
            <p
              className={cn(
                status === "진행" && "text-green-600",
                status === "완료" && "text-blue-500",
                status === "반려" && "text-rose-600",
                "font-bold",
              )}
            >
              {TaskStatusTypeEnum.get(row.original.taskStatus)}
            </p>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "workName",
    header: () => (
      <span className="flex w-44 justify-start text-start">작업명</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-44 overflow-hidden truncate text-start">
          {row.original?.workName ? row.original.workName : "-"}
        </div>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: () => (
      <span className="flex w-44 justify-center text-center">시작일시</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-44 overflow-hidden truncate text-center">
          {row.original?.startDate ? formatKST(row.original.startDate) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: () => (
      <span className="flex w-44 justify-center text-center">완료일시</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-44 overflow-hidden truncate text-center">
          {row.original?.endDate ? formatKST(row.original.endDate) : "-"}
        </div>
      );
    },
  },
];
