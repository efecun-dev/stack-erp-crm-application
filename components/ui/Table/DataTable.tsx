"use client";

import React from "react";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DataTablePagination from "./DataTablePagination";
import DataTableEmpty from "./DataTableEmpty";
import DataTableColumnHeader from "./DataTableColumnHeader";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  pagination?: boolean;
  sortable?: boolean;
  expandable?: boolean;

  renderExpandedRow?: (row: TData) => React.ReactNode;
}

export default function DataTable<TData>({
  data,
  columns,
  pagination = false,
  sortable = false,
  expandable = false,
  renderExpandedRow,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize: 10,
    },
  );

  const [expandedRows, setExpandedRows] = React.useState<
    Record<string, boolean>
  >({});

  const toggleRow = (rowId: string) => {
    if (!expandable) return;

    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination: paginationState,
    },

    onSortingChange: sortable ? setSorting : undefined,
    onPaginationChange: pagination ? setPaginationState : undefined,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
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
                    <DataTableColumnHeader
                      sortable={sortable}
                      header={header}
                    />
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
                <React.Fragment key={row.id}>
                  <tr
                    className={`border-t border-[#EAF3F5] transition ${
                      expandable ? "cursor-pointer hover:bg-[#F4FAFB]" : ""
                    }`}
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>

                  {expandable && expandedRows[row.id] && renderExpandedRow && (
                    <tr className="bg-[#F8FCFD]">
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="p-0"
                      >
                        {renderExpandedRow(row.original)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && <DataTablePagination table={table} />}
    </>
  );
}
