import { TransactionRawInterface } from '../interfaces/api/transaction-raw.interface';

export interface CategoryTransactionsEntity extends TransactionRawInterface {
	walletId: number;
	categoryId: number;
}
