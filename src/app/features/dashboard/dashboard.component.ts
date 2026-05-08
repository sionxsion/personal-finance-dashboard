import { Component, computed, inject, signal } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';
import { CategoryTrendComponent } from '../category-trend/category-trend.component';
import { BalanceCardComponent } from '../BalanceCard/balance-card.component';
import { SummaryCardComponent } from '../summary-card/summary-card.component';
import { TransactionFormComponent } from '../transactions/transaction-form/transaction-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CategoryTrendComponent,
    BalanceCardComponent,
    SummaryCardComponent,
    TransactionFormComponent,
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
  averageExpense = this.store.averageExpense;
  monthlyTotalsList = this.store.monthlyTotalsList;
  comparison = this.store.monthlyComparison;
  trend = this.store.lastYearTrend;
  overspending = this.store.overspendingStreak;
  worsthMonth = this.store.worstMonth;
  categoryTrend = computed(() => this.store.categoryTrend(this.category()));
  categoryExpenseTrend = computed(() => this.store.categoryExpenseTrend(this.category()));
}
