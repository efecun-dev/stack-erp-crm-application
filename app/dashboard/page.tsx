import Sidebar from "@/components/ui/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack | Dashboard",
  description:
    "Stack, modern ve hızlı bir ERP ve CRM yazılımıdır. İşletmenizin tüm süreçlerini tek bir platformda yönetmenizi sağlar.",
};

export default function Home() {
  return (
    <>
      <main className="w-full max-h-screen h-screen p-4 overflow-hidden flex items-start gap-10">
        <Sidebar />
      </main>
    </>
  );
}
