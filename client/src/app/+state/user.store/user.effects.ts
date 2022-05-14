import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'modules/shared/api/services/auth.service';
import { from, mergeMap } from 'rxjs';
import {
	login,
	register,
	setAccount,
	getAccountUsers,
	setAccountUsers,
	loadAccount,
} from './user.actions';
import { map } from 'rxjs/operators';
import { NotificationAlertService } from 'modules/shared/helpers/notification-alert.service';
import { AccountService } from 'modules/shared/api/services/account.service';
import { Store } from '@ngrx/store';
import { loadCurrencies } from '../currency.store/currency.actions';

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private notificationsService: NotificationAlertService,
		private accountService: AccountService,
		private store: Store
	) {}

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
				this.authService
					.login(credentials)
					.pipe(map(account => setAccount({ account })))
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
					map(users => {
						return setAccountUsers({ users });
					})
				)
			)
		)
	);
}
