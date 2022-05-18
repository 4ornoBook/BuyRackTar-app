import { createAction, props } from '@ngrx/store';
import { CombinedTransaction } from './interfaces/combined-transaction.interface';
import { TransactionTypes } from '../../enums/transaction-type.enum';
import { TransactionDto } from '../../interfaces/transaction.dto';

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

export const makeTransaction = createAction(
	`${context} make transaction`,
	props<{ transactionDto: TransactionDto }>()
);
