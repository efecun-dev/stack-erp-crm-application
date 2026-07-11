import Image from "next/image";
import Link from "next/link";
import banner from "@/public/assets/banner-cropped.png";
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
    <>
      <div className="max-w-80 min-w-80 fixed z-10 top-0 bg-white h-screen border-r border-[#D7ECEF] flex flex-col gap-3 px-4 py-6 items-center">
        <div className="w-3/4">
          <Image src={banner} alt="Banner" loading="eager" />
        </div>
        <div className="w-full h-px bg-gray-200"></div>
        <div className="flex flex-col gap-2 w-full">
          <SidebarLink title="Dashboard" Icon={LayoutDashboard} isActive />
          <SidebarLink title="CRM" Icon={Users} />
          <SidebarLink title="Satışlar" Icon={ShoppingCart} />
          <SidebarLink title="Stok" Icon={Box} />
          <SidebarLink title="Finans" Icon={Receipt} />
          <SidebarLink title="İnsan Kaynakları" Icon={IdCardLanyard} />
          <SidebarLink title="Satın Alma" Icon={HandCoins} />
          <SidebarLink title="Raporlar" Icon={NotepadText} />
        </div>
        <div className="w-full mt-auto">
          <SidebarLink title="Ayarlar" Icon={Settings} />
          <SidebarLink title="Çıkış yap" Icon={LogOut} />
        </div>
      </div>
    </>
  );
}
