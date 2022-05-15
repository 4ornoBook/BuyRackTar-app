import { TransactionRawInterface } from 'interfaces/api/transaction-raw.interface';
import { WalletEntity } from 'entities/Wallet.entity';
import { CategoryEntity } from 'entities/Category.entity';

export interface CategoryTransaction extends TransactionRawInterface {
	wallet: Pick<WalletEntity, 'id' | 'name'>;
	category: Pick<CategoryEntity, 'id' | 'name'>;
}
