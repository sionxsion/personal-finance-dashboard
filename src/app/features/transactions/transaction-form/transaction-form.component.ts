import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceStore } from '../../../core/finance.store';
import { Category, CreateTransactionDto, Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  private store = inject(FinanceStore);

  isSubmitted = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  categories: Category[] = ['food', 'rent', 'transport', 'tech', 'leisure', 'other'];

  transactionForm = new FormGroup({
    type: new FormControl<'income' | 'expense'>('income', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    amount: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    category: new FormControl<Category>('food', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get type() {
    return this.transactionForm.get('type');
  }

  get amount() {
    return this.transactionForm.get('amount');
  }

  get category() {
    return this.transactionForm.get('category');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  onSubmitTransaction = () => {
    this.isSubmitting.set(true);

    const { amount, type, category, date } = this.transactionForm.getRawValue();

    const newTransaction: CreateTransactionDto = {
      amount,
      type,
      category,
      date,
    };

    const isSuccessfull = this.store.addTransaction(newTransaction);

    if (isSuccessfull) {
      this.isSubmitted.set(true);
      setTimeout(() => this.isSubmitted.set(false), 1000);

      this.transactionForm.reset({
        type: 'income',
        amount: 0,
        category: 'food',
        date: '',
      });
    }
    this.isSubmitting.set(false);
  };
}
