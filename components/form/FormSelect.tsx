"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import Select from "../ui/Select";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  placeholder?: string;

  options: Option[];
};

export default function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: FormSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          id={name}
          label={label}
          placeholder={placeholder}
          options={options}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
