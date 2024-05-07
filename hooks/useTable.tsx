import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  RowData,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps {
  columns: any;
  data: RowData[];
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
}

export const useTable = ({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
}: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  return table;
};
