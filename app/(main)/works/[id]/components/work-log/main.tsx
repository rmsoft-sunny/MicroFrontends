"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";
import _ from "lodash";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/table/table";
import { PageSizeSelect } from "@/components/common/table/page-size-select";
import { PageCount } from "@/components/common/table/page-count";
import { TablePagination } from "@/components/common/table/pagination";
import SearchMultiSelectFilter from "@/components/common/search-form/search-multi-select-filter";

import { useTable } from "@/hooks/useTable";
import { useUser } from "@/hooks/useUser";
import { InspectionStatusType, WorkerTaskStatusType } from "@/enums/enum-list";
import { useGetWorkLog } from "../../queries/get-work-log";
import { useGetValidateLog } from "../../queries/get-validate-log";
import { workLogColumns } from "./columns";

// 작업 내역 상태 옵션
const workerTaskStatusOptions = Object.entries(WorkerTaskStatusType).map(
  (status) => ({
    value: status[0],
    label: status[1],
  }),
);

// 검수 내역 상태 옵션
const validaterTaskStatusOptions = Object.entries(InspectionStatusType).map(
  (status) => ({
    value: status[0],
    label: status[1],
  }),
);

const WorkLog = () => {
  const { id: workIdx }: { id: string } = useParams();
  const params = useSearchParams();

  const user = useUser();
  const roleType = user?.roleType;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [selectedOpt, setSelectedOpt] = useState<string[]>([]);
  const [open, setOpen] = useState({
    taskStatus: false,
  });

  const showReset = !!selectedOpt.length;

  const logReqData = {
    projectCode: params.get("c"),
    workIdx: Number(workIdx),
    data: {
      pageNum: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      taskStatusList: selectedOpt,
    },
  };

  const { itemCnt: workItemCnt, logList: workLogList } = useGetWorkLog(
    logReqData,
    roleType,
  ); // 작업자 작업 리스트

  const { itemCnt: validateItemCnt, logList: validateLogList } =
    useGetValidateLog(logReqData, roleType); // 검수자 검수 리스트

  // 테이블 데이터 유저 역할 별 분기
  const table = useTable({
    columns: workLogColumns,
    data: roleType === "PROJECT_VALIDATOR" ? validateLogList : workLogList,
    pagination,
    setPagination,
    pageCount:
      roleType === "PROJECT_VALIDATOR"
        ? Math.ceil(validateItemCnt / pagination.pageSize) || 1
        : Math.ceil(workItemCnt / pagination.pageSize) || 1,
  });

  const onSelectState = (selected: string) => {
    if (selectedOpt.includes(selected)) {
      const filteredPrev = selectedOpt.filter((option) => option !== selected);
      setSelectedOpt(filteredPrev);
    } else {
      setSelectedOpt([...selectedOpt, selected]);
    }
  };

  const resetSearchOpt = () => setSelectedOpt([]);

  useEffect(() => {
    table.resetPageIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOpt]);
  return (
    <div className="p-4">
      <div className="mb-2 flex gap-2">
        <SearchMultiSelectFilter
          title={"상태"}
          name={"taskStatus"}
          options={
            roleType === "PROJECT_VALIDATOR"
              ? validaterTaskStatusOptions
              : workerTaskStatusOptions
          }
          selectedOption={selectedOpt}
          open={open.taskStatus}
          setOpen={setOpen}
          onSelect={onSelectState}
          onDelete={(selected) =>
            setSelectedOpt((prev) => prev.filter((val) => val !== selected))
          }
        />
        {showReset && (
          <Button variant={"secondary"} onClick={resetSearchOpt}>
            Reset
          </Button>
        )}
      </div>
      <>
        <DataTable
          table={table}
          columns={workLogColumns}
          placeholder={"작업내역이 없습니다."}
          className="h-[540px]"
        />
        <div className="my-2 flex items-center justify-end gap-8">
          <PageSizeSelect table={table} />
          <PageCount table={table} />
          <div className="flex gap-2">
            <TablePagination table={table} />
          </div>
        </div>
      </>
    </div>
  );
};

export default WorkLog;
