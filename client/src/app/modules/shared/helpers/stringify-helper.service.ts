import { Injectable } from '@angular/core';
import { TuiContextWithImplicit, TuiStringHandler } from '@taiga-ui/cdk';
import { WalletInterface } from '+state/wallet.store/interfaces/wallet.interface';
import { CategoryInterface } from '+state/category.store';
import { CurrencyEntity } from '../../../entities/Currency.entity';

@Injectable({
	providedIn: 'root',
})
export class StringifyHelperService {
	constructor() {}

	stringifyWallet(
		wallets: WalletInterface[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		const map = new Map(
			wallets.map(
				({ id, name, currency }) =>
					[id, `${name} - ${currency?.name}`] as [number, string]
			)
		);

		return ({ $implicit }: TuiContextWithImplicit<number>) =>
			map.get($implicit) || '';
	}

	stringifyCategory(
		categories: CategoryInterface[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		const map = new Map(
			categories.map(
				({ id, name, currency }) =>
					[id, `${name} - ${currency?.name}`] as [number, string]
			)
		);

		return ({ $implicit }: TuiContextWithImplicit<number>) =>
			map.get($implicit) || '';
	}

	stringifyCurrency(
		currencies: CurrencyEntity[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		const map = new Map(
			currencies.map(({ id, name }) => [id, name] as [number, string])
		);

		return ({ $implicit }: TuiContextWithImplicit<number>) =>
			map.get($implicit) || '';
	}
}
