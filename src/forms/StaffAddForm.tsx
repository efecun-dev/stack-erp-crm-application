"use client";

import { UseFormReturn } from "react-hook-form";
import { StaffFormData } from "../schemas/staff-add.schema";
import FormInput from "@/components/form/FormInput";
import FormCombobox from "@/components/form/FormCombobox";
import FormSelect from "@/components/form/FormSelect";

interface Props {
  id: string;
  form: UseFormReturn<StaffFormData>;
  onSubmit: (data: StaffFormData) => void;
}

export default function StaffAddForm({ id, form, onSubmit }: Props) {
  const { handleSubmit } = form;
  var date = new Date();
  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  const today = `${year}-${month}-${day}`;
  return (
    <>
      <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          control={form.control}
          name="fullName"
          placeholder="Örn. Efe Cün"
          label="Ad Soyad"
        />
        <FormInput
          control={form.control}
          name="email"
          placeholder="efe@efecun.dev"
          label="E-posta"
        />
        <div className="grid grid-cols-2 gap-2">
          <FormCombobox
            control={form.control}
            name="department"
            label="Departman"
            options={[
              { label: "Yazılım", value: 1 },
              { label: "Satış", value: 2 },
              { label: "Finans", value: 3 },
              { label: "İnsan Kaynakları", value: 4 },
              { label: "Operasyon", value: 5 },
            ]}
          />
          <FormInput
            control={form.control}
            name="position"
            label="Pozisyon"
            placeholder="Örn. Yazılım Geliştirici"
          />
          <FormInput
            type="date"
            name="startDate"
            control={form.control}
            label="İşe başlama tarihi"
            value={today}
          />
          <FormSelect
            name="status"
            control={form.control}
            label="Durum"
            options={[
              { label: "Aktif", value: "active" },
              { label: "Pasif", value: "passive" },
            ]}
          />
        </div>
      </form>
    </>
  );
}
