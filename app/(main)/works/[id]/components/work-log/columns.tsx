import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatKST } from "@/utils/date-format";
import { ColumnDef } from "@tanstack/react-table";
import { WorkTaskListType } from "../../type";
import { TaskStatusTypeEnum } from "@/enums/enum-list";

export const workLogColumns: ColumnDef<WorkTaskListType>[] = [
  {
    accessorKey: "taskStatus",
    header: () => <div className="mx-auto text-center">상태</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          size={"sm"}
          variant={"outline_fill"}
          className={cn(
            "cursor-default",
            row.original.taskStatus === "VALIDATE_REJECT" &&
              "border-destructive bg-destructive/10 text-destructive",
          )}
        >
          {TaskStatusTypeEnum.get(row.original.taskStatus)}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "point",
    header: () => <div className="mx-auto text-center">포인트</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.point.toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => <div className="mx-auto text-center">작업시작</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.startDate
          ? formatKST(new Date(row.original.startDate))
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: () => <div className="mx-auto text-center">작업종료</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.endDate ? formatKST(new Date(row.original.endDate)) : "-"}
      </div>
    ),
  },
];
