export type TransactionType = 'expense' | 'income';

export type Category = 'food' | 'salary' | 'rent' | 'transport' | 'tech' | 'leisure' | 'other';

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

export type CreateTransactionDto = {
  amount: number;
  type: 'income' | 'expense';
  category: Category;
  date: string;
  description?: string;
};

export interface lastYearTrendDataInterface {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface IncomeExpenseData {
  totalIncome: number;
  totalExpense: number;
  month: string;
}
