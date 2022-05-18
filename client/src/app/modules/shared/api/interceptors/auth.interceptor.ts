import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { API_URLS } from '../../../../config/api-routes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshReady: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private authService: AuthService, private router: Router) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<Object>> {
		return next.handle(req).pipe(
			catchError(error => {
				if (
					error instanceof HttpErrorResponse &&
					!req.url.includes('auth/login') &&
					error.status === 401
				) {
					return this.handle401Error(req, error, next);
				}

				return throwError(error);
			})
		);
	}

	private handle401Error(
		request: HttpRequest<any>,
		error: HttpErrorResponse,
		next: HttpHandler
	) {
		const isRefreshRoute = error.url?.includes(
			API_URLS.ACCOUNT_REFRESH_TOKEN
		);

		if (isRefreshRoute) {
			this.isRefreshing = false;

			this.router.navigate(['auth']);
			throw error;
		}

		if (!this.isRefreshing) {
			this.isRefreshing = true;

			return this.authService.refresh().pipe(
				switchMap(() => {
					this.isRefreshing = false;
					this.refreshReady.next(true);

					return next.handle(request);
				})
			);
		}

		return this.refreshReady.pipe(
			filter(make => make !== null),
			take(1),
			switchMap(() => next.handle(request))
		);
	}
}
