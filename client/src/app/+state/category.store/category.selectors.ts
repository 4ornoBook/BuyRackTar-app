import { CategoryFeature } from './category.reducer';
import { createSelector, Store } from '@ngrx/store';
import { CurrencySelectors } from '+state/currency.store';
import { CategoryInterface, CategoryWithTransactions } from './interfaces';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
				),
			};
		});
	}
);

const selectCategory = (
	store: Store,
	categoryId$: Observable<number>
): Observable<CategoryWithTransactions | null> => {
	return combineLatest([
		store.select(CategoryFeature.selectCategories),
		store.select(CategoryFeature.selectCategoryTransactions),
		categoryId$,
	]).pipe(
		map(([categories, categoryTransactions, categoryId]) => {
			const category = categories.find(
				cat => cat.id === categoryId
			) as CategoryInterface;
			const transactions = categoryTransactions[categoryId];

			if (!category) {
				return null;
			}

			return {
				...category,
				transactions,
			};
		})
	);
};

export const CategorySelectors = {
	selectCategory: selectCategory,
	selectCategories: selectCategories,
	selectLoading: CategoryFeature.selectLoading,
};
