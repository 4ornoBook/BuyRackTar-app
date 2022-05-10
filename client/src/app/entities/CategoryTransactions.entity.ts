import { TransactionInterface } from '../interfaces/api/transaction.interface';

export interface CategoryTransactionsEntity extends TransactionInterface {
	walletId: number;
	categoryId: number;
}
