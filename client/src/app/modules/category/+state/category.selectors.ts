import { CategoryFeature } from './category.reducer';
import { createSelector } from '@ngrx/store';
import { CurrencySelectors } from 'modules/shared/+state/currency.store';
import { CategoryInterface } from './interfaces';
import { CurrencyEntity } from 'entities/Currency.entity';

const selectCategories = createSelector(
	CategoryFeature.selectCategories,
	CurrencySelectors.selectCurrencies,
	(categories, currencies): CategoryInterface[] => {
		return categories.map(category => {
			return {
				id: category.id,
				name: category.name,
				accountId: category.accountId,
				description: category.description,
				active: category.active,
				limit: category.limit,
				currency: currencies.find(
					curr => curr.id === category.currencyId
				) as CurrencyEntity,
			};
		});
	}
);

export const CategorySelectors = {
	selectCategories: selectCategories,
};
