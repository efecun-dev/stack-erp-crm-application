import DataTable from "@/components/ui/Table/DataTable";
import { StaffDetails } from "@/src/types/staffs";
import { createColumnHelper } from "@tanstack/react-table";
import { intervalToDuration } from "date-fns";

interface Props {
  items: StaffDetails[];
}

function getDuration(start: string, end: string) {
  const [sd, sm, sy] = start.split("/").map(Number);
  const [ed, em, ey] = end.split("/").map(Number);

  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);

  const duration = intervalToDuration({
    start: startDate,
    end: endDate,
  });

  const parts: string[] = [];

  if (duration.years) parts.push(`${duration.years} yıl`);
  if (duration.months) parts.push(`${duration.months} ay`);
  if (duration.days) parts.push(`${duration.days} gün`);

  return parts.join(" ");
}

const columnHelper = createColumnHelper<StaffDetails>();
const columns = [
  columnHelper.accessor("type", {
    header: "Tür",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dates", {
    header: "Tarih Aralığı",
    cell: (info) => `${info.getValue().start} - ${info.getValue().end}`,
  }),
  columnHelper.display({
    id: "remains",
    header: "Kalan İzin",
    cell: ({ row }) =>
      getDuration(row.original.dates.start, row.original.dates.end),
  }),
  columnHelper.accessor("status", {
    header: "Durum",
    cell: (info) => (
      <span
        className={`px-2 py-1 text-xs rounded-lg ${info.getValue() == "approved" ? "bg-[#EAF3DE] text-[#27500A]" : "bg-[#FBE7E1] text-[#8A2E17]"}`}
      >
        {info.getValue() == "approved" ? "Onaylandı" : "Reddedildi"}
      </span>
    ),
  }),
];

export default function StaffDetailTable({ items }: Props) {
  return (
    <div className="bg-[#F4FAFB] p-1">
      <DataTable data={items} columns={columns} />
    </div>
  );
}
