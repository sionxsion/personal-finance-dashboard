import { ChartConfiguration } from 'chart.js';
import { IncomeExpenseData, lastYearTrendDataInterface } from '../models/transaction.model';

export const DOUGHNUT_CHART_OPTIONS: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

export const LINE_CHART_OPTIONS: ChartConfiguration<'line'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
};

export const mapExpensesByCategoryChartData = (data: Record<string, number>) => {
  return {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
      },
    ],
  };
};

export const mapLastYearTrendChartData = (data: lastYearTrendDataInterface[]) => {
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

export const mapIncomeVsExpenseChartData = (data: IncomeExpenseData[]) => {
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
