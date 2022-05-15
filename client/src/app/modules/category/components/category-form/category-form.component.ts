import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencySelectors } from '+state/currency.store';

import {
	TuiContextWithImplicit,
	tuiPure,
	TuiStringHandler,
} from '@taiga-ui/cdk';
import { CurrencyEntity } from 'entities/Currency.entity';
import { CategoryEntity } from 'entities/Category.entity';
import { CategoryEditDto } from '+state/category.store/interfaces/category-edit.dto';
import { FormActs } from 'enums/form-acts.enum';
import { StringifyHelperService } from '../../../shared/helpers/stringify-helper.service';

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnChanges {
	@Input() formAct: FormActs = FormActs.Create;
	@Input() title: string = 'Create a category';
	@Input() category?: CategoryEntity | null;

	@Output() submitCategory = new EventEmitter<CategoryEditDto>();

	public currencies$ = this.store.select(CurrencySelectors.selectCurrencies);

	public categoryForm: FormGroup = new FormBuilder().group({
		name: ['', [Validators.required]],
		description: [''],
		limit: [0, [Validators.required]],
		currencyId: [null, [Validators.required]],
	});

	constructor(
		private readonly store: Store,
		private readonly stringifyHelper: StringifyHelperService
	) {}

	ngOnChanges() {
		if (this.formAct === FormActs.Update) {
			this.categoryForm.get('currencyId')?.disable();
		}

		this.categoryForm.patchValue(
			{
				...this.category,
			},
			{ onlySelf: true }
		);
	}

	submitForm() {
		if (this.categoryForm.invalid) {
			return;
		}

		this.submitCategory.emit({
			id: this.category?.id || null,
			...this.categoryForm.getRawValue(),
		});
	}

	@tuiPure
	stringifyCurrency(
		currencies: CurrencyEntity[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		return this.stringifyHelper.stringifyCurrency(currencies);
	}
}
