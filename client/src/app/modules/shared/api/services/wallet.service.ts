import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { WalletTransactionEntity } from 'entities/WalletTransaction.entity';
import { WalletDto } from '+state/wallet.store/interfaces/wallet.dto';
import { WalletEntity } from 'entities/Wallet.entity';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class WalletService {
	constructor(private readonly http: HttpClient) {}

	getUserWallets(): Observable<WalletEntity[]> {
		return this.http
			.get<ApiResponse<WalletEntity[]>>(API_URLS.USER_GET_WALLETS)
			.pipe(map(({ data: wallets }) => wallets));
	}

	getOne(walletId: number) {
		return this.http
			.get<ApiResponse<WalletEntity>>(
				API_URLS.WALLET_GET_ONE.replace(':id', String(walletId))
			)
			.pipe(map(({ data: wallet }) => wallet));
	}

	create(walletDto: WalletDto) {
		return this.http
			.post<ApiResponse<WalletEntity>>(API_URLS.WALLET_CREATE, walletDto)
			.pipe(map(({ data: wallet }) => wallet));
	}

	update(walletId: number, walletDto: WalletDto) {
		return this.http
			.put<ApiResponse<WalletEntity>>(
				API_URLS.WALLET_UPDATE.replace(':id', String(walletId)),
				walletDto
			)
			.pipe(map(({ data: wallet }) => wallet));
	}

	getWalletTransactions(walletId: number) {
		return this.http
			.get<ApiResponse<WalletTransactionEntity[]>>(
				API_URLS.WALLET_TRANSACTIONS.replace(':id', String(walletId))
			)
			.pipe(map(({ data: walletTransactions }) => walletTransactions));
	}
}
