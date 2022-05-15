import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { catchError, delay, EMPTY, Observable, of, retry, tap } from 'rxjs';
import { NotificationAlertService } from 'modules/shared/helpers/notification-alert.service';
import { API_URLS } from 'config/api-routes';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiHelperService } from '../../helpers/api-helper.service';

const maxRetries = 2;
const delayRetry = 1500;
const statusesToSkip = [400, 403, 404];
const NO_AUTH_STATUS = 401;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private readonly notificationsService: NotificationAlertService,
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly apiHelper: ApiHelperService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			retry({
				delay: (error, retryCount) => {
					if (
						error instanceof HttpErrorResponse &&
						error.status === NO_AUTH_STATUS
					) {
						const isRefreshRoute = error.url?.includes(
							API_URLS.ACCOUNT_REFRESH_TOKEN
						);

						if (isRefreshRoute) {
							this.router.navigate(['auth']);
							throw error;
						} else {
							this.authService.refresh().subscribe();
						}
					}

					if (
						retryCount === maxRetries ||
						statusesToSkip.includes(error?.status)
					) {
						throw error;
					}

					return of(EMPTY).pipe(delay(delayRetry));
				},
			}),
			catchError((error: unknown) => {
				this.apiHelper.catchHttpResponseError(error);
				throw error;
			})
		);
	}
}
