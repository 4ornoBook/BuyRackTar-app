import { environment } from '../../../../environments/environment';
import { AuthService } from 'modules/shared/api/services/auth.service';

export function jwtOptionsFactory(authService: AuthService) {
	return {
		tokenGetter: () => {
			return authService.getAccessToken();
		},
		allowedDomains: [
			environment.production ? 'aboba.com' : 'localhost:3000',
		],
	};
}
