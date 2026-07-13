"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import Textarea from "../ui/Textarea";

type FormTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  placeholder?: string;
  rows?: number;
};

export default function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
}: FormTextareaProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          id={name}
          label={label}
          placeholder={placeholder}
          rows={rows}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
