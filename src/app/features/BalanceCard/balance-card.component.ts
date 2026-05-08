import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  imports: [CommonModule],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.css',
})
export class BalanceCardComponent {
  readonly title = input.required<string>();
  readonly amount = input.required<number>();
  readonly totalAmount = input.required<number>();

  positiveAmount = computed<number>(() =>
    this.amount() > 0 ? (this.amount() / this.totalAmount()) * 100 : 0,
  );
  negativeAmount = computed<number>(() =>
    this.amount() < 0 ? (Math.abs(this.amount()) / this.totalAmount()) * 100 : 0,
  );
}
