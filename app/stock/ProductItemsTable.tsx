import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/ui/Table/DataTable";

interface ProductItem {
  date: string;
  type: "in" | "out";
  amount: number;
  user: string;
  note: string;
}

interface Props {
  items: ProductItem[];
}

const columnHelper = createColumnHelper<ProductItem>();

const columns = [
  columnHelper.accessor("date", {
    header: "Tarih",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: "Tür",
    cell: (info) => (
      <span
        className={`px-2 py-1 text-xs rounded-lg ${info.getValue() == "in" ? "bg-[#E3F6F8] text-[#08525A]" : "bg-[#EAF3DE] text-[#27500A]"}`}
      >
        {info.getValue() == "in" ? "Giriş" : "Çıkış"}
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Miktar",
    cell: (info) => `${info.getValue().toLocaleString()} adet`,
  }),
  columnHelper.accessor("user", {
    header: "Kullanıcı",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("note", {
    header: "Not",
    cell: (info) => info.getValue().trim(),
  }),
];

export default function ProductItemsTable({ items }: Props) {
  return (
    <div className="bg-[#F4FAFB] p-1">
      <DataTable data={items} columns={columns} />
    </div>
  );
}
