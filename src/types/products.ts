export interface ProductItem {
  date: string;
  type: "in" | "out";
  amount: number;
  user: string;
  note: string;
}

export interface Products {
  product: { name: string, sku: string };
  category: { id: any, label: string };
  storage: { id: any, label: string };
  stock: { current: number, min: number };
  unitPrice: number;
  totalValue: number;

  items: ProductItem[];
}