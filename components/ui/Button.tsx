import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  Icon?: LucideIcon;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  Icon,
  variant = "primary",
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center gap-2
        rounded-xl p-2
        ${children ? "px-4" : ""}
        text-sm
        cursor-pointer
        transition-all duration-150
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${
          variant === "primary"
            ? "bg-[#0E7C86] text-white hover:bg-[#08525A]"
            : "bg-[#E9F1F3] text-[#007582] shadow-[inset_0_0_0_1px_#008e9f82] hover:bg-[#5fbcc862]"
        }
        ${className ?? ""}
      `}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
