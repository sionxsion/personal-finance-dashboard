import { MonthlyTotals } from '../models/transaction.model';

export interface MonthlyTotalsListItem extends MonthlyTotals {
  month: string;
}

export const monthlyTotalsToList = (
  totals: Record<string, MonthlyTotals>,
): MonthlyTotalsListItem[] => {
  return Object.entries(totals)
    .map(([month, value]) => ({
      month,
      ...value,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};
