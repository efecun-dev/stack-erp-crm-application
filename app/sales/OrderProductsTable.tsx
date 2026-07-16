import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/ui/Table/DataTable";

interface OrderProduct {
  product: string;
  quantity: number;
  unitPrice: number;
}

interface Props {
  items: OrderProduct[];
}

const columnHelper = createColumnHelper<OrderProduct>();

const columns = [
  columnHelper.accessor("product", {
    header: "Ürün",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("quantity", {
    header: "Miktar",
    cell: (info) => `${info.getValue()} adet`,
  }),

  columnHelper.accessor("unitPrice", {
    header: "Birim Fiyat",
    cell: (info) => `₺${info.getValue().toLocaleString("tr-TR")}`,
  }),

  columnHelper.display({
    id: "total",
    header: "Tutar",
    cell: ({ row }) =>
      `₺${(row.original.quantity * row.original.unitPrice).toLocaleString("tr-TR")}`,
  }),
];

export default function OrderProductsTable({ items }: Props) {
  return (
    <div className="bg-[#F4FAFB] p-1">
      <DataTable data={items} columns={columns} />
    </div>
  );
}
