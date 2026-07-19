import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/ui/Table/DataTable";
import { AccountItem } from "@/src/types/accounts";

interface Props {
  items: AccountItem[];
}

const columnHelper = createColumnHelper<AccountItem>();

const columns = [
  columnHelper.accessor("date", {
    header: "Tarih",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("description", {
    header: "Açıklama",
    cell: (info) => `${info.getValue()}`,
  }),

  columnHelper.accessor("amount", {
    header: "Tutar",
    cell: (info) => `₺${info.getValue().toLocaleString("tr-TR")}`,
  }),

  columnHelper.accessor("type", {
    header: "Tür",
    cell: (info) => (info.getValue() === "income" ? "Gelir" : "Gider"),
  }),
];

export default function AccountDetailsTable({ items }: Props) {
  return (
    <div className="bg-[#F4FAFB] p-1">
      <DataTable data={items} columns={columns} />
    </div>
  );
}
