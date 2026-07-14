"use client";

import {
  ColumnDef,
  SortingState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import DataTablePagination from "./DataTablePagination";
import DataTableEmpty from "./DataTableEmpty";
import DataTableColumnHeader from "./DataTableColumnHeader";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}

export default function DataTable<TData>({
  data,
  columns,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination,
    },

    onSortingChange: setSorting,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left">
                    <DataTableColumnHeader header={header} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <DataTableEmpty colSpan={columns.length} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t border-[#EAF3F5]">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DataTablePagination table={table} />
    </>
  );
}
