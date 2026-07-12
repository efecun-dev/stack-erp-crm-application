"use client";
import Sidebar from "@/components/layout/Sidebar";
import MainContainer from "@/components/layout/MainContainer";
import DashHeader from "@/components/dashboard/DashHeader";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import ChartLine from "@/components/charts/line-chart";
import salesData from "@/components/charts/data/salesData";
import ProgressBar from "@/components/ui/ProgressBar";
import Tasks from "@/components/dashboard/Tasks";

const tasks = [
  { title: "Akın Ticaret'e teklif gönder", completed: false },
  { title: "Stok sayımını onayla", completed: false },
  { title: "Haftalık rapor gönder", completed: true },
  { title: "Yeni personel özlük dosyası oluştur.", completed: false },
];

const lastSales = [
  { customer: "Akın Ticaret", amount: 12400, status: "shipping" },
  { customer: "Mavi İnşaat", amount: 8750, status: "delivered" },
  { customer: "Yıldız Elektronik", amount: 21200, status: "preparing" },
  { customer: "Deniz Lojistik", amount: 5300, status: "shipping" },
];

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
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
                  <ChartLine data={salesData} />
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
                  <div className="table-wrapper">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Müşteri</th>
                          <th>Tutar</th>
                          <th>Durum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lastSales.map((item, index) => (
                          <tr key={index}>
                            <td>{item.customer}</td>
                            <td>₺{item.amount.toLocaleString()}</td>
                            <td>
                              <span
                                className={`px-2 py-0.5 rounded-xl ${item.status == "shipping" ? "bg-[#E3F6F8] text-[#08525A]" : item.status == "delivered" ? "bg-[#EAF3DE] text-[#27500A]" : item.status == "preparing" ? "bg-[#FAEEDA] text-[#633806]" : ""}`}
                              >
                                {item.status == "shipping"
                                  ? "Kargoda"
                                  : item.status == "delivered"
                                    ? "Teslim edildi"
                                    : item.status == "preparing"
                                      ? "Hazırlanıyor"
                                      : ""}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
