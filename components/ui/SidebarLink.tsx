import { LucideIcon } from "lucide-react";
import Link from "next/link";

type LinkProps = {
  title: string;
  Icon: LucideIcon;
  isActive?: boolean;
};

export default function SidebarLink({ title, Icon, isActive }: LinkProps) {
  return (
    <>
      <Link
        href="/"
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm text-[#5C7C80] hover:text-[#0B2E33] hover:bg-[#F4FAFB] transition-all duration-100 ${isActive ? "bg-[#E3F6F8]! font-semibold! text-[#08525A]!" : ""}`}
      >
        <Icon size={18} />
        {title}
      </Link>
    </>
  );
}
