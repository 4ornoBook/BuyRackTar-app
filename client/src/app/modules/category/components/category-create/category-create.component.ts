import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencySelectors } from 'modules/shared/+state/currency.store';

import {
	TuiContextWithImplicit,
	tuiPure,
	TuiStringHandler,
} from '@taiga-ui/cdk';
import { CurrencyEntity } from 'entities/Currency.entity';
import { CategorySelectors } from '../../+state';

@Component({
	selector: 'app-category-create',
	templateUrl: './category-create.component.html',
	styleUrls: ['./category-create.component.css'],
})
export class CategoryCreateComponent {
	public currencies$ = this.store.select(CurrencySelectors.selectCurrencies);
	// public categories$ = this.store.select(CategorySelectors.selectCategories)
	// todo make similar for category edit

	public categoryForm: FormGroup = new FormBuilder().group({
		name: ['', [Validators.required]],
		description: [''],
		limit: [0, [Validators.required]],
		currencyId: [null, [Validators.required]],
	});

	constructor(private readonly store: Store) {}

	@tuiPure
	stringifyCurrency(
		currencies: CurrencyEntity[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		const map = new Map(
			currencies.map(({ id, name }) => [id, name] as [number, string])
		);

		return ({ $implicit }: TuiContextWithImplicit<number>) =>
			map.get($implicit) || '';
	}

	createCategory() {
		console.log(this.categoryForm.value);
	}
}
