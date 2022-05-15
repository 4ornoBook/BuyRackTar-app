import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationAlertService } from './notification-alert.service';

@Injectable({
	providedIn: 'root',
})
export class ApiHelperService {
	constructor(
		private readonly notificationService: NotificationAlertService
	) {}

	public catchHttpResponseError(responseError: unknown) {
		if (responseError instanceof HttpErrorResponse) {
			this.notificationService.showError(responseError.error.error);
		}
	}
}
