import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadCurrencies, setCurrencies } from './currency.actions';
import { mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyService } from 'modules/shared/api/services/currency.service';

@Injectable()
export class CurrencyEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly currencyService: CurrencyService
	) {}

	loadCurrencies$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCurrencies),
			mergeMap(() =>
				this.currencyService
					.getCurrencies()
					.pipe(map(currencies => setCurrencies({ currencies })))
			)
		)
	);
}
