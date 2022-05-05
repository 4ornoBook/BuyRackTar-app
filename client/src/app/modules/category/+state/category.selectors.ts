import { CategoryFeature } from './category.reducer';
import { createSelector, Store } from '@ngrx/store';
import { CurrencySelectors } from 'modules/shared/+state/currency.store';
import { CategoryInterface } from './interfaces';
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
): Observable<CategoryInterface> => {
	return combineLatest([
		store.select(CategoryFeature.selectCategories),
		categoryId$,
	]).pipe(
		map(([categories, categoryId]) => {
			return categories.find(
				cat => cat.id === categoryId
			) as CategoryInterface;
		})
	);
};

export const CategorySelectors = {
	selectCategory: selectCategory,
	selectCategories: selectCategories,
	selectLoading: CategoryFeature.selectLoading,
};
