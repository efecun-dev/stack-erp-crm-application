"use client";

import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "@/src/schemas/product.schema";
import FormInput from "@/components/form/FormInput";
import FormCombobox from "@/components/form/FormCombobox";

interface Props {
  id: string;
  form: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
}

export default function ProductForm({ id, form, onSubmit }: Props) {
  const { handleSubmit } = form;
  return (
    <>
      <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          control={form.control}
          name="product"
          label="Ürün adı"
          placeholder="Örn. Kablosuz Mouse"
        />
        <div className="grid grid-cols-2 gap-3">
          <FormCombobox
            control={form.control}
            name="category"
            label="Kategori"
            options={[
              {
                label: "Elektronik",
                value: "1",
              },
              {
                label: "Yazılım Lisansı",
                value: "2",
              },
              {
                label: "Ofis Malzemesi",
                value: "3",
              },
              {
                label: "Donanım",
                value: "4",
              },
            ]}
          />
          <FormCombobox
            control={form.control}
            name="storage"
            label="Depo"
            options={[
              { label: "Merkez Depo", value: "1" },
              { label: "Samsun Depo", value: "2" },
              { label: "Manisa Depo", value: "3" },
            ]}
          />
          <FormInput
            type="number"
            control={form.control}
            name="unitPrice"
            placeholder="0"
            label="Birim fiyatı (₺)"
          />
          <FormInput
            type="number"
            control={form.control}
            name="minStock"
            placeholder="5"
            label="Min. stok seviyesi"
          />
        </div>
        <FormInput
          type="number"
          control={form.control}
          name="stock"
          placeholder="5"
          label="Başlangıç stok adedi"
        />
      </form>
    </>
  );
}
