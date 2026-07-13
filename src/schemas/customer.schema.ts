import { z } from "zod";

export const customerSchema = z.object({
    companyName: z.string().trim().min(3, "Firma adı en az 3 karakter olmalıdır.").max(100, "Firma adı en fazla 100 karakter olmalıdır."),
    email: z.string().trim().email("Geçerli bir e-posta adresi giriniz."),
    phone: z.string().trim().optional().or(z.literal("")),
    sector: z.string().min(1, "Lütfen bir sektör seçiniz."),
    owner: z.string().min(1, "Lütfen sorumlu kişiyi seçiniz."),
    status: z.enum([
        "potential",
        "contacted",
        "proposal",
        "customer",
        "lost"
    ]),
    note: z.string().max(500, "Not en fazla 500 karakter olabilir.").optional(),
})

export type CustomerFormData = z.infer<typeof customerSchema>