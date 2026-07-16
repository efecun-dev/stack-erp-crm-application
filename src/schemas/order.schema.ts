import { z } from "zod";

export const orderItemSchema = z.object({
  product: z.string().min(1, "Ürün seçiniz"),
  quantity: z
    .number({
      error: "Miktar giriniz",
    })
    .min(1, "Miktar en az 1 olmalıdır"),
  unitPrice: z
    .number({
      error: "Birim fiyat giriniz",
    })
    .min(0, "Birim fiyat negatif olamaz"),
});

export const orderSchema = z.object({
  customer: z.string().min(1, "Müşteri seçiniz"),

  items: z
    .array(orderItemSchema)
    .min(1, "En az bir ürün eklemelisiniz"),

  discount: z
    .number({
      error: "İndirim giriniz",
    })
    .min(0, "İndirim 0'dan küçük olamaz")
    .max(100, "İndirim %100'den büyük olamaz"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type OrderItemFormData = z.infer<typeof orderItemSchema>;