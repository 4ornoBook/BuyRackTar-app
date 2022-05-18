import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletEntity } from 'entities/Wallet.entity';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';
import { HttpClient } from '@angular/common/http';
import { CategoryTransaction } from '+state/transaction.store/interfaces/category-transaction.interface';
import { WalletTransaction } from '+state/transaction.store/interfaces/wallet-transaction.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

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
