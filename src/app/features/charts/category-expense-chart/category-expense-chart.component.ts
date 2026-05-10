import { Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';

import { FinanceStore } from '../../../core/finance.store';

@Component({
  selector: 'app-category-expense-chart',
  imports: [BaseChartDirective],
  templateUrl: './category-expense-chart.component.html',
  styleUrl: './category-expense-chart.component.css',
})
export class CategoryExpenseChartComponent {
  store = inject(FinanceStore);
  chartType: ChartType = 'doughnut';
  chartData = computed(() => {
    const data = this.store.expensesByCategory();
    return {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
        },
      ],
    };
  });
}
