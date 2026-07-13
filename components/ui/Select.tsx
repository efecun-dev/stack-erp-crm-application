import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  placeholder?: string;
  options: Option[];
};

export default function Select({
  label,
  error,
  placeholder,
  options,
  className,
  ...props
}: SelectProps) {
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
        <select
          {...props}
          className={`
            w-full appearance-none rounded-lg border
            bg-[#F4FAFB]
            px-4 py-2 text-sm text-[#0B2E33]
            outline-none transition
            ${
              error
                ? "border-red-500"
                : "border-[#D7ECEF] focus:border-[#0E7C86]"
            }
            ${className ?? ""}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
