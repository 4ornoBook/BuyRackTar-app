import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { CurrencyEntity } from 'entities/Currency.entity';
import { map } from 'rxjs/operators';
import { API_URLS } from 'config/api-routes';

@Injectable()
export class CurrencyService {
	constructor(private readonly http: HttpClient) {}

	public getCurrencies(): Observable<CurrencyEntity[]> {
		return this.http
			.get<ApiResponse<CurrencyEntity[]>>(API_URLS.CURRENCIES_GET)
			.pipe(
				map(({ data: currencies }) => {
					return currencies;
				})
			);
	}
}
