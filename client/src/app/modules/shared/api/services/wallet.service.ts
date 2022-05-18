import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { WalletDto } from '+state/wallet.store/interfaces/wallet.dto';
import { WalletEntity } from 'entities/Wallet.entity';
import { WalletTransaction } from '+state/transaction.store/interfaces/wallet-transaction.interface';
import { CategoryTransaction } from '../../../../+state/transaction.store/interfaces/category-transaction.interface';
import { TransactionDto } from '../../../../interfaces/transaction.dto';

@Injectable({
	providedIn: 'root',
})
export class WalletService {
	constructor(private readonly http: HttpClient) {}

	getOne(walletId: number) {
		return this.http
			.get<ApiResponse<WalletEntity>>(
				API_URLS.WALLET_GET_ONE.replace(':walletId', String(walletId))
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
				API_URLS.WALLET_UPDATE.replace(':walletId', String(walletId)),
				walletDto
			)
			.pipe(map(({ data: wallet }) => wallet));
	}

	getWalletTransactions(walletId: number) {
		return this.http
			.get<
				ApiResponse<{
					categoryTransactions: CategoryTransaction[];
					walletTransactions: WalletTransaction[];
				}>
			>(
				API_URLS.WALLET_TRANSACTIONS.replace(
					':walletId',
					String(walletId)
				)
			)
			.pipe(map(({ data: walletTransactions }) => walletTransactions));
	}
}
