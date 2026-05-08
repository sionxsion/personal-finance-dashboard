import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css',
})
export class SummaryCardComponent {
  title = input.required<string>();
  amount = input.required<number>();
  color = input<string>('black');
}
