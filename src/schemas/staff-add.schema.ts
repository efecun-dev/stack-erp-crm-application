import { z } from "zod";

export const staffSchema = z.object({
    fullName: z.string("Personel adı giriniz").min(3, "Personel adı minimum 3 karakter olmalıdır.").max(100, "Personel adı maksimum 100 karakter olmalıdır."),
    email: z.email("Geçerli bir e-posta adresi giriniz."),
    department: z.number("Departman seçiniz.").min(1, "Departman seçiniz."),
    position: z.string("Personel çalışma pozisyonu yazınız.").min(3, "Pozisyon minimum 3 karakter olmalıdır.").max(100, "Pozisyon maksimum 100 karakter olmalıdır."),
    startDate: z.date("Geçerli bir tarih giriniz."),
    status: z.enum(["active", "passive"], "Durum seçiniz.")
})

export type StaffFormData = z.infer<typeof staffSchema>