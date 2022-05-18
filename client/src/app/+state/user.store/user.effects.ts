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
	createUser,
	addAccountUser,
	updateUser,
	getAccountUser,
} from './user.actions';
import { map } from 'rxjs/operators';
import { NotificationAlertService } from 'modules/shared/helpers/notification-alert.service';
import { AccountService } from 'modules/shared/api/services/account.service';
import { loadCurrencies } from '../currency.store/currency.actions';
import {
	setUserWalletsLoaded,
	setWallets,
} from '../wallet.store/wallet.actions';
import { Router } from '@angular/router';
import { UserService } from '../../modules/shared/api/services/user.service';

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private notificationService: NotificationAlertService,
		private accountService: AccountService,
		private userService: UserService,
		private router: Router
	) {}

	setLastUserAndUserWallets$ = createEffect(() =>
		this.actions$.pipe(
			ofType(setCurrentUser),
			mergeMap(({ userId }) => {
				AccountService.setLastUsedUser(userId);
				return from([
					setWallets({ wallets: [] }),
					setUserWalletsLoaded({ loaded: false }),
				]);
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

	createUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(createUser),
			mergeMap(({ userDto }) =>
				this.userService.createUser(userDto).pipe(
					map(user => {
						this.notificationService.showInfo(
							'Cool!',
							`A new user ${user.name} was successfully created!`
						);
						return addAccountUser({ user });
					})
				)
			)
		)
	);

	updateUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(updateUser),
			mergeMap(({ userId, userDto }) =>
				this.userService.updateUser(userId, userDto).pipe(
					map(user => {
						this.notificationService.showInfo(
							'Cool!',
							`A user ${user.name} was successfully updated!`
						);
						return addAccountUser({ user });
					})
				)
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
							this.notificationService.showInfo(
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

	getAccountUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(getAccountUser),
			mergeMap(({ userId }) =>
				this.accountService
					.getAccountUser(userId)
					.pipe(map(user => addAccountUser({ user })))
			)
		)
	);
}
