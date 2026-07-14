"use client";

import { Header } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props<TData, TValue> {
  header: Header<TData, TValue>;
}

export default function DataTableColumnHeader<TData, TValue>({
  header,
}: Props<TData, TValue>) {
  return (
    <div
      onClick={header.column.getToggleSortingHandler()}
      className="flex cursor-pointer select-none items-center gap-2 text-xs font-light uppercase text-[#8FA8AB]"
    >
      {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}

      {header.column.getCanSort() && (
        <div className="-space-y-1 flex flex-col">
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
  );
}
