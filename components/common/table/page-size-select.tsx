import { Table } from "@tanstack/react-table";

export const PageSizeSelect = ({ table }: { table: Table<any> }) => {
  return (
    <>
      <select
        className="bg-white"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[20, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </>
  );
};
