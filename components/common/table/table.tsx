import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  Row,
  RowData,
  Table as TableProps,
  flexRender,
} from "@tanstack/react-table";

export function DataTable<TData, TValue>({
  table,
  columns,
  className,
  onRowClick,
  placeholder,
}: {
  table: TableProps<any>;
  columns?: ColumnDef<TData, TValue>[];
  className?: string;
  onRowClick?: (row: Row<TData>) => void;
  placeholder?: string | React.ReactElement;
}) {
  return (
    <>
      <Table className={cn(className)}>
        <TableHeader className="sticky top-0 bg-white shadow">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white">
          {table.getRowModel().rows.length ? (
            <>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    className={cn(
                      !!onRowClick ? "hover:bg-muted/50" : "hover:bg-white",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          onClick={
                            !!onRowClick
                              ? () => onRowClick(cell?.row)
                              : () => {}
                          }
                          className={cn(!!onRowClick && "cursor-pointer")}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </>
          ) : (
            <>
              <TableRow className="border">
                <TableCell
                  colSpan={columns?.length}
                  className="pointer-events-none h-24 break-keep text-center"
                >
                  {!!placeholder ? placeholder : "No results."}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
}
