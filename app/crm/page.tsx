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
import { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import mockData from "@/src/constants/customers.json";
import CustomerStatus from "@/components/crm/CustomerStatus";
import DataTable from "@/components/ui/Table/DataTable";

import type { Customer } from "@/src/types/customers";
import PipelineCard from "@/components/crm/PipelineCard";

import pipelineData from "@/src/constants/pipeline.json";

const columnHelper = createColumnHelper<Customer>();
const columns = [
  columnHelper.accessor("customer", {
    header: "Müşteri",
    cell: (info) => (
      <div className="flex flex-col gap-0">
        <p>{info.getValue().name}</p>
        <p className="text-xs text-gray-500 font-light">
          {info.getValue().email}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("sector", {
    header: "Sektör",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Durum",
    cell: (info) => <CustomerStatus status={info.getValue()} />,
  }),
  columnHelper.accessor("owner", {
    header: "Sorumlu",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastContact", {
    header: "Son İletişim",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Tutar",
    cell: (info) => `₺${info.getValue().toLocaleString()}`,
  }),
];

export default function CRM() {
  const data = useMemo(() => mockData, []);
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

  const [customerModal, setCustomerModal] = useState(false);
  const [tab, setTab] = useState("customers");

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
          <div className="bg-white p-1.5 border border-[#D7ECEF] rounded-xl items-center flex gap-1 w-fit">
            <div
              onClick={() => setTab("customers")}
              className={`py-1 px-3 text-[#5C7C80] text-sm cursor-pointer rounded-md transition ${tab == "customers" ? "text-[#08525A] bg-[#E3F6F8]" : ""}`}
            >
              Müşteriler
            </div>
            <div
              onClick={() => setTab("pipeline")}
              className={`py-1 px-3 text-[#5C7C80] text-sm cursor-pointer rounded-md transition ${tab == "pipeline" ? "text-[#08525A] bg-[#E3F6F8]" : ""}`}
            >
              Fırsat Pipeline
            </div>
          </div>
          {tab == "customers" ? (
            <div className="flex flex-col gap-3">
              <Item>
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="secondary">Sektör: Tümü</Button>
                    <Button variant="secondary">Durum: Tümü</Button>
                    <Button variant="secondary">Bölge: Tümü</Button>
                  </div>
                  <p className="text-xs mr-2 text-gray-400 flex items-center">
                    128 Müşteri
                  </p>
                </div>
              </Item>
              <Item>
                <DataTable data={data} columns={columns} />
              </Item>
            </div>
          ) : (
            ""
          )}
          {tab == "pipeline" ? (
            <div className="flex flex-col gap-3">
              <Item>
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="secondary">Sorumlu: Tümü</Button>
                    <Button variant="secondary">Kapanış: Bu çeyrek</Button>
                  </div>
                  <p className="text-xs mr-2 text-gray-400 flex items-center">
                    Toplam: ₺612.000 - 37 fırsat
                  </p>
                </div>
              </Item>
              <div className="grid grid-cols-4 gap-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
                <PipelineCard
                  status="discuss"
                  total={14}
                  amount={186000}
                  data={pipelineData.filter(
                    (item) => item.status === "discuss",
                  )}
                />
                <PipelineCard
                  status="offered"
                  total={11}
                  amount={224500}
                  data={pipelineData.filter(
                    (item) => item.status === "offered",
                  )}
                />
                <PipelineCard
                  status="won"
                  total={9}
                  amount={178500}
                  data={pipelineData.filter((item) => item.status === "won")}
                />
                <PipelineCard
                  status="lost"
                  total={3}
                  amount={23000}
                  data={pipelineData.filter((item) => item.status === "lost")}
                />
              </div>
            </div>
          ) : (
            ""
          )}
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
            <form id="customer-form" className="space-y-5">
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
