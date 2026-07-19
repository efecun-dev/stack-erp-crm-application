"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

import Button from "@/components/ui/Button";
import FormInput from "@/components/form/FormInput";
import FormCombobox from "@/components/form/FormCombobox";

import { OrderFormData } from "@/src/schemas/order.schema";

interface Props {
  id: string;
  form: UseFormReturn<OrderFormData>;
  onSubmit: (data: OrderFormData) => void;
}

export default function OrderForm({ id, form, onSubmit }: Props) {
  const { control, watch, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const discount = watch("discount");

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  );

  const discountAmount = subtotal * (discount / 100);
  const vat = (subtotal - discountAmount) * 0.2;
  const total = subtotal - discountAmount + vat;

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        control={control}
        name="customer"
        label="Müşteri"
        placeholder="Müşteri adı yazın"
      />

      <div className="space-y-2">
        <p className="text-sm text-[#0b2e33]">Ürünler</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-5">
              <FormCombobox
                control={control}
                name={`items.${index}.product`}
                placeholder="Ürün seçiniz"
                options={[
                  {
                    label: "ERP Yazılımı",
                    value: "erp",
                  },
                  {
                    label: "CRM Sistemi",
                    value: "crm",
                  },
                  {
                    label: "Hosting",
                    value: "hosting",
                  },
                ]}
              />
            </div>

            <div className="col-span-2">
              <FormInput
                control={control}
                name={`items.${index}.quantity`}
                type="number"
              />
            </div>

            <div className="col-span-3">
              <FormInput
                control={control}
                name={`items.${index}.unitPrice`}
                type="number"
              />
            </div>

            <div className="col-span-1 text-xs font-semibold text-[#0B2E33] text-right h-full flex items-center justify-end">
              ₺
              {(
                (items[index]?.quantity ?? 0) * (items[index]?.unitPrice ?? 0)
              ).toLocaleString("tr-TR")}
            </div>

            <div className="col-span-1 flex justify-end">
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => remove(index)}
                >
                  <Trash2 size={14} />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          Icon={Plus}
          className="mt-3 w-full"
          onClick={() =>
            append({
              product: "",
              quantity: 1,
              unitPrice: 0,
            })
          }
        >
          Ürün Ekle
        </Button>
      </div>

      <div className="rounded-xl border border-[#D7ECEF] bg-[#F8FCFC] p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-xs text-gray-500">Ara Toplam</span>
          <span className="text-xs text-gray-500">
            ₺{subtotal.toLocaleString("tr-TR")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">İndirim (%)</span>

          <div className="w-28 flex items-center gap-1">
            <FormInput small control={control} name="discount" type="number" />
            <span className="text-gray-500">%</span>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-xs text-gray-500">İndirim Tutarı</span>
          <span className="text-xs text-gray-500">
            -₺{discountAmount.toLocaleString("tr-TR")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-xs text-gray-500">KDV (%20)</span>
          <span className="text-xs text-gray-500">
            ₺{vat.toLocaleString("tr-TR")}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-semibold">
          <span className="text-sm font-semibold">Genel Toplam</span>
          <span className="text-sm font-semibold">
            ₺{total.toLocaleString("tr-TR")}
          </span>
        </div>
      </div>
    </form>
  );
}
