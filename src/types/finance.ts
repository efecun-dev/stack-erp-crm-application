export interface Finance {
    date: string;
    description: string,
    category: { id: number, label: string },
    current: string,
    amount: number,
    status: string,
}