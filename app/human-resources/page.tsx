"use client";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import Header from "@/components/layout/Header";
import MainContainer from "@/components/layout/MainContainer";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Combobox from "@/components/ui/Combobox";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/Table/DataTable";
import StaffAddForm from "@/src/forms/StaffAddForm";
import { StaffFormData, staffSchema } from "@/src/schemas/staff-add.schema";
import { Staff, StaffDetails } from "@/src/types/staffs";
import { zodResolver } from "@hookform/resolvers/zod";
import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import mockStaffData from "@/src/constants/staff.json";
import mockReqData from "@/src/constants/requests.json";
import StaffDetailTable from "./StaffDetailTable";
import { Requests } from "@/src/types/requests";

function getUsedAnnualLeave(items: StaffDetails[]) {
  return items.reduce((total, item) => {
    if (item.type !== "Yıllık İzin" || item.status !== "approved") {
      return total;
    }

    const [sd, sm, sy] = item.dates.start.split("/").map(Number);
    const [ed, em, ey] = item.dates.end.split("/").map(Number);

    const start = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);

    const days =
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return total + days;
  }, 0);
}

function getDaysBetween(start: string, end: string): number {
  const [startDay, startMonth, startYear] = start.split("/").map(Number);
  const [endDay, endMonth, endYear] = end.split("/").map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  const diff =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return diff + 1;
}

export default function HumanResources() {
  const [staffModal, setStaffModal] = useState(false);
  const [tab, setTab] = useState("staff");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [reqStatus, setReqStatus] = useState("all");

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      fullName: undefined,
      email: undefined,
      department: undefined,
      position: undefined,
      startDate: new Date(),
      status: "active",
    },
  });

  const onSubmit = (data: StaffFormData) => {
    console.log(data);

    setStaffModal(false);
    form.reset();
  };

  const staffColumnHelper = createColumnHelper<Staff>();
  const staffColumns = [
    staffColumnHelper.accessor("staff", {
      header: "Personel",
      cell: (info) => (
        <div className="flex flex-col">
          <h3>{info.getValue().name}</h3>
          <p className="text-xs text-gray-500">{info.getValue().position}</p>
        </div>
      ),
    }),
    staffColumnHelper.accessor("department", {
      header: "Departman",
      cell: (info) => info.getValue(),
    }),
    staffColumnHelper.accessor("startDate", {
      header: "İşe Başlama Tarihi",
      cell: (info) => info.getValue(),
    }),
    staffColumnHelper.display({
      id: "remains",
      header: "Kalan İzin",
      cell: ({ row }) => {
        const totalLeave = 14;
        const used = getUsedAnnualLeave(row.original.items);
        return `${totalLeave - used} gün`;
      },
    }),
    staffColumnHelper.accessor("status", {
      header: "Durum",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-lg ${info.getValue() == "active" ? "bg-[#EAF3DE] text-[#27500A]" : "bg-[#FBE7E1] text-[#8A2E17]"}`}
        >
          {info.getValue() == "active" ? "Aktif" : "Pasif"}
        </span>
      ),
    }),
    staffColumnHelper.display({
      id: "actions",
      header: "İşlemler",
      cell: ({ row }) => <Button variant="secondary" Icon={Ellipsis}></Button>,
    }),
  ];

  const staffData = useMemo(() => mockStaffData as Staff[], []);

  const reqColumnHelper = createColumnHelper<Requests>();
  const reqColumns = [
    reqColumnHelper.accessor("staff", {
      header: "Personel",
      cell: (info) => info.getValue(),
    }),
    reqColumnHelper.accessor("type", {
      header: "Tür",
      cell: (info) => info.getValue(),
    }),
    reqColumnHelper.accessor("dates.start", {
      header: "Başlangıç",
      cell: (info) => info.getValue(),
    }),
    reqColumnHelper.accessor("dates.end", {
      header: "Bitiş",
      cell: (info) => info.getValue(),
    }),
    reqColumnHelper.display({
      id: "remains",
      header: "Gün",
      cell: ({ row }) =>
        `${getDaysBetween(row.original.dates.start, row.original.dates.end)} gün`,
    }),
    reqColumnHelper.accessor("status", {
      header: "Durum",
      cell: (info) => (
        <span
          className={`text-xs px-2 py-1 rounded-lg ${info.getValue() == "waiting" ? "bg-[#FAEEDA] text-[#633806]" : info.getValue() == "approved" ? "bg-[#EAF3DE] text-[#27500A]" : info.getValue() == "declined" ? "bg-[#FBE7E1] text-[#8A2E17]" : ""}`}
        >
          {info.getValue() == "waiting"
            ? "Bekliyor"
            : info.getValue() == "approved"
              ? "Onaylandı"
              : info.getValue() == "declined"
                ? "Reddedildi"
                : ""}
        </span>
      ),
    }),
  ];

  const reqData = useMemo(() => mockReqData as Requests[], []);

  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="hr" />
        <MainContainer>
          <Header searchPlaceholder="Personel ara..." />
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">
                İnsan Kaynakları
              </h3>
              <p className="text-sm text-gray-400 font-light">
                Personel bilgilerini ve izin süreçlerini yönetin
              </p>
            </div>
            <Button Icon={Plus} onClick={() => setStaffModal(true)}>
              Yeni Personel
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DashInfoBox title="Aktif personel" content="4" />
            <DashInfoBox title="Bugün izinli" content="1" />
            <DashInfoBox title="Bekleyen izin talebi" content="2" />
            <DashInfoBox title="Departman sayısı" content="4" />
          </div>
          <div className="bg-white p-1.5 border border-[#D7ECEF] rounded-xl items-center flex gap-1 w-fit">
            <div
              onClick={() => setTab("staff")}
              className={`py-1 px-3 text-[#5C7C80] text-sm cursor-pointer rounded-md transition ${tab == "staff" ? "text-[#08525A] bg-[#E3F6F8]" : ""}`}
            >
              Personel Listesi
            </div>
            <div
              onClick={() => setTab("request")}
              className={`py-1 px-3 text-[#5C7C80] text-sm cursor-pointer rounded-md transition ${tab == "request" ? "text-[#08525A] bg-[#E3F6F8]" : ""}`}
            >
              İzin Talepleri
            </div>
          </div>
          {tab == "staff" && (
            <>
              <Item>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Combobox
                      options={[
                        { label: "Departman: Tümü", value: "all" },
                        { label: "Yazılım", value: "software" },
                        { label: "Satış", value: "sales" },
                        { label: "Finans", value: "finance" },
                        { label: "İnsan Kaynakları", value: "hr" },
                        { label: "Operasyon", value: "operation" },
                      ]}
                      value={department}
                      onChange={setDepartment}
                    />
                    <Combobox
                      options={[
                        { label: "Durum: Tümü", value: "all" },
                        { label: "Aktif", value: true },
                        { label: "Pasif", value: false },
                      ]}
                      value={status}
                      onChange={setStatus}
                    />
                  </div>
                </div>
              </Item>
              <Item>
                <DataTable
                  pagination
                  sortable
                  expandable
                  renderExpandedRow={(order) => (
                    <StaffDetailTable items={order.items} />
                  )}
                  data={staffData}
                  columns={staffColumns}
                />
              </Item>
            </>
          )}
          {tab == "request" && (
            <>
              <Item>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Combobox
                      options={[
                        { label: "Tür: Tümü", value: "all" },
                        { label: "Yıllık İzin", value: 1 },
                        { label: "Hastalık İzni", value: 2 },
                        { label: "Mazeret İzni", value: 3 },
                      ]}
                      value={type}
                      onChange={setType}
                    />
                    <Combobox
                      options={[
                        { label: "Durum: Tümü", value: "all" },
                        { label: "Bekliyor", value: "waiting" },
                        { label: "Onaylandı", value: "approved" },
                        { label: "Reddedildi", value: "declined" },
                      ]}
                      value={reqStatus}
                      onChange={setReqStatus}
                    />
                  </div>
                </div>
              </Item>
              <Item>
                <DataTable
                  sortable
                  pagination
                  data={reqData}
                  columns={reqColumns}
                />
              </Item>
            </>
          )}
          <Modal
            header={{
              title: "Yeni personel ekle",
              subtitle: "Özlük bilgilerini girin",
            }}
            footer={{
              cta: "Personeli Kaydet",
              cancel: "Vazgeç",
            }}
            formId="staff-form"
            active={staffModal}
            onClose={() => setStaffModal(false)}
          >
            <StaffAddForm id="staff-form" form={form} onSubmit={onSubmit} />
          </Modal>
        </MainContainer>
      </main>
    </>
  );
}
