import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { CategoryEntity } from 'entities/Category.entity';
import { API_URLS } from 'config/api-routes';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
	constructor(private readonly http: HttpClient) {}

	getOne(categoryId: number) {
		return this.http
			.get<ApiResponse<CategoryEntity>>(
				API_URLS.CATEGORY_GET_ONE.replace(':id', String(categoryId))
			)
			.pipe(
				map(({ data: category }) => {
					return category;
				})
			);
	}
}
