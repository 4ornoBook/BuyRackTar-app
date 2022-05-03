import { createAction, props } from '@ngrx/store';
import { CurrencyEntity } from 'entities/Currency.entity';

const context = '[CURRENCY]';

export const setCurrencies = createAction(
	`${context} set currencies`,
	props<{ currencies: CurrencyEntity[] }>()
);

export const loadCurrencies = createAction(`${context} load currencies`);
