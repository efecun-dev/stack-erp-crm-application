"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { LucideIcon } from "lucide-react";

import Input from "../ui/Input";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  type?: "text" | "password" | "email" | "tel" | "date" | "number";
  placeholder?: string;
  small?: boolean;
  Icon?: LucideIcon;
  value?: any;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  small,
  placeholder,
  value,
  Icon,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          small={small}
          id={name}
          value={value}
          type={type}
          label={label}
          placeholder={placeholder}
          Icon={Icon}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
