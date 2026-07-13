"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "lucide-react";
import React from "react";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}

export default function Table<TData>({ data, columns }: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-100 w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-3 py-2 text-left font-light text-xs text-[#8FA8AB] uppercase"
                  >
                    <div className="inline-flex items-center gap-2">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>

                      {header.column.getCanSort() && (
                        <div className="flex flex-col items-center -space-y-1.5">
                          <ChevronUp
                            size={12}
                            className={
                              header.column.getIsSorted() === "asc"
                                ? "text-[#0B2E33]"
                                : "text-[#C8DADC]"
                            }
                          />
                          <ChevronDown
                            size={12}
                            className={
                              header.column.getIsSorted() === "desc"
                                ? "text-[#0B2E33]"
                                : "text-[#C8DADC]"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-[#EAF3F5] transition hover:bg-[#F8FCFD]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-3.5 text-[#456]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
