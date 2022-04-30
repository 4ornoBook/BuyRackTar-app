import { createAction, props } from '@ngrx/store';
import { UserEntity } from 'entities/User.entity';
import { LoginCredentials } from 'interfaces/auth/login-credentials.interface';

const context = '[USER]';

export const login = createAction(
	`${context} login`,
	props<{ credentials: LoginCredentials }>()
);

export const register = createAction(
	`${context} register`,
	props<{ credentials: LoginCredentials }>()
);

export const setUser = createAction(
	`${context} set`,
	props<{ user: UserEntity }>()
);
