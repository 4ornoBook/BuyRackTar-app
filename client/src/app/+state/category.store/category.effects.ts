import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from 'modules/shared/api/services/account.service';
import {
	addCategory,
	addCategoryTransactions,
	createCategory,
	loadCategories,
	loadCategory,
	loadCategoryTransactions,
	setCategories,
	setCategoriesLoading,
} from './category.actions';
import { first, mergeMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'modules/shared/api/services/category.service';
import { select, Store } from '@ngrx/store';
import { EMPTY_ACTION } from '../utility';
import { CategoryFeature } from './category.reducer';
import { NotificationAlertService } from 'modules/shared/helpers/notification-alert.service';

@Injectable()
export class CategoryEffects {
	constructor(
		private readonly store: Store,
		private readonly actions$: Actions,
		private readonly accountService: AccountService,
		private readonly categoryService: CategoryService,
		private readonly notificationService: NotificationAlertService
	) {}

	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategories),
			mergeMap(() =>
				this.store.pipe(
					select(CategoryFeature.selectAllCategoriesLoaded),
					first()
				)
			),
			mergeMap(allLoaded => {
				if (!allLoaded) {
					this.store.dispatch(setCategoriesLoading());
					return this.accountService
						.getAccountCategories()
						.pipe(map(categories => setCategories({ categories })));
				}

				return of(EMPTY_ACTION());
			})
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

	createCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createCategory),
			mergeMap(({ categoryDto }) =>
				this.categoryService.create(categoryDto).pipe(
					map(category => {
						this.notificationService.showInfo(
							'Success',
							`Category ${category.name} was created.`
						);
						return addCategory({ category });
					})
				)
			)
		)
	);

	loadCategoryTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategoryTransactions),
			mergeMap(({ categoryId }) =>
				this.categoryService.getCategoryTransactions(categoryId).pipe(
					map(transactions =>
						addCategoryTransactions({
							categoryId,
							transactions,
						})
					)
				)
			)
		)
	);
}
