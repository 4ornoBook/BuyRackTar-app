import { TransactionRawInterface } from '../interfaces/api/transaction-raw.interface';

export interface WalletTransactionEntity extends TransactionRawInterface {
	fromWalletId: number;
	toWalletId: number;
}
