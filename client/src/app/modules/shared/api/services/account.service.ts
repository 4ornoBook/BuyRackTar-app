import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from 'config/api-routes';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { Observable } from 'rxjs';
import { UserEntity } from 'entities/User.entity';
import { CategoryEntity } from 'entities/Category.entity';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountService {
	constructor(private readonly http: HttpClient) {}

	public getAccountUsers(accountId: number): Observable<UserEntity[]> {
		return this.http
			.get<ApiResponse<UserEntity[]>>(
				API_URLS.ACCOUNT_USERS.replace(':id', String(accountId))
			)
			.pipe(map(({ data: users }) => users));
	}

	getAccountCategories(): Observable<CategoryEntity[]> {
		return this.http
			.get<ApiResponse<CategoryEntity[]>>(API_URLS.ACCOUNT_CATEGORIES)
			.pipe(map(({ data: categories }) => categories));
	}
}
