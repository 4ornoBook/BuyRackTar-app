import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from '../../shared/api/services/account.service';
import { loadCategories, setCategories } from './category.actions';
import { mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly accountService: AccountService
	) {}

	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategories),
			mergeMap(() =>
				this.accountService
					.getAccountCategories()
					.pipe(map(categories => setCategories({ categories })))
			)
		)
	);
}
