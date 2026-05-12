import { Component, computed, inject } from '@angular/core';
import { TransactionFormComponent } from '../../features/transactions/transaction-form/transaction-form.component';
import { ActivatedRoute } from '@angular/router';
import { FinanceStore } from '../../core/finance.store';

@Component({
  selector: 'app-transaction-page',
  imports: [TransactionFormComponent],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.css',
})
export class TransactionPage {
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(FinanceStore);

  id = this.activatedRoute.snapshot.paramMap.get('id');

  transaction = computed(() => {
    if (!this.id) return;
    return this.store.getTransactionById(+this.id);
  });
}
