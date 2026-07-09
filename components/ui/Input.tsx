import { Icon, LucideIcon } from "lucide-react";

type InputProps = {
  label?: { for: string; content: string };
  type: "text" | "password" | "email" | "tel" | "date";
  placeholder?: string;
  name: string;
  Icon?: LucideIcon;
};

export default function Input({
  label,
  type,
  placeholder,
  name,
  Icon,
}: InputProps) {
  return (
    <>
      <div>
        {label ? <label htmlFor={label.for}>{label.content}</label> : ""}
        <div className="relative w-full">
          {Icon ? (
            <Icon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 min-w-3 min-h-3 text-gray-400"
            />
          ) : (
            ""
          )}
          <input
            className="px-4 py-2 text-sm pl-8 w-full rounded-lg text-[#0B2E33] border border-[#D7ECEF] outline-0 bg-[#F4FAFB]"
            type={type}
            placeholder={placeholder}
            name={name}
          />
        </div>
      </div>
    </>
  );
}
