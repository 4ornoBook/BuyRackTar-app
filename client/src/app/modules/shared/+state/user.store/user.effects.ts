import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../api/services/auth.service';
import { mergeMap } from 'rxjs';
import { login, setUser } from './user.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
	constructor(private actions$: Actions, private authService: AuthService) {}

	loginUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(login),
			mergeMap(({ credentials }) =>
				this.authService
					.login(credentials)
					.pipe(map(({ data: user }) => setUser({ user })))
			)
		)
	);
}
