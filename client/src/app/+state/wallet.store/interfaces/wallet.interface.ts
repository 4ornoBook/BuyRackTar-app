import { WalletEntity } from 'entities/Wallet.entity';
import { CurrencyEntity } from 'entities/Currency.entity';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';
import { WalletTransactionEntity } from 'entities/WalletTransaction.entity';

export type WalletInterface = Omit<WalletEntity, 'currencyId'> & {
	currency?: CurrencyEntity;
};

export type WalletWithTransactions = WalletInterface & {
	transactions: (WalletTransactionEntity | CategoryTransactionsEntity)[];
};
