import { Component, effect, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceStore } from '../../../core/finance.store';
import { Category, Transaction } from '../../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { dateToString, stringToDate } from '../../../utils/dateConverter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  private router = inject(Router);
  private store = inject(FinanceStore);
  transaction = input<Transaction>();

  isSubmitted = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  categories: Category[] = ['food', 'salary', 'rent', 'transport', 'tech', 'leisure', 'other'];

  constructor() {
    effect(() => {
      const transaction = this.transaction();

      if (!transaction) return;

      this.transactionForm.patchValue({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        date: dateToString(transaction.date),
        description: transaction.description,
      });
    });
  }

  editType = this.transaction()?.type || 'income';

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
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(50)],
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

  get description() {
    return this.transactionForm.get('description');
  }

  onSubmitTransaction = () => {
    this.isSubmitting.set(true);

    const { amount, type, category, date, description } = this.transactionForm.getRawValue();

    if (this.transaction()) {
      this.store.editTransaction({
        id: this.transaction()!.id,
        type,
        amount,
        category,
        date: stringToDate(date),
        description,
      });
      this.router.navigate(['/transactions']);
      return;
    } else {
      this.store.addTransaction({
        amount,
        type,
        category,
        date,
        description,
      });

      this.transactionForm.reset({
        type: 'income',
        amount: 0,
        category: 'food',
        date: '',
        description: '',
      });
    }

    this.isSubmitted.set(true);

    setTimeout(() => {
      this.isSubmitted.set(false);
    }, 1000);

    this.isSubmitting.set(false);
  };
}
