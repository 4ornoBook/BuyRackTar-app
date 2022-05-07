import { CategoryEntity } from 'entities/Category.entity';
import { CurrencyEntity } from 'entities/Currency.entity';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';

export type CategoryInterface = Omit<CategoryEntity, 'currencyId'> & {
	currency?: CurrencyEntity;
};

export type CategoryWithTransactions = CategoryInterface & {
	transactions: CategoryTransactionsEntity[];
};
