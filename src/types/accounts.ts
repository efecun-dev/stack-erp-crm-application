export interface AccountItem {
  date: string;
  description: string;
  type: "income" | "expense";
  amount: number;
}

export interface Accounts {
  current: {
    name: string;
    type: string;
  };

  income: number;
  expense: number;
  waiting: number;

  items: AccountItem[];
}