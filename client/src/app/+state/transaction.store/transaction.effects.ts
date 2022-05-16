import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'modules/shared/api/services/auth.service';
import {
	loadWalletTransactions,
	loadUserTransactions,
	loadCategoryTransactions,
	setTransactions,
} from './transaction.actions';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryService } from 'modules/shared/api/services/category.service';
import { UserService } from 'modules/shared/api/services/user.service';
import { WalletService } from 'modules/shared/api/services/wallet.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TransactionEffects {
	constructor(
		private actions$: Actions,
		private store: Store,
		private categoryService: CategoryService,
		private walletService: WalletService,
		private userService: UserService
	) {}

	loadUserTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadUserTransactions),
			mergeMap(() => {
				this.store.dispatch(setTransactions({ transactions: [] }));
				return this.userService
					.getUserTransactions()
					.pipe(
						map(transactions => setTransactions({ transactions }))
					);
			})
		)
	);

	loadWalletTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadWalletTransactions),
			mergeMap(({ walletId }) => {
				this.store.dispatch(setTransactions({ transactions: [] }));
				return this.walletService
					.getWalletTransactions(walletId)
					.pipe(
						map(transactions => setTransactions({ transactions }))
					);
			})
		)
	);

	loadCategoryTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadCategoryTransactions),
			mergeMap(({ categoryId }) => {
				this.store.dispatch(setTransactions({ transactions: [] }));
				return this.categoryService
					.getCategoryTransactions(categoryId)
					.pipe(
						map(transactions =>
							setTransactions({
								transactions,
							})
						)
					);
			})
		)
	);
}
