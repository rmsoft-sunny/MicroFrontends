import { Table } from "@tanstack/react-table";

export const PageCount = ({ table }: { table: Table<any> }) => {
  return (
    <>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1}&nbsp;of&nbsp;
          {table.getPageCount().toLocaleString()}
        </strong>
      </span>
    </>
  );
};
