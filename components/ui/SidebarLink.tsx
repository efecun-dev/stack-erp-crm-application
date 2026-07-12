import { LucideIcon } from "lucide-react";
import Link from "next/link";

type LinkProps = {
  title: string;
  Icon: LucideIcon;
  isActive?: boolean;
};

export default function SidebarLink({
  title,
  Icon,
  isActive,
}: Readonly<LinkProps>) {
  return (
    <Link
      href="/"
      title={title}
      className={`
        flex items-center justify-center rounded-xl
        px-3 py-3 text-[#5C7C80]
        transition-all duration-200
        hover:bg-[#F4FAFB]
        hover:text-[#0B2E33]

        lg:justify-start lg:px-4

        ${isActive ? "bg-[#E3F6F8] text-[#08525A] font-semibold" : ""}
      `}
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />

      <span className="ml-3 hidden text-sm lg:block">{title}</span>
    </Link>
  );
}
