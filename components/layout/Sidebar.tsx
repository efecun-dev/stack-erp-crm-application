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

export default function Sidebar() {
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
        <SidebarLink title="Dashboard" Icon={LayoutDashboard} isActive />
        <SidebarLink title="CRM" Icon={Users} />
        <SidebarLink title="Satışlar" Icon={ShoppingCart} />
        <SidebarLink title="Stok" Icon={Box} />
        <SidebarLink title="Finans" Icon={Receipt} />
        <SidebarLink title="İnsan Kaynakları" Icon={IdCardLanyard} />
        <SidebarLink title="Satın Alma" Icon={HandCoins} />
        <SidebarLink title="Raporlar" Icon={NotepadText} />
      </div>

      {/* Alt Menü */}
      <div className="mt-auto flex w-full flex-col gap-2">
        <SidebarLink title="Ayarlar" Icon={Settings} />
        <SidebarLink title="Çıkış Yap" Icon={LogOut} />
      </div>
    </aside>
  );
}
