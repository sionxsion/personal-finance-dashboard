export type TransactionType = 'expense' | 'income';

export type Category = 'food' | 'rent' | 'transport' | 'tech' | 'leisure' | 'other';

export interface Transaction {
  id: number;
  amount: number; // siempre positivo
  type: TransactionType; // suma o resta
  category: Category;
  date: Date;
  description?: string;
}

export interface MonthlyTotals {
  totalIncome: number;
  totalExpense: number;
}

export interface MonthlyComparison {
  current: MonthlyTotals;
  previous: MonthlyTotals;
  incomeDiff: number;
  expenseDiff: number;
}

export type OverspendingMonth = {
  month: string;
  overspending: boolean;
  expense: number;
  balance: number;
  severity: 'low' | 'medium' | 'high' | null;
};
