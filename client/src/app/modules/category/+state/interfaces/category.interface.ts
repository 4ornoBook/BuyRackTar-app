import { CategoryEntity } from 'entities/Category.entity';
import { CurrencyEntity } from 'entities/Currency.entity';

export type CategoryInterface = Omit<CategoryEntity, 'currencyId'> & {
	currency?: CurrencyEntity;
};
