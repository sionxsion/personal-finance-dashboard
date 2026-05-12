import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard-page/dashboard';
import { TransactionsPage } from './pages/transactions-page/transactions-page';
import { TransactionPage } from './pages/transaction-page/transaction-page';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'transactions',
    component: TransactionsPage,
  },
  {
    path: 'transactions/:id',
    component: TransactionPage,
  },
  {
    path: '**',
    component: Dashboard,
  },
];
