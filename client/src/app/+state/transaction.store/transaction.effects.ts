import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'modules/shared/api/services/auth.service';
import {
	loadWalletTransactions,
	loadUserTransactions,
	loadCategoryTransactions,
	setTransactions,
	makeTransaction,
	addTransaction,
} from './transaction.actions';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryService } from 'modules/shared/api/services/category.service';
import { UserService } from 'modules/shared/api/services/user.service';
import { WalletService } from 'modules/shared/api/services/wallet.service';
import { Store } from '@ngrx/store';
import { SpendTargets } from '../../enums/spend-targets.enum';
import { TransactionService } from '../../modules/shared/api/services/transaction.service';
import { CombinedTransaction } from './interfaces/combined-transaction.interface';

@Injectable()
export class TransactionEffects {
	constructor(
		private actions$: Actions,
		private store: Store,
		private categoryService: CategoryService,
		private walletService: WalletService,
		private userService: UserService,
		private transactionService: TransactionService
	) {}

	loadUserTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadUserTransactions),
			mergeMap(() => {
				this.store.dispatch(setTransactions({ transactions: [] }));
				return this.userService.getUserTransactions().pipe(
					map(transactions =>
						setTransactions({
							transactions: [
								...transactions.categoryTransactions,
								...transactions.walletTransactions,
							],
						})
					)
				);
			})
		)
	);

	loadWalletTransactions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadWalletTransactions),
			mergeMap(({ walletId }) => {
				this.store.dispatch(setTransactions({ transactions: [] }));
				return this.walletService.getWalletTransactions(walletId).pipe(
					map(transactions =>
						setTransactions({
							transactions: [
								...transactions.categoryTransactions,
								...transactions.walletTransactions,
							],
						})
					)
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

	makeTransaction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(makeTransaction),
			mergeMap(({ transactionDto }) =>
				this.transactionService.makeTransaction(transactionDto).pipe(
					map(transaction => {
						return addTransaction({ transaction });
					})
				)
			)
		)
	);
}
