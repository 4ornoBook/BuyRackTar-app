import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { delay, EMPTY, Observable, of, retry } from 'rxjs';
import { NotificationAlertService } from '../../helpers/notification-alert.service';

export const maxRetries = 2;
export const delayRetry = 1500;
export const statusesToSkip = [400, 403, 404];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private readonly notificationsService: NotificationAlertService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			retry({
				delay: (error, retryCount) => {
					if (
						retryCount === maxRetries ||
						statusesToSkip.includes(
							error?.status
						)
					) {
						this.notificationsService.showError(
							error?.message
						);
						throw error;
					}

					return of(EMPTY).pipe(
						delay(delayRetry)
					);
				},
			})
		);
	}
}
