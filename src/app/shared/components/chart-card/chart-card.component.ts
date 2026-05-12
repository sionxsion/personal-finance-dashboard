import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NoDataComponent } from '../no-data/no-data.component';

@Component({
  selector: 'app-chart-card',
  imports: [BaseChartDirective, NoDataComponent],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.css',
})
export class ChartCardComponent {
  title = input.required<string>();
  chartType = input.required<ChartType>();
  chartData = input.required<ChartConfiguration<any>['data']>();
  options = input<ChartConfiguration<any>['options']>({
    responsive: true,
    maintainAspectRatio: false,
  });
  hasData = computed(() => {
    const data = this.chartData();
    return !!data && (data.datasets[0]?.data?.length ?? 0) > 0;
  });
}
