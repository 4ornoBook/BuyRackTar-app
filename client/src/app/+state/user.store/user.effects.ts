import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'modules/shared/api/services/auth.service';
import { catchError, from, mergeMap } from 'rxjs';
import {
	login,
	register,
	setAccount,
	getAccountUsers,
	setAccountUsers,
	loadAccount,
	setCurrentUser,
} from './user.actions';
import { map } from 'rxjs/operators';
import { NotificationAlertService } from 'modules/shared/helpers/notification-alert.service';
import { AccountService } from 'modules/shared/api/services/account.service';
import { loadCurrencies } from '../currency.store/currency.actions';
import { setUserWalletsLoaded } from '../wallet.store/wallet.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private notificationsService: NotificationAlertService,
		private accountService: AccountService,
		private router: Router
	) {}

	setLastUserAndUserWallets$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setCurrentUser),
			map(({ userId }) => {
				AccountService.setLastUsedUser(userId);
				return setUserWalletsLoaded({ loaded: false });
			})
		)
	);

	loadAccount$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadAccount),
			mergeMap(({ accountId }) =>
				this.accountService
					.getAccount(accountId)
					.pipe(map(account => setAccount({ account })))
			)
		)
	);

	loadCurrenciesAndUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setAccount),
			mergeMap(({ account }) => {
				return from([
					getAccountUsers({ accountId: account.id }),
					loadCurrencies(),
				]);
			})
		)
	);

	loginAccount$ = createEffect(() =>
		this.actions$.pipe(
			ofType(login),
			mergeMap(({ credentials }) =>
				this.authService.login(credentials).pipe(
					map(account => {
						this.router.navigate(['/']);
						return setAccount({ account });
					})
				)
			)
		)
	);

	registerAccount$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(register),
				mergeMap(({ credentials }) =>
					this.authService.register(credentials).pipe(
						map(() => {
							this.notificationsService.showInfo(
								'Cool!',
								'We have sent a confirmation letter to your email. Please follow it to move forward!'
							);
						})
					)
				)
			),
		{ dispatch: false }
	);

	getAccountUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getAccountUsers),
			mergeMap(({ accountId }) =>
				this.accountService.getAccountUsers(accountId).pipe(
					mergeMap(users => {
						const currentUserId =
							AccountService.getLastUsedUser() ||
							users.find(user => user.isOwner)?.id!;

						AccountService.setLastUsedUser(currentUserId);

						return from([
							setAccountUsers({ users }),
							setCurrentUser({ userId: currentUserId }),
						]);
					})
				)
			)
		)
	);
}
