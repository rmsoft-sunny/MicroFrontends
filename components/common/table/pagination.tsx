import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const TablePagination = ({ table }: { table: Table<any> }) => {
  // 첫 페이지로 이동
  const onFirstPageClick = () => table.setPageIndex(0);

  // 이전 페이지로 이동
  const onPreviousClick = () => table.previousPage();

  // 마지막 페이지로 이동
  const onLastPageClick = () => table.setPageIndex(table.getPageCount());

  // 다음 페이지로 이동
  const onNextClick = () => table.nextPage();

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        onClick={onFirstPageClick}
        disabled={!table.getCanPreviousPage()}
        className="text-zinc-600"
      >
        <ChevronsLeft className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={!table.getCanPreviousPage()}
        onClick={onPreviousClick}
        className="text-zinc-600"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        disabled={!table.getCanNextPage()}
        onClick={onNextClick}
        className="text-zinc-600"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={onLastPageClick}
        disabled={!table.getCanNextPage()}
        className="text-zinc-600"
      >
        <ChevronsRight className="h-6 w-6" />
      </Button>
    </>
  );
};
