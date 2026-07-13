"use client";
import Item from "@/components/dashboard/Item";
import MainContainer from "@/components/layout/MainContainer";
import Sidebar from "@/components/layout/Sidebar";
import { Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";

export default function CRM() {
  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="crm" />
        <MainContainer>
          <Header searchPlaceholder="Müşteri veya fırsat ara..." />
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">CRM</h3>
              <p className="text-sm text-gray-400 font-light">
                Müşterileri ve satış fırsatlarını yönetin
              </p>
            </div>
            <Button Icon={Plus} type="primary">
              Yeni müşteri
            </Button>
          </div>
        </MainContainer>
      </main>
    </>
  );
}
