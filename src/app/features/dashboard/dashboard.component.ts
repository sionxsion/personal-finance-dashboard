import { Component, computed, inject, signal } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';
import { CategoryTrendComponent } from '../category-trend/category-trend.component';
import { BalanceCardComponent } from '../BalanceCard/balance-card.component';
import { SummaryCardComponent } from '../summary-card/summary-card.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [
    CategoryTrendComponent,
    BalanceCardComponent,
    SummaryCardComponent,
    TransactionFormComponent,
    ChartCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private store = inject(FinanceStore);
  category = signal('food');

  totalBalance = this.store.totalBalance;
  totals = this.store.totals;
  totalAmount = computed(() => this.totals().income + this.totals().expense);
  topCategory = this.store.topCategory;
  doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  lineOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
  expenses = computed(() => {
    const data = this.store.expensesByCategory();
    this.lastYearTrend();
    return {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
        },
      ],
    };
  });
  lastYearTrend = computed(() => {
    const data = this.store.lastYearTrend();

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
  });
  incomeExpense = computed(() => {
    const data = this.store.monthlyTotalsList();

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
  });
}
