import { Component, computed, inject } from '@angular/core';
import { FinanceStore } from '../../../core/finance.store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent {
  private store = inject(FinanceStore);

  transactionsSorted = computed(() => {
    return [...this.store.transactions()].sort((a, b) => b.date.getTime() - a.date.getTime());
  });

  onDelete(id: number) {
    this.store.deleteTransaction(id);
  }
}
