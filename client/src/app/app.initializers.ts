import { AuthService } from './modules/shared/api/services/auth.service';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserActions } from './+state/user.store';
import { JwtPayload } from './interfaces/auth/jwt-payload.interface';
import { Router } from '@angular/router';

const excludeAccountLoadOn = ['/auth'];

export function loadSharedDataFactory(
	authService: AuthService,
	store: Store,
	jwtHelper: JwtHelperService,
	router: Router
) {
	return () => {
		const token = authService.getAccessToken();

		try {
			const { accountId } = jwtHelper.decodeToken(token) as JwtPayload;

			if (accountId) {
				store.dispatch(UserActions.loadAccount({ accountId }));
			} else {
				router.navigate(['auth']);
			}
		} catch (e: unknown) {
			router.navigate(['auth']);
		}

		return Promise.resolve(true);
	};
}
