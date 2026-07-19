"use client";

import { UseFormReturn } from "react-hook-form";
import { FinanceFormData } from "../schemas/finance.schema";
import { useState } from "react";
import FormInput from "@/components/form/FormInput";
import FormCombobox from "@/components/form/FormCombobox";
import FormSelect from "@/components/form/FormSelect";

interface Props {
  id: string;
  form: UseFormReturn<FinanceFormData>;
  onSubmit: (data: FinanceFormData) => void;
}

export default function FinanceForm({ id, form, onSubmit }: Props) {
  const { handleSubmit } = form;
  const [status, setStatus] = useState("income");
  var date = new Date();
  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var year = date.getFullYear();
  const today = `${year}-${month}-${day}`;

  const incomeOptions = [
    { label: "Satış Geliri", value: 1 },
    { label: "Hizmet Geliri", value: 2 },
    { label: "Diğer Gelir", value: 8 },
  ];

  const expenseOptions = [
    { label: "Diğer Gider", value: 3 },
    { label: "Kira", value: 4 },
    { label: "Maaş", value: 5 },
    { label: "Tedarik", value: 6 },
    { label: "Vergi", value: 7 },
  ];

  return (
    <>
      <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full gap-2 overflow-hidden rounded-lg p-1 border border-gray-200">
          <div
            className={`flex text-gray-500 transition cursor-pointer p-2 flex-1 rounded-md items-center justify-center ${status == "income" && "bg-[#EAF3DE] text-[#27500A]!"}`}
            onClick={() => setStatus("income")}
          >
            Gelir
          </div>
          <div
            className={`flex text-gray-500 transition cursor-pointer p-2 flex-1 rounded-md items-center justify-center ${status == "expense" && "bg-[#FBE7E1] text-[#8A2E17]!"}`}
            onClick={() => setStatus("expense")}
          >
            Gider
          </div>
          <input type="hidden" value={status} name="type" />
        </div>
        <FormInput
          control={form.control}
          name="description"
          placeholder="Örn. Aylık lisans faturası"
          label="Açıklama"
        />
        <div className="grid grid-cols-2 gap-3 justify-stretch">
          <FormCombobox
            control={form.control}
            name="category"
            label="Kategori"
            options={status == "income" ? incomeOptions : expenseOptions}
          />
          <FormInput
            type="number"
            placeholder="0"
            control={form.control}
            name="amount"
            label="Tutar (₺)"
          />
          <FormInput
            type="text"
            control={form.control}
            name="current"
            placeholder="Firma adı yazın"
            label="Cari (müşteri / tedarikçi)"
          />
          <FormInput
            type="date"
            control={form.control}
            name="date"
            label="Tarih"
            value={today}
          />
        </div>
        <FormSelect
          control={form.control}
          name="status"
          label="Ödeme durumu"
          options={[
            { label: "Bekliyor", value: 1 },
            { label: "Ödendi", value: 2 },
          ]}
        />
      </form>
    </>
  );
}
