import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';

const NO_AUTH_STATUS = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private router: Router) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const withAuthRequest = this.getRequestWithAuthHeader(req);

		return next.handle(withAuthRequest).pipe(
			map(event => {
				if (
					event instanceof HttpResponse &&
					event.status === NO_AUTH_STATUS
				) {
					const isRefreshRoute = event.url?.includes(
						API_URLS.ACCOUNT_REFRESH_TOKEN
					);

					if (isRefreshRoute) {
						this.router.navigate(['auth']);
					} else {
						this.authService.refresh().subscribe();
					}
				}

				return event;
			})
		);
	}

	private getRequestWithAuthHeader(req: HttpRequest<any>) {
		return req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.authService.getAccessToken()}`,
			},
		});
	}
}
