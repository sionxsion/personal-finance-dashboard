import { computed, inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { CreateTransactionDto, MonthlyTotals, Transaction } from '../models/transaction.model';
import { getLastMonths, stringToDate, timelineGenerator, toMonthKey } from '../utils/dateConverter';
import { monthlyTotalsToList } from '../utils/financeSelectors';
import { getNextTransactionId } from '../utils/transaction.utils';

@Injectable({
  providedIn: 'root',
})
export class FinanceStore {
  private data = inject(DataService);

  transactions = this.data.transactions;

  // ===== transaction operations ====
  getTransactionById = (id: number) => {
    return this.transactions().find((t) => t.id === id);
  };

  addTransaction = (newTransaction: CreateTransactionDto) => {
    const transactionDate = stringToDate(newTransaction.date);
    const id = getNextTransactionId(this.transactions());

    this.transactions.set([
      ...this.transactions(),
      {
        id,
        amount: newTransaction.amount,
        category: newTransaction.category,
        date: transactionDate,
        type: newTransaction.type,
        description: newTransaction.description,
      },
    ]);
    return true;
  };

  editTransaction = (transaction: Transaction) => {
    this.transactions.update((transactions) =>
      transactions.map((t) => {
        if (t.id === transaction.id) {
          return { ...transaction };
        }
        return t;
      }),
    );
  };

  deleteTransaction = (id: number) => {
    this.transactions.update((transactions) => transactions.filter((t) => t.id !== id));
  };

  clearTransactions = () => {
    this.transactions.set([]);
  };

  // ===== CORE METRICS =====
  totalBalance = computed(() => {
    return this.transactions().reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
  });

  totals = computed(() => {
    return this.transactions().reduce(
      (acc, t) => {
        if (t.type === 'income') acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 },
    );
  });

  averageExpense = computed(() => {
    const expenseAmount = this.totals().expense;
    const count = this.expenseCount();

    return count === 0 ? 0 : expenseAmount / count;
  });

  expensesByCategory = computed(() => {
    return this.transactions().reduce((acc: Record<string, number>, t) => {
      if (t.type === 'expense') {
        acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      }
      return acc;
    }, {});
  });

  topCategory = computed(() => {
    const categories = this.expensesByCategory();
    return Object.entries(categories).reduce(
      (best, current) => {
        return current[1] > best[1] ? current : best;
      },
      ['', 0] as [string, number],
    )[0];
  });

  expenseCount = computed(() => {
    return this.transactions().filter((t) => t.type === 'expense').length;
  });

  // ===== TIME GROUPING =====

  monthRange = computed(() => {
    const transactions = this.transactions();

    if (transactions.length === 0) return [];

    let firstDate = transactions[0].date;

    for (const t of transactions) {
      if (t.date < firstDate) {
        firstDate = t.date;
      }
    }

    return timelineGenerator(firstDate);
  });

  transactionsByMonth = computed(() => {
    return this.transactions().reduce((acc: Record<string, Transaction[]>, t) => {
      const month = toMonthKey(t.date);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(t);
      return acc;
    }, {});
  });

  monthlyTotals = computed(() => {
    const grouped = this.transactionsByMonth();
    const timeline = this.monthRange();

    const result: Record<string, MonthlyTotals> = {};

    for (const month of timeline) {
      const transactions = grouped[month] ?? [];

      let totalIncome = 0;
      let totalExpense = 0;

      for (const t of transactions) {
        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
      }

      result[month] = { totalIncome, totalExpense };
    }

    return result;
  });

  // ===== TRENDS =====

  lastYearTrend = computed(() => {
    const totals = this.monthlyTotals();
    const LAST_YEAR_MONTHS = 12;
    const fullTimeline: string[] = getLastMonths(LAST_YEAR_MONTHS);

    return fullTimeline.map((month) => {
      const data = totals[month] ?? { totalIncome: 0, totalExpense: 0 };
      return {
        month,
        income: data.totalIncome,
        expense: data.totalExpense,
        balance: data.totalIncome - data.totalExpense,
      };
    });
  });

  // ===== CATEGORY ANALYTICS =====
  categoryTrend = (category: string) => {
    const data = this.transactionsByMonth();
    const CATEGORY_TREND_MONTHS = 6;
    const timeline: string[] = getLastMonths(CATEGORY_TREND_MONTHS);

    return timeline.map((month) => {
      const monthData = {
        month,
        income: 0,
        expense: 0,
        balance: 0,
      };

      const transactions = data[month] ?? [];

      const filtered = transactions.filter((t) => t.category === category);

      for (const t of filtered) {
        if (t.type === 'income') monthData.income += t.amount;
        else monthData.expense += t.amount;
      }

      monthData.balance = monthData.income - monthData.expense;

      return monthData;
    });
  };

  categoryExpenseTrend = (category: string) => {
    const base = this.categoryTrend(category);
    return base.map((m) => ({ month: m.month, amount: m.expense }));
  };

  monthlyTotalsList = computed(() => {
    return monthlyTotalsToList(this.monthlyTotals());
  });
}
