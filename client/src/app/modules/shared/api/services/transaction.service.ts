import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { TransactionDto } from 'interfaces/transaction.dto';
import { WalletTransaction } from '+state/transaction.store/interfaces/wallet-transaction.interface';
import { CategoryTransaction } from '+state/transaction.store/interfaces/category-transaction.interface';
import { SpendTargets } from 'enums/spend-targets.enum';
import { Observable } from 'rxjs';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';

@Injectable({
	providedIn: 'root',
})
export class TransactionService {
	constructor(private http: HttpClient) {}

	public replenishWallet(
		transactionDto: TransactionDto
	): Observable<WalletTransaction> {
		return this.http
			.post<ApiResponse<WalletTransaction>>(
				API_URLS.WALLET_REPLENISH.replace(
					':walletId',
					String(transactionDto.destination)
				),
				{
					amount: transactionDto.amount,
				}
			)
			.pipe(map(({ data: transaction }) => transaction));
	}

	public makeTransaction(
		transactionDto: TransactionDto
	): Observable<CombinedTransaction> {
		if (transactionDto.spendTarget === SpendTargets.Category) {
			return this.makeCategoryTransaction(transactionDto);
		} else {
			return this.makeWalletTransaction(transactionDto);
		}
	}

	public makeWalletTransaction(transactionDto: TransactionDto) {
		return this.http
			.post<ApiResponse<WalletTransaction>>(
				API_URLS.WALLET_TRANSACTIONS.replace(
					':walletId',
					String(transactionDto.source)
				),
				{
					walletId: transactionDto.destination,
					amount: transactionDto.amount,
				}
			)
			.pipe(map(({ data: transaction }) => transaction));
	}

	public makeCategoryTransaction(
		transactionDto: Omit<TransactionDto, 'spendTarget'>
	) {
		return this.http
			.post<ApiResponse<CategoryTransaction>>(
				API_URLS.WALLET_TRANSACTIONS.replace(
					':walletId',
					String(transactionDto.source)
				),
				{
					categoryId: transactionDto.destination,
					amount: transactionDto.amount,
				}
			)
			.pipe(map(({ data: transaction }) => transaction));
	}
}
