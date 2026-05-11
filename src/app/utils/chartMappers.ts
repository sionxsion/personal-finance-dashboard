import { ChartConfiguration } from 'chart.js';

export const doughnutOptionsUtil: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export const lineOptionsUtil: ChartConfiguration<'line'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
};

export const expensesByCategoryChartDataUtil = (data: Record<string, number>) => {
  return {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
      },
    ],
  };
};

interface lastYearTrendDataInterface {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export const lastYearTrendChartDataUtil = (data: lastYearTrendDataInterface[]) => {
  return {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Income',
        data: data.map((item) => item.income),
      },
      {
        label: 'Expense',
        data: data.map((item) => item.expense),
      },
      {
        label: 'Month Balance',
        data: data.map((item) => item.balance),
      },
    ],
  };
};

interface IncomeExpenseData {
  totalIncome: number;
  totalExpense: number;
  month: string;
}

export const incomeVsExpenseChartDataUtil = (data: IncomeExpenseData[]) => {
  return {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Income',
        data: data.map((item) => item.totalIncome),
        backgroundColor: 'rgb(38, 82, 227)',
        borderColor: '#1667ca',
        tension: 0.3,
      },
      {
        label: 'Expense',
        data: data.map((item) => item.totalExpense),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        tension: 0.3,
      },
    ],
  };
};
