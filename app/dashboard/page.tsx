import Sidebar from "@/components/layout/Sidebar";
import { Metadata } from "next";
import MainContainer from "@/components/layout/MainContainer";
import DashHeader from "@/components/dashboard/DashHeader";

export const metadata: Metadata = {
  title: "Stack | Dashboard",
  description:
    "Stack, modern ve hızlı bir ERP ve CRM yazılımıdır. İşletmenizin tüm süreçlerini tek bir platformda yönetmenizi sağlar.",
};

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen overflow-hidden flex items-start">
        <Sidebar />
        <MainContainer>
          <DashHeader />
        </MainContainer>
      </main>
    </>
  );
}
