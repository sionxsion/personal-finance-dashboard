import { Component } from '@angular/core';
import { TransactionListComponent } from '../../features/transactions/transaction-list/transaction-list.component';

@Component({
  selector: 'app-transactions-page',
  imports: [TransactionListComponent],
  templateUrl: './transactions-page.html',
  styleUrl: './transactions-page.css',
})
export class TransactionsPage {}
