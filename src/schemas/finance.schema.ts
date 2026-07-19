import { z } from "zod";

export const financeSchema = z.object({
  type: z.enum(["income", "expense"], {
    message: "İşlem türünü seçiniz.",
  }),

  description: z
    .string()
    .trim()
    .min(1, "Açıklama giriniz.")
    .max(100, "Açıklama en fazla 100 karakter olabilir."),

  category: z
    .number({
      error: "Kategori seçiniz.",
    })
    .min(1, "Kategori seçiniz."),

  amount: z
    .number({
      error: "Tutar giriniz.",
    })
    .min(1, "Tutar 0'dan büyük olmalıdır."),

  current: z
    .number({
      error: "Cari seçiniz.",
    })
    .min(1, "Cari seçiniz."),

  date: z.date({
    error: "Tarih seçiniz.",
  }),

  status: z.enum(["waiting", "paid"], {
    message: "Durum seçiniz.",
  }),
});

export type FinanceFormData = z.infer<typeof financeSchema>