import { CurrencyFeature } from './currency.reducer';
import { createSelector } from '@ngrx/store';
import { CurrencyEntity } from 'entities/Currency.entity';

const selectCurrency = (id: CurrencyEntity['id']) => {
	return createSelector(CurrencyFeature.selectCurrencies, currencies =>
		currencies.find(cur => cur.id === id)
	);
};

export const CurrencySelectors = {
	selectCurrencies: CurrencyFeature.selectCurrencies,
	selectCurrency: selectCurrency,
};
