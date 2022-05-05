import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from 'modules/shared/api/services/account.service';
import {
	addCategory,
	loadCategories,
	loadCategory,
	setCategories,
} from './category.actions';
import { mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'modules/shared/api/services/category.service';

@Injectable()
export class CategoryEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly accountService: AccountService,
		private readonly categoryService: CategoryService
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

	loadCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategory),
			mergeMap(({ categoryId }) =>
				this.categoryService
					.getOne(categoryId)
					.pipe(map(category => addCategory({ category })))
			)
		)
	);
}
