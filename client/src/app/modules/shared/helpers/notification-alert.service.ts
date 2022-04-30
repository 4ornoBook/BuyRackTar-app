import { Injectable } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Injectable({
	providedIn: 'root',
})
export class NotificationAlertService {
	constructor(
		private readonly notificationsService: TuiNotificationsService
	) {}

	showInfo(label: string, content: string) {
		this.notificationsService
			.show(content, {
				label,
				status: TuiNotification.Info,
			})
			.subscribe();
	}

	showWarn(label: string, content: string) {
		this.notificationsService
			.show(content, {
				label,
				status: TuiNotification.Warning,
			})
			.subscribe();
	}

	showError(content: string) {
		this.notificationsService
			.show(content, {
				label: 'Error',
				status: TuiNotification.Error,
			})
			.subscribe();
	}
}
