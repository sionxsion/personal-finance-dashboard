import { Component } from '@angular/core';
import { TransactionFormComponent } from '../../features/transactions/transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-page',
  imports: [TransactionFormComponent],
  templateUrl: './transaction-page.html',
  styleUrl: './transaction-page.css',
})
export class TransactionPage {}
