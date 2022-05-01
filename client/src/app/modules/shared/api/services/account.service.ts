import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from 'config/api-routes';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { Observable } from 'rxjs';
import { UserEntity } from 'entities/User.entity';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	constructor(private readonly http: HttpClient) {}

	public getAccountUsers(
		accountId: number
	): Observable<ApiResponse<UserEntity[]>> {
		return this.http.get<ApiResponse<UserEntity[]>>(
			API_URLS.ACCOUNT_USERS.replace(':id', String(accountId))
		);
	}
}
