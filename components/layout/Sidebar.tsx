import Image from "next/image";
import banner from "@/public/assets/banner-cropped.png";
import logo from "@/public/assets/logo.png";

import SidebarLink from "@/components/ui/SidebarLink";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  Receipt,
  IdCardLanyard,
  HandCoins,
  NotepadText,
  Settings,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  active: string;
};

export default function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 z-20 flex h-screen w-20 flex-col items-center border-r border-[#D7ECEF] bg-white px-3 py-6 transition-all lg:w-80 lg:px-4">
      {/* Logo */}
      <div className="mb-5">
        {/* Mobil */}
        <Image
          src={logo}
          alt="Logo"
          className="block w-10 lg:hidden"
          priority
        />

        {/* Desktop */}
        <Image
          src={banner}
          alt="Banner"
          className="hidden w-52 lg:block"
          priority
        />
      </div>

      <div className="mb-5 h-px w-full bg-[#D7ECEF]" />

      {/* Menü */}
      <div className="flex w-full flex-col gap-2">
        <SidebarLink
          href="/dashboard"
          title="Dashboard"
          Icon={LayoutDashboard}
          isActive={active == "dashboard"}
        />
        <SidebarLink
          href="/crm"
          title="CRM"
          Icon={Users}
          isActive={active == "crm"}
        />
        <SidebarLink
          href="/sales"
          title="Satışlar"
          Icon={ShoppingCart}
          isActive={active == "sales"}
        />
        <SidebarLink
          href="/stock"
          title="Stok"
          Icon={Box}
          isActive={active == "stock"}
        />
        <SidebarLink
          href="/finance"
          title="Finans"
          Icon={Receipt}
          isActive={active == "finance"}
        />
        <SidebarLink
          href="/human-resources"
          title="İnsan Kaynakları"
          Icon={IdCardLanyard}
          isActive={active == "hr"}
        />
        <SidebarLink
          href="/purchase"
          title="Satın Alma"
          Icon={HandCoins}
          isActive={active == "buying"}
        />
        <SidebarLink
          href="/reports"
          title="Raporlar"
          Icon={NotepadText}
          isActive={active == "reports"}
        />
      </div>

      {/* Alt Menü */}
      <div className="mt-auto flex w-full flex-col gap-2">
        <SidebarLink
          href="/settings"
          title="Ayarlar"
          Icon={Settings}
          isActive={active == "settings"}
        />
        <SidebarLink href="/logout" title="Çıkış Yap" Icon={LogOut} />
      </div>
    </aside>
  );
}
