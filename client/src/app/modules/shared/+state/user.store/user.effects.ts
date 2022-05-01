import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../api/services/auth.service';
import { mergeMap } from 'rxjs';
import {
	login,
	register,
	setAccount,
	getAccountUsers,
	setAccountUsers,
} from './user.actions';
import { map } from 'rxjs/operators';
import { NotificationAlertService } from '../../helpers/notification-alert.service';
import { AccountService } from '../../api/services/account.service';

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private notificationsService: NotificationAlertService,
		private accountService: AccountService
	) {}

	setAccount$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setAccount),
			map(({ account }) => getAccountUsers({ accountId: account.id }))
		)
	);

	loginAccount$ = createEffect(() =>
		this.actions$.pipe(
			ofType(login),
			mergeMap(({ credentials }) =>
				this.authService.login(credentials).pipe(
					map(account => {
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
					map(users => {
						return setAccountUsers({ users });
					})
				)
			)
		)
	);
}
