import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";

export function CommonSubTable<TData, TValue>({
  table,
  onRowClick,
  selected,
}: {
  table: any;
  onRowClick?: (row: TData) => void;
  selected: any;
}) {
  const columnCount = table?.options.columns.length - 1 || 0;

  return (
    <Table className="h-[240px]">
      <TableHeader className="sticky top-0 bg-white shadow">
        {table?.getHeaderGroups().map((headerGroup: any) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table?.getRowModel().rows.map((row: any) => {
          return (
            <TableRow
              key={row.id}
              className={cn(
                !!onRowClick && "hover:bg-muted/50",
                row?.original?.id === selected?.id && "bg-muted/50",
              )}
            >
              {row.getVisibleCells().map((cell: any) => {
                return (
                  <TableCell
                    key={cell.id}
                    onClick={
                      !!onRowClick
                        ? () => onRowClick(cell?.row?.original)
                        : () => {}
                    }
                    className={cn(!!onRowClick && "cursor-pointer")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

interface TableProps {
  columns: any;
  data: RowData[];
}

export const useSubTable = ({ columns, data }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  return table;
};
