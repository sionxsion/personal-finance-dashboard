import { Component, computed, inject, signal } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';
import { ChartCardComponent } from '../../shared/components/chart-card/chart-card.component';
import { Category } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-trend',
  imports: [CommonModule, ChartCardComponent],
  templateUrl: './category-trend.component.html',
  styleUrl: './category-trend.component.css',
})
export class CategoryTrendComponent {
  private store = inject(FinanceStore);
  category = signal<Category>('food');

  trend = computed(() => this.store.categoryExpenseTrend(this.category()));
  categories = computed(() => Object.keys(this.store.expensesByCategory()));
  categoryTrend = computed(() => {
    const trend = this.trend();
    return {
      labels: trend.map((item) => item.month),
      datasets: [
        {
          label: 'Amount',
          data: trend.map((item) => item.amount),
          backgroundColor: '#e31e1e',
          borderColor: '#e31e1e',
          tension: 0.3,
          fill: false,
        },
      ],
    };
  });

  onCategoryChange = (value: string) => {
    this.category.set(value as Category);
  };
}
