import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard-page/dashboard';
import { TransactionsPage } from './pages/transactions-page/transactions-page';

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
    path: '**',
    component: Dashboard,
  },
];
