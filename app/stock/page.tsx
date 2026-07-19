"use client";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import Header from "@/components/layout/Header";
import MainContainer from "@/components/layout/MainContainer";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Combobox from "@/components/ui/Combobox";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/Table/DataTable";
import ProductForm from "@/src/forms/ProductForm";
import { ProductFormData, productSchema } from "@/src/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Ellipsis } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import mockData from "@/src/constants/products.json";
import { createColumnHelper } from "@tanstack/react-table";
import { Products } from "@/src/types/products";
import ProductItemsTable from "./ProductItemsTable";

export default function Stock() {
  const [productModal, setProductModal] = useState(false);
  const [category, setCategory] = useState("all");
  const [storage, setStorage] = useState("all");
  const [status, setStatus] = useState("all");

  const data = mockData as Products[];

  const columnHelper = createColumnHelper<Products>();
  const columns = [
    columnHelper.accessor("product", {
      header: "Ürün",
      cell: (info) => (
        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">{info.getValue().name}</h5>
          <p className="text-xs text-gray-400">{info.getValue().sku}</p>
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Kategori",
      cell: (info) => info.getValue().label,
    }),
    columnHelper.accessor("storage", {
      header: "Depo",
      cell: (info) => info.getValue().label,
    }),
    columnHelper.accessor("stock", {
      header: "Stok",
      cell: (info) => (
        <div className="flex flex-col gap-1">
          <p>{info.getValue().current} adet</p>
          <div className="w-full h-1.5 bg-gray-200 rounded-xl relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-xl bg-red-500"
              style={{
                width: `${(info.getValue().current * 100) / info.getValue().min}%`,
                backgroundColor: `${info.getValue().current >= info.getValue().min ? "#0E7C86" : info.getValue().current < info.getValue().min / 2 ? "#B5544A" : info.getValue().current < info.getValue().min ? "#D08A2B" : ""}`,
              }}
            ></div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("stock.min", {
      header: "Min. Seviye",
      cell: (info) => `${info.getValue()} adet`,
    }),
    columnHelper.accessor("unitPrice", {
      header: "Birim Fiyat",
      cell: (info) => `₺${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor("totalValue", {
      header: "Toplam Değer",
      cell: (info) => (
        <p className="font-semibold">₺{info.getValue().toLocaleString()}</p>
      ),
    }),
    columnHelper.accessor(
      (row) => {
        if (row.stock.current === 0) return 0; // Tükendi
        if (row.stock.current < row.stock.min) return 1; // Kritik
        return 2; // Normal
      },
      {
        id: "status",
        header: "Durum",

        cell: ({ row }) => {
          const { current, min } = row.original.stock;

          let label = "";
          let className = "";

          if (current === 0) {
            label = "Tükendi";
            className = "bg-red-100 text-red-700";
          } else if (current < min) {
            label = "Kritik";
            className = "bg-amber-100 text-amber-700";
          } else {
            label = "Normal";
            className = "bg-teal-100 text-teal-700";
          }

          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
            >
              {label}
            </span>
          );
        },
      },
    ),
    columnHelper.display({
      id: "actions",
      header: "İşlemler",
      cell: ({ row }) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="secondary"
          Icon={Ellipsis}
        ></Button>
      ),
    }),
  ];

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product: "",
      category: "",
      storage: "",
      unitPrice: 0,
      minStock: 0,
      stock: 0,
    },
  });

  const filteredData = useMemo(() => {
    return data.filter((product) => {
      const categoryMatch =
        category === "all" || product.category.id === category;
      const storageMatch = storage === "all" || product.storage.id === storage;
      let productStatus: "normal" | "critical" | "sold";

      if (product.stock.current === 0) {
        productStatus = "sold";
      } else if (product.stock.current < product.stock.min) {
        productStatus = "critical";
      } else {
        productStatus = "normal";
      }

      const statusMatch = status === "all" || productStatus === status;

      return categoryMatch && storageMatch && statusMatch;
    });
  }, [data, category, storage, status]);

  const onSubmit = (data: ProductFormData) => {
    console.log(data);

    setProductModal(false);
    form.reset();
  };
  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="stock" />
        <MainContainer>
          <Header searchPlaceholder="Ürün adı veya SKU ara..." />
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">
                Stok Yönetimi
              </h3>
              <p className="text-sm text-gray-400 font-light">
                Ürünleri, depoları ve stok hareketlerini yönetin
              </p>
            </div>
            <Button Icon={Plus} onClick={() => setProductModal(true)}>
              Yeni ürün
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DashInfoBox title="Toplam ürün çeşidi" content="5" />
            <DashInfoBox title="Kritik / Tükenen ürün" content="3" />
            <DashInfoBox title="Toplam stok değeri" content="₺70.320" />
            <DashInfoBox title="Toplam stok hareketi" content="10" />
          </div>
          <Item>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Combobox
                  value={category}
                  options={[
                    { label: "Tümü", value: "all" },
                    { label: "Elektronik", value: "electronic" },
                    { label: "Yazılım Lisansı", value: "software" },
                    { label: "Ofis Malzemesi", value: "office" },
                    { label: "Donanım", value: "hardware" },
                  ]}
                  label="Kategori"
                  onChange={setCategory}
                />
                <Combobox
                  value={storage}
                  options={[
                    { label: "Tümü", value: "all" },
                    { label: "Merkez Depo", value: "center" },
                    { label: "Manisa Depo", value: "manisa" },
                    { label: "Samsun Depo", value: "samsun" },
                  ]}
                  label="Depo"
                  onChange={setStorage}
                />
                <Combobox
                  value={status}
                  options={[
                    { label: "Tümü", value: "all" },
                    { label: "Normal", value: "normal" },
                    { label: "Kritik", value: "critical" },
                    { label: "Tükendi", value: "sold" },
                  ]}
                  label="Durum"
                  onChange={setStatus}
                />
              </div>
              <p className="text-xs text-gray-500 font-light mr-5">
                {filteredData.length} ürün gösteriliyor
              </p>
            </div>
          </Item>
          <Item>
            <DataTable
              expandable
              sortable
              renderExpandedRow={(product) => (
                <ProductItemsTable items={product.items} />
              )}
              pagination
              data={filteredData}
              columns={columns}
            />
          </Item>
          <Modal
            active={productModal}
            header={{
              title: "Yeni ürün ekle",
              subtitle: "Ürün bilgilerini girin",
            }}
            footer={{
              cancel: "Vazgeç",
              cta: "Ürünü kaydet",
            }}
            formId="product-form"
            onClose={() => setProductModal(false)}
          >
            <ProductForm id="product-form" form={form} onSubmit={onSubmit} />
          </Modal>
        </MainContainer>
      </main>
    </>
  );
}
