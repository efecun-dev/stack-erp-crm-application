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
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-[#8B8D98] hover:text-[#057ABE] hover:bg-[#E6F4FF] transition-all duration-100 ${isActive ? "bg-[#BFE5FF]! font-semibold! text-[#057ABE]!" : ""}`}
      >
        <Icon size={16} />
        {title}
      </Link>
    </>
  );
}
