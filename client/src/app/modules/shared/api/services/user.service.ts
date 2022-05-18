import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletEntity } from 'entities/Wallet.entity';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CategoryTransaction } from '+state/transaction.store/interfaces/category-transaction.interface';
import { WalletTransaction } from '+state/transaction.store/interfaces/wallet-transaction.interface';
import { UserEntity } from 'entities/User.entity';
import { UserDto } from '+state/user.store/interfaces/user.dto';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	createUser(userDto: UserDto) {
		return this.http
			.post<ApiResponse<UserEntity>>(API_URLS.USER_CREATE, userDto)
			.pipe(map(({ data: user }) => user));
	}

	updateUser(userId: number, userDto: UserDto) {
		return this.http
			.put<ApiResponse<UserEntity>>(
				API_URLS.USER_UPDATE.replace(':id', String(userId)),
				userDto
			)
			.pipe(map(({ data: user }) => user));
	}

	getUserWallets(): Observable<WalletEntity[]> {
		return this.http
			.get<ApiResponse<WalletEntity[]>>(API_URLS.USER_GET_WALLETS)
			.pipe(map(({ data: wallets }) => wallets));
	}

	getUserTransactions() {
		return this.http
			.get<
				ApiResponse<{
					categoryTransactions: CategoryTransaction[];
					walletTransactions: WalletTransaction[];
				}>
			>(API_URLS.USER_GET_TRANSACTIONS)
			.pipe(map(({ data: transactions }) => transactions));
	}
}
