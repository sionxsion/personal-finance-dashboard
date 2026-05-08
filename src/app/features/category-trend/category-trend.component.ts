import { Component, computed, inject, signal } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';

@Component({
  selector: 'app-category-trend',
  imports: [],
  templateUrl: './category-trend.component.html',
  styleUrl: './category-trend.component.css',
})
export class CategoryTrendComponent {
  private store = inject(FinanceStore);
  category = signal('food');

  trend = computed(() => this.store.categoryExpenseTrend(this.category()));
  categories = computed(() => Object.keys(this.store.expensesByCategory()));

  onCategoryChange = (value: string) => {
    this.category.set(value);
  };
}
