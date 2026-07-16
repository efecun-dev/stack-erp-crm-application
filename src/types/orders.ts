export interface OrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Orders {
  id: string;
  customer: string;
  date: string;
  total: number;
  price: number;
  status: string;

  items: OrderItem[];
}