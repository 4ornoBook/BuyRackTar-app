import { Injectable } from '@angular/core';
import { UserEntity } from 'entities/User.entity';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from 'config/api-routes';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'interfaces/auth/login-credentials.interface';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { Tokens } from 'interfaces/auth/tokens.interface';
import { map } from 'rxjs/operators';

export const ACCESS_TOKEN = 'accessToken';

type UserAndTokens = { user: UserEntity } & Tokens;

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	public register(credentials: LoginCredentials): Observable<UserEntity> {
		return this.http
			.post<ApiResponse<UserAndTokens>>(
				API_URLS.USER_REGISTER,
				credentials
			)
			.pipe(
				map(({ data: userAndTokens }) => {
					AuthService.setAccessToken(userAndTokens.accessToken);
					return userAndTokens.user;
				})
			);
	}

	public login(credentials: LoginCredentials): Observable<UserEntity> {
		return this.http
			.post<ApiResponse<UserAndTokens>>(API_URLS.USER_LOGIN, credentials)
			.pipe(
				map(({ data: userAndToken }) => {
					AuthService.setAccessToken(userAndToken.accessToken);
					return userAndToken.user;
				})
			);
	}

	public refresh() {
		return this.http
			.get<ApiResponse<Tokens>>(API_URLS.USER_REFRESH_TOKEN)
			.pipe(
				map(({ data: tokens }) => {
					AuthService.setAccessToken(tokens.accessToken);
				})
			);
	}

	public getAccessToken(): string | null {
		return localStorage.getItem(ACCESS_TOKEN);
	}

	private static setAccessToken(token: string) {
		localStorage.setItem(ACCESS_TOKEN, token);
	}
}
