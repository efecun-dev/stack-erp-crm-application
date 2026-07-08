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
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="w-80 bg-white h-full border border-[#E7E8EC] rounded-2xl flex flex-col gap-3 px-4 py-6 items-center">
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
        </div>
        <div className="w-full mt-auto">
          <SidebarLink title="Ayarlar" Icon={Settings} />
        </div>
      </div>
    </>
  );
}
