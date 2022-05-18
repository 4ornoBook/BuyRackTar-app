import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from 'modules/shared/api/services/account.service';
import {
	addCategory,
	createCategory,
	loadCategories,
	loadCategoriesSpendings,
	loadCategory,
	setCategories,
	setCategoriesLoading,
	setCategoriesSpendings,
	updateCategory,
} from './category.actions';
import { filter, first, mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'modules/shared/api/services/category.service';
import { select, Store } from '@ngrx/store';
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
					select(CategoryFeature.selectAllCategoriesLoaded)
				)
			),
			filter(allLoaded => !allLoaded),
			mergeMap(() => {
				this.store.dispatch(setCategoriesLoading());
				return this.accountService
					.getAccountCategories()
					.pipe(map(categories => setCategories({ categories })));
			})
		)
	);

	loadCategoriesSpendings$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategoriesSpendings),
			mergeMap(() => {
				return this.categoryService
					.getSpendings()
					.pipe(
						map(spendings => setCategoriesSpendings({ spendings }))
					);
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
						this.notificationService.showSuccess(
							'Success',
							`Category ${category.name} was created.`
						);
						return addCategory({ category });
					})
				)
			)
		)
	);

	updateCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateCategory),
			mergeMap(({ categoryId, categoryDto }) =>
				this.categoryService.update(categoryId, categoryDto).pipe(
					map(category => {
						this.notificationService.showSuccess(
							'Success',
							`Category ${category.name} was updated.`
						);
						return addCategory({ category });
					})
				)
			)
		)
	);
}
