import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserActions } from '+state/user.store';
import { AuthService } from 'modules/shared/api/services/auth.service';
import { Store } from '@ngrx/store';

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
		private readonly authService: AuthService,
		private readonly store: Store
	) {
		this.credentialsForm = new FormBuilder().group({
			email: [null, Validators.required],
			password: [null, [Validators.required, Validators.minLength(8)]],
		});
	}

	changeAuthType() {
		this.authType = nextType[this.authType];
	}

	submit() {
		if (!this.credentialsForm.valid) {
			return;
		}

		if (this.authType === AuthType.login) {
			this.login();
			return;
		}

		this.register();
	}

	private login() {
		this.store.dispatch(
			UserActions.login({ credentials: this.credentialsForm.value })
		);
	}

	private register() {
		this.store.dispatch(
			UserActions.register({ credentials: this.credentialsForm.value })
		);
	}
}
