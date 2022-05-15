import { TransactionRawInterface } from 'interfaces/api/transaction-raw.interface';
import { WalletEntity } from 'entities/Wallet.entity';

export interface WalletTransaction extends TransactionRawInterface {
	fromWallet: Pick<WalletEntity, 'id' | 'name'>;
	toWallet: Pick<WalletEntity, 'id' | 'name'>;
}
