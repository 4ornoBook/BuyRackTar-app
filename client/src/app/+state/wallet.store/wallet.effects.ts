import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from 'modules/shared/api/services/account.service';
import {
	addWallet,
	createWallet,
	loadWallet,
	loadWallets,
	setWallets,
	setWalletsLoading,
	updateWallet,
} from './wallet.actions';
import { mergeMap, filter, first, last, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { WalletFeature } from './wallet.reducer';
import { NotificationAlertService } from 'modules/shared/helpers/notification-alert.service';
import { WalletService } from '../../modules/shared/api/services/wallet.service';

@Injectable()
export class WalletEffects {
	constructor(
		private readonly store: Store,
		private readonly actions$: Actions,
		private readonly accountService: AccountService,
		private readonly walletService: WalletService,
		private readonly notificationService: NotificationAlertService
	) {}

	loadWallets$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadWallets),
			mergeMap(() =>
				this.store.pipe(
					select(WalletFeature.selectAllWalletsLoaded),
					first()
				)
			),
			filter(allLoaded => !allLoaded),
			mergeMap(() => {
				this.store.dispatch(setWalletsLoading());
				return this.walletService
					.getUserWallets()
					.pipe(map(wallets => setWallets({ wallets })));
			})
		)
	);

	loadWallet$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadWallet),
			mergeMap(({ walletId }) =>
				this.walletService
					.getOne(walletId)
					.pipe(map(wallet => addWallet({ wallet })))
			)
		)
	);

	createWallet$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createWallet),
			mergeMap(({ walletDto }) =>
				this.walletService.create(walletDto).pipe(
					map(wallet => {
						this.notificationService.showSuccess(
							'Success',
							`Wallet ${wallet.name} was created.`
						);
						return addWallet({ wallet });
					})
				)
			)
		)
	);

	updateCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateWallet),
			mergeMap(({ walletId, walletDto }) =>
				this.walletService.update(walletId, walletDto).pipe(
					map(wallet => {
						this.notificationService.showSuccess(
							'Success',
							`Wallet ${wallet.name} was updated.`
						);
						return addWallet({ wallet });
					})
				)
			)
		)
	);
}
