import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { mergeMap, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { API_URLS } from 'config/api-routes';

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
			mergeMap(event => {
				if (
					event instanceof HttpResponse &&
					event.status === NO_AUTH_STATUS
				) {
					const isRefreshRoute = event.url?.includes(
						API_URLS.USER_REFRESH_TOKEN
					);

					if (isRefreshRoute) {
						this.router.navigate(['auth']);
					} else {
						this.authService.refresh().subscribe();
					}
				}

				return of(event);
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
