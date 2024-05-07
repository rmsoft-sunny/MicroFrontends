"use client";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "@/components/common/table/table";
import { Button } from "@/components/ui/button";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Loader2, Plus } from "lucide-react";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: InfiniteData<any, unknown> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>;
  isFetching: boolean;
  table: Table<unknown>;
  totalFetched: number;
  onRowClick?: () => void;
  hasNextPage: boolean;
}

export const InfiniteScrolling = <TData, TValue>({
  columns,
  data,
  fetchNextPage,
  isFetching,
  table,
  totalFetched,
  onRowClick,
  hasNextPage,
}: Props<TData, TValue>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [fetchButtonClicked, setFetchButtonClicked] = useState(false);

  useEffect(() => {
    if (fetchButtonClicked) {
      fetchNextPage();
      setFetchButtonClicked(false);
    }
  }, [fetchButtonClicked, fetchNextPage]);

  const handleFetchClick = () => {
    setFetchButtonClicked(true);
  };

  return (
    <>
      <div className="m-auto text-center">
        <p className="mb-2 w-full text-end text-sm font-semibold">
          총 {totalFetched} 건
        </p>
        <div className="overflow-auto" ref={tableContainerRef}>
          <DataTable
            columns={columns}
            table={table}
            className="min-h-[400px]"
            placeholder="데이터가 없습니다."
            onRowClick={onRowClick}
          />
        </div>
        <Button
          className="mb-6 w-full bg-white px-4 py-3 text-zinc-700"
          onClick={handleFetchClick}
          disabled={!hasNextPage || isFetching}
          //disabled={isFetching || totalFetched >= table.getRowCount()}
        >
          {isFetching ? (
            <p className="flex items-center gap-1 ">
              <Loader2 className="h-5 w-5 animate-spin" /> 불러오는 중
            </p>
          ) : (
            <p className="flex items-center gap-1 ">
              <Plus className="h-5 w-5" /> 더보기
            </p>
          )}
        </Button>
      </div>
    </>
  );
};
