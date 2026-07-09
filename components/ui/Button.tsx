import { LucideIcon } from "lucide-react";

type ButtonProps = {
  content?: string;
  Icon?: LucideIcon;
  type: "primary" | "secondary";
};

export default function Button({ content, type, Icon }: ButtonProps) {
  return (
    <>
      <button
        className={`flex items-center gap-2 text-sm justify-center p-2 ${content ? "px-3" : ""} cursor-pointer rounded-xl transition-all duration-100 ${type == "primary" ? "bg-[#17a2af] text-white" : type == "secondary" ? "bg-[#e9f1f3cc] text-[#007582] shadow-[inset_0px_0px_0px_1px_#008e9f82] hover:bg-[#5fbcc862]" : ""}`}
      >
        {Icon && <Icon size={16} />}
        {content && content}
      </button>
    </>
  );
}
