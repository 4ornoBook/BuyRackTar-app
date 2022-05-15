import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { CategoryEntity } from 'entities/Category.entity';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';
import { CategoryDto } from '+state/category.store';

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
			.get<ApiResponse<CategoryTransactionsEntity[]>>(
				API_URLS.CATEGORY_TRANSACTIONS.replace(':id', String(categoryId))
			)
			.pipe(
				map(({ data: categoryTransactions }) => categoryTransactions)
			);
	}
}
