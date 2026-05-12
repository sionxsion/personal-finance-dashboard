import { Transaction } from '../models/transaction.model';

export const getNextTransactionId = (transactions: Transaction[]) => {
  return (
    transactions.reduce((max, t) => {
      return t.id > max ? t.id : max;
    }, 0) + 1
  );
};
