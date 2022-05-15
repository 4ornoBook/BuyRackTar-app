import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
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
	public SpendTargets = SpendTargets;
	public get spendTargetList() {
		return Object.values(SpendTargets);
	}
	@Input() spendTarget: SpendTargets | null = null;

	@Input() categories: CategoryInterface[] = [];
	@Input() wallets: WalletInterface[] = [];

	@Input() chosenSource: WalletInterface | null = null;
	@Input() chosenDestination: CategoryInterface | null = null;

	@Output() submitTransaction = new EventEmitter();

	public spendsForm = this.formBuilder.group({
		source: [null, [Validators.required]],
		spendTarget: [SpendTargets.Category, Validators.required],
		destination: [null, [Validators.required]],
		amount: [0, Validators.required],
	});

	constructor(
		private formBuilder: FormBuilder,
		private stringifyHelper: StringifyHelperService
	) {
		this.spendsForm.get('spendTarget')?.valueChanges.subscribe(() => {
			this.spendsForm.patchValue(
				{ destination: null },
				{ onlySelf: true }
			);
		});
	}

	public ngOnChanges(changes: SimpleChanges) {
		const spendTargetChange = changes['spendTarget'];
		if (
			this.spendTarget &&
			spendTargetChange.currentValue !== spendTargetChange.previousValue
		) {
			this.changeDestinationTarget();
		}

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

	public submitForm() {
		console.log(this.spendsForm.getRawValue());
		this.submitTransaction.emit(this.spendsForm.getRawValue());
	}

	@tuiPure
	public stringifyWallet(
		wallets: WalletInterface[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		return this.stringifyHelper.stringifyWallet(wallets);
	}

	@tuiPure
	public stringifyCategory(
		categories: CategoryInterface[]
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		return this.stringifyHelper.stringifyCategory(categories);
	}

	public walletMatcher(
		destinationWallet: WalletInterface,
		sourceWalletId: number
	) {
		return destinationWallet.id !== sourceWalletId;
	}

	private changeDestinationTarget() {
		this.spendsForm.patchValue(
			{
				spendTarget: this.spendTarget,
				destination: null,
			},
			{ onlySelf: true }
		);
	}
}
