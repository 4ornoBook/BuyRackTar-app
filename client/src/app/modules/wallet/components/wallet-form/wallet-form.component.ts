import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import { FormActs } from 'enums/form-acts.enum';
import { CurrencySelectors } from '+state/currency.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
	TuiContextWithImplicit,
	tuiPure,
	TuiStringHandler,
} from '@taiga-ui/cdk';
import { CurrencyEntity } from 'entities/Currency.entity';
import { StringifyHelperService } from 'modules/shared/helpers/stringify-helper.service';
import { WalletEntity } from 'entities/Wallet.entity';
import { WalletEditDto } from '+state/wallet.store/interfaces/wallet-edit.dto';

@Component({
	selector: 'app-wallet-form',
	templateUrl: './wallet-form.component.html',
	styleUrls: ['./wallet-form.component.css'],
})
export class WalletFormComponent implements OnChanges {
	@Input() formAct: FormActs = FormActs.Create;
	@Input() title: string = 'Create a wallet';
	@Input() wallet?: WalletEntity | null;

	@Output() submitWallet = new EventEmitter<WalletEditDto>();

	public currencies$ = this.store.select(CurrencySelectors.selectCurrencies);

	public walletForm: FormGroup = new FormBuilder().group({
		name: ['', [Validators.required]],
		currencyId: [null, [Validators.required]],
	});

	constructor(
		private readonly store: Store,
		private readonly stringifyHelper: StringifyHelperService
	) {}

	ngOnChanges() {
		if (this.formAct === FormActs.Update) {
			this.walletForm.get('currencyId')?.disable();
		}

		this.walletForm.patchValue(
			{
				...this.wallet,
			},
			{ onlySelf: true }
		);
	}

	submitForm() {
		if (this.walletForm.invalid) {
			return;
		}

		this.submitWallet.emit({
			id: this.wallet?.id || null,
			...this.walletForm.getRawValue(),
		});
	}

	@tuiPure
	stringifyCurrency(
		currencies: CurrencyEntity[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		return this.stringifyHelper.stringifyCurrency(currencies);
	}
}
