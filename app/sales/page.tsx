"use client";
import Header from "@/components/layout/Header";
import MainContainer from "@/components/layout/MainContainer";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import { Plus, Ellipsis } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderFormData, orderSchema } from "@/src/schemas/order.schema";
import OrderForm from "@/src/forms/OrderForm";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import Combobox from "@/components/ui/Combobox";
import DataTable from "@/components/ui/Table/DataTable";
import mockData from "@/src/constants/orders.json";
import { createColumnHelper } from "@tanstack/react-table";
import { Orders } from "@/src/types/orders";
import OrderProductsTable from "./OrderProductsTable";
import Select from "@/components/ui/Select";

export default function Sales() {
  const [status, setStatus] = useState("all");
  const [orderModal, setOrderModal] = useState(false);

  const data = useMemo(() => mockData, []);
  const columnHelper = createColumnHelper<Orders>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("customer", {
      header: "Müşteri",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Tarih",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("total", {
      header: "Ürün Adedi",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Tutar",
      cell: (info) => `₺${info.getValue().toLocaleString("tr-TR")}`,
    }),
    columnHelper.accessor("status", {
      header: "Durum",
      cell: (info) => (
        <Select
          onClick={(e) => e.stopPropagation()}
          onChange={() => {}}
          value={info.getValue()}
          options={[
            { label: "Hazırlanıyor", value: "preparing" },
            { label: "Kargoda", value: "shipped" },
            { label: "Teslim Edildi", value: "delivered" },
            { label: "İptal Edildi", value: "cancelled" },
          ]}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "İşlemler",
      cell: ({ row }) => (
        <Button
          onClick={(e) => e.stopPropagation()}
          Icon={Ellipsis}
          variant="secondary"
        />
      ),
    }),
  ];

  const filteredData = useMemo(() => {
    if (status === "all") return data;

    return data.filter((order) => order.status === status);
  }, [data, status]);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer: "",
      discount: 0,
      items: [
        {
          product: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    },
  });

  const onSubmit = (data: OrderFormData) => {
    console.log(data);

    setOrderModal(false);
    form.reset();
  };

  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="sales" />
        <MainContainer>
          <Header searchPlaceholder="Sipariş no veya müşteri ara" />
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">
                Satışlar
              </h3>
              <p className="text-sm text-gray-400 font-light">
                Siparişleri oluşturun, durumlarını takip edin
              </p>
            </div>
            <Button Icon={Plus} onClick={() => setOrderModal(true)}>
              Yeni sipariş
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DashInfoBox title="Toplam sipariş tutarı" content="₺28.150" />
            <DashInfoBox title="Devam eden sipariş" content="2" />
            <DashInfoBox title="Teslim edilen" content="2" />
            <DashInfoBox title="İptal edilen" content="1" />
          </div>
          <Item>
            <div className="flex itemscenter justify-between">
              <div className="w-40">
                <Combobox
                  placeholder={`Durum: ${status}`}
                  value={status}
                  onChange={setStatus}
                  options={[
                    { label: "Tümü", value: "all" },
                    { label: "Hazırlanıyor", value: "preparing" },
                    { label: "Kargoda", value: "shipped" },
                    { label: "Teslim Edildi", value: "delivered" },
                    { label: "İptal Edildi", value: "cancelled" },
                  ]}
                />
              </div>
              <p className="flex items-center text-xs text-gray-500">
                5 sipariş gösteriliyor
              </p>
            </div>
          </Item>
          <Item>
            <DataTable
              data={filteredData}
              columns={columns}
              expandable
              sortable
              renderExpandedRow={(order) => (
                <OrderProductsTable items={order.items} />
              )}
            />
          </Item>
          <Modal
            active={orderModal}
            onClose={() => setOrderModal(false)}
            formId="order-form"
            header={{
              title: "Yeni sipariş oluştur",
              subtitle:
                "Müşteri ve ürünleri seçin, tutarlar otomatik hesaplanır",
            }}
            footer={{ cancel: "Vazgeç", cta: "Siparişi Kaydet" }}
          >
            <OrderForm id="order-form" form={form} onSubmit={onSubmit} />
          </Modal>
        </MainContainer>
      </main>
    </>
  );
}
