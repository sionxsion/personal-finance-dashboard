import { Component, computed, inject, signal } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';
import { CategoryTrendComponent } from '../../features/category-trend/category-trend.component';
import { BalanceCardComponent } from '../../features/BalanceCard/balance-card.component';
import { TransactionFormComponent } from '../../features/transactions/transaction-form/transaction-form.component';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import {
  DOUGHNUT_CHART_OPTIONS,
  mapExpensesByCategoryChartData,
  mapIncomeVsExpenseChartData,
  mapLastYearTrendChartData,
  LINE_CHART_OPTIONS,
} from '../../utils/chartMappers';

@Component({
  selector: 'app-dashboard',
  imports: [
    CategoryTrendComponent,
    BalanceCardComponent,
    TransactionFormComponent,
    ChartCardComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private store = inject(FinanceStore);

  totalBalance = this.store.totalBalance;
  totals = this.store.totals;
  totalAmount = computed(() => this.totals().income + this.totals().expense);
  topCategory = this.store.topCategory;

  doughnutOptions = DOUGHNUT_CHART_OPTIONS;
  lineOptions = LINE_CHART_OPTIONS;

  expensesByCategoryChartData = computed(() => {
    const data = this.store.expensesByCategory();
    return mapExpensesByCategoryChartData(data);
  });

  lastYearTrendChartData = computed(() => {
    const data = this.store.lastYearTrend();

    return mapLastYearTrendChartData(data);
  });

  incomeVsExpenseChartData = computed(() => {
    const data = this.store.monthlyTotalsList();
    return mapIncomeVsExpenseChartData(data);
  });
}
