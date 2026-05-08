import { Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  transactions = signal<Transaction[]>([
    {
      id: 1,
      amount: 50,
      type: 'expense',
      category: 'food',
      date: new Date('2026-04-01'),
    },
    {
      id: 2,
      amount: 7200,
      type: 'income',
      category: 'other',
      date: new Date('2026-04-01'),
    },
    {
      id: 3,
      amount: 20,
      type: 'income',
      category: 'other',
      date: new Date('2026-05-01'),
    },
    {
      id: 4,
      amount: 700,
      type: 'expense',
      category: 'tech',
      date: new Date('2026-02-01'),
    },
    {
      id: 5,
      amount: 30,
      type: 'expense',
      category: 'transport',
      date: new Date('2026-01-01'),
    },
    {
      id: 6,
      amount: 100,
      type: 'expense',
      category: 'transport',
      date: new Date('2026-03-01'),
    },
    {
      id: 7,
      amount: 1200,
      type: 'income',
      category: 'other',
      date: new Date('2026-04-01'),
    },
  ]);
}
