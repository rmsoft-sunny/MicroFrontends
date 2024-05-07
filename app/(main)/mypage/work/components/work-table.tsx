import { useTable } from "@/hooks/useTable";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo, useRef } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/common/table/table";

interface Props {
  list: AxiosResponse<any, any>[];
  itemCnt: number;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
}

export const WorkTable = (props: Props) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 테이블 데이터
  const flatList = useMemo(
    () => props.list.flatMap((item) => item.data?.data?.itemList) ?? [],
    [props.list],
  );

  // 총 개수
  const itemCnt = props.itemCnt;

  const table = useTable({
    columns,
    data: flatList,
    pageCount: 0,
  });

  return (
    <>
      <div className="min-h-[440px]">
        <div className="m-auto text-center">
          <p className="mb-2 w-full text-end text-sm font-semibold">
            총 {itemCnt} 건
          </p>
          <div className="overflow-auto" ref={tableContainerRef}>
            <DataTable
              columns={columns}
              table={table}
              className="min-h-[420px] bg-white"
              placeholder="데이터가 없습니다."
            />
          </div>
        </div>
      </div>
    </>
  );
};
