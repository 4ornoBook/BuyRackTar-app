import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from 'config/api-routes';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { Observable } from 'rxjs';
import { UserEntity } from 'entities/User.entity';
import { CategoryEntity } from 'entities/Category.entity';
import { map } from 'rxjs/operators';
import { AccountEntity } from '../../../../entities/Account.entity';

export const LAST_USED_USER = 'lastUsedUser';

@Injectable()
export class AccountService {
	constructor(private readonly http: HttpClient) {}

	public static getLastUsedUser(): number | null {
		const userId = localStorage.getItem(LAST_USED_USER);
		return userId ? +userId : null;
	}

	public static setLastUsedUser(userId: number): void {
		return localStorage.setItem(LAST_USED_USER, String(userId));
	}

	public getAccount(accountId: number): Observable<AccountEntity> {
		return this.http
			.get<ApiResponse<AccountEntity>>(
				API_URLS.ACCOUNT_GET.replace(':id', String(accountId))
			)
			.pipe(map(({ data: account }) => account));
	}

	public getAccountUsers(accountId: number): Observable<UserEntity[]> {
		return this.http
			.get<ApiResponse<UserEntity[]>>(
				API_URLS.ACCOUNT_USERS.replace(':id', String(accountId))
			)
			.pipe(map(({ data: users }) => users));
	}

	public getAccountCategories(): Observable<CategoryEntity[]> {
		return this.http
			.get<ApiResponse<CategoryEntity[]>>(API_URLS.ACCOUNT_CATEGORIES)
			.pipe(map(({ data: categories }) => categories));
	}
}
