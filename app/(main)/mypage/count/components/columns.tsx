import { PaymentStatusTypeEnum } from "@/enums/enum-list";
import { cn } from "@/lib/utils";
import { formatKST } from "@/utils/date-format";
import { ColumnDef } from "@tanstack/react-table";

type Type = {
  id: number;
  workName: string;
  point: string;
  paymentStatusType: string;
  calculateDate: Date | null | any;
};

export const columns: ColumnDef<Type, unknown>[] = [
  {
    accessorKey: "paymentStatusType",
    header: () => (
      <span className="flex w-36 justify-center text-center">상태</span>
    ),
    cell: ({ row }) => {
      const status = PaymentStatusTypeEnum.get(row.original?.paymentStatusType);
      return (
        <div className="w-36 overflow-hidden truncate text-center">
          <p
            className={cn(
              status === "완료" && "text-blue-500",
              status === "진행" && "text-green-500",
              status === "대기" && "text-slate-700",
              "font-bold",
            )}
          >
            {status}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "point",
    header: () => (
      <span className="flex w-20 justify-end text-end">포인트</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-20 overflow-hidden truncate text-end">
          {row.original?.point ? (
            <p>{Number(row.original.point).toLocaleString()} P</p>
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
      <span className="flex w-[21rem] justify-start text-start">작업명</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[21rem] overflow-hidden truncate text-start">
          {row.original?.workName ? row.original.workName : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "calculateDate",
    header: () => (
      <span className="flex w-44 justify-center text-center">정산일자</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-44 overflow-hidden truncate text-center">
          {row.original?.calculateDate
            ? formatKST(row.original.calculateDate)
            : "-"}
        </div>
      );
    },
  },
];
