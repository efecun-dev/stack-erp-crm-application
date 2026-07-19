import { z } from "zod";

export const productSchema = z.object({
    product: z.string().trim().min(3, "Ürün adı en az 3 karakter olmalıdır.").max(100, "Ürün adı en fazla 100 karakter olmalıdır."),
    category: z.string().trim().min(1, "Kategori seçiniz"),
    storage: z.string().trim().min(1, "Depo seçiniz"),
    unitPrice: z.number().min(0, "Birim fiyatı en az 0 olmalı."),
    minStock: z.number().min(1, "Minimum stok adedi en az 1 olmalı."),
    stock: z.number().min(1, "Başlangıç stok adedi en az 1 olmalı.")
})

export type ProductFormData = z.infer<typeof productSchema>