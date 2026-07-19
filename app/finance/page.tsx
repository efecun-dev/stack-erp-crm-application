"use client";
import DashInfoBox from "@/components/dashboard/DashInfoBox";
import Item from "@/components/dashboard/Item";
import Header from "@/components/layout/Header";
import MainContainer from "@/components/layout/MainContainer";
import Sidebar from "@/components/layout/Sidebar";
import Button from "@/components/ui/Button";
import Combobox from "@/components/ui/Combobox";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/Table/DataTable";
import FinanceForm from "@/src/forms/FinanceForm";
import { FinanceFormData, financeSchema } from "@/src/schemas/finance.schema";
import type { Finance } from "@/src/types/finance";
import { zodResolver } from "@hookform/resolvers/zod";
import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import financeMockData from "@/src/constants/finance.json";
import accsMockData from "@/src/constants/accounts.json";
import { AccountItem, Accounts } from "@/src/types/accounts";
import AccountDetailsTable from "./OrderProductsTable";

export default function Finance() {
  const [financeModal, setFinanceModal] = useState(false);
  const [tab, setTab] = useState("transactions");
  const [transType, setTransType] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  const [accountType, setAccountType] = useState("all");
  const [balance, setBalance] = useState("all");

  const form = useForm<FinanceFormData>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      type: "income",
      description: "",
      category: undefined,
      amount: undefined,
      current: undefined,
      date: new Date(),
      status: "waiting",
    },
  });

  const onSubmit = (data: FinanceFormData) => {
    console.log(data);

    setFinanceModal(false);
    form.reset();
  };

  const financeData = useMemo(() => financeMockData, []);

  const columnHelper = createColumnHelper<Finance>();
  const financeColumns = [
    columnHelper.accessor("date", {
      header: "Tarih",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Açıklama",
      cell: (info) => (
        <strong className="font-semibold">{info.getValue()}</strong>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Kategori",
      cell: (info) => info.getValue().label,
    }),
    columnHelper.accessor("current", {
      header: "Cari",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Tutar",
      cell: (info) => "₺" + info.getValue().toLocaleString("tr-TR"),
    }),
    columnHelper.display({
      id: "actions",
      header: "İşlemler",
      cell: () => <Button variant="secondary" Icon={Ellipsis}></Button>,
    }),
  ];

  const filteredFinanceData = useMemo(() => {
    return financeData.filter((item) => {
      const typeMatch = transType === "all" || item.type === transType;

      const categoryMatch =
        category === "all" || item.category.id.toLocaleString() === category;

      const statusMatch = status === "all" || item.status === status;

      return typeMatch && categoryMatch && statusMatch;
    });
  }, [financeData, transType, category, status]);

  const accountData: Accounts[] = useMemo(() => {
    return accsMockData.map((account) => {
      const items = account.items as AccountItem[];

      const income = items
        .filter((i) => i.type === "income")
        .reduce((sum, i) => sum + i.amount, 0);

      const expense = items
        .filter((i) => i.type === "expense")
        .reduce((sum, i) => sum + i.amount, 0);

      return {
        ...account,
        items,
        income,
        expense,
        waiting: income - expense,
      };
    });
  }, []);

  const filteredAccsData = useMemo(() => {
    return accountData.filter((item) => {
      const currentType =
        item.current.type === "Müşteri" ? "customer" : "supplier";

      const currentMatch = accountType === "all" || currentType === accountType;

      const balanceValue = item.income - item.expense;

      const balanceMatch =
        balance === "all" ||
        (balance === "positive" && balanceValue > 0) ||
        (balance === "negative" && balanceValue < 0);

      return currentMatch && balanceMatch;
    });
  }, [accountData, accountType, balance]);

  const accsColHelper = createColumnHelper<Accounts>();
  const accsColumns = [
    accsColHelper.accessor("current", {
      header: "Cari",
      cell: (info) => (
        <div>
          <p className="font-medium">{info.getValue().name}</p>
          <p className="text-xs text-gray-500">{info.getValue().type}</p>
        </div>
      ),
    }),
    accsColHelper.accessor("income", {
      header: "Toplam Gelir",
      cell: (info) => `₺${info.getValue().toLocaleString("tr-TR")}`,
    }),
    accsColHelper.accessor("expense", {
      header: "Toplam Gider",
      cell: (info) => `₺${info.getValue().toLocaleString("tr-TR")}`,
    }),
    accsColHelper.display({
      id: "balance",
      header: "Bakiye",
      cell: ({ row }) => row.original.income - row.original.expense,
    }),
    accsColHelper.accessor("waiting", {
      header: "Bekleyen Tutar",
      cell: (info) =>
        info.getValue() == null
          ? "-"
          : `₺${info.getValue().toLocaleString("tr-TR")}`,
    }),
  ];

  return (
    <>
      <main className="flex min-h-screen w-full overflow-x-hidden items-start">
        <Sidebar active="finance" />
        <MainContainer>
          <Header searchPlaceholder="Açıklama veya cari ara..." />
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-[#0B2E33]">Finans</h3>
              <p className="text-sm text-gray-400 font-light">
                Gelir-gider hareketlerini ve cari hesapları takip edin
              </p>
            </div>
            <Button Icon={Plus} onClick={() => setFinanceModal(true)}>
              Yeni kayıt
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <DashInfoBox title="Toplam gelir" content="₺337.700" />
            <DashInfoBox title="Toplam gider" content="₺176.600" />
            <DashInfoBox title="Net bakiye" content="₺161.100" />
            <DashInfoBox title="Bekleyen kayıt" content="5" />
          </div>
          <Modal
            header={{
              title: "Yeni gelir/gider kaydı",
              subtitle: "Tutar ve kategori bilgilerini girin",
            }}
            footer={{
              cancel: "Vazgeç",
              cta: "Kayıt Ekle",
            }}
            formId="finance-form"
            active={financeModal}
            onClose={() => setFinanceModal(false)}
          >
            <FinanceForm id="finance-form" form={form} onSubmit={onSubmit} />
          </Modal>
          <div className="bg-white p-1.5 border border-[#D7ECEF] rounded-xl items-center flex gap-1 w-fit">
            <div
              onClick={() => setTab("transactions")}
              className={`py-1 px-3 text-[#5C7C80] text-sm cursor-pointer rounded-md transition ${tab == "transactions" ? "text-[#08525A] bg-[#E3F6F8]" : ""}`}
            >
              Gelir - Gider Hareketleri
            </div>
            <div
              onClick={() => setTab("accounts")}
              className={`py-1 px-3 text-[#5C7C80] text-sm cursor-pointer rounded-md transition ${tab == "accounts" ? "text-[#08525A] bg-[#E3F6F8]" : ""}`}
            >
              Cari Hesaplar
            </div>
          </div>
          {tab == "transactions" && (
            <>
              <Item>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Combobox
                      value={transType}
                      options={[
                        { label: "Tür: Tümü", value: "all" },
                        { label: "Gelir", value: "income" },
                        { label: "Gider", value: "expense" },
                      ]}
                      onChange={setTransType}
                    />
                    <Combobox
                      value={category}
                      options={[
                        { label: "Kategori: Tümü", value: "all" },
                        { label: "Satış Geliri", value: "1" },
                        { label: "Hizmet Geliri", value: "2" },
                        { label: "Diğer Gelir", value: "3" },
                        { label: "Kira", value: "4" },
                        { label: "Maaş", value: "5" },
                        { label: "Tedarik", value: "6" },
                        { label: "Vergi", value: "7" },
                        { label: "Diğer Gider", value: "8" },
                      ]}
                      onChange={setCategory}
                    />
                    <Combobox
                      value={status}
                      options={[
                        { label: "Durum: Tümü", value: "all" },
                        { label: "Ödendi", value: "paid" },
                        { label: "Bekliyor", value: "waiting" },
                      ]}
                      onChange={setStatus}
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-light mr-5">
                    {filteredFinanceData.length} ürün gösteriliyor
                  </p>
                </div>
              </Item>
              <Item>
                <DataTable
                  pagination
                  data={filteredFinanceData}
                  columns={financeColumns}
                />
              </Item>
            </>
          )}
          {tab == "accounts" && (
            <>
              <Item>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-80">
                      <Input
                        Icon={Search}
                        placeholder="Cari adı ara..."
                        onChange={(e) => setFilterSearch(e.target.value)}
                      />
                    </div>
                    <Combobox
                      value={accountType}
                      options={[
                        { label: "Tür: Tümü", value: "all" },
                        { label: "Müşteri", value: "customer" },
                        { label: "Tedarikçi", value: "supplier" },
                      ]}
                      onChange={setAccountType}
                    />
                    <Combobox
                      value={balance}
                      options={[
                        { label: "Bakiye: Tümü", value: "all" },
                        { label: "Alacaklı (pozitif)", value: "positive" },
                        { label: "Borçlu (negatif)", value: "negative" },
                      ]}
                      onChange={setBalance}
                    />
                  </div>
                </div>
              </Item>
              <Item>
                <DataTable
                  pagination
                  expandable
                  data={filteredAccsData}
                  columns={accsColumns}
                  renderExpandedRow={(order) => (
                    <AccountDetailsTable items={order.items} />
                  )}
                />
              </Item>
            </>
          )}
        </MainContainer>
      </main>
    </>
  );
}
