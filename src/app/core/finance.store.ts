import { computed, inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import {
  CreateTransactionDto,
  MonthlyTotals,
  OverspendingMonth,
  Transaction,
} from '../models/transaction.model';
import { getLastMonths, stringToDate, timelineGenerator, toMonthKey } from '../utils/dateConverter';

@Injectable({
  providedIn: 'root',
})
export class FinanceStore {
  private data = inject(DataService);

  transactions = this.data.transactions;

  // ===== transaction operations ====
  addTransaction = (newTransaction: CreateTransactionDto) => {
    const transactionDate = stringToDate(newTransaction.date);
    const id = this.getMaxTransactionId() + 1;

    this.transactions.set([
      ...this.transactions(),
      {
        id,
        amount: newTransaction.amount,
        category: newTransaction.category,
        date: transactionDate,
        type: newTransaction.type,
      },
    ]);
    return true;
  };

  editTransaction = (transaction: Transaction) => {
    this.transactions();
  };

  removeTransaction = (id: number) => {
    this.transactions.set(this.transactions().filter((t) => t.id != id));
  };

  clearTransactions = () => {
    this.transactions.set([]);
  };

  private getMaxTransactionId() {
    const id = this.transactions().reduce((bigger: number, { id }) => {
      return id > bigger ? id : bigger;
    }, 0);
    return id;
  }

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

  currentMonthTotals = computed(() => {
    const timeline = this.monthRange();

    if (timeline.length === 0) return null;

    const current = timeline[timeline.length - 1];
    return this.monthlyTotals()[current];
  });

  prevMonthTotals = computed(() => {
    const timeline = this.monthRange();
    if (timeline.length < 2) return null;

    const previous = timeline[timeline.length - 2];
    return this.monthlyTotals()[previous];
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

  monthlyComparison = computed(() => {
    const timeline = this.monthRange();
    const totals = this.monthlyTotals();

    if (timeline.length === 0) {
      return {
        current: null,
        previous: null,
        incomeDiff: null,
        expenseDiff: null,
      };
    }

    const currentKey = timeline[timeline.length - 1];
    const previousKey = timeline[timeline.length - 2];

    const current = totals[currentKey];
    const previous = previousKey ? totals[previousKey] : null;

    if (!previous) {
      return {
        current,
        previous: null,
        incomeDiff: null,
        expenseDiff: null,
      };
    }

    return {
      current,
      previous,
      incomeDiff: current.totalIncome - previous.totalIncome,
      expenseDiff: current.totalExpense - previous.totalExpense,
    };
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

  trendDirection = computed(() => {
    const data = this.lastYearTrend();

    if (data.length === 0) return null;

    const first = data[0].balance;
    const last = data[data.length - 1].balance;

    if (first === last) return 'flat';
    return last > first ? 'up' : 'down';
  });

  worstMonth = computed(() => {
    const data = this.lastYearTrend();

    if (data.length === 0) return null;

    return data.reduce((worst, current) => (current.balance < worst.balance ? current : worst));
  });

  // ===== BEHAVIORAL INSIGHTS ====
  overspendingDetection = computed(() => {
    const trend = this.lastYearTrend();
    return trend.map((item) => {
      const overspending = item.balance < 0;
      let severity: OverspendingMonth['severity'] = null;

      if (overspending) {
        if (item.balance > -100) severity = 'low';
        else if (item.balance > -500) severity = 'medium';
        else severity = 'high';
      }

      const monthData: OverspendingMonth = {
        month: item.month,
        overspending,
        expense: item.expense,
        balance: item.balance,
        severity,
      };

      return monthData;
    });
  });

  overspendingStreak = computed(() => {
    const data = this.overspendingDetection();
    return data.reduce(
      (acc, item) => {
        if (item.overspending) {
          acc.currentStreak++;
          if (acc.longestStreak < acc.currentStreak) {
            acc.longestStreak = acc.currentStreak;
          }
        } else {
          acc.currentStreak = 0;
        }
        return acc;
      },
      { currentStreak: 0, longestStreak: 0 },
    );
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

  // ===== PRESENTATION HELPERS =====

  monthlyTotalsList = computed(() => {
    const totals = this.monthlyTotals();

    return Object.entries(totals)
      .map(([month, value]) => ({
        month,
        ...value,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  });
}
