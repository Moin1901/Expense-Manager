export interface ExpenseInput {
  date: string;
  amount: number;
  vendor: string;
  description?: string;
}

export interface ExpenseRecord extends ExpenseInput {
  id: string | number;
  category?: string;
}

export type FormState = {
    date: string;
    amount: string; 
    vendor: string;
    description?: string;
  };