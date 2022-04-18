import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const newRequest = req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.authService.getAccessToken()}`,
			},
		});

		return next.handle(newRequest);
	}
}
