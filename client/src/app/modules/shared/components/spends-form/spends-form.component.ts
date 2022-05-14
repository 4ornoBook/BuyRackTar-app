import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import { WalletInterface } from '+state/wallet.store/interfaces/wallet.interface';
import { CategoryInterface } from '+state/category.store';
import { FormBuilder, Validators } from '@angular/forms';
import {
	TuiContextWithImplicit,
	tuiPure,
	TuiStringHandler,
} from '@taiga-ui/cdk';
import { StringifyHelperService } from '../../helpers/stringify-helper.service';

export enum SpendTargets {
	Category = 'category',
	Wallet = 'wallet',
}

@Component({
	selector: 'app-spends-form',
	templateUrl: './spends-form.component.html',
	styleUrls: ['./spends-form.component.css'],
})
export class SpendsFormComponent implements OnChanges {
	@Input() availableSpendTargets: SpendTargets[] = [
		SpendTargets.Category,
		SpendTargets.Wallet,
	];

	@Input() categories: CategoryInterface[] = [];
	@Input() wallets: WalletInterface[] = [];

	@Input() chosenSource: WalletInterface | null = null;
	@Input() chosenDestination: CategoryInterface | null = null;

	@Output() submitTransaction = new EventEmitter();

	public spendsForm = this.formBuilder.group({
		source: [null, [Validators.required]],
		destination: [null, [Validators.required]],
	});

	constructor(
		private formBuilder: FormBuilder,
		private stringifyHelper: StringifyHelperService
	) {}

	ngOnChanges() {
		this.spendsForm.patchValue({
			source: this.chosenSource?.id || this.spendsForm.value.source,
			destination:
				this.chosenDestination || this.spendsForm.value.destination,
		});

		if (this.chosenSource) {
			this.spendsForm.get('source')?.disable({ onlySelf: true });
		}

		if (this.chosenDestination) {
			this.spendsForm.get('source')?.disable({ onlySelf: true });
		}
	}

	@tuiPure
	stringifyWallet(
		wallets: WalletInterface[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		return this.stringifyHelper.stringifyWallet(wallets);
	}

	@tuiPure
	stringifyCategory(
		categories: CategoryInterface[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		return this.stringifyHelper.stringifyCategory(categories);
	}
}
