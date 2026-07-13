import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  Icon?: LucideIcon;
};

export default function Input({
  label,
  error,
  Icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-[#0B2E33]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          {...props}
          className={`
            w-full rounded-lg border bg-[#F4FAFB]
            py-2 text-sm text-[#0B2E33]
            outline-none transition
            ${Icon ? "pl-9 pr-4" : "px-4"}
            ${
              error
                ? "border-red-500"
                : "border-[#D7ECEF] focus:border-[#0E7C86]"
            }
            ${className ?? ""}
          `}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
