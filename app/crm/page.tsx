"use client";
import Item from "@/components/dashboard/Item";
import MainContainer from "@/components/layout/MainContainer";
import Sidebar from "@/components/layout/Sidebar";
import { Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerSchema,
  CustomerFormData,
} from "@/src/schemas/customer.schema";
import FormInput from "@/components/form/FormInput";
import FormCombobox from "@/components/form/FormCombobox";
import FormTextarea from "@/components/form/FormTextArea";
import { useState } from "react";

export default function CRM() {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      sector: "",
      owner: "",
      status: "potential",
      note: "",
    },
    mode: "onBlur",
  });

  const sectorOptions = [
    { label: "Yazılım", value: "software" },
    { label: "İnşaat", value: "construction" },
    { label: "Sağlık", value: "health" },
  ];

  const ownerOptions = [
    { label: "Ahmet Yılmaz", value: "1" },
    { label: "Mehmet Demir", value: "2" },
    { label: "Ayşe Kaya", value: "3" },
  ];

  const statusOptions = [
    { label: "Potansiyel", value: "potential" },
    { label: "İletişime Geçildi", value: "contacted" },
    { label: "Teklif Verildi", value: "proposal" },
    { label: "Müşteri", value: "customer" },
    { label: "Kaybedildi", value: "lost" },
  ];

  const onSubmit = (data: CustomerFormData) => {
    console.log(data);
  };

  const [customerModal, setCustomerModal] = useState(false);

  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="crm" />
        <MainContainer>
          <Header searchPlaceholder="Müşteri veya fırsat ara..." />
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">CRM</h3>
              <p className="text-sm text-gray-400 font-light">
                Müşterileri ve satış fırsatlarını yönetin
              </p>
            </div>
            <Button Icon={Plus} onClick={() => setCustomerModal(true)}>
              Yeni müşteri
            </Button>
          </div>
          <Modal
            active={customerModal}
            onClose={() => setCustomerModal(false)}
            formId="customer-form"
            header={{
              title: "Yeni müşteri ekle",
              subtitle:
                "Müşteri bilgilerini girin, daha sonra düzenleyebilirsiniz",
            }}
            footer={{ cancel: "Vazgeç", cta: "Müşteriyi Kaydet" }}
          >
            <form
              id="customer-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormInput
                control={form.control}
                name="companyName"
                label="Müşteri / Firma adı"
                placeholder="Örn. Akın Ticaret"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  control={form.control}
                  name="email"
                  type="email"
                  label="E-posta"
                  placeholder="info@firma.com"
                />

                <FormInput
                  control={form.control}
                  name="phone"
                  type="tel"
                  label="Telefon"
                  placeholder="0555 555 55 55"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormCombobox
                  control={form.control}
                  name="sector"
                  label="Sektör"
                  placeholder="Sektör seçiniz"
                  searchPlaceholder="Sektör ara..."
                  options={sectorOptions}
                />

                <FormCombobox
                  control={form.control}
                  name="owner"
                  label="Sorumlu kişi"
                  placeholder="Kişi seçiniz"
                  searchPlaceholder="Kişi ara..."
                  options={ownerOptions}
                />
              </div>

              <FormCombobox
                control={form.control}
                name="status"
                label="Durum"
                options={statusOptions}
              />

              <FormTextarea
                control={form.control}
                name="note"
                label="Not"
                placeholder="Müşteri hakkında not ekleyebilirsiniz..."
                rows={5}
              />
            </form>
          </Modal>
        </MainContainer>
      </main>
    </>
  );
}
