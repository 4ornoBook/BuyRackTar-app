import { createFeature, createReducer, on } from '@ngrx/store';
import { CurrencyEntity } from 'entities/Currency.entity';
import { setCurrencies } from './currency.actions';

export interface CurrencyState {
	currencies: CurrencyEntity[];
}

const initialState: CurrencyState = {
	currencies: [],
};

const currencyFeatureKey = 'currency';

const currencyReducer = createReducer(
	initialState,
	on(setCurrencies, (_, { currencies }) => ({ currencies }))
);

export const CurrencyFeature = createFeature({
	name: currencyFeatureKey,
	reducer: currencyReducer,
});
