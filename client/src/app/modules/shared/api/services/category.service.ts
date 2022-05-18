import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { CategoryEntity } from 'entities/Category.entity';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';
import { CategoryDto } from '+state/category.store';
import { CategoryTransaction } from '../../../../+state/transaction.store/interfaces/category-transaction.interface';
import { TransactionDto } from '../../../../interfaces/transaction.dto';
import { Observable } from 'rxjs';
import { Spendings } from '../../../../+state/category.store/interfaces/spendings.interface';

@Injectable()
export class CategoryService {
	constructor(private readonly http: HttpClient) {}

	getOne(categoryId: number) {
		return this.http
			.get<ApiResponse<CategoryEntity>>(
				API_URLS.CATEGORY_GET_ONE.replace(':id', String(categoryId))
			)
			.pipe(map(({ data: category }) => category));
	}

	create(categoryDto: CategoryDto) {
		return this.http
			.post<ApiResponse<CategoryEntity>>(
				API_URLS.CATEGORY_CREATE,
				categoryDto
			)
			.pipe(map(({ data: category }) => category));
	}

	update(categoryId: number, categoryDto: CategoryDto) {
		return this.http
			.put<ApiResponse<CategoryEntity>>(
				API_URLS.CATEGORY_UPDATE.replace(':id', String(categoryId)),
				categoryDto
			)
			.pipe(map(({ data: category }) => category));
	}

	getCategoryTransactions(categoryId: number) {
		return this.http
			.get<ApiResponse<CategoryTransaction[]>>(
				API_URLS.CATEGORY_TRANSACTIONS.replace(
					':id',
					String(categoryId)
				)
			)
			.pipe(
				map(({ data: categoryTransactions }) => categoryTransactions)
			);
	}

	getSpendings(): Observable<Record<number, number>> {
		return this.http
			.get<ApiResponse<Spendings[]>>(API_URLS.CATEGORY_SPENDINGS)
			.pipe(
				map(({ data: spendings }) => {
					return spendings.reduce(
						(spendingsMap: Record<number, number>, spending) => {
							spendingsMap[spending.id] = spending.amount;
							return spendingsMap;
						},
						{}
					);
				})
			);
	}
}
