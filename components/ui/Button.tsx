import { LucideIcon } from "lucide-react";
import { MouseEventHandler } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  Icon?: LucideIcon;
  type: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  type,
  Icon,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <>
      <button
        onClick={onClick}
        className={`flex items-center gap-2 text-sm justify-center p-2 ${children ? "px-4" : ""} cursor-pointer rounded-xl transition-all duration-100 ${type == "primary" ? "bg-[#0E7C86] text-white hover:bg-[#08525A]" : type == "secondary" ? "bg-[#e9f1f3cc] text-[#007582] shadow-[inset_0px_0px_0px_1px_#008e9f82] hover:bg-[#5fbcc862]" : ""}`}
      >
        {Icon && <Icon size={16} />}
        {children}
      </button>
    </>
  );
}
