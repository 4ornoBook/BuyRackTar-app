import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiNotificationsService } from '@taiga-ui/core';

enum AuthType {
	login = 'Login',
	register = 'Register',
}

const nextType = {
	[AuthType.login]: AuthType.register,
	[AuthType.register]: AuthType.login,
};

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	nextType = nextType;
	authType: AuthType = AuthType.login;
	credentialsForm: FormGroup;

	constructor(
		private readonly notificationsService: TuiNotificationsService
	) {
		this.credentialsForm = new FormBuilder().group({
			email: [null, Validators.required],
			password: [
				null,
				[Validators.required, Validators.minLength(8)],
			],
		});
	}

	changeAuthType() {
		this.authType = nextType[this.authType];
	}

	submitForm() {
		if (this.authType === AuthType.login) {
			this.login();
			return;
		}

		this.register();
	}

	private login() {
		this.notificationsService
			.show('Aboba login hello', {
				label: 'Login successful',
			})
			.subscribe();
	}

	private register() {
		this.notificationsService
			.show('Aboba register hello', {
				label: 'Registration successful',
			})
			.subscribe();
	}
}
