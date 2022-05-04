import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencySelectors } from 'modules/shared/+state/currency.store';

import {
	TuiContextWithImplicit,
	tuiPure,
	TuiStringHandler,
} from '@taiga-ui/cdk';
import { CurrencyEntity } from 'entities/Currency.entity';
import { CategoryEntity } from 'entities/Category.entity';

export type CategoryForm = Pick<
	CategoryEntity,
	'name' | 'description' | 'currencyId' | 'limit'
>;

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
	@Input() title: string = 'Create a category';
	@Input() category?: CategoryEntity;

	@Output() submitCategory = new EventEmitter<CategoryForm>();

	public currencies$ = this.store.select(CurrencySelectors.selectCurrencies);

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
}
