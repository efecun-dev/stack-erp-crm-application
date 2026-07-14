"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props<TData> {
  table: Table<TData>;
}

export default function DataTablePagination<TData>({ table }: Props<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;

  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EAF3F5] px-5 py-4">
      <div className="text-sm text-[#7B9498]">
        Toplam <span className="font-semibold">{totalRows}</span> kayıt
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#7B9498]">Sayfa başına</span>

          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded-lg border border-[#D7ECEF] bg-white px-3 py-2 text-sm outline-none"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <span className="text-sm text-[#7B9498]">
          {start}-{end} / {totalRows}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border border-[#D7ECEF] p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#F4FAFB]"
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border border-[#D7ECEF] p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#F4FAFB]"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1 mx-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                className={`
                  h-9 w-9 rounded-lg text-sm transition
                  ${
                    page === pageIndex
                      ? "bg-[#0E7C86] text-white"
                      : "hover:bg-[#F4FAFB] text-[#456]"
                  }
                `}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border border-[#D7ECEF] p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#F4FAFB]"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border border-[#D7ECEF] p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#F4FAFB]"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
