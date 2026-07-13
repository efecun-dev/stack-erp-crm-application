"use client";

import * as Popover from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

export type ComboboxOption = {
  label: string;
  value: string;
};

type ComboboxProps = {
  value?: string;
  onChange?: (value: string) => void;

  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;

  options: ComboboxOption[];
};

export default function Combobox({
  value,
  onChange,
  label,
  placeholder = "Seçiniz",
  searchPlaceholder = "Ara...",
  error,
  options,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((item) => item.value === value),
    [options, value],
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-[#0B2E33]">{label}</label>
      )}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`
              flex h-10 w-full items-center justify-between
              rounded-lg border bg-[#F4FAFB]
              px-4 text-sm text-[#0B2E33]
              transition
              ${
                error
                  ? "border-red-500"
                  : "border-[#D7ECEF] hover:border-[#0E7C86]"
              }
            `}
          >
            <span className={selected ? "text-[#0B2E33]" : "text-gray-400"}>
              {selected?.label ?? placeholder}
            </span>

            <ChevronsUpDown size={16} />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={6}
            className="
              z-50 w-(--radix-popover-trigger-width)
              rounded-xl border border-[#D7ECEF]
              bg-white p-2 shadow-xl
            "
          >
            <Command>
              <CommandInput
                placeholder={searchPlaceholder}
                className="
                  h-9 w-full rounded-md border
                  border-[#D7ECEF] px-3 text-sm
                  outline-none
                "
              />

              <CommandList className="mt-2 max-h-60 overflow-auto">
                <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        onChange?.(option.value);
                        setOpen(false);
                      }}
                      className="
                        flex cursor-pointer items-center
                        justify-between rounded-md px-3 py-2
                        text-sm
                        data-[selected=true]:bg-[#EEF7F8]
                      "
                    >
                      {option.label}

                      {value === option.value && <Check size={16} />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
