import { createAction, props } from '@ngrx/store';
import { CombinedTransaction } from './interfaces/combined-transaction.interface';

const context = '[TRANSACTION]';

export const loadUserTransactions = createAction(`${context} load user many`);

export const loadWalletTransactions = createAction(
	`${context} load wallet many`,
	props<{ walletId: number }>()
);

export const loadCategoryTransactions = createAction(
	`${context} load category many`,
	props<{ categoryId: number }>()
);

export const setTransactions = createAction(
	`${context} set many`,
	props<{ transactions: CombinedTransaction[] }>()
);

export const addTransaction = createAction(
	`${context} add one`,
	props<{ transaction: CombinedTransaction }>()
);
