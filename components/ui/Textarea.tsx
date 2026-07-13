import { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaProps) {
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

      <textarea
        {...props}
        className={`
          w-full rounded-lg border bg-[#F4FAFB]
          px-4 py-3 text-sm text-[#0B2E33]
          outline-none transition resize-none
          ${
            error ? "border-red-500" : "border-[#D7ECEF] focus:border-[#0E7C86]"
          }
          ${className ?? ""}
        `}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
