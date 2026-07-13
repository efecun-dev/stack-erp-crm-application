"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import Combobox, { ComboboxOption } from "../ui/Combobox";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;

  options: ComboboxOption[];
};

export default function FormCombobox<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  searchPlaceholder,
  options,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Combobox
          value={field.value}
          onChange={field.onChange}
          label={label}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          options={options}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
