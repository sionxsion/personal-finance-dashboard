import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  imports: [BaseChartDirective],
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
}
