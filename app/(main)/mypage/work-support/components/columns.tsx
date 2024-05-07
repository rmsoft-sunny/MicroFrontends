import { ColumnDef, Row } from "@tanstack/react-table";
import { WorkSupportModal } from "./work-support-modal";
import { useState } from "react";
import { Eye } from "lucide-react";
import { RequestStatusTypeEnum } from "@/enums/enum-list";
import { formatKST } from "@/utils/date-format";

type Type = {
  requestStatusType: "WAIT" | "CONFIRM" | "REJECT";
  workName: string;
  requestDate: Date | null | any;
  rejectMsg: null | string;
};

export const columns: ColumnDef<Type, unknown>[] = [
  {
    accessorKey: "requestStatusType",
    header: () => (
      <span className="flex w-36 justify-center text-center">상태</span>
    ),
    cell: ({ row }) => {
      const status = RequestStatusTypeEnum.get(row.original?.requestStatusType);
      return (
        <div className="w-36 overflow-hidden truncate text-center">
          {row.original?.requestStatusType ? (
            <>
              {row.original.requestStatusType === "CONFIRM" && (
                <p className="font-bold text-blue-500">{status}</p>
              )}
              {row.original.requestStatusType === "REJECT" && (
                <p className="font-bold text-rose-500">{status}</p>
              )}
              {row.original.requestStatusType === "WAIT" && (
                <p className="font-bold text-slate-700">{status}</p>
              )}
            </>
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
    accessorKey: "requestDate",
    header: () => (
      <span className="flex w-44 justify-center text-center">지원일시</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-44 overflow-hidden truncate text-center">
          {formatKST(row.original?.requestDate)
            ? formatKST(row.original.requestDate)
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "rejectMsg",
    header: () => (
      <span className="flex w-20 justify-center text-center">반려사유</span>
    ),
    cell: ({ row }) => {
      return <Reject row={row} />;
    },
  },
];

const Reject = ({ row }: { row: Row<Type> }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onRowClick = () => {
    setIsOpenModal(true);
  };
  return (
    <div className="flex w-20 justify-center text-center">
      {row.original?.requestStatusType === "REJECT" ? (
        <button onClick={onRowClick}>
          <Eye size={18} className="text-slate-600 hover:text-primary" />
        </button>
      ) : (
        "-"
      )}
      {isOpenModal && (
        <WorkSupportModal
          isModalOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          rejectMsg={row.original.rejectMsg}
        />
      )}
    </div>
  );
};
