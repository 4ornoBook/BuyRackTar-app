import { TransactionInterface } from '../interfaces/api/transaction.interface';

export interface WalletTransactionEntity extends TransactionInterface {
	fromWalletId: number;
	toWalletId: number;
}
