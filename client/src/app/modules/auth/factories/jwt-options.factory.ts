import { environment } from '../../../../environments/environment';
import { AuthService } from 'modules/shared/api/services/auth.service';

export function jwtOptionsFactory(authService: AuthService) {
	return {
		tokenGetter: () => {
			return authService.getAccessToken();
		},
		allowedDomains: [
			environment.production
				? 'buyracktar-api.herokuapp.com'
				: 'localhost:3000',
		],
	};
}
