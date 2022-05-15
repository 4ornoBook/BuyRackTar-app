import { WalletTransaction } from './wallet-transaction.interface';
import { CategoryTransaction } from './category-transaction.interface';

export type CombinedTransaction = Partial<
	WalletTransaction & CategoryTransaction
>;
