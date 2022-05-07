import { createAction, props } from '@ngrx/store';
import { UserEntity } from 'entities/User.entity';
import { LoginCredentials } from 'interfaces/auth/login-credentials.interface';
import { AccountEntity } from 'entities/Account.entity';

const context = '[USER]';

export const login = createAction(
	`${context} login`,
	props<{ credentials: LoginCredentials }>()
);

export const register = createAction(
	`${context} register`,
	props<{ credentials: LoginCredentials }>()
);

export const getAccountUsers = createAction(
	`${context} get account users`,
	props<{ accountId: number }>()
);

export const setAccount = createAction(
	`${context} set account`,
	props<{ account: AccountEntity }>()
);

export const setAccountUsers = createAction(
	`${context} set account users`,
	props<{ users: UserEntity[] }>()
);

export const setCurrentUser = createAction(
	`${context} set user`,
	props<{ userId: number }>()
);
