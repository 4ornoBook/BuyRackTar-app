import { Injectable } from '@angular/core';
import { UserEntity } from 'entities/User.entity';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from 'config/api-routes';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'interfaces/login-credentials';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	user: UserEntity = {
		id: '',
		accountId: '',
		name: '',
		isOwner: true,
	};

	constructor(private readonly http: HttpClient) {}

	register(credentials: LoginCredentials): Observable<UserEntity> {
		return this.http.post<UserEntity>(
			API_URLS.USER_REGISTER,
			credentials
		);
	}

	login(credentials: LoginCredentials) {
		this.http.post<UserEntity>(API_URLS.USER_LOGIN, credentials);
	}

	getAccessToken(): string | null {
		return localStorage.getItem('accessToken');
	}
}
