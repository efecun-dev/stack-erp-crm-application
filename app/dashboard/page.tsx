"use client";
import Sidebar from "@/components/layout/Sidebar";
import MainContainer from "@/components/layout/MainContainer";
import Header from "@/components/layout/Header";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import ProgressBar from "@/components/ui/ProgressBar";
import Tasks from "@/components/dashboard/Tasks";
import StatusBar from "@/components/dashboard/StatusBar";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import mockData from "@/src/constants/last-sales.json";
import DataTable from "@/components/ui/Table/DataTable";
import dynamic from "next/dynamic";

const SalesLineChart = dynamic(() => import("@/components/charts/line-chart"), {
  ssr: false,
});
const salesData = [
  { month: "Oca", sales: 12000 },
  { month: "Şub", sales: 18000 },
  { month: "Mar", sales: 15000 },
  { month: "Nis", sales: 23000 },
];

import type { LastSales } from "@/src/types/last-sales";

const tasks = [
  { title: "Akın Ticaret'e teklif gönder", completed: false },
  { title: "Stok sayımını onayla", completed: false },
  { title: "Haftalık rapor gönder", completed: true },
  { title: "Yeni personel özlük dosyası oluştur.", completed: false },
];

const columnHelper = createColumnHelper<LastSales>();
const columns = [
  columnHelper.accessor("customer", {
    header: "Müşteri",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Tutar",
    cell: (info) => `₺${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor("status", {
    header: "Durum",
    cell: (info) => <StatusBar status={info.getValue()} />,
  }),
];

export default function Home() {
  const [data] = React.useState(() => [...mockData]);

  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="dashboard" />
        <MainContainer>
          <Header searchPlaceholder="Müşteri, sipariş, ürün ara..." />
          <div className="flex flex-col gap-5 w-full flex-1">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">
                Genel bakış
              </h3>
              <p className="text-sm text-gray-400 font-light">
                11 Temmuz 2026 itibarıyla şirket performansı
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <DashInfoBox
                title="Toplam satış"
                content="₺284.500"
                subtitle={{ type: "success", text: "+12,4% bu ay" }}
              />
              <DashInfoBox
                title="Açık fırsatlar"
                content="37"
                subtitle={{ type: "normal", text: "₺612.000 tahmini" }}
              />
              <DashInfoBox
                title="Stok uyarısı"
                content="8"
                subtitle={{ type: "normal", text: "ürün kritik seviyede" }}
              />
              <DashInfoBox
                title="Bekleyen onay"
                content="5"
                subtitle={{ type: "normal", text: "satın alma talebi" }}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">
              <div className="lg:col-span-4 lg:row-span-2">
                <Item title="Aylık satış trendi">
                  <SalesLineChart data={salesData} />
                </Item>
              </div>

              <div className="lg:col-span-2">
                <Item title="Fırsat huni durumu">
                  <div className="flex flex-col gap-3">
                    <ProgressBar
                      percent={80}
                      color="#85B7EB"
                      header={{ title: "Görüşüldü", value: 14 }}
                    />
                    <ProgressBar
                      percent={67}
                      color="#17A2AF"
                      header={{ title: "Teklif verildi", value: 11 }}
                    />
                    <ProgressBar
                      percent={50}
                      color="#0E7C86"
                      header={{ title: "Kazanıldı", value: 9 }}
                    />
                    <ProgressBar
                      percent={18}
                      color="#D7ECEF"
                      header={{ title: "Kaybedildi", value: 3 }}
                    />
                  </div>
                </Item>
              </div>

              <div className="lg:col-span-2">
                <Item title="Bugünkü görevler">
                  <Tasks data={tasks} />
                </Item>
              </div>

              <div className="lg:col-span-6">
                <Item title="Son siparişler">
                  <DataTable data={data} columns={columns} />
                </Item>
              </div>
            </div>
          </div>
        </MainContainer>
      </main>
    </>
  );
}
