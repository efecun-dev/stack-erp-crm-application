"use client";
import Sidebar from "@/components/layout/Sidebar";
import MainContainer from "@/components/layout/MainContainer";
import DashHeader from "@/components/dashboard/DashHeader";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import ChartLine from "@/components/charts/line-chart";
import salesData from "@/components/charts/data/salesData";
import ProgressBar from "@/components/ui/ProgressBar";

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen overflow-hidden flex items-start">
        <Sidebar />
        <MainContainer>
          <DashHeader />
          <div className="flex flex-col gap-5 w-full flex-1">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">
                Genel bakış
              </h3>
              <p className="text-sm text-gray-400 font-light">
                11 Temmuz 2026 itibarıyla şirket performansı
              </p>
            </div>
            <div className="flex flex-1 gap-3">
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
            <div className="flex flex-1 gap-5">
              <div className="flex-2">
                <Item title="Aylık satış trendi">
                  <ChartLine data={salesData} />
                </Item>
              </div>
              <div className="flex-1">
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
            </div>
          </div>
        </MainContainer>
      </main>
    </>
  );
}
